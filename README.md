# XClips.ai Monorepo

This repository contains the full source code for the XClips.ai platform, including web front-end, API gateway, background workers, and shared packages.  It follows the architecture and blueprint documented in `reference/`.

## Repository Structure

```text
.
├── apps/
│   ├── web/          # Next.js front-end
│   └── api/          # Express API server
├── services/
│   ├── auth/         # NextAuth instance
│   ├── worker/       # AI/FFmpeg processing workers
│   ├── billing/      # Stripe webhook handler
│   └── admin/        # Internal tooling UI
├── packages/
│   ├── ui/           # Shared React component library (Storybook)
│   ├── config/       # Dot-env schema & helpers
│   └── eslint-config # Shared ESLint rules
├── infra/            # IaC, monitoring, etc.
└── reference/        # Blueprint & sprint docs (read-only)
```

## Prerequisites

* Node 20+
* pnpm 8+
* Docker (for Postgres/Redis local stack – optional)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start all apps & services in watch mode
pnpm dev

# Runs Storybook for UI package
pnpm --filter packages/ui storybook
```

## CI / CD

GitHub Actions runs lint and build on every PR & commit to `main`.  Successful merges deploy automatically to Sevalla.

---

For detailed engineering guidelines, consult the documents under `reference/`.  Contributions should follow the sprint plan located at `reference/sprints/`. 