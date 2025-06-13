import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '@xclips/db';

const router = Router();

router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { sub: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router; 