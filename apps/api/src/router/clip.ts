import { Router } from 'express';
import { prisma } from '@xclips/db';

const router = Router();

// GET /api/clip?cursor=<id>&limit=20
router.get('/', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const limit = parseInt((req.query.limit as string) || '20', 10);
  const cursor = req.query.cursor as string | undefined;
  const clips = await prisma.clip.findMany({
    where: { upload: { userId } },
    take: limit,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    orderBy: { createdAt: 'desc' },
  });
  return res.json({ clips, nextCursor: clips.length ? clips[clips.length - 1].id : null });
});

// GET /api/clip/:id
router.get('/:id', async (req, res) => {
  const clip = await prisma.clip.findUnique({ where: { id: req.params.id } });
  if (!clip) return res.status(404).json({ error: 'Not found' });
  return res.json({ clip });
});

export default router; 