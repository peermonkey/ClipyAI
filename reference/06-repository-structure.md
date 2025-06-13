# 06 – Repository Structure

_Last updated: 2025-06-12_

This document is the authoritative map of the Turborepo monorepo used by XClips.ai.

## 6.1 High-Level Tree
```text
.
├── apps/
│   ├── web/            # Next.js 14 (frontend)
│   └── api/            # Express API server
├── services/
│   ├── auth/           # NextAuth auth server
│   ├── worker/         # Job processors (BullMQ)
│   ├── billing/        # Stripe webhook listener
│   └── admin/          # Owner dashboard (React)
├── packages/
│   ├── ui/             # Design-system components (Storybook)
│   ├── config/         # dotenv loader & shared utils
│   ├── eslint-config/  # Shared ESLint rules
│   └── package.json        # Workspace-level dependencies
├── infra/
│   ├── terraform/      # IaC modules (db, redis, s3)
│   └── monitoring/     # Grafana dashboards, alert rules
├── scripts/            # One-off scripts (db seed, migration)
├── docs/               # ADRs, security docs, runbooks
├── nixpacks.toml       # Build phases for Sevalla
├── turbo.json          # Turborepo pipeline
└── utils/             # Shared helper scripts
└── package.json        # Workspace-level dependencies
```

## 6.2 Workspaces & Build Graph
`turbo.json` excerpts:
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {},
    "test": {},
    "dev": {
      "cache": false
    }
  }
}
```
Dependencies flow **outwards**: packages → services → apps.

## 6.3 Environment Variables
Variable | Scope | Description
-------- | ----- | -----------
`DATABASE_URL` | all | Postgres connection
`REDIS_URL` | API, worker | Redis queue
`S3_ENDPOINT` / `S3_KEY` | API, worker | Object store creds
`OPENAI_API_KEY` | worker | GPT & Whisper
`STRIPE_SECRET_KEY` | billing | Secret key
`NEXTAUTH_SECRET` | auth, web | JWT secret

Local env files live in `/apps/*/.env.local` (git-ignored). Production secrets managed in Sevalla dashboard.

## 6.4 Code Quality
Tool | Location | Command
---- | -------- | -------
ESLint | root (`eslint-config`) | `pnpm lint`
Prettier | root | `pnpm format`
JSDoc | optional | code hints enabled
Jest | per package | `pnpm test`
Playwright | `apps/web` | e2e tests on CI

## 6.5 Git Strategy
Branch | Purpose
------ | -------
`main` | Production → auto-deployed on Sevalla
`dev` | Integration env
`feature/*` | Short-lived branches → PR → squash merge to `dev`
`hotfix/*` | Critical prod patches → PR → merge → tag

## 6.6 Automated Releases
CI uses **Changesets**: each PR includes a changeset; weekly release notes generated and `pnpm changeset version` bumps versions across workspace packages.

---

> **Rule:** No package imports across layers (e.g., apps importing from services) – keep a clean dependency direction. 