"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const s3_1 = require("@xclips/config/s3");
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const db_1 = require("@xclips/db");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
const transcribeQueue = new bullmq_1.Queue('transcribe', { connection });
router.post('/request', async (req, res) => {
    const { fileName, contentType, duration } = req.body;
    const key = `${req.user?.id ?? 'anon'}/${Date.now()}-${crypto_1.default.randomUUID()}-${fileName}`;
    const url = await (0, s3_1.getUploadUrl)(key, contentType, 600);
    // pre-create upload row with status 'requested'
    await db_1.prisma.upload.create({
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
    const { key, size, duration } = req.body;
    await db_1.prisma.upload.update({ where: { id: key }, data: { status: 'uploaded', sizeMb: size } });
    await transcribeQueue.add('transcribe', { key, duration });
    return res.status(200).json({ ok: true });
});
exports.default = router;
