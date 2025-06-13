import { Job, Queue } from 'bullmq';
import { prisma } from '@xclips/db';
import OpenAI from 'openai';
import Redis from 'ioredis';

interface CaptionPayload { clipId: string; platform: string; }

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function captionJob(job: Job<CaptionPayload>) {
  const { clipId, platform } = job.data;

  const clip = await prisma.clip.findUnique({ where: { id: clipId }, include: { upload: true } });
  if (!clip) throw new Error('Clip not found');

  // Fetch transcript
  const transcript = await prisma.transcript.findFirst({ where: { uploadId: clip.uploadId } });
  if (!transcript) throw new Error('Transcript missing');
  const transcriptText = await fetch(transcript.textUrl).then(r => r.text());

  // Generate caption with GPT
  const prompt = `Generate an engaging TikTok caption (max 120 chars) and 5 relevant hashtags for this transcript:\n${transcriptText}`;
  const resp = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You write social-media captions.' },
      { role: 'user', content: prompt },
    ],
  });
  const captionText = resp.choices[0].message.content?.trim() || '';

  await prisma.caption.create({
    data: {
      clipId,
      platform,
      captionText,
      locale: 'en',
    },
  });

  // enqueue export job immediately for default 9:16 preset
  const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  const exportQueue = new Queue('export', { connection });
  await exportQueue.add('export', { clipId, preset: '9:16' });
} 