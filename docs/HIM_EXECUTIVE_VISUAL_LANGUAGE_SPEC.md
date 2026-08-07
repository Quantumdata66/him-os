# HIM OS Version 1.5 — HIM Executive Visual Language Specification

**Document Classification:** Official Operating System Design Standard  
**Document Version:** 1.5.0-IMMUTABLE  
**Target System:** HIM OS (Personal Operating System)  
**Status:** Frozen & Immutable Master Specification  
**Author:** Lead Systems Architect & Executive Design Board  
**Effective Date:** August 7, 2026  

---

> [!IMPORTANT]
> **IMMUTABLE DESIGN SYSTEM SPECIFICATION**  
> This specification permanently establishes the visual, spatial, motion, and interaction principles of **HIM OS Version 1.5**. It forms an unyielding architectural contract. No aesthetic redesigns, inline color overrides, arbitrary Tailwind hex classes, or unauthorized component modifications are permitted during Version 1.5 implementation.

---

## 1. Executive Summary & Design Philosophy

The **HIM Executive Visual Language** defines the timeless, high-performance aesthetic foundation for HIM OS. It transforms the software into a quiet, calm, executive-grade Personal Operating System built for sustained cognitive focus, rapid context retrieval, and decision mastery.

```
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                    HIM EXECUTIVE VISUAL ARCHITECTURE                     │
   ├──────────────────────────┬───────────────────────┬───────────────────────┤
   │  STRUCTURE & SURFACES    │  IDENTITY & ACTIONS   │ INTELLIGENCE & AI     │
   │  65% Lifted Charcoal     │  10% Emerald / Mint   │ 4% Executive Sapphire │
   │  #0B0F12 / #12181C       │  #10B981 / #34D399    │ #4776B4 / #6495ED     │
   ├──────────────────────────┴───────────────────────┴───────────────────────┤
   │  NEUTRAL CANVAS (20% #1A2228)  │  SINGLE EXECUTIVE GOLD (1% #C9A84C)     │
   └────────────────────────────────┴──────────────────────────────────────────┘
```

### Visual Tone & Attributes
The interface embodies six permanent qualities:
- **Calm**: Low lumen emission, quiet background surfaces, absence of visual noise.
- **Premium**: Precise spatial alignment, tactile 8-point spatial rhythm, subtle crisp borders (`#28353D`).
- **Intelligent**: Distinct desaturated Sapphire indicator track (`#4776B4`) for AI insights and telemetry.
- **Modern**: Clean, high-performance typography and collision-safe keyboard workflows.
- **Executive**: Clear visual hierarchy; critical metrics are immediately scannable.
- **Long-lasting**: Designed to remain relevant, pristine, and authoritative five years from now.

> [!CAUTION]
> **Prohibited Aesthetics**: The interface must NEVER appear **trendy**, **gaming-focused**, **neon-lit**, or **"AI flashy."** Glowing neon gradients, heavy glassmorphic overlays, floating decorative bubbles, and un-throttled animations are strictly forbidden.

---

## 2. Visual Philosophy Principles

Every layout, component, micro-interaction, and visual decision is governed by five mandatory principles:

### Principle 1 — HIM Executive Visual Language
The design system operates under a single unified visual language. Component styles are strictly derived from system tokens, eliminating ad-hoc styling and visual fragmentation.

### Principle 2 — Color Must Earn Attention
Color is never decorative. The default state of background canvas, structural chrome, card surfaces, and body text is neutral monochrome (charcoal, slate, and muted gray). Color is introduced solely to communicate meaning:
- **Green**: Affirmative execution, active navigation, and primary call-to-actions.
- **Executive Sapphire**: AI Copilot insights, telemetry processing, and analytical intelligence.
- **Single Gold (`#C9A84C`)**: Executive milestone achievements and lifetime awards.

### Principle 3 — Calm Before Action
The interface remains visually quiet until meaningful user interaction occurs. The operating system disappears into the background while the executive works. Only actionable tasks, AI recommendations, system alerts, and milestones deserve visual emphasis.

### Principle 4 — Typography Communicates Hierarchy Before Decoration
Typography exists strictly to improve comprehension, scannability, and structural order. Font families are bound to structural roles and cannot be mixed for decorative effect.

