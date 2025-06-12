**AI Content SaaS - Visual Design Blueprint for Frontend & Creator Dashboard (Next.js)**

---

### 🌟 Target Vibe: Modern, Youth-Centric, Creator-First

* **Style Keywords:** Electric minimalism, studio vibes, energetic neon + matte contrasts.
* **Inspiration:** YouTube Studio, Instagram Creator Tools, Notion, Figma.
* **Audience:** Digital creators aged 18-35 (content-first thinkers, aesthetics-aware, mobile-aware, fast users).

---

## 🔄 Global UI Philosophy

* **Dark Mode First:** Neon on charcoal gray background with optional light theme toggle.
* **Micro-Interactions:** Button hover pops, clip generation progress in animated loaders.
* **Font Style:** Inter or Satoshi. Rounded, slightly condensed sans-serif.
* **Accent Colors:**

  * Purple Neon: `#C084FC`
  * Electric Blue: `#60A5FA`
  * Matte Gray: `#1E1E1E`
  * Lime Signal: `#A3E635`

---

## 📅 Onboarding/Login Flow

**No Anon Usage** - Gate all features behind login/signup

* **Landing Page (index.tsx)**

  * Eye-catching hero: "Turn Long Form to Viral Shorts in Seconds"
  * Upload preview animation demo
  * CTA: \[Login to Start] or \[Join the Studio]
  * Feature Highlights: Transcribe, Clip, Caption, Publish

* **Login Modal**

  * Email/pass login + social (Google, Discord)
  * Smooth modal blur
  * Optional 2FA UI (expandable later)

---

## 🎥 Main App Layout (Once Logged In)

> Pages: /upload, /clips, /projects, /credits, /settings

### Sidebar Nav (Sticky Left)

* Logo (light or neon)
* Nav Items:

  * Dashboard (home)
  * Upload
  * My Clips
  * Projects
  * Credits & Billing
  * Settings
* Avatar at bottom w/ dropdown

### Topbar (Sticky Header)

* "Hey \[Name] 😎 Ready to go viral?"
* Current credit balance
* Notifications bell (clip success, billing, tips)
* Light/Dark mode toggle

---

## 📹 Upload Page (/upload.tsx)

* Drag & drop area + S3 link upload + YouTube URL input
* Topic input (text area or keyword picker)
* Realtime size + duration estimate
* CTA: \[Start Processing] button with animated progress bar

---

## ✅ Clips Page (/clips.tsx)

* Grid view of generated clips (like YouTube Studio videos)
* Each clip card:

  * Preview player
  * Duration
  * Tags/Captions overlay
  * Actions: Download, Copy Text, Delete
  * Status badge (Processing, Done)

---

## 💡 Project Workspace (/projects.tsx)

* Timeline-style UI
* Rows: Original Transcript | Highlighted Moments | Generated Clips | Suggested Posts
* Tools: Merge clips, Re-generate, Copy blog/tweet caption
* Export button: Download All Package

---

## 💳 Credit & Billing Page (/credits.tsx)

* Usage graph (min used this month)
* Current plan info + CTA to upgrade
* Purchase history
* Refill credits UI
* Referral code w/ credit bonus link

---

## 🏠 Admin/Owner Backend Dashboard (Different UI Scope)

> NOT visible to regular creators. Owner-only view.

* User activity metrics (signups, usage trends)
* Clip rendering queue
* Error logs w/ timestamps
* Revenue stats (Stripe API data)
* API usage per provider (OpenAI/OpenRouter stats)
* Admin tools: ban user, refill manual credits, override limits

---

## 📱 Mobile View Design Philosophy

* Bottom tab nav (Upload, Clips, Projects, Account)
* Collapsible clip previews
* Swipe left/right in Projects view
* Toast-style upload processing feedback

---

## 🌟 Bonus Features (Post-MVP)

* AI voiceover overlay preview
* Caption style editor (font, speed, emoji support)
* Share to TikTok/Instagram/YouTube Shorts direct
* Creator portfolio page: auto-generated landing page
* Brand kits for agencies (logo, fonts, templates)

---

Let me know if you want mockups next, Tailwind UI layouts, or turn this into a Figma file prototype.
