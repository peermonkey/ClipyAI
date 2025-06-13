# 07 – API Contract

_Last updated: 2025-06-12_

XClips.ai uses **tRPC** for end-to-end type-safe APIs. Each procedure is versioned implicitly by git SHA; breaking changes require major version tag in route namespace (e.g., `v2.upload.request`).

## 7.1 Authentication Endpoints
Procedure | Input (Zod) | Output | Notes
----------|-------------|--------|------
`auth.login` | `{email: string, password: string}` | `{jwt, user}` | Rate-limited 5/min/IP
`auth.register` | `{email, password, plan}` | `{jwt, user}` | Sends verify email (SendGrid)
`auth.refresh` | `{refreshToken}` | `{jwt}` | 401 if blacklisted
`auth.me` | `void` | `{user}` | Requires JWT

## 7.2 Upload API
Procedure | Input | Output | Errors
----------|-------|--------|-------
`upload.request` | `{fileName, size, duration}` | `{uploadURL, jobId}` | 402 if minutes > credits
`upload.complete` | `{jobId}` | `202 Accepted` | 404 if job unknown
`upload.cancel` | `{jobId}` | `{status: 'cancelled'}` | 409 if already processing

## 7.3 Clip API
`clip.list` – cursor-based pagination `{cursor?: string}` → `{clips, nextCursor}`

`clip.get` – `{clipId}` → `{clip}` (includes captions[])

`clip.delete` – `{clipId}` → `{status: 'deleted'}`

## 7.4 Caption & Export
Procedure | Purpose | Notes
----------|---------|------
`captions.regen` | Re-generate captions for a platform | Deduct 1 min credit
`export.generate` | Render HLS/MP4 in preset (9:16, 1:1) | Returns presigned URL

## 7.5 Credits & Billing
Procedure | Input | Output
----------|-------|-------
`credits.balance` | — | `{minutesRemaining}`
`credits.topup` | `{priceId}` | `{checkoutUrl}`
`credits.history` | `{cursor?}` | `{payments}`

## 7.6 Admin Routes (role = 'owner')
Procedure | Action | Safeguards
----------|--------|-----------
`admin.users.list` | List users with usage stats | Pagination
`admin.users.ban` | Ban user | Cannot self-ban
`admin.credits.add` | Refill minutes | Stripe id `admin-refill`
`admin.queue.metrics` | BullMQ stats | Cached 30 s

## 7.7 Error Codes
HTTP | Meaning | Frontend Handling
---- | ------- | ----------------
400 | Validation error | Show inline form errors
401 | Auth failed | Redirect to /login
402 | Payment required (credits) | Show upgrade modal
404 | Resource not found | Toast + log to Sentry
409 | Conflict (state) | Refetch data and retry
429 | Rate limit | Exponential back-off
5xx | Server error | Full-screen error with retry

## 7.8 Versioning Strategy
Because tRPC lacks URL versioning, we keep backward compatibility for 30 days. Breaking changes pattern:
1. Duplicate procedure under new name (`*_v2`).
2. Deprecate old procedure (warning header).
3. Remove after 30-day deprecation notice via Changelog.

---

> All responses include `X-Trace-Id` header for cross-service tracing. 