### Principle 5 — Motion Must Reinforce Understanding
Animation exists only to explain spatial relationships, context transitions, or interaction state changes. Motion must feel effortless, instant, and purposeful. Animating for entertainment or visual flair is prohibited.

---

## 3. Color System & Governance

### 3.1 Color Pillars & Rules

```
┌─────────────────┬───────────┬───────────────────────────────────┬────────────────────────────────────┐
│ Color Pillar    │ Hex Token │ Permitted Locations               │ FORBIDDEN Locations                │
├─────────────────┼───────────┼───────────────────────────────────┼────────────────────────────────────┤
│ Structure       │ #0B0F12   │ Viewport Canvas, Shell Background │ Action Buttons, Badges, Charts     │
│ Surface         │ #12181C   │ Sidebar, Header Bar, Modals       │ Primary Actions, Data Series       │
│ Elevated        │ #1A2228   │ Cards, Inputs, Dropdown Menus     │ Top Header Bar, Viewport Canvas    │
│ Identity        │ #10B981   │ Primary Buttons, Active Nav       │ Background Canvas, Neutral Cards   │
│ Mint Text       │ #34D399   │ Tab Active Labels, Progress       │ Body Copy, Unselected Labels       │
│ Intel Sapphire  │ #4776B4   │ AI Copilot Widgets, Telemetry     │ Primary Actions, Sidebar Active    │
│ Single Gold     │ #C9A84C   │ Milestones, Awards, XP Badges     │ Buttons, Chrome, Forms, Navigation │
└─────────────────┴───────────┴───────────────────────────────────┴────────────────────────────────────┘
```

> [!CAUTION]
> **Strict Gold Token Boundary**: `--accent-gold` (`#C9A84C`) is the ONLY gold token in HIM OS Version 1.5. It MUST NEVER be used for primary action buttons, hover states, input borders, general text, or sidebar links. Gold is strictly reserved for:
> 1. Lifetime Achievements & Awards
> 2. Executive Milestones & Unlocks
> 3. Executive Badges
> 4. Long-term Streak Celebrations
> 5. Year-end Summaries & Rollover Celebrations

### 3.2 Semantic Status Color System

| Status Role | Hex Code | Tailwind Class | Semantic Meaning & Trigger |
| :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | `text-emerald-500` / `bg-emerald-500` | Task completion, positive ROI, database sync verified, system online. |
| **Warning** | `#F59E0B` | `text-amber-500` / `bg-amber-500` | Approaching deadlines (<2h), high workload warning, capacity limits. |
| **Danger** | `#EF4444` | `text-red-500` / `bg-red-500` | Overdue tasks, security audit failure, broken API sync, data loss risk. |
| **Information** | `#4776B4` | `text-steel-500` / `bg-steel-500` | System notices, AI Copilot recommendations, neutral research updates. |

---

## 4. Color Distribution Philosophy (65 / 20 / 10 / 4 / 1)

To preserve executive calm and prevent visual fatigue, every screen enforces the following chromatic ratio:

```
   ┌──────────────────────────────────────────────────────────────────────────┐
   │                     EXECUTIVE COLOR DISTRIBUTION RATIO                   │
   ├────────────────────────────────────────┬─────────────────────────────────┤
   │ 65% Lifted Charcoal Background         │ Base Viewport & Spatial Canvas  │
   │ 20% Neutral Secondary Surfaces         │ Cards, Input Surfaces, Header   │
   │ 10% Identity Emerald / Mint Green      │ Active Navigation, Primary CTA  │
   │  4% Executive Sapphire (Intelligence)  │ AI Telemetry & Analytics Feeds  │
   │  1% Single Gold (#C9A84C)              │ Milestones & Awards ONLY        │
   └────────────────────────────────────────┴─────────────────────────────────┘
```

### Why This Ratio Preserves Executive Calm:
- **65% Charcoal Dominance**: Minimizes display lumen output and glare, eliminating eye fatigue during 12-hour executive work sessions.
- **20% Neutral Surface Fills**: Establishes structural container bounds without introducing competing colors.
- **10% Green Focal Points**: Ensures critical operational actions (`Save`, `Execute`, `Complete`) are instantly recognizable in <50ms scan time.
- **4% Executive Sapphire Accent**: Isolates AI Copilot recommendations and cognitive telemetry onto a dedicated desaturated blue track.
- **1% Gold Rarity**: Protects the psychological prestige of unlocking milestones and long-term goal completions.

