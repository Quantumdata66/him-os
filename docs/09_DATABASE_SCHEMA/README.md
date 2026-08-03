# README — Database Schema

## Overview

`09_DATABASE_SCHEMA.md` defines the canonical data model for HIM OS.

This document serves as the single source of truth for all database-related decisions. It describes the structure, relationships, conventions, and future evolution of the PostgreSQL database powering the application.

The schema is designed around the philosophy that every aspect of a user's personal operating system—planning, execution, learning, finance, career, reflection, and AI—should be represented as structured, relational data.

---

## Purpose

This document exists to ensure that:

- Every engineer understands the database architecture.
- Frontend and backend developers share the same data model.
- AI coding agents generate database changes consistently.
- Future schema migrations remain predictable.
- New features integrate without breaking existing relationships.

---

## Intended Audience

This document should be read by:

- Backend Engineers
- Frontend Engineers
- Database Administrators
- AI Coding Agents (Cursor, Claude Code, Codex, etc.)
- Technical Architects
- Future Contributors

---

## What This Document Covers

- Database design philosophy
- Core entities
- Table definitions
- Entity relationships
- Foreign key strategy
- UUID conventions
- Row Level Security (RLS)
- Soft delete strategy
- Indexing strategy
- Migration guidelines
- Naming conventions
- Future database roadmap (Versions 2–5)

---

## Source of Truth

Whenever there is a conflict between implementation and documentation:

**This document is considered the authoritative reference for the database architecture.**

Database migrations should always be updated to remain consistent with this specification.

---

## Related Documentation

Read this document together with:

- `02_SYSTEM_ARCHITECTURE.md`
- `07_FRONTEND_GUIDE.md`
- `08_BACKEND_GUIDE.md`
- `10_AI_ARCHITECTURE.md`

These documents describe how the database integrates with the application, backend services, and future AI capabilities.

---

## Engineering Principles

The HIM OS database follows several core principles:

- Normalize data where appropriate.
- Avoid duplication.
- Use UUIDs for all primary keys.
- Protect all user data using Row Level Security.
- Prefer soft deletes over destructive deletes.
- Design for future extensibility.
- Keep relationships explicit through foreign keys.
- Ensure compatibility with future AI and analytics features.

---

## AI Agent Instructions

If you are an AI coding agent working on HIM OS:

Before modifying the database:

1. Read this document completely.
2. Do not invent new tables unless required.
3. Reuse existing entities whenever possible.
4. Preserve existing relationships.
5. Generate migrations rather than modifying historical ones.
6. Never remove production tables without explicit approval.
7. Keep schema changes backward compatible whenever possible.

---

## Maintenance

Whenever any of the following change, this document must also be updated:

- New tables
- New relationships
- Foreign keys
- Indexes
- Constraints
- RLS policies
- Database migrations
- Naming conventions

Documentation is considered part of the implementation.

---

## Status

**Current Version:** 1.5

**Status:** Production Ready

Maintained as part of the HIM OS Engineering Documentation Suite.