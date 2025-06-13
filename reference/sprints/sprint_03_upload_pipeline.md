# Sprint 03 – Upload Pipeline MVP (Weeks 3–4)

## Goal
Enable creators to upload media and watch real-time transcription progress, establishing the core asynchronous pipeline.

## Key Outcomes
* Direct-to-S3 uploads with resumable progress events
* Whisper transcription stored and accessible
* Live job status UI via WebSocket
* Minute billing debited per token/7× logic

## Dependencies
Sprints 01–02 complete; S3 bucket + Redis provisioned.

## Team & Hours
Backend (2) • Front-End (2) • ML/AI (1)  
Estimate: 45 SP.

## Acceptance Criteria
- [ ] 95 % of test videos transcribed successfully within 1× runtime.  
- [ ] Upload cancel returns minutes.  
- [ ] No PII leakage in S3 object ACLs.

- [ ] Create S3 presigned upload endpoint `upload.request`  
  Why: Secure direct uploads, no backend bandwidth.  
  Inputs→Outputs: tRPC proc + AWS SDK integration, unit tests.
- [ ] Implement `upload.complete` to enqueue `transcribe` job  
  Why: Kick off async pipeline upon upload finish.  
  Inputs→Outputs: BullMQ enqueue logic.
- [ ] Build Node worker function `transcribe.ts` calling Whisper  
  Why: Convert audio to text for clipping later.  
  Inputs→Outputs: transcript saved to S3 + DB.
- [ ] WebSocket progress updates via `user:<id>:jobs` channel  
  Why: Real-time UX on upload screen.  
  Inputs→Outputs: Redis pub/sub, FE toast.
- [ ] Front-end Upload Studio page `/upload`  
  Why: Drag-drop UI with progress bar (blueprint §5).  
  Inputs→Outputs: React Dropzone component, responsive.
- [ ] Token counting + minute deduction (7× cost) in worker  
  Why: Accurate billing system baseline.  
  Inputs→Outputs: usage_tokens table rows, minute debit via API.

## Key File Targets
* `apps/api/src/router/upload.ts`
* `services/worker/src/transcribe.ts`
* `packages/config/s3.ts`
* `apps/web/app/upload/page.tsx`
* `services/worker/src/billing.ts`
* `packages/ui/components/UploadDropzone.tsx` 