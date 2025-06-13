"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captionJob = captionJob;
const bullmq_1 = require("bullmq");
const db_1 = require("@xclips/db");
const openai_1 = __importDefault(require("openai"));
const ioredis_1 = __importDefault(require("ioredis"));
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function captionJob(job) {
    const { clipId, platform } = job.data;
    const clip = await db_1.prisma.clip.findUnique({ where: { id: clipId }, include: { upload: true } });
    if (!clip)
        throw new Error('Clip not found');
    // Fetch transcript
    const transcript = await db_1.prisma.transcript.findFirst({ where: { uploadId: clip.uploadId } });
    if (!transcript)
        throw new Error('Transcript missing');
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
    await db_1.prisma.caption.create({
        data: {
            clipId,
            platform,
            captionText,
            locale: 'en',
        },
    });
    // enqueue export job immediately for default 9:16 preset
    const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
    const exportQueue = new bullmq_1.Queue('export', { connection });
    await exportQueue.add('export', { clipId, preset: '9:16' });
}
