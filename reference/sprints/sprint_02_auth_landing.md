# Sprint 02 – Auth Flow & Landing (Week 2)

## Goal
Deliver secure authentication and a polished marketing landing page to funnel users into the product.

## Key Outcomes
* Users can sign up / log in via Email + Google
* Persona onboarding wizard saves data to DB
* Public landing page scores Lighthouse ≥ 95 performance
* Credit meter visible after login showing dummy data

## Dependencies
Requires Sprint 01 infrastructure complete.

## Team & Hours
Front-End (2) • Backend (1) • Designer (0.5)  
Estimate: 28 SP.

## Acceptance Criteria
- [ ] Email signup sends verification link and completes flow.  
- [ ] Redirect unauthenticated visits to /login for gated pages.  
- [ ] Landing page passes a11y audit (wave / axe) with zero critical errors.

- [ ] Integrate NextAuth with Email + Google providers  
  Why: Secure user authentication gated for all features.  
  Inputs→Outputs: services/auth setup, env vars (`GOOGLE_CLIENT_ID`) → working JWT.
- [ ] Implement auth.session tRPC middleware  
  Why: Enforce access control across API routes.  
  Inputs→Outputs: packages/config auth middleware, tests.
- [ ] Create Landing page `/` with hero, features, CTA  
  Why: Capture visitors and funnel to signup.  
  Inputs→Outputs: apps/web page with responsive Tailwind layout.
- [ ] Add onboarding wizard after signup  
  Why: Collect persona, improve UX (blueprint §2).  
  Inputs→Outputs: multi-step modal saved to users table.
- [ ] Design System seed components (Button, Card, Modal)  
  Why: Re-usable UI foundation for all future sprints.  
  Inputs→Outputs: packages/ui components + Storybook stories.
- [ ] Implement credit meter in Topbar  
  Why: Visualise minute balance early.  
  Inputs→Outputs: `<CreditMeter />` consuming dummy tRPC.

## Key File Targets
* `services/auth/**` (NextAuth config, route handlers)
* `apps/api/src/router/auth.ts`
* `apps/web/app/(auth)/*` – login, register pages
* `apps/web/app/page.tsx` – Landing
* `packages/ui/components/{Button,Card,Modal}.tsx`
* `packages/config/auth.ts` 