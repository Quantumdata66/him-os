# HIM OS Version 1.5 — Design Token Audit & Migration Checklist

**Target Phase:** Phase 2 (Executive Shell) & Phase 3 (Design System Primitives)  
**Date:** August 7, 2026  
**Status:** Audit Completed — Migration Checklist Generated  

---

## 1. Complete Inventory of Tokens in `globals.css`

The following design tokens are registered and available for utility/variable consumption:

### 1.1 Color Tokens
- `--bg-primary` / `--color-bg-primary`: `#071A12` (Deep Forest Green Primary Viewport)
- `--bg-surface` / `--color-bg-surface`: `#0F2D20` (Dark Evergreen Surface / Header)
- `--bg-elevated` / `--color-bg-elevated`: `#163526` (Charcoal Green Elevated Card Surface)
- `--bg-subtle` / `--color-bg-subtle`: `#1D4735` (Subtle Forest Accent / Hover)
- `--border-subtle` / `--color-border-subtle`: `#2B4D3E` (Subtle Forest Green Border)
- `--border-hover` / `--color-border-hover`: `#22C55E` (Emerald Active Border)
- `--accent-emerald` / `--color-accent-emerald`: `#22C55E` (Emerald Green Accent)
- `--accent-mint` / `--color-accent-mint`: `#4ADE80` (Mint Green Text Accent)
- `--text-primary` / `--color-text-primary`: `#F9FAFB` (Off-White Primary Text)
- `--text-secondary` / `--color-text-secondary`: `#9CA3AF` (Muted Gray Secondary Text)
- `--text-muted` / `--color-text-muted`: `#6B7280` (Icon & Micro-label Muted Gray)

### 1.2 Typography Tokens
- `--font-serif`: `'Playfair Display', Georgia, serif` (**Decision 002**: Restricted to `h1` Hero Titles)
- `--font-sans`: `'Inter', system-ui, -apple-system, sans-serif` (Default UI & Body)
- `--font-mono`: `'JetBrains Mono', monospace` (Metrics, Data & Telemetry)

### 1.3 Spacing Tokens (8-Point Grid)
- `--spacing-1`: `4px`
- `--spacing-2`: `8px`
- `--spacing-3`: `12px`
- `--spacing-4`: `16px`
- `--spacing-6`: `24px`
- `--spacing-8`: `32px`
- `--spacing-12`: `48px`
- `--spacing-16`: `64px`

### 1.4 Radius, Shadow & Viewport Tokens
- `.forest-card`: `18px` border radius
- `.forest-glow`: `box-shadow: 0 0 25px -5px rgba(34, 197, 94, 0.2)`
- `--max-viewport-width`: `1440px`

---

## 2. Hardcoded Values Audit Summary

> [!WARNING]
> **Audit Confirmation**: Hardcoded hex strings, arbitrary Tailwind values (`bg-[#071A12]`, `text-gray-400`, `border-gray-800`, `p-4`, `rounded-xl`), and arbitrary transitions **still exist** across legacy UI components. Phase 1 intentionally left these untouched to preserve zero visual regressions. They will be migrated to tokens during Phase 2 and Phase 3.

### Audit Findings by Category
1. **Hardcoded Colors**: Occurrences of `#071A12`, `#0F2D20`, `#163526`, `#1D4735`, `#2B4D3E`, `#22C55E`, `#4ADE80`, `#C9A84C`, `bg-gray-900`, `border-gray-800`, `text-gray-400`.
2. **Hardcoded Spacing**: Occurrences of `p-4`, `p-8`, `px-3`, `py-2.5`, `space-y-6`, `w-64`, `w-8`, `h-8`.
3. **Hardcoded Typography**: Unscoped `font-serif` on `h2`/`h3` subheadings, arbitrary `text-[10px]`, `text-[8px]`.
4. **Hardcoded Radius**: Occurrences of `rounded-xl`, `rounded-lg`, `rounded-full`.
5. **Hardcoded Shadows & Transitions**: Occurrences of `shadow-md`, `shadow-2xl`, `transition-all duration-150`.

---

## 3. Design Token Migration Checklist

