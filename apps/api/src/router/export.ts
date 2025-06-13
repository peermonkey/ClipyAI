import { Router } from 'express';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { prisma } from '@xclips/db';
import { FFMPEG_PRESETS } from '@xclips/config/ffmpeg-presets';

const router = Router();
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const exportQueue = new Queue('export', { connection });

// POST /api/export/generate
router.post('/generate', async (req, res) => {
  try {
    const { clipId, preset } = req.body as { clipId: string; preset: string };
    if (!clipId || !preset) return res.status(400).json({ error: 'clipId and preset required' });
    if (!FFMPEG_PRESETS[preset]) return res.status(400).json({ error: 'Unsupported preset' });

    // Verify clip belongs to user (basic check)
    const clip = await prisma.clip.findUnique({ where: { id: clipId }, include: { upload: true } });
    if (!clip) return res.status(404).json({ error: 'Clip not found' });
    if (req.user && clip.upload.userId && clip.upload.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Create ExportJob record (queued)
    const exportJob = await prisma.exportJob.create({
      data: {
        clipId,
        preset,
        status: 'queued',
      },
    });

    await exportQueue.add('export', { clipId, preset });

    return res.status(202).json({ jobId: exportJob.id });
  } catch (err) {
    console.error('[export.generate]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/export/status/:clipId
router.get('/status/:clipId', async (req, res) => {
  try {
    const clipId = req.params.clipId;
    const jobs = await prisma.exportJob.findMany({ where: { clipId }, orderBy: { createdAt: 'desc' } });
    return res.json({ jobs });
  } catch (err) {
    console.error('[export.status]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 