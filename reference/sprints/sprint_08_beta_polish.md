# Sprint 08 – Mobile Polish & Beta Launch (Week 10)

## Goal
Ship a delightfully smooth, mobile-friendly beta to first 100 creators and gather feedback.

## Key Outcomes
* All core flows usable on mobile viewport ≤ 414 px
* Keyboard shortcuts and cmd palette boost power-user speed
* Playwright suite passes in CI with >90% coverage of critical paths
* NPS survey embedded; target score ≥ 8

## Dependencies
Analytics dashboards live (Sprint 07).

## Team & Hours
Full-stack (2) • QA (1) • Marketing (0.5)  
Estimate: 30 SP.

## Acceptance Criteria
- [ ] Closed beta invite email CTR ≥ 30%.  
- [ ] Playwright tests green on first pipeline run post-merge.  
- [ ] Mobile score Lighthouse ≥ 90 performance.

- [ ] Implement responsive mobile layouts for Dashboard, Upload, Clips  
  Why: 50% users on mobile.  
  Inputs→Outputs: Tailwind breakpoints, mobile nav bar.
- [ ] Add keyboard shortcuts & command palette  
  Why: Power-user speed; wow factor.  
  Inputs→Outputs: cmdk library integration, shortcut docs.
- [ ] QA suite with Playwright covering critical flows  
  Why: Prevent regressions before beta.  
  Inputs→Outputs: e2e tests in apps/web.
- [ ] Feature flag "beta_access" using env/toggle  
  Why: Gate features to invited users.  
  Inputs→Outputs: packages/config feature flag util.
- [ ] Integrate NPS survey pop-up  
  Why: Measure satisfaction in closed beta.  
  Inputs→Outputs: React component, results sent to PostHog.
- [ ] Launch closed beta email campaign  
  Why: Onboard first 100 users.  
  Inputs→Outputs: MailerLite template + invite script.

## Key File Targets
* `apps/web/app/*` responsive CSS tweaks
* `packages/ui/components/CommandPalette.tsx`
* `tests/e2e/*.spec.ts` (Playwright)
* `packages/config/featureFlags.ts`
* `apps/web/app/components/NPSModal.tsx` 