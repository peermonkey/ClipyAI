# Sprint 04 – Clips UI & Smart Clipping (Weeks 5–6)

## Goal
Give creators an interactive workspace to preview and tweak AI-generated clips.

## Key Outcomes
* AI highlight detection with recall ≥ 0.8 on test set
* Clips stored as MP4 + thumbnail in S3
* Timeline editor allows trimming with <100 ms drag latency
* Grid view loads 50 clips in <300 ms (virtualised)

## Dependencies
Upload pipeline functional (Sprint 03). GPT token budget approved.

## Team & Hours
Front-End (2) • Backend (1) • ML (1)  
Estimate: 42 SP.

## Acceptance Criteria
- [ ] User can adjust start/end and save clip; updates DB & S3.  
- [ ] At least 3 UX tests show satisfaction score ≥ 8/10.  
- [ ] No GPT prompt leak in network tab.

- [ ] Implement `clip` worker job  
  Why: Auto-detect highlights via GPT and slice with FFmpeg.  
  Inputs→Outputs: worker/clip.ts; clips saved to S3 + DB rows.
- [ ] Add `clip.list` & `clip.get` tRPC endpoints  
  Why: FE needs paginated access and detail views.  
  Inputs→Outputs: apps/api routers with Zod schemas.
- [ ] Tune GPT prompt for highlight detection  
  Why: Increase relevance and reduce token cost.  
  Inputs→Outputs: prompt json + test dataset results.
- [ ] Build TimelineScrubber component in `packages/ui`  
  Why: Visual editing of clip in FE.  
  Inputs→Outputs: React component with drag handles, Storybook story.
- [ ] Create Clips Workspace page `/clips/[id]`  
  Why: Allow creators to preview/edit clips.  
  Inputs→Outputs: Next.js RSC page using TimelineScrubber.
- [ ] SmartCard grid for clips  
  Why: Display clip previews like YouTube Studio.  
  Inputs→Outputs: SmartCard component + infinite scroll.
- [ ] WebSocket progress events `stage=clipped`  
  Why: Live UI updates when clip generation completes.  
  Inputs→Outputs: WS payload integration in FE.

## Key File Targets
* `services/worker/src/clip.ts`
* `apps/api/src/router/clip.ts`
* `packages/ui/components/TimelineScrubber.tsx`
* `apps/web/app/clips/[id]/page.tsx`
* `packages/ui/components/SmartCard.tsx` 