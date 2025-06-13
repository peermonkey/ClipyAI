import { Job } from 'bullmq';
import { prisma } from '@xclips/db';
import { s3 } from '@xclips/config/s3';
import path from 'path';
import fs from 'fs/promises';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { spawn } from 'child_process';
import crypto from 'crypto';
import OpenAI from 'openai';
import ffmpegPath from 'ffmpeg-static';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

interface ClipPayload {
  uploadId: string;
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function clipJob(job: Job<ClipPayload>) {
  const { uploadId } = job.data;

  const upload = await prisma.upload.findUnique({ where: { id: uploadId } });
  if (!upload) throw new Error('Upload not found');

  // Fetch transcript text
  const transcript = await prisma.transcript.findFirst({ where: { uploadId } });
  if (!transcript) throw new Error('Transcript missing');

  // Call GPT to get highlight segments (stub: single 0-60 sec)
  let highlights: { start: number; end: number }[] = [];
  try {
    const prompt = `Identify the top 3 highlight moments (start, end in seconds) in the following transcript:\n${await fetch(transcript.textUrl).then(r=>r.text())}`;
    const resp = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant extracting timestamps.' },
        { role: 'user', content: prompt },
      ],
    });
    const content = resp.choices[0].message.content || '';
    // very naive parse, expecting lines "start-end"
    highlights = content
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [s, e] = l.split(/[-–]/).map((n) => parseInt(n.trim(), 10));
        return { start: s || 0, end: e || Math.min(60, upload.duration || 60) };
      });
  } catch (err) {
    console.warn('GPT highlight detection failed, defaulting to first 60s');
  }
  if (!highlights.length) highlights.push({ start: 0, end: Math.min(60, upload.duration || 60) });

  // Local download path assumption (same as transcribe)
  const localOriginal = path.join('/tmp', path.basename(uploadId));
  // TODO: download original video from S3; skipping in demo.

  for (const { start, end } of highlights) {
    const clipId = crypto.randomUUID();
    const clipFile = `/tmp/${clipId}.mp4`;
    const thumbnailFile = `/tmp/${clipId}.jpg`;

    // FFmpeg slicing
    await new Promise((resolve, reject) => {
      const ff = spawn(ffmpegPath || 'ffmpeg', [
        '-y',
        '-ss', String(start),
        '-to', String(end),
        '-i', localOriginal,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        clipFile,
      ]);
      ff.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`ffmpeg exit ${code}`))));
    });

    // Thumbnail
    await new Promise((resolve, reject) => {
      const ff = spawn(ffmpegPath || 'ffmpeg', [
        '-y',
        '-i', clipFile,
        '-ss', '00:00:00.500',
        '-vframes', '1',
        thumbnailFile,
      ]);
      ff.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`thumb ffmpeg exit ${code}`))));
    });

    // Upload to S3
    const clipKey = `${upload.userId || 'anon'}/clips/${clipId}.mp4`;
    const thumbKey = `${upload.userId || 'anon'}/clips/${clipId}.jpg`;
    const clipBuffer = await fs.readFile(clipFile);
    const thumbBuffer = await fs.readFile(thumbnailFile);
    await Promise.all([
      s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: clipKey, Body: clipBuffer, ContentType: 'video/mp4' })),
      s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: thumbKey, Body: thumbBuffer, ContentType: 'image/jpeg' })),
    ]);

    await prisma.clip.create({
      data: {
        id: clipId,
        uploadId,
        start,
        end,
        url: `s3://${process.env.S3_BUCKET}/${clipKey}`,
        thumbUrl: `s3://${process.env.S3_BUCKET}/${thumbKey}`,
        status: 'complete',
      },
    });

    // enqueue caption job
    const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    const captionQueue = new Queue('caption', { connection });
    await captionQueue.add('caption', { clipId, platform: 'tiktok' });

    // cleanup
    await fs.rm(clipFile, { force: true });
    await fs.rm(thumbnailFile, { force: true });
  }

  // Optionally publish websocket event via Redis pub
} 