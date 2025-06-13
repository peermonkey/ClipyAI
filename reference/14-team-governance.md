# 14 – Team & Governance

_Last updated: 2025-06-12_

## 14.1 Org Chart (Startup Stage)
Role | Count | Responsibilities
---- | ----- | ---------------
CEO / PM | 1 | Vision, roadmap, hiring
CTO | 1 | Architecture, SRE
Head of Product Design | 1 | UX, design system
Frontend Engineers | 3 | Next.js, RN, Storybook
Backend Engineers | 3 | tRPC, Workers, DB
ML Engineer | 1 | Whisper, GPT prompt tuning
DevOps | 1 | Sevalla, CI/CD, Terraform
Marketing / Growth | 1 | Content, campaigns
Support & Success | 1 | Tickets, onboarding

## 14.2 Decision Log (ADRs)
Folder: `docs/adr/` – numbered markdown files capturing context, decision, consequences. Use `npx adr new "title"` script.

## 14.3 Meeting Cadence
Type | When | Owner | Agenda Template
---- | ---- | ----- | ---------------
Sprint Planning | Mon 10:00 UTC | PM | Review backlog, point stories
Daily Standup | Async Slack thread | TLs | Blockers + progress
Design Crit | Wed 14:00 UTC | Design Lead | Figma walkthrough
SRE Review | Fri 11:00 UTC | DevOps | SLOs, incidents
Retro | Fri 15:00 UTC | PM | Start/Stop/Continue

## 14.4 Branch & Release Policy
1. Feature branches → PR → review by 1 peer + CI pass.  
2. Merge into `dev`; staging env auto-deploy.  
3. Weekly release to `main` if CI green and QA sign-off.

## 14.5 Code Ownership
Path | Owner | Reviewers
---- | ----- | ---------
`packages/ui/` | Frontend Team | Design Lead
`services/worker/` | Backend Team | ML Eng
`infra/terraform/` | DevOps | CTO

## 14.6 Onboarding Checklist (Engineer)
- [ ] GitHub access
- [ ] Sevalla dashboard invite
- [ ] 1Password vault share
- [ ] Run `pnpm dev` locally
- [ ] First PR within 5 days

## 14.7 Performance Reviews
Bi-annual 360° review using CultureAmp; goals set in Lattice.

---

> **Bus factor rule:** Each critical area must have ≥2 engineers able to maintain it. 