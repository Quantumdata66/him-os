# HIM OS Version 1.5 — Executive Visual Language Migration Plan

**Document Version:** 1.5.0-MIGRATION-BLUEPRINT  
**Target System:** HIM OS (Personal Operating System)  
**Status:** Audit & Planning Phase Only (NO CODE MODIFICATION)  
**Author:** Lead Systems Architect & Executive Design Board  
**Date:** August 7, 2026  

---

> [!IMPORTANT]
> **AUDIT & MIGRATION BLUEPRINT ONLY**  
> This document is an **architectural plan and audit report**. No source code has been modified during this task. No implementation has been performed. This blueprint establishes the exact sequence, file impact, token diffs, and risk controls required to execute the visual language migration upon explicit authorization.

---

## 1. Executive Summary

### 1.1 What Changes
The visual system transitions from the initial monochromatic forest-green prototype baseline to the approved **HIM Executive Visual Language**:

- **Lifted Charcoal Surfaces**: Base primary background transitions from heavy forest green (`#071A12`) to display-optimized lifted charcoal (`#0B0F12`). Frame surfaces transition to Dark Evergreen Slate (`#12181C`), elevated cards to `#1A2228`, and subtle borders to `#28353D`.
- **Desaturated Executive Sapphire Track**: AI Copilot insights, telemetry, agent mesh feeds, and focus analytics transition from generic green/blue to calm, product-oriented **Executive Sapphire (`#4776B4`)** and Slate (`#6495ED`).
- **Single Executive Gold Token**: Restrained gold token (`#C9A84C`) is established as the single, exclusive milestone accent (strictly locked to achievements, lifetime XP unlocks, and year-end celebrations).
- **Explicit Semantic Status**: Standardized Emerald (`#10B981`), Amber (`#F59E0B`), Crimson (`#EF4444`), and Steel-Blue (`#4776B4`) semantic triggers.

### 1.2 Why the Change Improves the Product
- **Eliminates Monotony**: Differentiates structural shell chrome (`65%`), content cards (`20%`), primary executive actions (`10%`), AI/telemetry feeds (`4%`), and milestone unlocks (`1%`).
- **Prevents OLED/IPS Crushing**: Lifted charcoal surfaces retain deep contrast without losing shadow details or text legibility on standard laptop monitors.
- **Reduces Cognitive Strain**: The **"Color Must Earn Attention"** philosophy keeps 85% of the viewport calm and neutral, making colored indicators immediately scannable in <50ms.

### 1.3 Unchanged Architectural Foundations
All frozen Version 1.5 constraints remain 100% untouched:
- **Zero Information Architecture Changes**: The 7 Canonical Life Destinations (`/dashboard`, `/today`, `/build`, `/learn`, `/grow`, `/think`, `/review`) are preserved.
- **Zero Shell Geometry Changes**: Fixed 56px Header (`h-14`), 256px/64px Sidebar width, and 1440px max viewport boundary (`max-w-[1440px]`) are locked.
- **Zero Typography Hierarchy Changes**: Playfair Display restricted strictly to `h1` Hero headings; Inter for all UI chrome; JetBrains Mono for telemetry, data, and shortcuts (**Decision 002**).

---

## 2. Token Diff & Action Inventory

