# Sprint 05 – Captions & Multi-Export (Week 7)

## Goal
Deliver platform-optimised captions and export options so users can immediately publish clips.

## Key Outcomes
* Caption accuracy BLEU ≥ 0.7 vs human baseline
* FFmpeg exports 9:16 video + burned captions in <30 s for 30-sec clip
* Export modal shows real-time progress with WS
* Billing accounts for caption+export tokens

## Dependencies
Clips ready (Sprint 04). S3 export bucket configured with CloudFront.

## Team & Hours
Backend (1) • Front-End (1) • DevOps (0.5)  
Estimate: 30 SP.

## Acceptance Criteria
- [ ] Instagram Reels preset passes IG upload validator.  
- [ ] Captions font/colour matches design tokens.  
- [ ] Tokens recorded in usage_tokens within 1 minute of export job finish.

- [ ] Implement `caption` worker job calling GPT  
  Why: Auto-generate captions/hashtags per platform.  
  Inputs→Outputs: caption.ts; captions rows in DB.
- [ ] Build caption overlay style presets  
  Why: Burn-in subtitles with neon styling.  
  Inputs→Outputs: FFmpeg filter scripts, design tokens.
- [ ] Add `export.generate` tRPC endpoint  
  Why: Trigger ffmpeg export presets (9:16, 1:1, 16:9).  
  Inputs→Outputs: API route + job enqueue.
- [ ] Implement `export` worker job  
  Why: Produce final HLS/MP4 files.  
  Inputs→Outputs: S3 export objects + DB status.
- [ ] Export modal in FE with progress  
  Why: User UX for download/share.  
  Inputs→Outputs: Modal component consuming WS events.
- [ ] Update minute deduction to include caption + export tokens  
  Why: Accurate cost billing.  
  Inputs→Outputs: worker cost calc refactor, unit tests.

## Key File Targets
* `services/worker/src/caption.ts`
* `services/worker/src/export.ts`
* `apps/api/src/router/export.ts`
* `packages/ui/components/ExportModal.tsx`
* `packages/config/ffmpeg-presets.ts` 