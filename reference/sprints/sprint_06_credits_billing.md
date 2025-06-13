# Sprint 06 – Credits & Billing (Week 8)

## Goal
Monetise the platform by enabling minute purchases and automatic quota management.

## Key Outcomes
* Stripe Checkout live in production with webhooks verified
* Minute balance visible everywhere and updated in real-time
* Monthly cron resets minutes per plan tier
* Admins can override balances from dashboard

## Dependencies
Token-metering logic stable (Sprint 05). Stripe account set to production.

## Team & Hours
Backend (1) • Front-End (1) • DevOps (1)  
Estimate: 32 SP.

## Acceptance Criteria
- [ ] Payment succeeds in test mode and credits user within 3 seconds.  
- [ ] Credit meter turns orange at <10%, red at 0 and upload blocked.  
- [ ] Refund flow adjusts minutes negative.

- [ ] Integrate Stripe Checkout session in FE  
  Why: Allow users to purchase minutes.  
  Inputs→Outputs: frontend `/credits` page button → redirect URL.
- [ ] Implement Stripe webhook listener (`services/billing`)  
  Why: Credit minutes after successful payment.  
  Inputs→Outputs: minutes added in payments + users.credits.
- [ ] Create `credits.balance`, `credits.topup` tRPC procedures  
  Why: FE needs live balance.  
  Inputs→Outputs: API routers, Zod schemas.
- [ ] Minute reset cron job monthly  
  Why: Plan allowance resets (free, paid tiers).  
  Inputs→Outputs: worker cron + DB update.
- [ ] Credit meter uses real API data  
  Why: Reflect actual minutes not dummy.  
  Inputs→Outputs: FE hook, SWR cache.
- [ ] Usage stats widget on Dashboard  
  Why: Transparency and upsell trigger.  
  Inputs→Outputs: Bar chart component.
- [ ] Admin panel action: manual credit add  
  Why: Support refunds, promos.  
  Inputs→Outputs: admin tRPC route, auth guard.

## Key File Targets
* `services/billing/src/stripeWebhook.ts`
* `apps/api/src/router/credits.ts`
* `apps/web/app/credits/page.tsx`
* `packages/ui/components/CreditMeter.tsx`
* `services/worker/src/cronReset.ts` 