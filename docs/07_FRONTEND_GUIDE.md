# HIM OS — Frontend Engineering Guide

**Version:** 1.5  
**Status:** Engineering Standard  
**Owner:** Abdulazeez Nurudeen Adedotun  

---

# Purpose

This document establishes the frontend engineering standards for HIM OS.

It defines the technologies, architecture, coding conventions, component structure, performance principles, accessibility requirements, and development workflow that every frontend contributor and AI agent must follow.

The objective is to ensure that the frontend remains scalable, maintainable, performant, and visually consistent throughout the lifetime of the project.

No frontend implementation should violate these standards.

---

# Frontend Philosophy

The frontend exists to create a seamless experience for the user.

Every screen should feel:

• Fast

• Calm

• Predictable

• Accessible

• Maintainable

The frontend should prioritize readability over cleverness.

Simple code is better than complex code.

Reusable code is better than duplicated code.

---

# Technology Stack

Framework

Next.js 15 (App Router)

Language

TypeScript

Styling

Tailwind CSS

Component Library

shadcn/ui

Animation

Framer Motion

Icons

Lucide React

Forms

React Hook Form

Validation

Zod

Charts

Recharts

State Management

TanStack Query

Zustand (UI state only)

Authentication

Supabase Auth

Backend Communication

REST APIs (FastAPI)

Package Manager

npm

---

# Project Structure

src/

app/

components/

features/

hooks/

lib/

services/

types/

styles/

utils/

providers/

contexts/

middleware/

Every folder should have a single responsibility.

---

# App Router Organization

Routes should reflect user workflows rather than technical modules.

Preferred structure:

app/

dashboard/

today/

build/

learn/

grow/

think/

review/

auth/

settings/

Avoid deeply nested routing.

---

# Component Architecture

Components are divided into four layers.

## UI Components

Pure reusable building blocks.

Examples:

Button

Input

Card

Badge

Modal

Tooltip

Progress

---

## Shared Components

Reusable across multiple features.

Examples:

Sidebar

TopBar

SearchBar

CommandPalette

QuickCapture

---

## Feature Components

Specific to a feature.

Examples:

GoalCard

FinanceChart

HabitRing

ReadingProgress

ProjectTimeline

---

## Page Components

Compose feature components into complete screens.

Pages should contain minimal business logic.

---

# Component Guidelines

Each component should:

Have one responsibility.

Be reusable.

Be typed.

Support accessibility.

Be documented.

Avoid unnecessary props.

Prefer composition over inheritance.

---

# Naming Conventions

Components

PascalCase

Example:

GoalCard.tsx

Hooks

camelCase

Example:

useGoals.ts

Utilities

camelCase

Example:

formatCurrency.ts

Types

PascalCase

Example:

Goal.ts

Constants

UPPER_SNAKE_CASE

Example:

MAX_GOALS

---

# TypeScript Standards

Strict mode enabled.

Avoid using:

any

Prefer:

unknown

Generics

Discriminated unions

Interfaces for object shapes.

Enums only when appropriate.

Every exported function should have explicit typing.

---

# Styling Standards

Tailwind CSS only.

Never use inline styles.

Never duplicate utility combinations.

Extract repeated styles into reusable components.

Use design tokens wherever possible.

---

# State Management

Three categories of state:

## Local State

useState

Component interactions.

---

## Shared UI State

Zustand

Sidebar

Theme

Command Palette

Quick Capture

---

## Server State

TanStack Query

Goals

Projects

Finance

Books

Habits

Notes

Never store server data in Zustand.

---

# API Layer

UI Components

↓

Hooks

↓

Services

↓

FastAPI

↓

Supabase

Pages should never fetch directly.

Business logic belongs in services.

---

# Custom Hooks

Every feature should expose custom hooks.

Examples

useGoals()

useProjects()

useHabits()

useFinance()

useLearning()

Hooks should encapsulate:

Fetching

Caching

Loading

Errors

Mutations

---

# Error Handling

Every API request must handle:

Loading

Success

Failure

Retry

Never expose raw backend errors to users.

---

# Loading States

Use skeletons.

Avoid full-page spinners.

Loading should preserve layout.

---

# Forms

React Hook Form

+

Zod

Every form must support:

Validation

Keyboard navigation

Error messages

Submission state

Optimistic updates when appropriate.

---

# Accessibility Standards

Semantic HTML

Keyboard navigation

Visible focus indicators

Screen reader labels

ARIA attributes

Reduced motion support

WCAG AA compliance

Accessibility is required—not optional.

---

# Animation Standards

Use Framer Motion.

Animations should:

Guide attention

Provide feedback

Communicate hierarchy

Avoid decorative motion.

Standard durations:

Hover

150ms

Page

250ms

Modal

300ms

Drawer

300ms

---

# Responsive Design

Desktop

Primary experience

Tablet

Adaptive layouts

Mobile

Native-like experience

Touch-friendly controls

Avoid horizontal scrolling.

---

# Performance Standards

Lazy load heavy modules.

Dynamic imports.

Memoize expensive calculations.

Use Suspense where appropriate.

Optimize images.

Code split routes.

Prefetch likely navigation paths.

Target Lighthouse score:

95+

---

# Testing

Unit Tests

React Testing Library

Integration Tests

Playwright

Visual Regression

Storybook (future)

Every reusable component should be testable.

---

# Git Workflow

Feature Branch

↓

Development

↓

Pull Request

↓

Code Review

↓

QA

↓

Merge

Never commit directly to production.

---

# Code Review Checklist

✓ Typed

✓ Accessible

✓ Responsive

✓ Uses Design System

✓ Uses Component Library

✓ Uses existing hooks

✓ No duplicated code

✓ Tested

✓ Documented

---

# Anti-Patterns

Do not:

Use inline CSS.

Duplicate components.

Fetch data inside UI components.

Store server state in local state.

Use anonymous functions unnecessarily.

Mix business logic with presentation.

Ignore accessibility.

Hardcode colors.

Hardcode spacing.

---

# Definition of Done

A frontend task is complete only when:

✓ Code compiles

✓ Tests pass

✓ Responsive

✓ Accessible

✓ Design approved

✓ UX approved

✓ Documentation updated

✓ QA completed

✓ Performance acceptable

---

# Final Principle

The frontend of HIM OS should feel invisible.

Users should never notice the framework, the components, or the technology.

They should simply feel that every interaction is fast, intuitive, reliable, and thoughtfully designed.

Engineering excellence is achieved when implementation faithfully serves the user experience rather than drawing attention to itself.
