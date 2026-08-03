# HIM OS — Contributing Guide

Version: 1.5

Status: Production Standard

Owner: Abdulazeez Nurudeen Adedotun

Last Updated: August 2026

---

# Purpose

This document defines the engineering standards, contribution workflow, development practices, and collaboration guidelines for HIM OS.

It establishes how developers, designers, technical writers, QA engineers, and AI coding agents contribute to the project while maintaining consistency, quality, and long-term maintainability.

Every contribution should leave the codebase in a better state than it was found.

---

# Project Philosophy

HIM OS is not simply a software application.

It is a long-term engineering system designed to evolve over many years.

The project values:

• Simplicity

• Consistency

• Maintainability

• Performance

• Accessibility

• Scalability

• Excellent User Experience

Every engineering decision should support these values.

---

# Engineering Principles

Development should prioritize:

User Experience

↓

Architecture

↓

Maintainability

↓

Performance

↓

Scalability

↓

New Features

New functionality should never compromise the quality of the platform.

---

# Who Can Contribute

Contributors include:

• Core Developers

• Frontend Engineers

• Backend Engineers

• Database Engineers

• UI/UX Designers

• AI Engineers

• Technical Writers

• QA Engineers

• AI Coding Agents

Everyone follows the same engineering standards.

---

# Repository Structure

```
root/

docs/

app/

components/

features/

hooks/

lib/

services/

styles/

types/

public/

supabase/

tests/

scripts/

```

Each directory has a clearly defined responsibility.

Avoid placing unrelated files together.

---

# Before Writing Code

Every contributor should read:

00_PROJECT_CONTEXT.md

01_PRODUCT_VISION.md

02_SYSTEM_ARCHITECTURE.md

03_DESIGN_SYSTEM.md

04_UX_GUIDELINES.md

05_UI_STANDARDS.md

06_COMPONENT_LIBRARY.md

07_FRONTEND_GUIDE.md

08_BACKEND_GUIDE.md

09_DATABASE_SCHEMA.md

10_AI_ARCHITECTURE.md

11_DEVELOPMENT_ROADMAP.md

Understanding the documentation is mandatory before making architectural changes.

---

# Git Workflow

Never commit directly to the main branch.

Every task should use a dedicated feature branch.

Examples

feature/dashboard-redesign

feature/today-view

feature/finance-overhaul

feature/ai-memory

fix/sidebar-scroll

fix/authentication

refactor/navigation

docs/update-ai-guide

---

# Commit Messages

Use Conventional Commits.

Examples

feat: redesign executive dashboard

feat: add command palette

fix: resolve sidebar overflow

fix: improve authentication middleware

refactor: simplify project repository

docs: update backend guide

style: improve spacing tokens

test: add dashboard integration tests

Avoid messages like:

update

changes

misc

fixed stuff

work

---

# Pull Request Standards

Every Pull Request should include:

## Summary

Describe what changed.

## Motivation

Explain why the change was necessary.

## Screenshots

Required for UI changes.

## Testing

Describe testing performed.

## Documentation

List updated documentation.

## Checklist

- Code builds successfully
- Tests pass
- Responsive verified
- Accessibility checked
- Documentation updated

---

# Code Review Checklist

Reviewers should verify:

Architecture consistency

Code readability

Type safety

Performance

Accessibility

Security

Design System compliance

Testing coverage

Documentation updates

No Pull Request should be merged without review.

---

# Frontend Standards

Frontend contributors must:

Reuse existing components whenever possible.

Avoid unnecessary duplication.

Use design tokens.

Support mobile layouts.

Support dark mode.

Support keyboard navigation.

Avoid inline styles.

Prefer composition over inheritance.

Follow the Design System.

---

# Backend Standards

Backend contributors must:

Use service-layer architecture.

Validate every request.

Protect user data.

Use transactions where appropriate.

Document endpoints.

Write tests.

Never place business logic inside routes.

---

# Database Standards

Every schema change requires:

Migration

Rollback strategy

Documentation update

Performance review

RLS verification

Never modify historical migrations.

Always create a new migration.

---

# Documentation Standards

Documentation is considered production code.

Whenever a feature changes:

Update the documentation.

Whenever architecture changes:

Update the documentation.

Whenever APIs change:

Update the documentation.

Whenever schemas change:

Update the documentation.

Documentation should never become outdated.

---

# AI Coding Agent Guidelines

AI coding agents (Cursor, Codex, Claude Code, etc.) are expected to:

Read the documentation before generating code.

Respect the established architecture.

Reuse existing components.

Avoid introducing duplicate abstractions.

Avoid unnecessary rewrites.

Preserve backward compatibility whenever possible.

Explain architectural decisions.

Wait for approval before performing major refactors.

AI should accelerate development—not replace engineering discipline.

---

# Design Contribution Rules

Every design decision should:

Improve clarity.

Reduce cognitive load.

Increase consistency.

Support accessibility.

Align with the Design System.

Avoid unnecessary visual decoration.

The interface should feel calm, professional, and executive.

---

# Accessibility Requirements

Every contribution must support:

Keyboard navigation

Visible focus states

ARIA labels

Screen readers

Reduced motion

Semantic HTML

Minimum contrast ratios

Accessibility is a release requirement—not an enhancement.

---

# Performance Standards

Avoid:

Large JavaScript bundles

Unnecessary re-renders

Duplicate API requests

Blocking rendering

Unused dependencies

Poor lazy loading

Performance should improve with every release.

---

# Testing Strategy

Every feature should include appropriate testing.

Frontend

Component tests

Interaction tests

Responsive verification

Backend

Unit tests

Integration tests

API tests

Database

Migration validation

Constraint testing

RLS testing

AI

Prompt validation

Context retrieval testing

Response evaluation

Regression testing

---

# Issue Management

Every issue should contain:

Title

Description

Expected behavior

Actual behavior

Environment

Steps to reproduce

Priority

Labels

Examples

bug

feature

performance

documentation

frontend

backend

database

design

accessibility

AI

---

# Definition of Done

A task is complete only when:

✓ Feature implemented

✓ Code reviewed

✓ Tests passing

✓ Responsive

✓ Accessible

✓ Performance verified

✓ Documentation updated

✓ Build successful

✓ No critical issues remain

---

# Release Process

Every release follows:

Research

↓

Design

↓

Architecture

↓

Implementation

↓

Testing

↓

Documentation

↓

Review

↓

Deployment

↓

Monitoring

↓

Retrospective

---

# Security Standards

Never commit:

Passwords

API Keys

Secrets

Database credentials

Service role keys

Use environment variables for all sensitive configuration.

Follow the principle of least privilege.

---

# Communication

Contributors should:

Ask questions early.

Document assumptions.

Keep pull requests focused.

Respect review feedback.

Discuss architectural changes before implementation.

Good engineering is collaborative.

---

# Long-Term Maintenance

As HIM OS grows:

Reduce technical debt.

Simplify architecture.

Improve documentation.

Increase test coverage.

Refactor responsibly.

Maintain consistency.

The project should become easier to maintain over time.

---

# Open Source Readiness

Future public contributors should be able to:

Clone the project.

Understand the architecture.

Run the application locally.

Read the documentation.

Submit improvements.

The repository should remain welcoming to new contributors.

---

# Engineering Culture

HIM OS values:

Curiosity over ego.

Learning over perfection.

Quality over speed.

Long-term thinking over short-term convenience.

Every contribution should improve the product, the codebase, and the experience of future contributors.

---

# Related Documentation

This document should be read alongside:

- 01_PRODUCT_VISION.md
- 02_SYSTEM_ARCHITECTURE.md
- 03_DESIGN_SYSTEM.md
- 07_FRONTEND_GUIDE.md
- 08_BACKEND_GUIDE.md
- 09_DATABASE_SCHEMA.md
- 10_AI_ARCHITECTURE.md
- 11_DEVELOPMENT_ROADMAP.md

Together, these documents define the engineering standards of HIM OS.

---

# Final Principle

Code is temporary.

Features evolve.

Technologies change.

Architecture, documentation, and engineering discipline are what allow a project to grow without losing its direction.

Every contribution should move HIM OS closer to becoming the world's leading Personal Operating System.