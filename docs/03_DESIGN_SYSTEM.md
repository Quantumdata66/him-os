# 03 — Visual Design System & Brand Identity

> **HPS Chapter Reference:** Chapter 8 (Visual Identity) & Chapter 15 (Design System Guidelines)  
> **Owner:** Abdulazeez Nurudeen Adedotun  
> **Version:** 1.5  

---

## 🎨 1. Brand Identity & Palette (Deep Forest Green)

Green is the signature identity color of HIM OS—symbolizing continuous growth across knowledge, health, career, projects, business, and life.

```css
:root {
  --bg-deep-forest: #071A12;    /* Primary Canvas — Green-tinted dark mode */
  --bg-dark-evergreen: #0F2D20; /* Secondary Surface — Sidebar & Header baseline */
  --bg-charcoal-green: #163526; /* Card Surface — Primary information containers */
  --bg-emerald-slate: #1D4735;  /* Elevated Surface — Hover states & dialog modals */
  --accent-emerald: #22C55E;    /* Primary Accent — Emerald Green buttons & focus */
  --accent-mint: #4ADE80;       /* Secondary Accent — Mint Green charts & highlights */
  --color-success: #16A34A;     /* Success Emerald */
  --color-warning: #F59E0B;     /* Warning Amber */
  --color-error: #DC2626;       /* Error Crimson */
  --color-info: #38BDF8;        /* Information Sky Blue */
  --text-primary: #F9FAFB;      /* Off-White Primary Text */
  --text-secondary: #9CA3AF;    /* Muted Gray Secondary Text */
  --border-color: #2B4D3E;      /* Muted Green Borders */
}
```

### Color Distribution Rule
- **75% Neutral Dark Colors** (`#071A12`, `#0F2D20`, `#163526`)
- **20% Green Shades** (`#2B4D3E`, `#1D4735`)
- **5% Accent & Feedback Colors** (`#22C55E`, `#4ADE80`)

---

## 🔤 2. Typography Scale

- **Heading Font**: `Playfair Display`, serif (Communicates executive prestige and sophisitication)
  - `Hero / Display`: `48px` / `36px`
  - `H1 / Section Heading`: `28px`
  - `Card Title`: `20px`
- **Body Font**: `Inter`, sans-serif (Clean, highly legible interface UI)
  - `Body Large`: `18px`
  - `Body Regular`: `16px`
  - `Caption`: `14px`
  - `Small Labels`: `12px`
- **Monospace Font**: `JetBrains Mono`, monospace (Code snippets, ping latencies, net worth numbers)

---

## 💎 3. Component Design Rules

### Card Containers (`src/shared/ui/Card.tsx`)
- **Background**: `#163526` (Charcoal Green)
- **Border Radius**: `18px` (`rounded-[18px]`)
- **Border**: 1px solid `#2B4D3E` with hover transition to `#22C55E`.

### Action Buttons (`src/shared/ui/Button.tsx`)
- **Primary Button**: Emerald Green filled (`#22C55E`), black text (`#071A12`), bold typography, `12px` border radius (`rounded-[12px]`).
- **Secondary Button**: Outlined border `#2B4D3E`, transparent background.
- **Ghost Button**: Transparent background, minimal emphasis for secondary toolbars.

### Loading States (`src/shared/ui/SkeletonLoader.tsx`)
- **Gradient Shimmer Skeletons** (`.skeleton`): Animated gradient loading states that preserve layout; **no spinning wheels**.
