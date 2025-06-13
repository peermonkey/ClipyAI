import { Job, Queue } from 'bullmq';
import { prisma } from '@xclips/db';
import { s3 } from '@xclips/config/s3';
import fs from 'fs/promises';
import path from 'path';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { spawn } from 'child_process';
import Redis from 'ioredis';

interface TranscribePayload {
  key: string;
  duration: number;
}

export async function transcribeJob(job: Job<TranscribePayload>) {
  const { key } = job.data;

  // mark upload processing
  await prisma.upload.update({ where: { id: key }, data: { status: 'processing' } }).catch(() => {});

  // Temporary local file path (uses AWS SDK streaming in real impl)
  const localFile = path.join('/tmp', path.basename(key));

  try {
    // Download from S3 (simplified by presigned URL via http fetch)
    // TODO: stream copy; placeholder assume worker has shared s3fs mount

    // Call Whisper via Python CLI (placeholder)
    const transcriptPath = `${localFile}.txt`;
    const whisper = spawn('python', ['-m', 'whisper', localFile, '--model', 'base', '--output', transcriptPath]);
    await new Promise((resolve, reject) => {
      whisper.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`Whisper exit ${code}`))));
    });

    // read transcript text & count tokens (simplified word count *1.33)
    const transcriptText = await fs.readFile(transcriptPath, 'utf-8');
    const tokens = Math.ceil(transcriptText.split(/\s+/).length * 1.33);
    const minutes = Math.ceil(tokens / 7);

    // upload transcript back to S3
    const transcriptKey = `${key}.txt`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: transcriptKey,
        Body: transcriptText,
        ContentType: 'text/plain',
      })
    );

    // persist DB
    await prisma.transcript.create({
      data: {
        uploadId: key,
        language: 'en',
        textUrl: `s3://${process.env.S3_BUCKET}/${transcriptKey}`,
        words: transcriptText.split(/\s+/).length,
      },
    });

    // debit minutes from user
    const upload = await prisma.upload.findUnique({ where: { id: key }, include: { user: true } });
    if (upload?.userId) {
      await prisma.user.update({
        where: { id: upload.userId },
        data: { credits: { decrement: minutes } },
      });
      await prisma.usageToken.create({ data: { userId: upload.userId, tokens, minutes } });
    }

    // mark done
    await prisma.upload.update({ where: { id: key }, data: { status: 'complete' } });

    // enqueue clipping
    const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    const clipQueue = new Queue('clip', { connection });
    await clipQueue.add('clip', { uploadId: key });

    return true;
  } catch (err) {
    console.error('Transcribe job failed', err);
    await prisma.upload.update({ where: { id: key }, data: { status: 'errored' } }).catch(() => {});
    throw err;
  } finally {
    // cleanup
    await fs.rm(localFile, { force: true }).catch(() => {});
  }
} 