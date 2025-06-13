"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribeJob = transcribeJob;
const bullmq_1 = require("bullmq");
const db_1 = require("@xclips/db");
const s3_1 = require("@xclips/config/s3");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const child_process_1 = require("child_process");
const ioredis_1 = __importDefault(require("ioredis"));
async function transcribeJob(job) {
    const { key } = job.data;
    // mark upload processing
    await db_1.prisma.upload.update({ where: { id: key }, data: { status: 'processing' } }).catch(() => { });
    // Temporary local file path (uses AWS SDK streaming in real impl)
    const localFile = path_1.default.join('/tmp', path_1.default.basename(key));
    try {
        // Download from S3 (simplified by presigned URL via http fetch)
        // TODO: stream copy; placeholder assume worker has shared s3fs mount
        // Call Whisper via Python CLI (placeholder)
        const transcriptPath = `${localFile}.txt`;
        const whisper = (0, child_process_1.spawn)('python', ['-m', 'whisper', localFile, '--model', 'base', '--output', transcriptPath]);
        await new Promise((resolve, reject) => {
            whisper.on('exit', (code) => (code === 0 ? resolve(true) : reject(new Error(`Whisper exit ${code}`))));
        });
        // read transcript text & count tokens (simplified word count *1.33)
        const transcriptText = await promises_1.default.readFile(transcriptPath, 'utf-8');
        const tokens = Math.ceil(transcriptText.split(/\s+/).length * 1.33);
        const minutes = Math.ceil(tokens / 7);
        // upload transcript back to S3
        const transcriptKey = `${key}.txt`;
        await s3_1.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: transcriptKey,
            Body: transcriptText,
            ContentType: 'text/plain',
        }));
        // persist DB
        await db_1.prisma.transcript.create({
            data: {
                uploadId: key,
                language: 'en',
                textUrl: `s3://${process.env.S3_BUCKET}/${transcriptKey}`,
                words: transcriptText.split(/\s+/).length,
            },
        });
        // debit minutes from user
        const upload = await db_1.prisma.upload.findUnique({ where: { id: key }, include: { user: true } });
        if (upload?.userId) {
            await db_1.prisma.user.update({
                where: { id: upload.userId },
                data: { credits: { decrement: minutes } },
            });
            await db_1.prisma.usageToken.create({ data: { userId: upload.userId, tokens, minutes } });
        }
        // mark done
        await db_1.prisma.upload.update({ where: { id: key }, data: { status: 'complete' } });
        // enqueue clipping
        const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
        const clipQueue = new bullmq_1.Queue('clip', { connection });
        await clipQueue.add('clip', { uploadId: key });
        return true;
    }
    catch (err) {
        console.error('Transcribe job failed', err);
        await db_1.prisma.upload.update({ where: { id: key }, data: { status: 'errored' } }).catch(() => { });
        throw err;
    }
    finally {
        // cleanup
        await promises_1.default.rm(localFile, { force: true }).catch(() => { });
    }
}
