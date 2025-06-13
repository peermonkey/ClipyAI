"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const db_1 = require("@xclips/db");
const ffmpeg_presets_1 = require("@xclips/config/ffmpeg-presets");
const router = (0, express_1.Router)();
const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
const exportQueue = new bullmq_1.Queue('export', { connection });
// POST /api/export/generate
router.post('/generate', async (req, res) => {
    try {
        const { clipId, preset } = req.body;
        if (!clipId || !preset)
            return res.status(400).json({ error: 'clipId and preset required' });
        if (!ffmpeg_presets_1.FFMPEG_PRESETS[preset])
            return res.status(400).json({ error: 'Unsupported preset' });
        // Verify clip belongs to user (basic check)
        const clip = await db_1.prisma.clip.findUnique({ where: { id: clipId }, include: { upload: true } });
        if (!clip)
            return res.status(404).json({ error: 'Clip not found' });
        if (req.user && clip.upload.userId && clip.upload.userId !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        // Create ExportJob record (queued)
        const exportJob = await db_1.prisma.exportJob.create({
            data: {
                clipId,
                preset,
                status: 'queued',
            },
        });
        await exportQueue.add('export', { clipId, preset });
        return res.status(202).json({ jobId: exportJob.id });
    }
    catch (err) {
        console.error('[export.generate]', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /api/export/status/:clipId
router.get('/status/:clipId', async (req, res) => {
    try {
        const clipId = req.params.clipId;
        const jobs = await db_1.prisma.exportJob.findMany({ where: { clipId }, orderBy: { createdAt: 'desc' } });
        return res.json({ jobs });
    }
    catch (err) {
        console.error('[export.status]', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
