"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWorkerMetricsServer = startWorkerMetricsServer;
const prom_client_1 = __importDefault(require("prom-client"));
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const http_1 = __importDefault(require("http"));
function startWorkerMetricsServer(port = 9102) {
    const register = new prom_client_1.default.Registry();
    prom_client_1.default.collectDefaultMetrics({ register });
    const jobDuration = new prom_client_1.default.Histogram({
        name: 'job_duration_seconds',
        help: 'Duration of worker jobs',
        labelNames: ['queue', 'name', 'status'],
        buckets: [0.1, 0.5, 1, 3, 6, 10, 30, 60],
    });
    register.registerMetric(jobDuration);
    // Exported helper to observe durations
    function observeJob(queue, name, status, seconds) {
        jobDuration.labels(queue, name, status).observe(seconds);
    }
    // Gauge for waiting jobs per queue
    const waitingGauge = new prom_client_1.default.Gauge({
        name: 'queue_waiting_jobs',
        help: 'Number of waiting jobs',
        labelNames: ['queue'],
    });
    register.registerMetric(waitingGauge);
    const connection = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
    const queues = ['transcribe', 'clip', 'caption', 'export'];
    async function updateWaiting() {
        await Promise.all(queues.map(async (q) => {
            const queue = new bullmq_1.Queue(q, { connection });
            const waiting = await queue.getWaitingCount();
            waitingGauge.labels(q).set(waiting);
        }));
    }
    setInterval(updateWaiting, 5000);
    updateWaiting().catch(() => { });
    // HTTP server
    http_1.default
        .createServer(async (_req, res) => {
        if (_req.url === '/metrics') {
            res.setHeader('Content-Type', register.contentType);
            res.end(await register.metrics());
        }
        else {
            res.statusCode = 404;
            res.end();
        }
    })
        .listen(port, () => console.log(`[metrics] Worker metrics listening on ${port}`));
    return { observeJob };
}