| Existing Baseline Token / Value | New HIM Executive Token | Hex / Value | Action | Purpose & Scope |
| :--- | :--- | :--- | :--- | :--- |
| `bg-primary` (`#071A12`) | `--color-bg-primary` | `#0B0F12` | **Replace** | Primary Viewport Canvas Background |
| `bg-surface` (`#0F2D20`) | `--color-bg-surface` | `#12181C` | **Replace** | Header, Sidebar & Drawer Chrome Surfaces |
| `bg-elevated` (`#163526`) | `--color-bg-elevated` | `#1A2228` | **Replace** | Cards, Popovers, Dropdowns, Text Inputs |
| `bg-subtle` (`#1D4735`) | `--color-bg-subtle` | `#222C34` | **Replace** | Table Row Hover, Secondary Buttons, Hover Fills |
| `border-subtle` (`#2B4D3E`) | `--color-border-subtle` | `#28353D` | **Replace** | Crisp Architectural Dividers & Card Borders |
| `accent-emerald` (`#22C55E`) | `--color-accent-emerald` | `#10B981` | **Refine** | Primary CTA Buttons, Active Checkboxes, Brand |
| `accent-mint` (`#4ADE80`) | `--color-accent-mint` | `#34D399` | **Refine** | Active Nav Text Labels, Positive Metric Text |
| `intel-blue` (`#3B82F6`) | `--color-intel-sapphire` | `#4776B4` | **Rename & Desaturate** | AI Copilot Widgets, Agent Mesh, Telemetry Charts |
| `intel-cyan` (`#60A5FA`) | `--color-intel-slate` | `#6495ED` | **Refine** | Telemetry Numbers & Research Card Badges |
| `accent-gold` (`#C9A84C`) | `--color-accent-gold` | `#C9A84C` | **Lock as Single** | Exclusive Milestone & Award Token (1% Max) |
| `--accent-brass` (`#D4AF37`) | *None* | *None* | **Remove** | Streamlined to single `--color-accent-gold` |
| `status-success` | `--color-status-success` | `#10B981` | **Standardize** | Task Done, Positive ROI, System Online |
| `status-warning` | `--color-status-warning` | `#F59E0B` | **Standardize** | Approaching Deadline (<2h), Capacity Warning |
| `status-danger` | `--color-status-danger` | `#EF4444` | **Standardize** | Overdue Task, Security Audit Alert, Sync Failure |
| `status-info` | `--color-status-info` | `#4776B4` | **Standardize** | System Info, AI Notices, Research Notes |
| `text-primary` (`#F9FAFB`) | `--color-text-primary` | `#F9FAFB` | **Keep** | Primary Text & High-Contrast Titles |
| `text-secondary` (`#9CA3AF`) | `--color-text-secondary` | `#9CA3AF` | **Keep** | Subtitles, Form Labels, Unselected Nav |
| `text-muted` (`#6B7280`) | `--color-text-muted` | `#6B7280` | **Keep** | Muted Icons, Timestamps, Helper Text |

---

## 3. Repository Impact Assessment

A complete audit of all files containing visual styling in `src/`:

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                             REPOSITORY VISUAL IMPACT AUDIT                               │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ Category A: Infrastructure & Stylesheet                                                  │
│   - src/app/globals.css                                                                  │
│   - next.config.mjs                                                                      │
│   - .eslintrc.json                                                                       │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ Category B: Phase 2 Executive Shell Components                                           │
│   - src/app/layout.tsx                                                                   │
│   - src/shared/layout/Header.tsx                                                         │
│   - src/shared/layout/Sidebar.tsx                                                        │
│   - src/shared/layout/Breadcrumbs.tsx                                                   │
│   - src/shared/layout/WorkspaceSwitcher.tsx                                             │
│   - src/shared/layout/NotificationPopover.tsx                                           │
│   - src/shared/layout/UserProfileMenu.tsx                                               │
│   - src/core/command/commandPalette.tsx                                                 │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ Category C: Phase 3 UI Primitive Components                                              │
│   - src/shared/ui/Card.tsx                                                               │
│   - src/shared/ui/Button.tsx                                                             │
│   - src/shared/ui/Badge.tsx                                                              │
│   - src/shared/ui/Input.tsx                                                              │
│   - src/shared/ui/Skeleton.tsx                                                           │
│   - src/shared/ui/Tabs.tsx                                                               │
│   - src/shared/ui/MetricCard.tsx                                                         │
│   - src/shared/ui/ScoreRing.tsx                                                          │
│   - src/shared/ui/ModalDrawer.tsx                                                       │
│   - src/shared/ui/QuickCaptureModal.tsx                                                 │
│   - src/shared/ui/ThemeSelector.tsx                                                      │
│   - src/shared/ui/RbacControlWidget.tsx                                                 │
│   - src/shared/ui/AgentMeshWidget.tsx                                                   │
│   - src/shared/ui/AiCopilotWidget.tsx                                                   │
│   - src/shared/ui/AutonomousSchedulerWidget.tsx                                         │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ Category D: Phase 5 Canonical Hub Pages (Deferred to Phase 5)                             │
│   - src/app/dashboard/page.tsx                                                          │
│   - src/app/today/page.tsx                                                              │
│   - src/app/build/page.tsx                                                              │
│   - src/app/learn/page.tsx                                                              │
│   - src/app/grow/page.tsx                                                               │
│   - src/app/think/page.tsx                                                              │
│   - src/app/review/page.tsx                                                             │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Migration Order & Execution Plan

To prevent build breakages or transient visual regressions, migration must follow this exact step-by-step sequence:

```
   [Step 1: CSS Tokens] ------------> Update globals.css & Tailwind @theme block
            │
            ▼
   [Step 2: Core UI Primitives] ----> Update Card, Button, Badge, Input, Tabs, Skeleton
            │
            ▼
   [Step 3: Specialized Widgets] ---> Update MetricCard, ScoreRing, Modals, AI Widgets
            │
            ▼
   [Step 4: Executive Shell] -------> Update Header, Sidebar, Workspace Switcher, Command Palette
            │
            ▼
   [Step 5: Hub Page Audits] --------> Replace legacy hex occurrences across 7 Hub pages
            │
            ▼
   [Step 6: Quality Verification] --> Run npx tsc --noEmit, npm run lint, npm run build
```

---

## 5. Component Color Mapping

| Primitive Component | Dominant Color Family | Secondary Color | Hover / Active States | Focus Ring Token |
| :--- | :--- | :--- | :--- | :--- |
| **Card (Default)** | `#1A2228` (Elevated) | `#28353D` (Subtle Border) | Hover: `#10B981` Emerald Border | `ring-2 ring-[#34D399]` |
| **Card (Intel)** | `#1A2228` (Elevated) | `#4776B4` (Steel Border) | Hover: `#4776B4` Steel Border | `ring-2 ring-[#6495ED]` |
| **Card (Gold)** | `#1A2228` (Elevated) | `#C9A84C` (Gold Border) | Hover: `#C9A84C` Gold Glow | `ring-2 ring-[#C9A84C]` |
| **Button (Primary)** | `#10B981` (Emerald) | `#0B0F12` (Text) | Hover: `#059669` | `ring-2 ring-[#34D399]` |
| **Button (Outline)** | `#1A2228` (Elevated) | `#F9FAFB` (Text) | Hover: `#28353D` + Emerald Border | `ring-2 ring-[#34D399]` |
| **Button (Intel)** | `#4776B4` (Steel-Blue) | `#FFFFFF` (Text) | Hover: `#6495ED` | `ring-2 ring-[#6495ED]` |
| **Button (Danger)** | `#EF4444` (Crimson) | `#FFFFFF` (Text) | Hover: `#DC2626` | `ring-2 ring-red-400` |
| **Badge (Emerald)** | `rgba(16,185,129,0.2)`| `#34D399` (Mint Text) | Static indicator | None |
| **Badge (Intel)** | `rgba(71,118,180,0.2)`| `#6495ED` (Slate Text) | Static indicator | None |
| **Badge (Gold)** | `rgba(201,168,76,0.2)`| `#C9A84C` (Gold Text) | Static indicator (Milestones Only)| None |
| **Badge (Warning)** | `rgba(245,158,11,0.2)`| `#F59E0B` (Amber Text) | Static indicator | None |
| **Badge (Danger)** | `rgba(239,68,68,0.2)` | `#EF4444` (Red Text) | Static indicator | None |
| **Input** | `#1A2228` (Elevated) | `#28353D` (Border) | Focus: `#10B981` Border | `ring-2 ring-[#34D399]` |
| **Tabs** | `#12181C` (Surface) | `#34D399` (Active Text) | Active: `#10B981` Bottom Border | `ring-2 ring-[#34D399]` |
| **Skeleton** | `#222C34` (Subtle) | Pulse opacity | Static pulse animation | None |

---

## 6. Semantic Color Rules Matrix

```
┌─────────────────────────┬───────────────────────────┬──────────────────────────────────────────────────────┐
│ Interaction State / Slot│ Approved Color Token      │ Hex Value & Rule                                     │
├─────────────────────────┼───────────────────────────┼──────────────────────────────────────────────────────┤
│ Success                 │ --color-status-success    │ #10B981 (Task Done, Sync Verified, Positive ROI)     │
│ Warning                 │ --color-status-warning    │ #F59E0B (Approaching Deadline <2h, High Workload)    │
│ Danger                  │ --color-status-danger     │ #EF4444 (Overdue Task, Security Audit Alert, Failure)│
│ Information             │ --color-status-info       │ #4776B4 (System Notices, AI Recommendations)         │
│ AI Intelligence         │ --color-intel-sapphire    │ #4776B4 (AI Copilot Headers, Agent Mesh Feeds)       │
│ Achievement / Award     │ --color-accent-gold       │ #C9A84C (Milestones & XP Unlocks ONLY - 1% Max)      │
│ Active Navigation       │ --color-accent-mint       │ #34D399 (Sidebar Active Label, Active Tab Text)      │
│ Hover Fills             │ --color-bg-subtle         │ #222C34 (Table Row Hover, Dropdown Item Select)      │
│ Focus Rings             │ --focus-ring-emerald      │ ring-2 ring-[#34D399] (Default Action Elements)      │
│ Disabled State          │ opacity-50                │ pointer-events-none + 50% opacity blend              │
│ Loading Skeleton        │ --color-bg-subtle         │ #222C34 with animate-pulse animation                 │
│ Progress Rings          │ --color-accent-emerald    │ #10B981 (On-track) / #4776B4 (In-flight) / #C9A84C (100%)│
└─────────────────────────┴───────────────────────────┴──────────────────────────────────────────────────────┘
```

