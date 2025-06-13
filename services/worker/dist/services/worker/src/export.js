"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportJob = exportJob;
const db_1 = require("@xclips/db");
const s3_1 = require("@xclips/config/s3");
const ffmpeg_presets_1 = require("@xclips/config/ffmpeg-presets");
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const child_process_1 = require("child_process");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
async function exportJob(job) {
    const { clipId, preset } = job.data;
    // Mark job processing or create record
    let dbJob = await db_1.prisma.exportJob.findFirst({ where: { clipId, preset } });
    if (!dbJob) {
        dbJob = await db_1.prisma.exportJob.create({ data: { clipId, preset, status: 'processing' } });
    }
    else {
        await db_1.prisma.exportJob.update({ where: { id: dbJob.id }, data: { status: 'processing' } });
    }
    const clip = await db_1.prisma.clip.findUnique({ where: { id: clipId } });
    if (!clip)
        throw new Error('Clip missing');
    const presetConf = ffmpeg_presets_1.FFMPEG_PRESETS[preset];
    if (!presetConf)
        throw new Error('Preset not supported');
    const localClip = path_1.default.join('/tmp', path_1.default.basename(clip.url));
    // TODO download clip from S3
    const outFile = `/tmp/${clipId}-${preset}.mp4`;
    // Build ffmpeg args
    const filters = [
        ...presetConf.filters,
        // Burn captions overlay if file exists (assume srt path next to clip)
    ];
    const args = [
        '-y',
        '-i', localClip,
        '-vf', filters.join(','),
        '-s', `${presetConf.width}x${presetConf.height}`,
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-movflags', '+faststart',
        outFile,
    ];
    await new Promise((res, rej) => {
        const ff = (0, child_process_1.spawn)(ffmpeg_static_1.default || 'ffmpeg', args);
        ff.on('exit', (code) => (code === 0 ? res(true) : rej(new Error(`export ffmpeg exit ${code}`))));
    });
    const outKey = `${clipId}/exports/${preset}.mp4`;
    const buffer = await promises_1.default.readFile(outFile);
    await s3_1.s3.send(new client_s3_1.PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: outKey, Body: buffer, ContentType: 'video/mp4' }));
    await db_1.prisma.exportJob.update({ where: { id: dbJob.id }, data: { status: 'complete', url: `s3://${process.env.S3_BUCKET}/${outKey}` } });
    await promises_1.default.rm(outFile, { force: true });
}
