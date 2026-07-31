# 02 — Architecture

> **HPS Chapter Reference:** Chapter 6 & 10 — System Architecture & IA

---

## 🏛️ 7 Canonical Destinations

```
HIM OS Navigation Hierarchy
├── HOME (/dashboard) —— Daily Command Center
├── TODAY (/today) —— Execution Only
├── BUILD (/build) —— Projects, Career, Portfolio
├── LEARN (/learn) —— Books, Courses, German Anki
├── GROW (/grow) —— Finance, Net Worth, Ventures
├── THINK (/think) —— Second Brain & Knowledge Graph
└── REVIEW (/review) —— Daily/Weekly/Monthly Reviews
```

## 🏗️ Layered Architecture
`Presentation Layer (Next.js 15)` → `Application Services` → `FastAPI Backend` → `Supabase PostgreSQL`.
