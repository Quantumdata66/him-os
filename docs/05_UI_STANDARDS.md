# HIM OS — UI Standards

**Version:** 1.5  
**Status:** UI Implementation Standard  
**Owner:** Abdulazeez Nurudeen Adedotun  

---

# Purpose

This document defines the implementation standards for every user interface element in HIM OS.

Every screen, component, interaction, and layout must follow these standards to ensure consistency, accessibility, maintainability, and a premium user experience.

No UI component should be created unless it follows this document.

---

# Design Philosophy

The interface should feel:

• Calm

• Spacious

• Professional

• Premium

• Predictable

Every component should have a clear purpose.

Every interaction should feel intentional.

Visual consistency is more important than visual creativity.

---

# Layout Standards

## Maximum Content Width

Desktop

1440px

Reading width

720px

Forms

640px

Analytics

Full width

---

## Page Padding

Desktop

32px

Tablet

24px

Mobile

16px

---

## Vertical Rhythm

Spacing between major sections

48px

Spacing between cards

24px

Spacing inside cards

24px

Spacing between labels and inputs

8px

Spacing between buttons

12px

Never use arbitrary spacing values.

---

# Navigation

## Sidebar

Width

280px

Collapsed

80px

Position

Fixed

Left

Always visible on desktop.

Drawer on mobile.

---

## Top Navigation

Height

72px

Contains:

Page title

Breadcrumb

Search

Notifications

Profile

Quick Capture

Only one global top bar.

---

# Cards

Cards are the foundation of HIM OS.

Every card contains:

Header

Body

Footer (optional)

Cards should never exceed one primary purpose.

Maximum elevation level:

2

Hover elevation only.

No heavy shadows.

---

# Buttons

## Primary

Purpose

Main action

Style

Solid green

Only one primary button per section.

---

## Secondary

Outlined

Neutral background

---

## Ghost

No border

Minimal emphasis

---

## Danger

Red

Confirmation required

---

## Button Sizes

Small

36px

Medium

44px

Large

52px

Touch targets must never be smaller than 44px.

---

# Forms

Large comfortable inputs.

Visible labels.

Clear validation.

Real-time feedback.

Inline errors.

Helpful placeholders.

Never rely on placeholders as labels.

---

# Input Components

Text Input

Textarea

Select

Search

Checkbox

Radio

Switch

Date Picker

Time Picker

Number Input

Currency Input

Tags

Autocomplete

All inputs should have consistent height and border radius.

---

# Search

Universal search uses Ctrl + K.

Search results grouped by:

Pages

Projects

Notes

Goals

Books

Businesses

Recent

Search should prioritize relevance over recency.

---

# Tables

Tables should be used only when comparison matters.

Every table should support:

Sorting

Filtering

Search

Pagination (if necessary)

Responsive overflow

Avoid horizontal scrolling whenever possible.

---

# Charts

Approved chart types:

Line

Bar

Area

Progress Ring

Sparkline

Calendar Heatmap

Avoid:

3D charts

Radar charts

Donuts with many segments

Pie charts unless essential.

Charts should communicate insight—not decoration.

---

# Progress Indicators

Linear Progress

Circular Progress Ring

Completion Badge

Timeline Progress

Every progress indicator should include a textual percentage.

Never rely solely on color.

---

# Calendar

Default

Month

Alternative

Week

Agenda

Today should always be highlighted.

Selected date should always remain visible.

---

# Command Palette

Accessible from anywhere.

Keyboard shortcut:

Ctrl + K

Functions:

Navigate

Search

Create

Run commands

Recent items

Quick Capture

Maximum latency:

100ms

---

# Quick Capture

Available globally.

Floating Action Button.

Capture:

Task

Note

Expense

Idea

Project

Book

Decision

Habit

Capture should never require more than one screen.

---

# Notifications

Grouped by category.

Unread badge.

Mark all as read.

Notifications disappear after being acknowledged.

No intrusive popups.

---

# Toast Messages

Position

Top Right

Duration

3–5 seconds

Variants

Success

Error

Warning

Information

Toasts should never block interaction.

---

# Dialogs

Maximum width

640px

Overlay

Dark translucent

Close with:

Escape

Outside click

Close button

Primary action

Bottom right

---

# Drawers

Slide from:

Right

Used for:

Editing

Viewing details

Quick actions

Do not use drawers for full workflows.

---

# Tabs

Maximum:

Seven tabs

Active tab clearly highlighted.

No nested tabs.

---

# Accordions

Used only for secondary information.

Default state:

Collapsed

---

# Empty States

Every empty state includes:

Illustration or icon

Explanation

Primary action

Optional documentation link

Never leave blank pages.

---

# Loading States

Skeletons only.

Avoid full-page spinners.

Skeletons should resemble the final layout.

---

# Error States

Every error should include:

Clear explanation

Recovery action

Retry button

Support information (if applicable)

Avoid technical jargon.

---

# Avatars

Circular

Initials if no image exists.

Consistent sizing.

---

# Icons

Use Lucide Icons exclusively.

24px default.

20px for compact controls.

Never mix icon libraries.

---

# Breadcrumbs

Only for deep navigation.

Maximum depth:

Three levels.

---

# Badges

Variants:

Primary

Success

Warning

Danger

Neutral

Badges communicate status—not actions.

---

# Status Indicators

Always combine:

Color

Label

Icon

Never communicate status using color alone.

---

# Responsive Standards

Desktop

Full navigation

Tablet

Adaptive navigation

Mobile

Bottom navigation

Drawer menu

Single-column layout

Touch-first interactions

---

# Accessibility Standards

Keyboard accessible.

Screen reader friendly.

Minimum touch target:

44px

Visible focus states.

Semantic HTML.

ARIA labels where required.

Reduced motion support.

WCAG AA compliance.

---

# Animation Standards

Animations should support understanding.

Default duration:

200ms

Page transition:

250ms

Modal:

300ms

Drawer:

300ms

Hover:

150ms

Avoid excessive animation.

Motion should feel subtle and purposeful.

---

# Performance Standards

Lazy load heavy components.

Virtualize long lists.

Optimize images.

Prefetch routes.

Cache API responses where appropriate.

Target:

<100ms perceived interaction time.

---

# Component Naming Convention

Buttons

PrimaryButton

SecondaryButton

GhostButton

Cards

DashboardCard

MetricCard

StatCard

SummaryCard

Inputs

SearchInput

CurrencyInput

DateInput

Never create duplicate components with overlapping responsibilities.

---

# UI Review Checklist

Before merging any interface:

✓ Consistent spacing

✓ Correct typography

✓ Proper color usage

✓ Responsive layout

✓ Keyboard accessible

✓ Accessible labels

✓ One primary action

✓ Proper loading state

✓ Proper empty state

✓ Proper error handling

✓ Matches Design System

✓ Matches UX Guidelines

If any item fails, the implementation is not production-ready.

---

# Final Principle

A premium interface is not defined by how many visual elements it contains.

It is defined by how effortlessly users can achieve their goals.

Every component should remove friction, reinforce clarity, and contribute to a cohesive executive experience.
