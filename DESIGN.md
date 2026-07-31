# HIM OS — Design System & Visual Philosophy Summary

> **Design North Star:** *"Does this help the user execute what matters with greater clarity, less friction, and more consistency?"*

---

## 🎨 Palette Tokens (Deep Forest Green Identity)

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Deep Forest** | `#071A12` | Primary Application Background (Green-tinted dark mode for warmth & zero eye fatigue) |
| **Dark Evergreen** | `#0F2D20` | Secondary Background & Elevated Baseline Surface |
| **Charcoal Green** | `#163526` | Primary Card Surfaces (`rounded-[18px]`) |
| **Emerald Slate** | `#1D4735` | Hover States & Dialog Modal Overlays |
| **Emerald Green** | `#22C55E` | Primary Action Buttons (`rounded-[12px]`) & Selected Progress Rings |
| **Mint Green** | `#4ADE80` | Secondary Highlights, Trend Charts & Sub-Agent Badges |

---

## 🔤 Typography Hierarchy
- **Headings**: `Playfair Display`, serif (`36px` titles, `28px` section headings, `20px` card titles)
- **Body UI**: `Inter`, sans-serif (`16px` body, `14px` caption, `12px` labels)
- **Code & Telemetry**: `JetBrains Mono`, monospace (`14px` monospace metrics, pings, net worth)

---

## 💎 Design Inspiration & Restraint
- **Apple & Linear Restraint**: Generous white space, calm confidence, max 3-level navigation depth.
- **Raycast & Spotlight**: Global `Ctrl + K` Command Palette for lighting fast keyboard navigation.
- **Skeleton Loaders**: Layout-preserving animated skeleton loaders (`.skeleton`) instead of spinning wheels.

👉 For detailed component contracts and CSS specifications, refer to [docs/03_DESIGN_SYSTEM.md](docs/03_DESIGN_SYSTEM.md).
