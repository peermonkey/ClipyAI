"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const upload_1 = __importDefault(require("./router/upload"));
const clip_1 = __importDefault(require("./router/clip"));
const export_1 = __importDefault(require("./router/export"));
const credits_1 = __importDefault(require("./router/credits"));
const webhook_1 = __importDefault(require("./router/webhook"));
const body_parser_1 = __importDefault(require("body-parser"));
const metrics_1 = require("./metrics");
const tracing_1 = require("@xclips/config/tracing");
// Load env vars
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/healthz', (_req, res) => res.status(200).json({ ok: true }));
app.use('/api', auth_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/clip', clip_1.default);
app.use('/api/export', export_1.default);
app.use('/api/credits', credits_1.default);
// Stripe requires raw body for signature validation
app.use('/api/webhook/stripe', body_parser_1.default.raw({ type: 'application/json' }));
app.use('/api/webhook/razorpay', body_parser_1.default.json());
app.use('/api/webhook', webhook_1.default);
app.use(metrics_1.metricsMiddleware);
(0, metrics_1.exposeMetricsRoute)(app);
(0, tracing_1.initTracing)('api');
app.listen(PORT, () => console.log(`API server listening on http://localhost:${PORT}`));
