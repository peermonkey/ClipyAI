"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clipJob = clipJob;
const db_1 = require("@xclips/db");
const s3_1 = require("@xclips/config/s3");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const client_s3_1 = require("@aws-sdk/client-s3");
const child_process_1 = require("child_process");
const crypto_1 = __importDefault(require("crypto"));
const openai_1 = __importDefault(require("openai"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
async function clipJob(job) {
    const { uploadId } = job.data;
    const upload = await db_1.prisma.upload.findUnique({ where: { id: uploadId } });
    if (!upload)
        throw new Error('Upload not found');
    // Fetch transcript text
    const transcript = await db_1.prisma.transcript.findFirst({ where: { uploadId } });
    if (!transcript)
        throw new Error('Transcript missing');
    // Call GPT to get highlight segments (stub: single 0-60 sec)
    let highlights = [];
    try {
        const prompt = `Identify the top 3 highlight moments (start, end in seconds) in the following transcript:\n${await fetch(transcript.textUrl).then(r => r.text())}`;
        const resp = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant extracting timestamps.' },
                { role: 'user', content: prompt },
            ],
        });
        const content = resp.choices[0].message.content || '';
        // very naive parse, expecting lines "start-end"
        highlights = content
            .split(/\n+/)
            .map((l) => l.trim())
            .filter(Boolean)
            .map((l) => {
            const [s, e] = l.split(/[-–]/).map((n) => parseInt(n.trim(), 10));
            return { start: s || 0, end: e || Math.min(60, upload.duration || 60) };
        });
    }
    catch (err) {
        console.warn('GPT highlight detection failed, defaulting to first 60s');
    }
    if (!highlights.length)
        highlights.push({ start: 0, end: Math.min(60, upload.duration || 60) });
    // Local download path assumption (same as transcribe)
    const localOriginal = path_1.default.join('/tmp', path_1.default.basename(uploadId));
    // TODO: download original video from S3; skipping in demo.
    for (const { start, end } of highlights) {
        const clipId = crypto_1.default.randomUUID();
        const clipFile = `/tmp/${clipId}.mp4`;
        const thumbnailFile = `/tmp/${clipId}.jpg`;
        // FFmpeg slicing
        await new Promise((resolve, reject) => {
            const ff = (0, child_process_1.spawn)(ffmpeg_static_1.default || 'ffmpeg', [
                '-y',
                '-ss', String(start),
                '-to', String(end),
                '-i', localOriginal,
                '-c:v', 'libx264',
                '-c:a', 'aac',
                clipFile,
            ]);
            ff.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`ffmpeg exit ${code}`))));
        });
        // Thumbnail
        await new Promise((resolve, reject) => {
            const ff = (0, child_process_1.spawn)(ffmpeg_static_1.default || 'ffmpeg', [
                '-y',
                '-i', clipFile,
                '-ss', '00:00:00.500',
                '-vframes', '1',
                thumbnailFile,
            ]);
            ff.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`thumb ffmpeg exit ${code}`))));
        });
        // Upload to S3
        const clipKey = `${upload.userId || 'anon'}/clips/${clipId}.mp4`;
        const thumbKey = `${upload.userId || 'anon'}/clips/${clipId}.jpg`;
        const clipBuffer = await promises_1.default.readFile(clipFile);
        const thumbBuffer = await promises_1.default.readFile(thumbnailFile);
        await Promise.all([
            s3_1.s3.send(new client_s3_1.PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: clipKey, Body: clipBuffer, ContentType: 'video/mp4' })),
            s3_1.s3.send(new client_s3_1.PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: thumbKey, Body: thumbBuffer, ContentType: 'image/jpeg' })),
        ]);
        await db_1.prisma.clip.create({
            data: {
                id: clipId,
                uploadId,
                start,
                end,
                url: `s3://${process.env.S3_BUCKET}/${clipKey}`,
                thumbUrl: `s3://${process.env.S3_BUCKET}/${thumbKey}`,
                status: 'complete',
            },
        });
        // enqueue caption job
        const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
        const captionQueue = new bullmq_1.Queue('caption', { connection });
        await captionQueue.add('caption', { clipId, platform: 'tiktok' });
        // cleanup
        await promises_1.default.rm(clipFile, { force: true });
        await promises_1.default.rm(thumbnailFile, { force: true });
    }
    // Optionally publish websocket event via Redis pub
}
