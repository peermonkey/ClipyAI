"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("@xclips/db");
const router = (0, express_1.Router)();
// GET /api/clip?cursor=<id>&limit=20
router.get('/', async (req, res) => {
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ error: 'Unauthorized' });
    const limit = parseInt(req.query.limit || '20', 10);
    const cursor = req.query.cursor;
    const clips = await db_1.prisma.clip.findMany({
        where: { upload: { userId } },
        take: limit,
        ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        orderBy: { createdAt: 'desc' },
    });
    return res.json({ clips, nextCursor: clips.length ? clips[clips.length - 1].id : null });
});
// GET /api/clip/:id
router.get('/:id', async (req, res) => {
    const clip = await db_1.prisma.clip.findUnique({ where: { id: req.params.id } });
    if (!clip)
        return res.status(404).json({ error: 'Not found' });
    return res.json({ clip });
});
exports.default = router;
