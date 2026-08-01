# HIM OS — Database Schema & Data Architecture

**Version:** 1.5  
**Status:** Engineering Standard  
**Owner:** Abdulazeez Nurudeen Adedotun  

---

# Purpose

This document defines the complete data architecture for HIM OS.

It serves as the authoritative reference for:

- PostgreSQL schema design
- Table ownership
- Relationships
- Constraints
- Indexing strategy
- Row Level Security (RLS)
- Naming conventions
- Migrations
- Data lifecycle
- Performance optimization

All database changes must be reflected in this document before implementation.

---

# Database Philosophy

The database is the single source of truth.

Every piece of user data should exist in exactly one authoritative location.

The database should prioritize:

- Integrity
- Consistency
- Security
- Scalability
- Query performance
- Extensibility

Data duplication should be avoided unless required for performance.

---

# Database Technology

Provider

Supabase

Database Engine

PostgreSQL 17+

Authentication

Supabase Auth

Storage

Supabase Storage

Realtime

Supabase Realtime

Extensions

pgcrypto

uuid-ossp

pgvector (Version 3)

---

# High-Level Domain Model

The system is divided into domains.

Authentication

↓

Profiles

↓

Planning

↓

Execution

↓

Learning

↓

Career

↓

Finance

↓

Business

↓

Projects

↓

Knowledge

↓

Reviews

↓

Analytics

Each domain owns its own tables.

---

# Naming Standards

Tables

snake_case

Example

daily_tasks

Columns

snake_case

Foreign Keys

user_id

goal_id

project_id

Primary Keys

id UUID

Indexes

idx_table_column

Constraints

fk_

pk_

chk_

---

# Universal Columns

Every table should contain:

id

created_at

updated_at

user_id (where applicable)

deleted_at (soft delete)

version (future optimistic locking)

---

# Authentication Domain

## profiles

Purpose

Stores user identity and preferences.

Relationships

auth.users → profiles

Columns

id

full_name

email

avatar_url

timezone

locale

theme

created_at

updated_at

---

# Planning Domain

## goals

Stores long-term goals.

Relationships

profile → goals

Fields

title

description

category

status

priority

target_date

progress

---

## projects

Stores active projects.

Fields

name

objective

repository_url

deployment_url

status

technology_stack

---

## milestones

Linked to projects.

Tracks progress.

---

# Execution Domain

## daily_plans

Morning planning.

Fields

date

top_priority_1

top_priority_2

top_priority_3

reflection

gratitude

tomorrow_plan

---

## deep_work_sessions

Stores focus sessions.

Fields

duration

start_time

end_time

completed

project_id

---

## habits

Habit definitions.

---

## habit_logs

Daily habit completion.

Relationship

habit

↓

habit_logs

---

# Learning Domain

## books

Reading tracker.

Fields

title

author

status

progress

notes

---

## courses

Course progress.

Fields

provider

certificate_url

completion_percentage

---

## research_notes

Stores technical research.

Supports Markdown.

---

# Career Domain

## career_goals

Professional roadmap.

---

## job_applications

Application tracker.

Fields

company

position

status

salary

country

---

## interviews

Interview preparation.

---

# Finance Domain

## accounts

Financial accounts.

Examples

Bank

PiggyVest

Investment

Crypto

Cash

---

## transactions

Every financial movement.

Fields

amount

currency

category

notes

transaction_date

---

## budgets

Monthly budgeting.

---

## investments

Portfolio tracking.

Fields

ticker

quantity

purchase_price

current_price

broker

---

# Business Domain

## businesses

Business registry.

---

## business_transactions

Revenue

Expenses

Profit

---

## inventory

Products

Stock

Pricing

Suppliers

---

# Knowledge Domain

## notes

Markdown notes.

---

## decisions

Decision journal.

Fields

decision

reason

outcome

confidence

review_date

---

## knowledge_links

Graph relationships.

Source

↓

Target

---

# Review Domain

## daily_reviews

---

## weekly_reviews

---

## monthly_reviews

---

## quarterly_reviews

---

## yearly_reviews

Each stores:

Wins

Lessons

Failures

Opportunities

Action Items

---

# Analytics Domain

Derived tables only.

Never manually edited.

Examples

habit_statistics

finance_summary

learning_progress

goal_completion

Used for dashboards.

---

# Relationships

profiles

↓

goals

↓

projects

↓

milestones

↓

deep_work_sessions

Profiles own every user-facing entity.

---

# Row Level Security

Every table uses RLS.

Policies

SELECT

INSERT

UPDATE

DELETE

Users may only access rows where:

user_id = auth.uid()

No exceptions.

---

# Soft Deletes

Never permanently remove user data.

Use

deleted_at

Queries exclude deleted records by default.

---

# UUID Strategy

Every primary key uses UUID v4.

Never expose sequential IDs.

---

# Indexing Standards

Always index:

Foreign keys

Dates

Frequently filtered columns

Examples

user_id

status

created_at

goal_id

project_id

Avoid unnecessary indexes.

---

# Transactions

Use transactions whenever:

Creating related records.

Updating financial data.

Completing reviews.

Moving projects.

Atomic operations only.

---

# Constraints

Use database constraints.

NOT NULL

CHECK

UNIQUE

FOREIGN KEY

Do not rely solely on frontend validation.

---

# Views

Use SQL Views for:

Dashboard summaries

Financial snapshots

Learning metrics

Avoid duplicating aggregation logic.

---

# Realtime

Realtime enabled for:

Today's Tasks

Habit Logs

Projects

Notes

Notifications

Everything else remains request-based.

---

# Backup Strategy

Daily automated backups.

Point-in-time recovery enabled.

Monthly export snapshots.

---

# Migration Strategy

Every schema change requires:

Migration file

Documentation update

Backward compatibility review

Testing

Migration naming:

001_create_profiles.sql

002_create_goals.sql

003_create_projects.sql

Never edit historical migrations.

Create new migrations instead.

---

# Security

Never expose service role keys.

Parameterized queries only.

Validate every input.

Least privilege access.

Encrypt sensitive information.

---

# Performance Goals

Single-row query

<20ms

Dashboard

<150ms

Search

<200ms

Realtime updates

<100ms

---

# Future Extensions

Vector embeddings

AI memory

Semantic search

Graph relationships

Predictive analytics

Recommendation engine

These additions must remain backward compatible.

---

# Final Principle

The database is the foundation of HIM OS.

A well-designed schema reduces application complexity, improves performance, and enables intelligent features to evolve without constant restructuring.

Every table, relationship, and constraint should exist because it serves a clear business purpose.
