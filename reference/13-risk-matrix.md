# 13 – Risk Matrix

_Last updated: 2025-06-12_

## 13.1 Heat Map
| Impact ↓ / Likelihood → | Low | Medium | High |
|-------------------------|-----|--------|------|
| **High** | R3 | R1 | R2 |
| **Medium** | R5 | R4 | R6 |
| **Low** | R8 | R7 | R9 |

Legend: R1…R9 correspond to risks listed below.

## 13.2 Detailed Risks
ID | Risk | Likelihood | Impact | Owner | Mitigation | Contingency
-- | ---- | ---------- | ------ | ----- | ---------- | -----------
R1 | OpenAI pricing surge | Med | High | ML Lead | Negotiate volume, allow BYO keys | Switch to Whisper.cpp + Claude
R2 | S3 egress cost spike | Low | High | DevOps | Use CloudFront signed URLs, HLS | Move to Cloudflare R2
R3 | Redis single-AZ outage | Med | High | DevOps | Multi-AZ, snapshot | Fallback to RDS queue table
R4 | Stripe API downtime | Med | Med | Billing Eng | Retry w/ idempotency keys | Grace period credits
R5 | GDPR non-compliance | Low | Med | Legal | Automated purge pipeline | External audit + fines budget
R6 | Data breach | Low | High | Security Lead | Encryption, WAF, pentest | Disclosure protocol 72 h
R7 | Staff turnover | Med | Low | HR | Onboarding docs, bus factor ≥2 | Contract devs
R8 | Feature creep | Med | Low | PM | Roadmap freeze per quarter | Sprint triage
R9 | Negative social buzz | Low | Low | Marketing | Active comms, quick fixes | PR statement + comp credits

Risk review conducted quarterly; matrix updated in Confluence and here.

---

> **Threshold:** Any new risk with Impact = High or Likelihood = High must be logged within 48 h. 