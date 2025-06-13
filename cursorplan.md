# XClips.ai Implementation Plan (cursorplan.md)

## Purpose
This document is the step-by-step master plan for building XClips.ai as a robust, production-ready, blueprint-driven service. It will be followed and updated as the project progresses.

---

## 1. Project Audit & Foundation
- Audit the current codebase for reusable logic, but assume most UI/UX and structure will be rebuilt.
- Ensure monorepo tooling (Turborepo, pnpm, etc.) is correct and up-to-date.
- Standardize linting, formatting, and TypeScript strictness across all packages.

## 2. Design System & UI Foundations
- Implement design tokens in `tailwind.config.js` and export to CSS vars as per blueprint and `09-design-system.md`.
- Build out core UI components (Button, Card, Modal, Tooltip, TimelineScrubber, etc.) in `packages/ui` using the design system.
- Integrate Framer Motion, Radix UI, and accessibility features (focus outlines, keyboard navigation, live regions, etc.).

## 3. Frontend App (Next.js)
- Create a clean, modern app shell with header, main, and footer, following the "Golden Path" and personas.
- Implement all main flows:
  - Landing
  - Sign-Up/Onboarding (persona selection)
  - Dashboard
  - Upload
  - Processing/Progress
  - Edit Clip (with TimelineScrubber, captions, etc.)
  - Export/Share
- Use React context or Zustand for global state (user, uploads, credits, etc.).
- Connect to backend via REST endpoints as per API contract.

## 4. Backend/API
- Ensure all endpoints in the blueprint and `07-api-contract.md` are implemented, robust, and secure.
- Integrate NextAuth for authentication.
- Set up BullMQ for job processing, with retry/failure logic.
- Integrate Stripe webhooks and payment flows.
- Use Prisma/Postgres with the normalized schema from the blueprint and `04-data-model.md`.

## 5. Worker Service
- Implement the worker pool for FFmpeg + Whisper (Python), with OpenAI integration.
- Add robust retry, timeout, and notification logic.

## 6. DevOps & Deployment
- Ensure `nixpacks.toml` is correct for all services.
- Use environment variables as per deployment section.
- Implement `/api/healthz` and `/worker/healthz` endpoints.
- Integrate logging, tracing, and SLO dashboards as per SRE docs.

## 7. Testing & Quality
- Add unit/integration tests for all critical logic.
- Add E2E tests for main user flows (upload, edit, export).
- Perform accessibility audits (automated and manual).

## 8. Documentation
- Maintain a clear README with setup, development, and deployment instructions.
- Add code comments for all non-trivial logic.

## 9. Launch Readiness
- Manual QA walkthrough of all flows.
- Optimize for speed and low resource usage.
- Review for OWASP compliance, GDPR, and other security requirements.

---

**This plan will be updated as the project evolves. All implementation steps will reference the blueprint and supporting documentation in the `reference/` folder.** 