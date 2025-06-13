"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
exports.metricsMiddleware = metricsMiddleware;
exports.exposeMetricsRoute = exposeMetricsRoute;
const prom_client_1 = __importDefault(require("prom-client"));
// Create a Registry which registers the metrics
exports.register = new prom_client_1.default.Registry();
// Add default metrics (CPU, memory, event loop)
prom_client_1.default.collectDefaultMetrics({ register: exports.register });
// Histogram for HTTP latency
const httpRequestDuration = new prom_client_1.default.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.025, 0.05, 0.1, 0.3, 1, 3, 5, 10],
});
exports.register.registerMetric(httpRequestDuration);
function metricsMiddleware(req, res, next) {
    const start = process.hrtime.bigint();
    res.on('finish', () => {
        const delta = Number(process.hrtime.bigint() - start) / 1e9; // seconds
        httpRequestDuration
            .labels(req.method, req.route?.path || req.path, String(res.statusCode))
            .observe(delta);
    });
    next();
}
function exposeMetricsRoute(app, path = '/metrics') {
    app.get(path, async (_, res) => {
        res.set('Content-Type', exports.register.contentType);
        res.end(await exports.register.metrics());
    });
}
