import { Job } from 'bullmq';
import { prisma } from '@xclips/db';
import { s3 } from '@xclips/config/s3';
import { FFMPEG_PRESETS } from '@xclips/config/ffmpeg-presets';
import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';

interface ExportPayload { clipId: string; preset: string; }

export async function exportJob(job: Job<ExportPayload>) {
  const { clipId, preset } = job.data;
  // Mark job processing or create record
  let dbJob = await prisma.exportJob.findFirst({ where: { clipId, preset } });
  if (!dbJob) {
    dbJob = await prisma.exportJob.create({ data: { clipId, preset, status: 'processing' } });
  } else {
    await prisma.exportJob.update({ where: { id: dbJob.id }, data: { status: 'processing' } });
  }

  const clip = await prisma.clip.findUnique({ where: { id: clipId } });
  if (!clip) throw new Error('Clip missing');
  const presetConf = FFMPEG_PRESETS[preset];
  if (!presetConf) throw new Error('Preset not supported');

  const localClip = path.join('/tmp', path.basename(clip.url));
  // TODO download clip from S3

  const outFile = `/tmp/${clipId}-${preset}.mp4`;

  // Build ffmpeg args
  const filters = [
    ...presetConf.filters,
    // Burn captions overlay if file exists (assume srt path next to clip)
  ];

  const args = [
    '-y',
    '-i', localClip,
    '-vf', filters.join(','),
    '-s', `${presetConf.width}x${presetConf.height}`,
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-movflags', '+faststart',
    outFile,
  ];
  await new Promise((res, rej) => {
    const ff = spawn(ffmpegPath || 'ffmpeg', args);
    ff.on('exit', (code) => (code === 0 ? res(true) : rej(new Error(`export ffmpeg exit ${code}`))));
  });

  const outKey = `${clipId}/exports/${preset}.mp4`;
  const buffer = await fs.readFile(outFile);
  await s3.send(new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: outKey, Body: buffer, ContentType: 'video/mp4' }));

  await prisma.exportJob.update({ where: { id: dbJob.id }, data: { status: 'complete', url: `s3://${process.env.S3_BUCKET}/${outKey}` } });

  await fs.rm(outFile, { force: true });
} 