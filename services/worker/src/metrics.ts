import promClient from 'prom-client';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import http from 'http';

export function startWorkerMetricsServer(port = 9102) {
  const register = new promClient.Registry();
  promClient.collectDefaultMetrics({ register });

  const jobDuration = new promClient.Histogram({
    name: 'job_duration_seconds',
    help: 'Duration of worker jobs',
    labelNames: ['queue', 'name', 'status'],
    buckets: [0.1, 0.5, 1, 3, 6, 10, 30, 60],
  });
  register.registerMetric(jobDuration);

  // Exported helper to observe durations
  function observeJob(queue: string, name: string, status: string, seconds: number) {
    jobDuration.labels(queue, name, status).observe(seconds);
  }

  // Gauge for waiting jobs per queue
  const waitingGauge = new promClient.Gauge({
    name: 'queue_waiting_jobs',
    help: 'Number of waiting jobs',
    labelNames: ['queue'],
  });
  register.registerMetric(waitingGauge);

  const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  const queues = ['transcribe', 'clip', 'caption', 'export'];

  async function updateWaiting() {
    await Promise.all(
      queues.map(async (q) => {
        const queue = new Queue(q, { connection });
        const waiting = await queue.getWaitingCount();
        waitingGauge.labels(q).set(waiting);
      }),
    );
  }
  setInterval(updateWaiting, 5000);
  updateWaiting().catch(() => {});

  // HTTP server
  http
    .createServer(async (_req, res) => {
      if (_req.url === '/metrics') {
        res.setHeader('Content-Type', register.contentType);
        res.end(await register.metrics());
      } else {
        res.statusCode = 404;
        res.end();
      }
    })
    .listen(port, () => console.log(`[metrics] Worker metrics listening on ${port}`));

  return { observeJob };
} 