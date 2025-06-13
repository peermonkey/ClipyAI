# 08 – Deployment & DevOps

_Last updated: 2025-06-12_

## 8.1 Overview
All services are deployed to **Sevalla** using Nixpacks builds. GitHub's `main` branch is the single source of deployment truth.

## 8.2 Sevalla Configuration
Service | Directory | Build Command | Start Command | Scale Range
------- | --------- | ------------- | ------------- | -----------
Web | `apps/web` | `pnpm turbo run build --filter=web` | `pnpm start` | 1–4
API | `apps/api` | `pnpm turbo run build --filter=api` | `pnpm start` | 1–6
Auth | `services/auth` | `pnpm build` | `node dist/index.js` | 2
Worker | `services/worker` | `pnpm build` | `node dist/index.js` | 0–8 (auto)
Billing | `services/billing` | `pnpm build` | `node dist/index.js` | 1

## 8.3 `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["nodejs", "ffmpeg", "postgresql"]

[phases.build]
cmds = ["pnpm i --frozen-lockfile", "pnpm turbo run build --filter=..."]

[phases.start]
cmds = ["pnpm turbo run start --filter=apps/web..."]
```

## 8.4 Continuous Integration
Workflow: `.github/workflows/ci.yml`
Steps:
1. Checkout
2. `pnpm install --frozen-lockfile`
3. `pnpm turbo run lint test build`
4. On success, push Docker image (optional) or rely on Sevalla git integration.

## 8.5 Secrets Management
Sevalla secrets group `prod.env` includes:
```
OPENAI_API_KEY
STRIPE_SECRET_KEY
DATABASE_URL
REDIS_URL
S3_ENDPOINT
S3_ACCESS_KEY
S3_SECRET_KEY
NEXTAUTH_SECRET
```
Shared across services; rotated quarterly.

## 8.6 Monitoring & Alerts
Metric | Source | Alert Threshold | Destination
------ | ------ | --------------- | -----------
CPU > 80 % (5m) | Sevalla | scale up | auto
Queue Lag > 50 | BullMQ metrics | Slack #alerts | manual scale review
Error Rate > 2 % | Sentry | PagerDuty sev3 | on-call

## 8.7 Disaster Recovery
• **DB**: Daily snapshot, point-in-time recovery 7 days.  
• **S3**: Cross-region replication + versioning.  
• **Redis**: AOF every 60 s; multi-AZ.

## 8.8 Rollback Procedure
1. Click "Rollback" on Sevalla deployment page → select previous healthy build.
2. Verify health checks pass.
3. Post-mortem recorded in `docs/ops/incidents/`.

---

> **Golden Rule:** Never store secrets in git. Use Sevalla secret manager or local `.env.local` for dev. 