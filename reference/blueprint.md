***AI Repurposing Platform – XClips.ai (MASTER BLUEPRINT v2)***

> This document is the canonical reference for engineers, designers, product managers, and DevOps working on XClips.ai.  Keep it up-to-date with every major architectural or business change.

----------------------------------------------------------------

TABLE OF CONTENTS  
0. Executive Summary  
1. Business & Economics  
2. Personas & Journeys  
3. System Architecture  
4. Data Model  
5. Workflow Sequences  
6. Repository Structure  
7. API Contract  
8. Deployment on Sevalla  
9. Roadmap  
10. KPI Targets  
11. Design-System Spec  
12. Micro-Interactions & A11y  
13. Observability & SRE  
14. Security & Compliance  
15. Risk Matrix  
16. Team & Governance

----------------------------------------------------------------

## 0. Executive Summary
XClips.ai turns long-form video/audio into short, social-ready clips with captions & hashtags in minutes.  Built for independent creators and agencies, the app marries the polish of YouTube Studio with GPT-4 automation.

----------------------------------------------------------------

## 1. Business & Economics
| Plan   | Price/mo | Minutes/mo | 4K Export | Seats | Priority | API | COGS/mo* | Gross % |
|--------|----------|-----------:|-----------|-------|----------|-----|----------|---------|
| Free   | $0       | 60         | ✖         | 1     | ✖        | ✖  | $0.42   | —       |
| Solo   | $15      | 150        | 1080p     | 1     | ✖        | ✖  | $1.05   | 93 %    |
| Pro    | $30      | 500        | 4K        | 1     | ✓        | ✖  | $3.50   | 88 %    |
| Agency | $99      | 2 000      | 4K        | 5     | ✓        | ✓  | $14.00  | 86 %    |

*COGS = minutes × $0.007 (Whisper+GPT+infra), assuming 70 % of allowance consumed.

Revenue Targets:  
• 5 000 Pro users → $150 k MRR  
• 200 Agency seats → $19.8 k MRR  
• Break-even headcount ≤ 14 FTEs.

----------------------------------------------------------------

## 2. Personas & Key Journeys
1. Indie YouTuber – Quickly produce Shorts to grow subs.  
2. Educator/Coach – Converts webinars into bite-size lessons.  
3. Podcaster – Extracts quotable moments & audiograms.  
4. Agency Editor – Batch processes client footage, uses API.

### Golden Path
Landing → Sign-Up → Onboarding wizard (choose persona) → Upload → Processing → Edit Clip → Export → Share (TikTok) → Return to Dashboard.

### Edge Cases
• Upload cancellation  
• Subtitle mismatch → manual edit  
• Credit overage → upgrade modal  
• Worker failure → automatic retry (3× exponential back-off).

----------------------------------------------------------------

## 3. System Architecture (High-Level)
```mermaid
flowchart RL
  subgraph Client
    FE[Next.js 14 (JavaScript)]
    Mobile[React-Native Shell]
  end
  subgraph Edge
    Edge(Edge Functions / ISR)
  end
  subgraph Sevalla
    API[API-Gateway\n(Express)]
    Auth[NextAuth]
    Queue[(Redis – BullMQ)]
    Worker[AI Worker Pool\n(FFmpeg + Python Whisper)]
    Billing[Stripe Webhooks]
    DB[(Postgres 15)]
    Obj[S3 Object Store]
    CDN[(CloudFront – Signed)]
    Logs[(Vector → Loki)]
  end
  OpenAI[[GPT-4 & Whisper]]
  Stripe[[Stripe]]

  FE <--> Auth
  FE <--> API
  FE -- WS/SSE --> Queue
  API --> Queue
  Queue --> Worker
  Worker --> Obj
  Worker --> DB
  API --> DB
  Auth --> DB
  Billing --> DB
  Billing --> Stripe
  Worker --> OpenAI
  Obj --> CDN
  Logs -.-> Sentry
```

----------------------------------------------------------------

## 4. Data Model (Normalized)
```text
users           (id pk, email, pass_hash, plan, credits, created_at, avatar_url)
auth_providers  (id pk, user_id fk, provider, provider_id)
uploads         (id pk, user_id fk, src_url, duration, size_mb, status, created_at)
transcripts     (id pk, upload_id fk, language, text_url, vtt_url, words)
clips           (id pk, upload_id fk, start, end, url, thumb_url, status)
captions        (id pk, clip_id fk, platform, caption_text, locale)
payments        (id pk, user_id fk, stripe_id, minutes, amount, currency, created_at)
webhooks        (id pk, endpoint, status_code, payload, created_at)
logs            (id pk, level, msg, meta, created_at)
```
Indices:  
• `uploads_user_id_idx`  
• `clips_upload_id_idx`  
• `payments_user_id_idx`

----------------------------------------------------------------

## 5. Workflow Sequences
(See previous v1 diagrams for detail)  
Additional Failure Path: On Whisper timeout (>15 min) job enters `errored` queue; user notified with clickable "Retry" and incident logged to Sentry.

