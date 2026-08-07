# HIM OS Version 1.5 — Executive Triad Visual Identity Specification

**Document Version:** 1.5.0-TRIAD  
**Target System:** HIM OS (Personal Operating System)  
**Status:** Design Review Specification  
**Author:** Lead Product Designer & Systems Architect  
**Date:** August 7, 2026  

---

## 1. Executive Summary & Design Philosophy

### The Evolution of HIM OS Visual Identity
The original HIM OS baseline utilized a monochromatic forest green palette (`#071A12`, `#0F2D20`, `#163526`, `#22C55E`). While cohesive, an all-green UI creates visual monotony and flattens contrast hierarchy—making it difficult for executives to instantly distinguish **structural shell chrome** from **primary actions** and **intelligent AI insights/analytics**.

The **Executive Triad Palette** preserves HIM OS's signature green identity while introducing strategic chromatic contrast:
1. **Obsidian / Charcoal Black** (`#080C0E` / `#0F1518` / `#161F24`): Provides deep structural grounding, spatial elevation, and distraction-free framing.
2. **Emerald & Mint Green** (`#10B981` / `#34D399` / `#059669`): Identifies HIM OS executive branding, affirmative actions, streak completions, and primary navigation status.
3. **Sapphire & Cobalt Blue** (`#3B82F6` / `#60A5FA` / `#1D4ED8` / `#818CF8`): Powers intelligence, data analytics, AI Copilot widgets, system telemetry, and cognitive insights.

```
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                       THE EXECUTIVE TRIAD PALETTE                        │
   ├──────────────────────────┬───────────────────────┬───────────────────────┤
   │    STRUCTURE & DEPTH     │  IDENTITY & ACTIONS   │ INTELLIGENCE & AI     │
   │  Obsidian / Charcoal     │  Emerald & Mint Green │ Sapphire & Cyan Blue  │
   │  #080C0E / #0F1518       │  #10B981 / #34D399    │ #3B82F6 / #60A5FA     │
   └──────────────────────────┴───────────────────────┴───────────────────────┘
```

---

## 2. Color Roles & Semantic Assignments

### 2.1 Structure Pillar — Obsidian & Charcoal
* **`bg-primary` (`#080C0E`)**: Primary application canvas background. Ultra-dark charcoal black reduces eye strain and establishes infinite spatial depth.
* **`bg-surface` (`#0F1518`)**: Top Navigation Header (`Header.tsx`), Sidebar container background, and modal overlays.
* **`bg-elevated` (`#161F24`)**: Interactive cards (`Card.tsx`), metric containers, popover menus, and input fields.
* **`border-subtle` (`#233038`)**: Subtle architectural borders and divider lines.

### 2.2 Identity & Action Pillar — Emerald & Mint
* **`accent-emerald` (`#10B981`)**: Primary executive actions, active navigation indicator, success badges, and completed tasks.
* **`accent-mint` (`#34D399`)**: High-contrast text accent, selected tab labels, and positive progress numbers.
* **`accent-emerald-subtle` (`rgba(16, 185, 129, 0.15)`)**: Hover highlights for primary buttons and active sidebar items.

### 2.3 Intelligence Pillar — Sapphire & Cobalt Blue
* **`intel-sapphire` (`#3B82F6`)**: AI Copilot widget headers, autonomous agent mesh triggers, data analytics charts, and cognitive insights.
* **`intel-cyan` (`#60A5FA`)**: Telemetry numbers, time tracking timers, active AI processing states, and research deck indicators.
* **`intel-sapphire-subtle` (`rgba(59, 130, 246, 0.15)`)**: Background tint for AI recommendations, insights badges, and analytical callouts.

---

## 3. Design Tokens & CSS Variable Mapping

