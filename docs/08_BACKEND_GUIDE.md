# 08 — Backend Engineering Guide

> **HPS Chapter Reference:** Chapter 10 (Backend Architecture) & Chapter 17 (API Specification)  
> **Owner:** Abdulazeez Nurudeen Adedotun  
> **Version:** 1.5  

---

## ⚡ 1. Backend Architecture & Stack

- **Framework**: FastAPI (Python 3.11+) REST Microservices
- **Database**: Supabase Managed PostgreSQL
- **Security**: Row Level Security (RLS) policies, JWT validation, HTTPS/TLS
- **Event Bus**: Event-driven real-time sync engine (`RealtimeSyncEngine`)

---

## ⚙️ 2. Core REST Endpoint Catalog

```text
GET    /api/v1/dashboard       Retrieve single DTO command center data
GET    /api/v1/analytics       Retrieve 7-engine Life OS analytics
GET    /api/v1/career          Retrieve market readiness pipeline report
GET    /api/v1/projects        List projects & milestones
POST   /api/v1/projects        Create new project
GET    /api/v1/goals           Retrieve strategic quarterly goals
POST   /api/v1/habits/log      Record habit completion log
```