---

## 5. Token Master Specification

### 5.1 Structure & Surface Tokens
- **`--color-bg-primary` (`#0B0F12`)**:  
  - *Purpose*: Base viewport canvas background.  
  - *Usage*: Applied to `<body>` and main layout container.  
  - *Restrictions*: Never apply to cards, modals, or inputs.
- **`--color-bg-surface` (`#12181C`)**:  
  - *Purpose*: Chrome framework surfaces.  
  - *Usage*: Applied to Header bar, Sidebar, and drawer backgrounds.  
  - *Restrictions*: Do not use for primary CTA buttons.
- **`--color-bg-elevated` (`#1A2228`)**:  
  - *Purpose*: Content container surfaces.  
  - *Usage*: Cards, table containers, popovers, dropdown lists, text inputs.  
  - *Restrictions*: Do not use for top header background.
- **`--color-bg-subtle` (`#222C34`)**:  
  - *Purpose*: Interactive hover fills and secondary container backgrounds.  
  - *Usage*: Table row hover, list item hover, secondary button fill.
- **`--color-border-subtle` (`#28353D`)**:  
  - *Purpose*: Crisp structural demarcation borders.  
  - *Usage*: Card borders, table grid lines, header bottom border, sidebar right border.
- **`--color-border-hover` (`#10B981`)**:  
  - *Purpose*: Hover focus feedback on interactive elements.

### 5.2 Identity & Action Tokens (Green)
- **`--color-accent-emerald` (`#10B981`)**:  
  - *Purpose*: Primary executive action trigger and brand identity color.  
  - *Usage*: Primary button background, active tab indicators, completed task checkboxes.  
  - *Restrictions*: Do not use as large card background fill.
- **`--color-accent-mint` (`#34D399`)**:  
  - *Purpose*: High-contrast text accent and telemetry text.  
  - *Usage*: Active navigation label text, positive metric numbers, tab highlight labels.

### 5.3 Intelligence Tokens (Executive Sapphire)
- **`--color-intel-sapphire` (`#4776B4`)**:  
  - *Purpose*: Intelligence track primary accent.  
  - *Usage*: AI Copilot widget headers, agent mesh triggers, data analytics primary series.  
  - *Restrictions*: Do not use for standard primary submit buttons.
- **`--color-intel-slate` (`#6495ED`)**:  
  - *Purpose*: Telemetry text and status badges in AI/analytics views.

### 5.4 Achievement Token (Single Gold)
- **`--color-accent-gold` (`#C9A84C`)**:  
  - *Purpose*: Single unified executive gold token for milestone achievements.  
  - *Usage*: Award card border, milestone badge, year-end summary highlight.  
  - *Restrictions*: STICKTLY PROHIBITED outside achievement & milestone features.

### 5.5 Focus Ring & Elevation Tokens
- **`--focus-ring-emerald`**: `focus:ring-2 focus:ring-[#34D399] focus:outline-none`
- **`--focus-ring-sapphire`**: `focus:ring-2 focus:ring-[#6495ED] focus:outline-none`
- **`--shadow-surface`**: `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5)`
- **`--shadow-glow-emerald`**: `box-shadow: 0 0 25px -5px rgba(16, 185, 129, 0.15)`
- **`--shadow-glow-sapphire`**: `box-shadow: 0 0 25px -5px rgba(71, 118, 180, 0.15)`

### 5.6 8-Point Spatial Grid Tokens
- `--spacing-1`: `4px`
- `--spacing-2`: `8px`
- `--spacing-3`: `12px`
- `--spacing-4`: `16px`
- `--spacing-6`: `24px`
- `--spacing-8`: `32px`
- `--spacing-12`: `48px`
- `--spacing-16`: `64px`

---

## 6. Component Color Governance

Below is the binding color governance for 20 component categories across HIM OS:

