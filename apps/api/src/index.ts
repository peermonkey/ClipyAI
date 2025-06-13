import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import uploadRouter from './router/upload';
import clipRouter from './router/clip';
import exportRouter from './router/export';
import creditsRouter from './router/credits';
import webhookRouter from './router/webhook';
import bodyParser from 'body-parser';
import { metricsMiddleware, exposeMetricsRoute } from './metrics';
import { initTracing } from '@xclips/config/tracing';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/healthz', (_req, res) => res.status(200).json({ ok: true }));

app.use('/api', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/clip', clipRouter);
app.use('/api/export', exportRouter);
app.use('/api/credits', creditsRouter);

// Stripe requires raw body for signature validation
app.use('/api/webhook/stripe', bodyParser.raw({ type: 'application/json' }));
app.use('/api/webhook/razorpay', bodyParser.json());
app.use('/api/webhook', webhookRouter);

app.use(metricsMiddleware);
exposeMetricsRoute(app);

initTracing('api');

app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
