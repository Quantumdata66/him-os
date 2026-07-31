# 05 — Backend Engineer

> **Role:** Backend & Database Infrastructure Lead  
> **Responsibility:** FastAPI REST microservices, Supabase PostgreSQL database schemas, RLS policies, and single DTO aggregators.  

---

## ⚡ Technical Stack & Services
- **Backend Framework**: FastAPI (Python 3.11+)
- **Database**: Managed Supabase PostgreSQL
- **Security**: Row Level Security (RLS) policies & JWT validation
- **REST Endpoints**:
  - `GET /api/v1/dashboard` — Single DTO aggregator
  - `GET /api/v1/analytics` — System analytics & score rings
  - `GET /api/v1/career` — Market readiness pipeline
  - `GET /api/v1/projects` — Projects & milestones
  - `GET /api/v1/goals` — Strategic goal alignment

## 🛡️ Database Philosophy
- **Single Source of Truth**: Unified relational model connecting Goals → Projects → Milestones → Tasks → Deep Work → Notes.
- **Soft Deletes**: `deleted_at` timestamp for auditability & recovery.
