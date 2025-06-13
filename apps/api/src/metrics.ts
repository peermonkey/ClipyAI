import promClient from 'prom-client';
import type { Request, Response, NextFunction, Express } from 'express';

// Create a Registry which registers the metrics
export const register = new promClient.Registry();
// Add default metrics (CPU, memory, event loop)
promClient.collectDefaultMetrics({ register });

// Histogram for HTTP latency
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.025, 0.05, 0.1, 0.3, 1, 3, 5, 10],
});
register.registerMetric(httpRequestDuration);

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const delta = Number(process.hrtime.bigint() - start) / 1e9; // seconds
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, String(res.statusCode))
      .observe(delta);
  });
  next();
}

export function exposeMetricsRoute(app: Express, path = '/metrics') {
  app.get(path, async (_, res: Response) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });
} 