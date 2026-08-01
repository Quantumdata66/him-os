# 07 — Frontend Engineering Guide

> **HPS Chapter Reference:** Chapter 10 (Frontend Architecture) & Chapter 20 (Engineering Standards)  
> **Owner:** Abdulazeez Nurudeen Adedotun  
> **Version:** 1.5  

---

## ⚡ 1. Technical Stack

- **Framework**: Next.js 15.5.21 App Router (React 19)
- **Language**: TypeScript 5.x (Strict mode enabled, zero implicit `any`)
- **Styling**: Tailwind CSS v4 (`globals.css` with `@import "tailwindcss";`)
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: Framer Motion & CSS transitions (`150-250ms`)

---

## 📁 2. App Router Directory Catalog

- `src/app/dashboard/page.tsx` — **HOME** Executive Command Center
- `src/app/today/page.tsx` — **TODAY** Execution Hub
- `src/app/build/page.tsx` — **BUILD** Creation & Career Hub
- `src/app/learn/page.tsx` — **LEARN** Ecosystem & German Anki Deck
- `src/app/grow/page.tsx` — **GROW** Capital & Venture Hub
- `src/app/think/page.tsx` — **THINK** Second Brain & Knowledge Graph
- `src/app/review/page.tsx` — **REVIEW** Rituals & Sprint Rollover
- `src/shared/layout/Sidebar.tsx` — 7-Destination Navigation Drawer
- `src/shared/ui/QuickCaptureModal.tsx` — Global Floating Quick Capture (`+`)
- `src/core/command/commandPalette.tsx` — Spotlight Command Palette (`Ctrl+K`)

---

## 🟢 3. Build Quality Standards
- `npm run build` static compilation across all 47 server routes must pass with **zero errors**.
- Reusable primitive UI components contained in `src/shared/ui/`.
