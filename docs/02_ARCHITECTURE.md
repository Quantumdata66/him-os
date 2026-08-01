# 02 — Product Architecture & System Structure

> **HPS Chapter Reference:** Chapter 6 (Information Architecture) & Chapter 10 (Technical Architecture)  
> **Owner:** Abdulazeez Nurudeen Adedotun  
> **Version:** 1.5  

---

## 🏛️ 1. Architectural Philosophy

The architecture of HIM OS is built upon four fundamental principles:

1. **Life Before Features**: Navigation mirrors how ambitious people think about their lives—not how engineers organize database tables.
2. **One Home for Everything**: Every entity has exactly one authoritative logical home to eliminate duplication.
3. **Context Over Navigation**: Related information (notes, files, goals, deep work sessions) is surfaced contextually within the active workspace.
4. **Progressive Disclosure**: High-level clarity first; complexity and advanced settings appear on intentional inspection.

---

## 🗺️ 2. Top-Level Information Architecture (IA)

```
HIM OS Canonical Navigation Tree
├── 🏠 HOME (/dashboard & /)
│   └── Daily Command Center ("What deserves my attention right now?")
│       ├── Morning Brief & Personalized Greeting
│       ├── Today's Priorities (Top 3 MITs)
│       ├── 25m Deep Work Focus Session Timer
│       ├── Habit Progress Rings
│       ├── Current Mission
│       ├── Recent Notes & Finance Net Worth Snapshot
│       └── Weather & Prayer Schedule (Fits above the fold!)
│
├── 📅 TODAY (/today)
│   └── Execution Hub (Today's execution ONLY)
│       ├── Morning Execution Intention
│       ├── MITs Checklist & Time Blocks
│       ├── Daily Journal & Evening Reflection
│       └── Tomorrow Preview
│
├── 🛠️ BUILD (/build)
│   └── Everything Created
│       ├── Projects Hub & Milestones (/planning/projects)
│       ├── ⭐ Career Engine & Resume Exporter (/career, /career/exporter)
│       ├── Portfolio Showcase (/demo)
│       └── Repositories & Architecture
│
├── 🎓 LEARN (/learn)
│   └── Learning Ecosystem
│       ├── Reading Vault & Book Highlights (/learning)
│       ├── Technical Courses & Certifications
│       ├── Goethe B1 German Anki Flashcard Deck
│       └── Research Papers & Reading Notes
│
├── 📈 GROW (/grow)
│   └── Capital & Life Progress
│       ├── Financial OS & Net Worth (/finance)
│       ├── Multi-Tenant Venture Hub P&L (/businesses/ventures)
│       ├── Foreign Exchange Currency Risk Hedging (/finance/hedging)
│       ├── Tax Compliance Auditor (/finance/tax)
│       └── Invoices & Client Billing (/finance/invoices)
│
├── 🧠 THINK (/think)
│   └── Second Brain & Knowledge Base
│       ├── Workspace Studio (/workspace)
│       ├── Knowledge Graph Visualizer (/workspace/graph)
│       ├── Decision Vault (/decisions)
│       └── Notes Vault & Brain Dumps (/notes)
│
└── 🔄 REVIEW (/review)
    └── Reflection Rituals
        ├── Daily / Weekly / Monthly Reviews (/execution/weekly)
        ├── Automated Sprint Rollover Engine (/execution/weekly/rollover)
        ├── Achievements & Trophy Room (/achievements)
        └── Lessons Learned & Failure Analysis
```

---

## 🏗️ 3. Layered Technical Architecture

HIM OS follows a modern, cloud-native layered architecture built around independently evolving layers:

```
 USER (Web Client / PWA Mobile)
  │
 Presentation Layer (Next.js 15.5.21 App Router & React 19)
  │
 Application Layer (React Hooks, LocalStorage Adapters, EventBus)
  │
 Domain & Service Layer (FastAPI Microservices / Python 3.11+)
  │
 Persistence & Security Layer (Supabase Managed PostgreSQL & RLS Policies)
```

---

## 🔍 4. Global Navigation & Spotlight Search
- **Command Palette (`Ctrl + K`)**: Global Spotlight search returning instant results under 200ms across all 7 destinations, projects, notes, goals, books, and habits.
- **Global Quick Capture (`+`)**: Persistent floating action button accessible across all 47 routes for zero-friction capture of Tasks, Notes, Expenses, and Habit logs.
