# 10 – Micro-Interactions & Accessibility

_Last updated: 2025-06-12_

## 10.1 Interaction Catalogue
ID | Component | Trigger | Animation | Purpose
-- | --------- | ------- | --------- | -------
MI-01 | Button (primary) | `hover` | glowPulse (scale 1.02 + box-shadow) 150 ms | Affordance
MI-02 | UploadDropzone | `drag over` | border-dash wave | Indicate drop region
MI-03 | ProgressBar | `value change` | smooth width tween 300 ms | Feedback
MI-04 | TimelineScrubber | `drag` | marker follows cursor, playback preview | Precision control
MI-05 | Modal open | `onOpen` | fadeInUp 200 ms | Contextual transition
MI-06 | Tooltip | `focus` / `hover` | fade&scale 95→100 100 ms | Hint text
MI-07 | Toast | `new job event` | slideInRight 250 ms | Status update
MI-08 | CreditMeter | `balance low` | pulse color (#F59E0B) 1 s loop | Draw attention

## 10.2 Animation System (Framer Motion)
Shared motion variant:
```js
export const fadeInUp = {
  hidden: { opacity: 0, translateY: 8 },
  show: { opacity: 1, translateY: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};
```
All motion files stored in `packages/ui/motion`.

## 10.3 Accessibility Checklist
Category | Rule | Tooling
-------- | ---- | -------
Keyboard | All interactive elements reachable via `Tab`. | `@testing-library/user-event` tests
Focus | Visible focus ring (`outline-2`, lime) | CSS `:focus-visible`
Color Contrast | AA for text, AAA for body copy | `axe-core` CI action
Motion | Respect `prefers-reduced-motion` | Disable non-essential anims
Aria | `aria-label`, `aria-live` where needed | ESLint plugin `jsx-a11y`

## 10.4 Live Regions
Event | Region | Message Example
----- | ------ | ---------------
Upload start | `status` | "Uploading **myvideo.mp4** (0 %)"
Transcribe done | `status` | "Transcript ready"
Credits low | `polite` | "You have 5 minutes left"

## 10.5 Keyboard Shortcuts (Desktop)
Key | Context | Action
--- | ------- | ------
Space | Clip editor | Play/Pause
← / → | Clip editor | Seek ±2 s
⌘K | Global | Command palette
⌘I | Anywhere | Open Upload modal

## 10.6 Testing Strategy
1. **Unit** – `motion.spec.js`: ensure variants exist.
2. **E2E** – Playwright: simulate keyboard nav, assert focus order.
3. **Lighthouse CI** – Ensure a11y score ≥ 95.

---

> **Golden Rule:** Motion should guide the user, never distract. Disable in reduced-motion mode. 