----------------------------------------------------------------

## 6. Repository Structure (Turborepo)
```text
.
├── apps/
│   ├── web/          # Next.js 14
│   └── api/          # Express API server
├── services/
│   ├── auth/
│   ├── worker/
│   ├── billing/
│   └── admin/
├── packages/
│   ├── ui/           # Component library (Storybook)
│   ├── config/       # dotenv schema and shared utils
│   └── eslint-config/
├── infra/
│   ├── terraform/
│   └── monitoring/
├── nixpacks.toml
├── turbo.json
└── README.md
```

----------------------------------------------------------------

## 7. API Contract (excerpt)
```js
// routes/upload.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/request', auth, async (req, res) => {
  const { fileName, size, duration } = req.body;
  const jobId = await queueUpload({
    userId: req.user.id,
    fileName,
    size,
    duration,
  });
  return res.status(202).json({ jobId });
});

router.post('/complete', auth, async (req, res) => {
  const { jobId } = req.body;
  await markUploadComplete(jobId);
  return res.status(200).json({ ok: true });
});

module.exports = router;
```

----------------------------------------------------------------

## 8. Deployment on Sevalla
1. Connect GitHub repo; auto-deploy `main`.  
2. In Sevalla dashboard create service per directory with "Nixpacks (Node)".  
3. Add-on provisioning:
   - Postgres 15 w/ automated daily backups  
   - Redis 7 – 1 GB RAM  
   - Object Storage "clips-bucket"  
   - Logging Stack (Vector→Loki)  
4. Secrets: OPENAI_API_KEY, STRIPE_SECRET_KEY, JWT_SECRET, DATABASE_URL, REDIS_URL, S3_*.
5. Health checks: `/api/healthz` & `/worker/healthz` (respond 200 OK).
6. Horizontal scaling: enable auto-scale worker 0–4 replicas on `bull_queue_lag > 50`.

----------------------------------------------------------------

## 9. Roadmap (8-Week Beta) – unchanged

----------------------------------------------------------------

## 10. KPI Targets – unchanged

----------------------------------------------------------------

## 11. Design-System Spec
• **Tokens** stored in `tailwind.config.js` and exported to CSS vars.  
• **Naming** follows Figma "8-pt grid" with semantic color tokens: `primary-neon`, `surface-matte`, `text-muted`.  
• **Components**: Button (sizes sm/md/lg, variants primary/ghost), Card (elevation-glass, elevation-flat), Modal (Radix Dialog), Tooltip, TimelineScrubber (custom).  
• **Motion**: Framer Motion; default ease `cubic-bezier(0.4, 0, 0.2, 1)`, duration 0.25 s.

----------------------------------------------------------------

## 12. Micro-Interactions & A11y
• All focusable elements show 2 px outline (#A3E635 at 70 % opacity).  
• High-contrast mode toggle.  
• `prefers-reduced-motion` respected → disables glow pulses.  
• Live-region announcements for processing progress every 10 %.  
• Keyboard map: `Space` play/pause, `←/→` seek ±2 s, `S` split clip.

----------------------------------------------------------------

## 13. Observability & SRE
• Distributed tracing via OpenTelemetry; spans exported to Honeycomb.  
• Error budget 99.5 % uptime.  
• SLO dashboards (Grafana) for queue latency, 95th pTile processing time, API p95 < 300 ms.  
• Incident response playbook in `docs/ops/`.  

----------------------------------------------------------------

## 14. Security & Compliance
• OWASP-aligned threat model in `docs/security/`.  
• End-to-end TLS (forced HTTPS).  
• JWT signed w/ HS512; rotation every 30 days.  
• Stripe PCI handled by redirect; no card details touch our servers.  
• GDPR: Right-to-be-forgotten endpoint schedules S3 object purge + DB delete.  
• Backups encrypted at rest (AES-256-GCM).

----------------------------------------------------------------

## 15. Risk Matrix
| Risk                         | Likelihood | Impact | Mitigation |
|------------------------------|-----------:|-------:|-----------|
| OpenAI pricing surge         | Med        | High   | Allow BYO API key + support Claude |
| S3 egress cost spike         | Low        | Med    | Serve HLS via CloudFront signed URLs |
| Redis outage                 | Med        | Med    | Multi-AZ Redis, fall back to RDB snapshot |
| GDPR deletion non-compliance | Low        | High   | Automated purge job, auditor-visible logs |

----------------------------------------------------------------

## 16. Team & Governance
• **Decision log**: Every architectural choice recorded in `docs/adr/*.md`.  
• **Branch strategy**: `main` (prod), `dev`, feature branches → PR → CI.  
• **Codeowners**: UI package → Front-end team; Worker → ML infra; Billing → DevOps.  
• **Weekly sync** Tues 10 AM GMT; retro Friday 3 PM.

----------------------------------------------------------------

© 2025 XClips.ai – Internal Use Only 