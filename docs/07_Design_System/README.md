# 07 — Design System

> **Role:** Design System Maintainer  
> **Responsibility:** Design tokens, component contracts, CSS variables, and visual consistency guidelines.  

---

## 🎨 HPS Design Tokens (`src/app/globals.css`)

```css
:root {
  --bg-deep-forest: #071A12;
  --bg-dark-evergreen: #0F2D20;
  --bg-charcoal-green: #163526;
  --bg-emerald-slate: #1D4735;
  --accent-emerald: #22C55E;
  --accent-mint: #4ADE80;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --border-color: #2B4D3E;
}
```

## 🧩 Component Library Contracts (`src/shared/ui/`)
- `Card.tsx` — Standard HPS Charcoal Green `#163526` surface container (`rounded-[18px]`).
- `Button.tsx` — Emerald Green `#22C55E` primary action button (`rounded-[12px]`).
- `MetricCard.tsx` — Executive KPI card with trend vector indicators.
- `ScoreRing.tsx` — Radial score progress visualization.
- `SkeletonLoader.tsx` — Animated gradient loading state.
- `QuickCaptureModal.tsx` — Persistent `+` floating action drawer modal.
