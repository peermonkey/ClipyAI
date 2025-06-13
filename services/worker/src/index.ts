import { Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { transcribeJob } from './transcribe';
import { clipJob } from './clip';
import { captionJob } from './caption';
import { exportJob } from './export';
import { scheduleCreditReset } from './cronReset';
import { startWorkerMetricsServer } from './metrics';
import { initTracing } from '@xclips/config/tracing';

dotenv.config();

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const transcribeWorker = new Worker('transcribe', transcribeJob, { connection });
const clipWorker = new Worker('clip', clipJob, { connection });
const captionWorker = new Worker('caption', captionJob, { connection });
const exportWorker = new Worker('export', exportJob, { connection });

const transcribeEvents = new QueueEvents('transcribe', { connection });
const clipEvents = new QueueEvents('clip', { connection });
const captionEvents = new QueueEvents('caption', { connection });
const exportEvents = new QueueEvents('export', { connection });

transcribeEvents.on('completed', ({ jobId }) => console.log(`Transcribe job ${jobId} completed`));
transcribeEvents.on('failed', ({ jobId, failedReason }) => console.error(`Transcribe job ${jobId} failed: ${failedReason}`));

clipEvents.on('completed', ({ jobId }) => console.log(`Clip job ${jobId} completed`));
clipEvents.on('failed', ({ jobId, failedReason }) => console.error(`Clip job ${jobId} failed: ${failedReason}`));

captionEvents.on('completed', ({ jobId }) => console.log(`Caption job ${jobId} done`));
captionEvents.on('failed', ({ jobId, failedReason }) => console.error(`Caption job ${jobId} failed: ${failedReason}`));

exportEvents.on('completed', ({ jobId }) => console.log(`Export job ${jobId} done`));
exportEvents.on('failed', ({ jobId, failedReason }) => console.error(`Export job ${jobId} failed: ${failedReason}`));

scheduleCreditReset();
startWorkerMetricsServer();

initTracing('worker');

process.on('SIGINT', async () => {
  await transcribeWorker.close();
  await clipWorker.close();
  await captionWorker.close();
  await exportWorker.close();
  await transcribeEvents.close();
  await clipEvents.close();
  await captionEvents.close();
  await exportEvents.close();
  connection.disconnect();
  process.exit(0);
}); 