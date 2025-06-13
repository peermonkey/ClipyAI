# 12 – Security & Compliance

_Last updated: 2025-06-12_

## 12.1 Threat Model
Asset | Threat | Mitigation
----- | ------ | ----------
JWT | Token theft | HS512 signatures, 7-day expiry, httpOnly cookie
File uploads | Malicious media | ClamAV scan before process, FFmpeg `-safe 0`
Payment data | PCI scope | Stripe Checkout + webhooks (no card data stored)
User data | Breach | At-rest AES-256 S3, pgcrypto in Postgres

## 12.2 OWASP Checklist (Top 10)
A01 – Broken Access Control | Role checks in tRPC middlewares
A02 – Cryptographic Failures | Enforce TLS 1.3, rotate JWT secret
A03 – Injection | Prepared statements via `pg`
A05 – Security Misconfig | CIS Docker benchmark, read-only FS on workers
A07 – Identification & Auth | NextAuth w/ 2FA roadmap
A08 – Software/Data Integrity | SLSA-level build provenance via Sevalla hashes
A09 – Logging & Monitoring | Loki + Sentry alerts within 5 min

## 12.3 GDPR Compliance
Right | Implementation
----- | --------------
Access | `/api/account/export` generates JSON dump in 24 h
Erase | `DELETE /api/account/delete` (see Data Model doc)
Consent | Checkbox on signup for marketing emails
Breach Notice | 72-hour email & banner + DPA docs

## 12.4 Vulnerability Management
• Dependabot weekly + `pnpm audit` in CI.  
• Critical CVEs patched <48 h.  
• Annual pentest by third-party.

## 12.5 Secrets Rotation Schedule
Secret | Rotation | Responsible
------ | -------- | -----------
JWT_SECRET | 30 days | DevOps
OPENAI_API_KEY | 90 days | ML Infra
STRIPE_SECRET_KEY | Stripe dashboard | DevOps

## 12.6 Backup & Encryption
Resource | Backup | Encryption
-------- | ------ | ----------
Postgres | Point-in-time 7 days | AES-256 disk-level
Redis | AOF every 60 s | volume encryption
S3 | Versioning + CRR | SSE-S3

---

> **Policy:** Engineers must complete annual security training; infra-as-code changes require security review. 