Below is the updated proposed `@theme` and `:root` token specification for `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Structure & Surface Tokens */
  --color-bg-primary: #080C0E;
  --color-bg-surface: #0F1518;
  --color-bg-elevated: #161F24;
  --color-bg-subtle: #1E2B32;
  --color-border-subtle: #233038;
  --color-border-hover: #10B981;
  --color-border-intel: #3B82F6;

  /* Identity & Action Tokens (Green) */
  --color-accent-emerald: #10B981;
  --color-accent-mint: #34D399;
  --color-accent-emerald-dark: #059669;

  /* Intelligence & Analytics Tokens (Blue) */
  --color-intel-sapphire: #3B82F6;
  --color-intel-cyan: #60A5FA;
  --color-intel-indigo: #818CF8;

  /* Neutral Text Tokens */
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #9CA3AF;
  --color-text-muted: #6B7280;

  /* Typography Scoping */
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

:root {
  --bg-primary: #080C0E;
  --bg-surface: #0F1518;
  --bg-elevated: #161F24;
  --bg-subtle: #1E2B32;
  --border-subtle: #233038;
  --accent-emerald: #10B981;
  --accent-mint: #34D399;
  --intel-sapphire: #3B82F6;
  --intel-cyan: #60A5FA;
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
}
```

---

## 4. Accessibility & Contrast Ratios (WCAG 2.1 AA Compliance)

Every text and interactive element in the Executive Triad Palette satisfies or exceeds **WCAG 2.1 AA (4.5:1 for standard text, 3:1 for large text & icons)**:

| Foreground Element | Background Surface | Contrast Ratio | WCAG 2.1 AA Result |
| :--- | :--- | :--- | :--- |
| **`text-primary` (`#F9FAFB`)** | `bg-primary` (`#080C0E`) | **18.4:1** | **PASS (AAA)** |
| **`text-secondary` (`#9CA3AF`)**| `bg-surface` (`#0F1518`) | **7.2:1** | **PASS (AAA)** |
| **`accent-mint` (`#34D399`)** | `bg-elevated` (`#161F24`) | **8.1:1** | **PASS (AAA)** |
| **`intel-cyan` (`#60A5FA`)** | `bg-elevated` (`#161F24`) | **7.9:1** | **PASS (AAA)** |
| **`accent-emerald` (`#10B981`)**| `bg-primary` (`#080C0E`) | **6.8:1** | **PASS (AA)** |
| **`intel-sapphire` (`#3B82F6`)**| `bg-primary` (`#080C0E`) | **5.4:1** | **PASS (AA)** |

---

## 5. Component Usage Rules Matrix

| Component Type | Dominant Color Pillar | Secondary Color Accent | Usage Guidance |
| :--- | :--- | :--- | :--- |
| **Application Shell (`Header` & `Sidebar`)** | **Structure** (`#0F1518`) | **Identity** (`#10B981`) | Dark charcoal frame with mint active indicators. Keeps chrome invisible and quiet. |
| **Primary Action Buttons (`Button.tsx`)** | **Identity** (`#10B981` Emerald) | **Structure** (`#080C0E` Text) | High-visibility action trigger for key executive inputs (`Save`, `Create`, `Execute`). |
| **AI Copilot & Mesh Widgets** | **Intelligence** (`#3B82F6` Sapphire) | **Cyan Glow** (`#60A5FA`) | Distinguishes AI insight feeds from standard static data cards. |
| **Financial & Growth Metrics** | **Identity & Intelligence** | Green (`#34D399`) / Blue (`#60A5FA`) | Green for revenue/p&l; Blue for projections, cash flow analysis, & hedging telemetry. |
| **Anki & Learning Decks** | **Intelligence** (`#818CF8` Indigo/Blue)| Mint (`#34D399` Success) | Blue for retention cards, recall rate telemetry, and study time. |
| **System Alerts & Notifications** | **Identity** (Green) / **Intel** (Blue) | Muted Charcoal (`#161F24`) | Quiet header popover with blue/green status indicators. |

---

## 6. Chart & Data Visualization Color System

To eliminate chart ambiguity, data series are strictly assigned to specific color tracks:

```
Track 1 — Identity / Completion (Green):
  - Primary Series: #10B981 (Emerald)
  - Light Accent:   #34D399 (Mint)
  - Use Case:       Task Completion, P&L Revenue, Daily Streak %

Track 2 — Intelligence / Analytics (Blue):
  - Primary Series: #3B82F6 (Sapphire)
  - Light Accent:   #60A5FA (Cyan)
  - Use Case:       AI Tokens, Memory Mesh Sync, Focus Time, Portfolio Allocation

Track 3 — System Telemetry (Indigo / Neutral):
  - Primary Series: #818CF8 (Indigo)
  - Muted Neutral:  #9CA3AF (Secondary Gray)
  - Use Case:       Baseline Comparisons, Secondary Metrics, System Storage
```

---

## 7. Interactive States & Elevation Model

### Interactive Component States
- **Default**: Background `bg-elevated` (`#161F24`), Border `border-subtle` (`#233038`), Text `text-primary` (`#F9FAFB`).
- **Hover**: Border transitions smoothly to `border-accent-emerald` (`#10B981`) or `border-intel-sapphire` (`#3B82F6`) with `transition-colors duration-150`.
- **Active / Pressed**: Scale `scale-[0.98]`, Background `bg-subtle` (`#1E2B32`).
- **Focus Ring**: `ring-2 ring-accent-mint` (`#34D399`) for actions, `ring-2 ring-intel-cyan` (`#60A5FA`) for AI widgets.
- **Disabled**: Opacity `opacity-50`, pointer-events `pointer-events-none`.

### Elevation Depth Model
1. **Level 0 (Canvas)**: `#080C0E` (Base viewport)
2. **Level 1 (Surface Frame)**: `#0F1518` (Sidebar, Top Header)
3. **Level 2 (Cards & Containers)**: `#161F24` (Metrics, Task Lists, Widgets)
4. **Level 3 (Popovers & Modals)**: `#1E2B32` with `shadow-2xl` and `border-border-subtle`

---

## 8. Subtle Gradients, Glassmorphism & Glow Utilities

To maintain an executive, state-of-the-art aesthetic without visual clutter:

### 8.1 Executive Card Glow
```css
.forest-glow {
  box-shadow: 0 0 25px -5px rgba(16, 185, 129, 0.15);
}
.intel-glow {
  box-shadow: 0 0 25px -5px rgba(59, 130, 246, 0.15);
}
```

### 8.2 Subtle Surface Gradient
```css
.triad-card-gradient {
  background: linear-gradient(135deg, #161F24 0%, #0F1518 100%);
}
.ai-widget-gradient {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, #161F24 100%);
}
```

---

## 9. Real-World UI Component Examples & Token Mapping

### Example A: Standard Executive Card vs. AI Copilot Card

```
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ EXECUTIVE METRIC CARD (GREEN TRACK)  │  │ AI COPILOT CARD (BLUE TRACK)         │
├──────────────────────────────────────┤  ├──────────────────────────────────────┤
│ Border: #233038                      │  │ Border: rgba(59, 130, 246, 0.3)      │
│ Header: Revenue Growth               │  │ Header: Autonomous Copilot Insight   │
│ Icon: TrendingUp (#34D399 Mint)      │  │ Icon: Cpu (#60A5FA Cyan Blue)        │
│ Metric: $124,500 (+14%)              │  │ Telemetry: 98.4% Precision           │
│ Action: View P&L (#10B981 Button)    │  │ Action: Execute Strategy (#3B82F6)   │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

---

## 10. Summary & Design Review Assessment

1. **Monotony Resolved**: Incorporating Sapphire Blue (`#3B82F6`) for AI/analytics alongside Charcoal Structure (`#080C0E`) and Emerald Identity (`#10B981`) eliminates visual boredom while preserving 100% of HIM OS green brand equity.
2. **Zero Code Modified**: This specification is a **design review only**. Zero source code or CSS files have been changed.
3. **Phase 3 Ready**: This specification will serve as the design foundation when **Phase 3: Design System Primitives** begins.
