# HIM OS Version 1.5 — Design Decisions Record (ADR)

**Status:** Locked & Frozen  
**Version:** 1.5.0  
**Owner:** Abdulazeez Nurudeen Adedotun  
**Date:** August 7, 2026  

---

> [!IMPORTANT]
> **Source of Truth**: This document serves as the formal **Architecture & Design Decision Record (ADR)** for HIM OS Version 1.5. It records why specific design, interaction, and technical choices were made to prevent design drift, scope creep, and architectural regression during implementation.

---

## Change Control Policy

Version 1.5 documentation is strictly **frozen**.

No specification, architecture, UX, wireframe, or ADR may be modified during implementation unless **ALL** of the following conditions are met:

1. **A critical implementation blocker is identified.**
2. **The proposed change is documented.**
3. **The impact on previous decisions is analyzed.**
4. **The change is approved before implementation.**
5. **The ADR is updated with a new Decision Record.**

> [!CAUTION]
> **Zero Silent Modifications**: No implementation may silently modify the frozen specification under any circumstance.

---

## Non-Negotiable Implementation Rules

These rules are strict constraints. They **may not be violated** under any circumstance during Version 1.5 implementation:

1. **Do not add new pages.**
2. **Do not redesign Information Architecture.**
3. **Do not introduce new color palettes (HIM Executive Visual Language is locked).**
4. **Do not change typography hierarchy.**
5. **Do not change shell geometry.**
6. **Do not replace the 7 Canonical Hubs.**
7. **Do not implement features outside the active milestone.**
8. **Phase 2 Scope Boundary**: Replace hardcoded values **only** within shell-related components (`layout.tsx`, `Sidebar.tsx`, `Header.tsx`, `Breadcrumbs.tsx`, `WorkspaceSwitcher.tsx`, `NotificationPopover.tsx`). Do **not** perform repository-wide token migration. All remaining token migrations stay in their assigned phases.
9. **Every phase must build successfully (`npm run build`) before the next phase begins.**

---

## Documentation Stack Hierarchy

```
   README.md                        (Repository Entry Point)
      │
      ▼
   VERSION_1_5.md                   (Product Specification & Goals)
      │
      ▼
   Executive Shell Spec             (UX & Architectural Blueprint)
      │
      ▼
   Wireframes Spec                  (Visual Layout & Navigation Maps)
      │
      ▼
   DESIGN_DECISIONS.md              (ADR, Change Control & Non-Negotiable Rules)
      │
      ▼
   Implementation                   (Phase 1 Completed -> Phase 2 Next)
```

---

## Architectural & Design Decision Records

### Decision 001: Universal Command Entry over Desktop FAB
- **Status**: Locked
- **Context**: The initial prototype featured a persistent Floating Action Button (FAB) at bottom-right, a top header search button, and a sidebar command trigger. Multiple floating elements competed for user attention on desktop viewports.
- **Decision**: **Remove Desktop FAB**. The Command Palette (`Ctrl+K`) and Universal Quick Capture (`Ctrl+Shift+C`) become the supreme, unified entry points. Floating FAB exists *only* on mobile viewports (<1024px) where physical keyboards are absent.
- **Rationale**: Eliminates visual clutter on desktop, preserves 100% of `<main>` viewport canvas for content, and enforces a keyboard-first executive workflow.

---

### Decision 002: Restricted Playfair Display Typographic Scope
- **Status**: Locked
- **Context**: The design system originally used Playfair Display (Serif), Inter (Sans-Serif), and JetBrains Mono (Monospace) across UI chrome. Mixing serif and sans-serif fonts in dense buttons, sidebar links, and breadcrumbs caused visual dissonance and vertical alignment friction.
- **Decision**: **Restrict Playfair Display strictly to Hub Hero Headings (`h1`)**. All UI chrome (sidebar, top header, buttons, inputs, breadcrumbs, modal headers) uses Inter for maximum legibility. Data, status tags, and numerical balances use JetBrains Mono.
- **Rationale**: Creates a calm, executive feel while preserving pristine vertical baseline alignment across UI chrome.

---