```
┌─────────────────────────┬─────────────────────────┬─────────────────────────┬──────────────────────────────────────┐
│ Component Category      │ Primary Color           │ Secondary Color         │ Interactive States (Hover/Focus/Press)│
├─────────────────────────┼─────────────────────────┼─────────────────────────┼──────────────────────────────────────┤
│ 1. Application Shell    │ #12181C (Surface)       │ #28353D (Border)        │ Nav Hover: #222C34 | Active: #10B981  │
│ 2. Sidebar              │ #12181C (Surface)       │ #34D399 (Active Mint)   │ Item Hover: #1A2228 | Focus: Mint Ring│
│ 3. Header Bar           │ #12181C (Surface)       │ #28353D (Border)        │ Search Pill Hover: #10B981 Border    │
│ 4. Command Palette      │ #12181C (Surface)       │ #34D399 (Mint Highlight)│ Item Select: #1A2228 + Mint Text     │
│ 5. Cards                │ #1A2228 (Elevated)      │ #28353D (Subtle Border) │ Card Hover: #10B981 Border           │
│ 6. Buttons (Primary)    │ #10B981 (Emerald)       │ #0B0F12 (Text)          │ Hover: #059669 | Active: Scale [0.98]│
│ 7. Buttons (Outline)    │ #1A2228 (Elevated)      │ #F9FAFB (Text)          │ Hover: #28353D | Border: #10B981     │
│ 8. Badges (Standard)    │ #1A2228 (Elevated)      │ #9CA3AF (Secondary)     │ Hover: Opacity 90%                   │
│ 9. Badges (Mint)        │ rgba(16,185,129,0.15)   │ #34D399 (Mint Text)     │ Static indicator                     │
│ 10. Tables              │ #1A2228 (Elevated Header)│#28353D (Grid Lines)     │ Row Hover: #222C34                   │
│ 11. Charts              │ Track 1: #10B981 Emerald│ Track 2: #4776B4 Steel  │ Tooltip Hover: #12181C Popover       │
│ 12. Forms & Inputs      │ #1A2228 (Elevated)      │ #28353D (Border)        │ Focus: #34D399 Ring + #10B981 Border │
│ 13. Dialogs / Modals    │ #12181C (Surface)       │ #28353D (Border)        │ Backdrop: black/75 backdrop-blur-sm  │
│ 14. Notifications       │ #12181C (Surface)       │ #34D399 (Status Dot)    │ Item Hover: #1A2228                  │
│ 15. AI Copilot Widget   │ #4776B4 (Steel-Blue)    │ #6495ED (Slate Text)    │ Focus: #6495ED Ring                  │
│ 16. Analytics Engine    │ #4776B4 (Steel-Blue)    │ #34D399 (Mint Growth)   │ Card Hover: Steel Border             │
│ 17. Knowledge Graph     │ #1A2228 (Elevated Canvas)│#4776B4 (Node Line)      │ Node Select: #34D399 Mint Pulse      │
│ 18. Financial Dashboard │ #10B981 (Emerald Net)   │ #4776B4 (Cash Flow)     │ Metric Card Hover: #10B981 Border    │
│ 19. Habit & Learning    │ #34D399 (Mint Streak)   │ #6495ED (Anki Retention)│ Checkbox Focus: Mint Ring            │
│ 20. Achievements Card   │ #C9A84C (Gold Accent)   │ rgba(201,168,76,0.15)   │ Card Hover: Gold Glow (#C9A84C)      │
└─────────────────────────┴─────────────────────────┴─────────────────────────┴──────────────────────────────────────┘
```

---

## 7. Typography Scoping Rules

Typography is bound by **Decision 002** rules to preserve pristine vertical alignment across UI chrome:

```
┌─────────────────────────┬───────────────────────────────┬────────────────────────────────────────────────────┐
│ Font Family             │ Scoped Locations              │ Absolute PROHIBITIONS                              │
├─────────────────────────┼───────────────────────────────┼────────────────────────────────────────────────────┤
│ Playfair Display        │ ONLY Page Hero H1 Headings    │ FORBIDDEN in Sidebar, Header, Buttons, Inputs, Cards│
│ Inter (Sans-Serif)      │ ALL UI Chrome & Body Text     │ Do not use monospace data numbers in plain body copy│
│ JetBrains Mono          │ Telemetry, Metrics, Shortcuts │ FORBIDDEN for primary headings or paragraph copy   │
└─────────────────────────┴───────────────────────────────┴────────────────────────────────────────────────────┘
```

---

## 8. Motion System & Choreography

### 8.1 Motion Philosophy
Animation exists solely to provide spatial clarity and confirm state changes. Transitions are instantaneous, predictable, and physically grounded.