### 3.1 Layout & Shell Components (`src/shared/layout/` & `src/app/`)
- [ ] **[src/app/layout.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/app/layout.tsx)**
  - [ ] Replace `bg-[#071A12]` with `bg-bg-primary` / `var(--bg-primary)`
  - [ ] Replace `text-[#F9FAFB]` with `text-text-primary`
  - [ ] Replace `p-4 md:p-8` with spatial grid tokens `p-4 md:p-8` -> `p-spacing-4 md:p-spacing-8`
- [ ] **[src/shared/layout/Sidebar.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/layout/Sidebar.tsx)**
  - [ ] Replace `bg-[#071A12]` with `bg-bg-primary`
  - [ ] Replace `bg-[#163526]` with `bg-bg-elevated`
  - [ ] Replace `border-[#2B4D3E]` with `border-border-subtle`
  - [ ] Replace `text-[#4ADE80]` with `text-accent-mint`
  - [ ] Replace `bg-[#22C55E]/20` with `bg-accent-emerald/20`
  - [ ] Remove `font-serif` from nav items (Inter for UI chrome per Decision 002)

### 3.2 Global Command & Overlay Components (`src/core/command/` & `src/shared/ui/`)
- [ ] **[src/core/command/commandPalette.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/core/command/commandPalette.tsx)**
  - [ ] Replace `bg-[#0F2D20]` with `bg-bg-surface`
  - [ ] Replace `border-[#2B4D3E]` with `border-border-subtle`
  - [ ] Replace `text-gray-400` with `text-text-secondary`
  - [ ] Replace `text-[#4ADE80]` with `text-accent-mint`
- [ ] **[src/shared/ui/QuickCaptureModal.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/QuickCaptureModal.tsx)**
  - [ ] Replace `bg-[#0F2D20]` with `bg-bg-surface`
  - [ ] Replace `border-[#2B4D3E]` with `border-border-subtle`
  - [ ] Replace `bg-gray-900` / `border-gray-800` with `bg-bg-elevated` / `border-border-subtle`
- [ ] **[src/shared/ui/ModalDrawer.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/ModalDrawer.tsx)**
  - [ ] Replace `bg-[#0D1322]` / `border-gray-700` with `bg-bg-surface` / `border-border-subtle`
  - [ ] Enforce `font-serif` on `h2` title to use Inter (Decision 002)

### 3.3 Primitive UI Components (`src/shared/ui/`)
- [ ] **[src/shared/ui/Card.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/Card.tsx)**
  - [ ] Replace hardcoded card styles with `.forest-card` utility / `bg-bg-elevated border-border-subtle`
  - [ ] Replace hardcoded gold borders `#C9A84C` with `border-accent-emerald`
- [ ] **[src/shared/ui/Button.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/Button.tsx)**
  - [ ] Migrate primary variant to `bg-accent-emerald text-bg-primary hover:bg-accent-mint`
  - [ ] Migrate outline variant to `border-border-subtle text-text-primary hover:bg-bg-elevated`
- [ ] **[src/shared/ui/Badge.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/Badge.tsx)**
  - [ ] Migrate gold/green/blue variants to semantic token colors (`bg-accent-emerald/20 text-accent-mint`)
- [ ] **[src/shared/ui/MetricCard.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/MetricCard.tsx)**
  - [ ] Replace `font-serif` on label with `font-sans`
  - [ ] Replace `#C9A84C` gold icon container with `text-accent-mint bg-bg-surface`
- [ ] **[src/shared/ui/ScoreRing.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/ScoreRing.tsx)**
  - [ ] Replace `#C9A84C` stroke colors with `var(--accent-emerald)` / `#22C55E`
- [ ] **[src/shared/ui/ThemeSelector.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/ThemeSelector.tsx)**
  - [ ] Replace `bg-[#0F2D20]` / `border-[#2B4D3E]` with token variables
- [ ] **[src/shared/ui/RbacControlWidget.tsx](file:///c:/Users/user/Music/HIM%20POS/him-os/src/shared/ui/RbacControlWidget.tsx)**
  - [ ] Replace `border-gray-800` / `bg-emerald-950` with semantic token variables

### 3.4 Feature Pages (`src/app/`)
- [ ] **Canonical Hubs (`/dashboard`, `/today`, `/build`, `/learn`, `/grow`, `/think`, `/review`)**
  - [ ] Audit and replace remaining `text-[#C9A84C]`, `bg-gray-900`, `border-gray-800` with `var(--accent-mint)`, `var(--bg-elevated)`, `var(--border-subtle)`.