### Decision 003: Collision-Safe Modifier Navigation (`Alt+1` to `Alt+7`)
- **Status**: Locked
- **Context**: Two-stroke sequence keybindings (`G` then `H`) risk firing accidentally when users focus text inputs, textareas, or rich text editors.
- **Decision**: **Adopt `Alt+1` through `Alt+7` modifier shortcuts** for jumping directly to the 7 Canonical Life Destinations (`Alt+1` = HOME, `Alt+2` = TODAY, `Alt+3` = BUILD, `Alt+4` = LEARN, `Alt+5` = GROW, `Alt+6` = THINK, `Alt+7` = REVIEW).
- **Rationale**: Completely eliminates keybinding collision risk within text inputs while preserving instantaneous one-touch navigation.

---

### Decision 004: Smart Max-Depth Breadcrumbs with Ellipsis Truncation
- **Status**: Locked
- **Context**: Deep sub-route paths (e.g. `HOME / BUILD / CAREER / PORTFOLIO / ITEM`) overflow the fixed 56px top navigation bar on compact 13-inch laptop viewports (<1280px).
- **Decision**: **Implement smart ellipsis collapse**. Breadcrumbs automatically collapse intermediate nodes into an interactive ellipsis (`HOME / ... / ITEM`) on compact viewports or paths deeper than 3 levels.
- **Rationale**: Prevents horizontal header scrolling and layout breaking while maintaining parent context clarity.

---

### Decision 005: Fixed Sidebar Widths (256px / 64px) & Explicit Expand Rules
- **Status**: Locked
- **Context**: Arbitrary drag-resizing and auto-expand-on-hover create visual layout reflow and accidental hover jitter when navigating near the left edge of the screen.
- **Decision**: **Enforce fixed widths (`256px` expanded, `64px` compact)**. Auto-expand on hover is explicitly forbidden. Sidebar toggle requires explicit user click or pressing `[` (left bracket).
- **Rationale**: Maintains rigid spatial geometry, prevents layout jitter, and gives the user predictable spatial control.

---

### Decision 006: Compact Notification Header Popover over Slide-out Drawer
- **Status**: Locked
- **Context**: A heavy 380px right-hand slide-out notification drawer added excessive UI surface area for a single-user executive operating system.
- **Decision**: **Replace drawer with a quiet Top-Bar Header Popover**. Notifications are accessed via a status-dot bell icon in the top header, opening a lightweight popover menu.
- **Rationale**: Reduces UI complexity, minimizes overlay state management, and keeps executive alerts quiet and unobtrusive.

---

### Decision 007: Workspaces defined as Operational Context Filters
- **Status**: Locked
- **Context**: "Workspace" was ambiguous in early specs—risking duplicate navigation trees or complex multi-tenant overhead.
- **Decision**: **Define 4 Operational Contexts**: `Personal`, `Business`, `Research`, `Development`. Switching workspaces filters the active data stream across the 7 Hubs without changing the 7 canonical IA destinations.
- **Rationale**: Preserves the 7 Canonical Life Destinations while enabling instant focus filtering between life domains.

---

### Decision 008: Content Width & Layout Boundary Rules
- **Status**: Locked
- **Context**: On ultra-wide displays (>1920px), unconstrained content stretches edge-to-edge, degrading line-length readability and visual hierarchy.
- **Decision**: **Enforce Content Width & Padding Rules**:
  - **Maximum width**: `1440px`
  - **Minimum content padding**: `24px`
  - **Ultra-wide displays**: Center content with auto margins (`mx-auto`).
  - **Edge-to-edge prohibition**: Never allow dashboard content to stretch edge-to-edge.
  - **Readable line-length**: Never exceed the readable line length established in Version 1.5.
- **Rationale**: Guarantees optimal line-length for executive readability and consistent spatial rhythm across all display sizes.

---

## Phased Implementation Execution Order

With Phase 1 Design, Wireframes, and Decision Records locked and frozen, the implementation will proceed through the following 6 sequential stages:

```
   1. Executive Foundation     (Dependencies, CSS Design Tokens, Font Config) -> COMPLETED
            │
            ▼
   2. Executive Shell          (Sidebar, Header, Breadcrumbs, Layout Container) -> NEXT
            │
            ▼
   3. Design System            (UI Primitives: Button, Card, Badge, Modal, Input)
            │
            ▼
   4. Data Architecture        (Supabase Repository Pattern + TanStack Query)
            │
            ▼
   5. Workspace Redesign       (7 Canonical Hub Page Overhauls)
            │
            ▼
   6. Testing & Release        (Accessibility, Responsiveness, Lighthouse 95+)
```