---

## 7. Color Usage Ratio Validation Audit

The visual identity requires maintaining a strict **65 / 20 / 10 / 4 / 1** ratio:

- **Structure (65%)**: Target met via `#0B0F12` canvas and `#12181C` surface chrome.
- **Neutral Surfaces (20%)**: Target met via `#1A2228` elevated cards and popovers.
- **Identity (10%)**: Target met via `#10B981` buttons and `#34D399` active navigation links.
- **Intelligence (4%)**: Target met via `#4776B4` AI widgets and telemetry numbers.
- **Achievements (1%)**: Target met by strictly isolating `#C9A84C` to achievement cards and milestone badges.

> [!WARNING]
> **Ratio Risk Areas to Monitor**:
> 1. *Over-use of Gold*: Avoid rendering gold borders on standard data cards (violates 1% budget).
> 2. *Over-use of Sapphire Blue*: Limit blue to AI Copilot and analytics cards; standard cards must remain neutral charcoal (violates 4% budget).

---

## 8. Risk Assessment & Controls

| Identified Risk Area | Potential Failure Mode | Prevention Control Rule |
| :--- | :--- | :--- |
| **Focus Rings** | Hidden or low-contrast focus rings on dark surfaces | Enforce `ring-2 ring-accent-mint` (`#34D399`) across all interactive elements. |
| **Charts** | Inconsistent series colors across different hubs | Standardize Chart Track 1 (Green `#10B981`) and Track 2 (Steel Blue `#4776B4`). |
| **Badges** | Unapproved colors (`purple`, `pink`, `cyan`) in legacy pages | Map all legacy badge props to system tokens (`emerald`, `intel`, `gold`). |
| **Hardcoded Hex Values** | Inline hex strings (`#...`) bypassing CSS variable updates | Enforce ESLint rule preventing inline hex strings in TSX components. |
| **Contrast Ratios** | Secondary gray text (`#9CA3AF`) becoming illegible | Verify 7.1:1 AAA contrast against `#12181C` surface background. |

---

## 9. Execution Checklist (Un-Executed)

- [ ] Step 1: Update `src/app/globals.css` with `@theme` block and `:root` HIM Executive Visual Language tokens.
- [ ] Step 2: Refactor `src/shared/ui/Card.tsx` with elevated charcoal surfaces and variant props (`default`, `intel`, `gold`).
- [ ] Step 3: Refactor `src/shared/ui/Button.tsx` with `primary`, `outline`, `intel`, and `danger` variants.
- [ ] Step 4: Refactor `src/shared/ui/Badge.tsx` with semantic status variants and legacy color aliases.
- [ ] Step 5: Refactor `src/shared/ui/Input.tsx`, `src/shared/ui/Skeleton.tsx`, and `src/shared/ui/Tabs.tsx`.
- [ ] Step 6: Refactor `MetricCard.tsx`, `ScoreRing.tsx`, `ModalDrawer.tsx`, and `QuickCaptureModal.tsx`.
- [ ] Step 7: Refactor specialized widgets (`AiCopilotWidget.tsx`, `AgentMeshWidget.tsx`, `RbacControlWidget.tsx`).
- [ ] Step 8: Audit `Sidebar.tsx`, `Header.tsx`, `Breadcrumbs.tsx`, `WorkspaceSwitcher.tsx`, and `commandPalette.tsx`.
- [ ] Step 9: Run TypeScript type check (`npx tsc --noEmit`) to verify 0 errors.
- [ ] Step 10: Run ESLint linter (`npm run lint`) to verify 0 errors/warnings.
- [ ] Step 11: Run Next.js production build (`npm run build`) to verify clean page compilation.

---

## 10. Final Governance Confirmation

> [!NOTE]
> **No code has been modified.**  
> **No implementation has been performed.**  
> **This document is an implementation blueprint only.**  
> **Awaiting explicit authorization before making any source-code changes.**
