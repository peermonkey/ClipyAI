import { Router } from 'express';
import { getUploadUrl } from '@xclips/config/s3';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { prisma } from '@xclips/db';
import crypto from 'crypto';

const router = Router();
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const transcribeQueue = new Queue('transcribe', { connection });

router.post('/request', async (req, res) => {
  const { fileName, contentType, duration } = req.body as {
    fileName: string;
    contentType: string;
    duration: number;
  };
  const key = `${req.user?.id ?? 'anon'}/${Date.now()}-${crypto.randomUUID()}-${fileName}`;
  const url = await getUploadUrl(key, contentType, 600);
  // pre-create upload row with status 'requested'
  await prisma.upload.create({
    data: {
      id: key,
      userId: req.user?.id || null,
      srcUrl: `s3://${process.env.S3_BUCKET}/${key}`,
      duration,
      sizeMb: 0,
      status: 'requested',
    },
  });
  return res.status(200).json({ url, key });
});

router.post('/complete', async (req, res) => {
  const { key, size, duration } = req.body as {
    key: string;
    size: number;
    duration: number;
  };
  await prisma.upload.update({ where: { id: key }, data: { status: 'uploaded', sizeMb: size } });
  await transcribeQueue.add('transcribe', { key, duration });
  return res.status(200).json({ ok: true });
});

export default router; 