### 8.2 Standard Motion Tokens
- **Fast (`150ms`)**: `transition-all duration-150 ease-out` — Button hovers, checkbox toggles, tab switches.
- **Normal (`200ms`)**: `transition-all duration-200 ease-out` — Dropdown popovers, notification menus, modal overlays.
- **Slow (`300ms`)**: `transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)` — Sidebar expand/collapse, mobile off-canvas drawer slide.

### 8.3 Choreography Rules by Component
- **Command Palette (`Ctrl+K`)**: Fades in over `150ms` with subtle 2% scale-up (`scale-[0.98]` -> `scale-100`).
- **Sidebar Collapse (`[`)**: Smooth `300ms` width interpolation from `256px` to `64px` using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Dropdown Popovers**: Slide down 4px while fading in over `150ms`.
- **Reduced Motion**: All animations MUST respect `@media (prefers-reduced-motion: reduce)` by disabling transform transitions and using instantaneous visibility switches.

---

## 9. Accessibility (a11y) & WCAG 2.1 AA Compliance

### 9.1 Contrast Ratio Verification Matrix

| Foreground Element | Background Surface | Contrast Ratio | WCAG 2.1 AA Status |
| :--- | :--- | :--- | :--- |
| **`text-primary` (`#F9FAFB`)** | `bg-primary` (`#0B0F12`) | **17.8:1** | **PASS (AAA)** |
| **`text-secondary` (`#9CA3AF`)**| `bg-surface` (`#12181C`) | **7.1:1** | **PASS (AAA)** |
| **`accent-mint` (`#34D399`)** | `bg-elevated` (`#1A2228`) | **7.8:1** | **PASS (AAA)** |
| **`intel-slate` (`#6495ED`)** | `bg-elevated` (`#1A2228`) | **7.5:1** | **PASS (AAA)** |
| **`accent-gold` (`#C9A84C`)** | `bg-elevated` (`#1A2228`) | **6.4:1** | **PASS (AA)** |
| **`accent-emerald` (`#10B981`)**| `bg-primary` (`#0B0F12`) | **6.6:1** | **PASS (AA)** |
| **`intel-steel` (`#4776B4`)** | `bg-primary` (`#0B0F12`) | **4.8:1** | **PASS (AA)** |

### 9.2 Color Independence Rule
No UI component may rely on color alone to convey state or criticality. Every colored badge or indicator MUST include an accompanying icon, label, or structural shape differentiation.

---

## 10. Non-Negotiable Implementation Rules

During HIM OS Version 1.5 implementation, developers and designers MUST NOT:
1. Modify Information Architecture or add new routes.
2. Alter shell geometry (`56px` Header, `256px`/`64px` Sidebar, `1440px` Viewport).
3. Introduce unauthorized accent colors outside Emerald, Steel-Blue, and Gold (`#C9A84C`).
4. Apply Playfair Display font inside UI chrome components.
5. Use inline hex color values (`#...`) inside TSX files.
6. Apply decorative un-throttled animations or heavy glassmorphic overlays.

---

## 11. Phase 3 Implementation Rules for Developers

When implementing **Phase 3: Design System Primitives**, developers MUST adhere to the following mandatory rules:

1. **Tokens Only**: Replace legacy hardcoded prototype colors (`bg-gray-900`, `border-gray-800`, `text-gray-400`, `#C9A84C` in prototype cards) strictly using the official tokens registered in `globals.css` (`bg-bg-elevated`, `border-border-subtle`, `text-text-secondary`, `text-accent-mint`).
2. **Zero Inline Hex Strings**: Never write inline hex strings in TSX components (`style={{ color: '#10B981' }}`). Use CSS class utilities (`text-accent-emerald`).
3. **No Arbitrary Tailwind Utilities**: Arbitrary values like `bg-[#071A12]` or `p-[18px]` are strictly forbidden. Use standard grid classes (`p-4`, `p-6`) and design tokens (`bg-bg-primary`).
4. **Build Verification Required**: Every primitive component created in Phase 3 must pass `npx tsc --noEmit` and `npm run lint` before commit.

---

> [!NOTE]
> The **HIM Executive Visual Language Specification** is officially **LOCKED AND FROZEN**. It stands as the permanent aesthetic authority for HIM OS Version 1.5.
