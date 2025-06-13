# 01 – Business & Economics

_Last updated: 2025-06-12_

## 1.1 Market Context
The global Creator Economy is projected to reach **$1.49 T** by 2034 (Influencer Marketing Hub, 2024). Short-form video remains the fastest-growing segment on TikTok, Reels, and YouTube Shorts. XClips.ai positions itself as a **mid-tier prosumer SaaS** that automates the repurposing workflow with GPT-4 and Whisper, targeting creators who have outgrown free editors and freelance editors but are not yet at agency scale.

## 1.2 Value Proposition
"**Upload once → Publish everywhere in minutes**."  The platform removes 4 manual tools (caption generator, clip cutter, subtitle editor, format converter) and compresses a 2-hour task into <15 minutes.

## 1.3 Pricing Model
| Plan   | Monthly Price | Minutes / mo | Video Export | Team Seats | Priority Queue | API Access |
|-------|--------------:|-------------:|--------------|-----------:|---------------|-----------|
| Free   | $0   | 60      | 720p, watermark | 1 | ✖ | ✖ |
| Solo   | $15  | 150     | 1080p          | 1 | ✖ | ✖ |
| Pro    | $30  | 500     | 4K             | 1 | ✓ | ✖ |
| Agency | $99  | 2 000   | 4K, no mark    | 5 | ✓ | ✓ |

Add-on: **Top-Up Pack** — $5 per 100 minutes (applies to any tier).

## 1.4 Cost of Goods Sold (COGS)
Component | Unit Cost / min | Notes
--------- | --------------- | -----
Whisper (OpenAI) | $0.004 | 16 kHz, medium model
GPT-4 (Turbo) | $0.002 | Highlight detection + captions
FFmpeg infra | $0.001 | GPU-optimised spot instances
**Total** | **$0.007** |

Gross margin is ≥88 % on paid tiers (assuming 70 % usage of allocated minutes).

## 1.4.1 Token-Based Costing (Internal)
OpenAI Whisper & GPT usage is billed in *tokens* or *seconds* by the provider. We meter these in real time via the worker and log to `usage_tokens` table. Our pricing engine applies a **7× markup** on the raw OpenAI cost:

```
chargeUSD = providerCostUSD * 7
```

Average tokens per minute of spoken audio ≈ **1 800** (based on 150 WPM × 12 chars ÷ 4 chars/token). At OpenAI Whisper cost of **$0.006 / minute** (16 kHz medium), that is **$0.0000033 / token**. 7× markup ⇒ **$0.0000231 / token** which equals **$0.0416 / min**. Rounding, **1 creator credit = 1 min = $0.05** retail in top-up packs.

Paid tiers bundle minutes cheaper (Solo: $0.10/min, Pro: $0.06/min) but margin is preserved because bundle usage averages 40 % of allowance.

> The 7× factor is configurable in `packages/config/pricing.js` so we can tweak as OpenAI pricing evolves.

## 1.5 Revenue & Break-Even
Target MRR | Users Needed | Condition
-----------|--------------|-----------
$150 k | 5 000 Pro users | Post-beta 6-month goal
$250 k | 3 000 Pro + 400 Agency | Year-1 target

Operating budget (run-rate): $80 k / month. Break-even headcount ≈ **14 FTEs**.

## 1.6 Key SaaS Metrics
Metric | Goal | Tracking Tool
------ | ---- | -------------
Day-7 Activation | ≥50 % | PostHog funnel
Logo Churn / mo | ≤4 % | ProfitWell
LTV:CAC | ≥4 × | Mixpanel + Stripe
Payback Period | ≤45 days | Stripe + ad spend sheet

## 1.7 Upsell & Expansion
1. **Minutes Top-Up**
2. **Brand Kit** (custom fonts / colours) — $9 / mo add-on
3. **Team Seats** — $8 per extra seat beyond plan
4. **White-Label API** for agencies — usage-based starting at $0.009 / min

## 1.8 Referral & Growth Loops
• Referral link grants +30 minutes to both inviter and invitee (Free & Solo tiers).  
• Watermark on Free exports drives UGC backlinks.  
• Templates gallery allows creators to publish presets publicly (Notion-style viral loop).

---

> **TL;DR:** XClips.ai maintains healthy gross margins through strict minute caps, leverages upsells for ARPU expansion, and targets break-even at 14 FTEs with 5 000 Pro users. 