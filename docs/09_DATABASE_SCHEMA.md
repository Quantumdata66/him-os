# 09 — Database Schema & Data Model

> **HPS Chapter Reference:** Chapter 11 — Database Architecture & Data Model  
> **Owner:** Abdulazeez Nurudeen Adedotun  
> **Version:** 1.5  

---

## 🗄️ 1. Database Philosophy & Common Columns

Every table in HIM OS follows uniform conventions:

```sql
id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id    UUID NOT NULL REFERENCES users(id),
created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
deleted_at TIMESTAMP WITH TIME ZONE NULL, -- Soft delete support
metadata   JSONB DEFAULT '{}'::jsonb      -- Flexible JSON metadata
```

---

## 📊 2. Core Entities & Relationships

- **Identity**: `users`, `profiles`, `preferences`, `sessions`
- **Planning**: `goals`, `projects`, `milestones`, `tasks`
- **Execution**: `daily_plans`, `deep_work_sessions`, `calendar_events`
- **Growth**: `habits`, `habit_logs`, `achievements`
- **Learning**: `books`, `courses`, `certifications`, `notes`
- **Reflection**: `journal_entries`, `reviews`, `decisions`
- **Finance**: `transactions`, `budgets`, `investments`
