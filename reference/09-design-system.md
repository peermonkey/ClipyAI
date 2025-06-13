# 09 – Design System

_Last updated: 2025-06-12_

## 9.1 Principles
1. **Dark-first:** Neon accents on charcoal (#1E1E1E).
2. **Electric Minimalism:** Flat glassy surfaces with subtle glow.
3. **Accessibility:** AA contrast, keyboard nav, screen-reader labels.
4. **Motion with Purpose:** Animations convey state change, not decoration.

## 9.2 Tokens (Tailwind + CSS Vars)
Category | Token | Value | Notes
-------- | ----- | ----- | -----
Color | `--color-surface` | #1E1E1E | Background
Color | `--color-primary` | #C084FC | Neon purple
Color | `--color-accent` | #60A5FA | Electric blue
Color | `--color-success` | #10B981 | Lime green
Radius | `--radius-sm` | 6px |
Radius | `--radius-lg` | 12px |
Shadow | `--shadow-glow` | 0 0 12px rgba(96,165,250,.6) |

## 9.3 Component Library (packages/ui)
Component | Props Highlights | State Variants
--------- | ---------------- | --------------
Button | `variant`, `size`, `icon` | primary, ghost, destructive
Card | `elevation`, `interactive` | glass, flat
Modal | `isOpen`, `onClose` | size sm/md/lg
TimelineScrubber | `duration`, `markers` | hover, dragging
UploadDropzone | `onDrop`, `accept` | idle, hover, uploading

## 9.4 Theming
Setup:
```js
// packages/ui/tailwind.preset.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
      },
    },
  },
};
```

## 9.5 Storybook
Location: `packages/ui/.storybook`  
• Uses `@storybook/react` v8.  
• Chromatic snapshots run on PR; visual diffs must be approved.

## 9.6 Iconography
Heroicons 2.0 outline set + custom neon-lined set in Figma. Export to `packages/ui/icons` as JSX.

## 9.7 Typography
Font | Use | Weight | Source
---- | --- | ------ | ------
Inter | UI copy | 400, 500, 700 | Google Fonts
Satoshi | Headings | 500, 700 | cdn.fonts.cool

---

> **Rule:** Every new UI element must be added to Storybook with `aria-*` attributes and responsive viewport tests. 