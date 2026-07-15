# Bitcraftly Platform — AI Project Context

This document provides a concise project context for AI assistants.

Purpose:

- Help AI quickly understand the project.
- Reduce unnecessary repository scanning.
- Preserve architecture consistency.
- Improve response quality while minimizing token usage.

This document is intentionally concise and complements `README.md` and `PROJECT_FOUNDATION_REVIEW.md`.

---

# Project Overview

Bitcraftly Platform is an enterprise-grade frontend platform built using Next.js.

The project follows a feature-based architecture and integrates with a FastAPI backend.

Primary goals:

- Scalable architecture
- Reusable UI components
- Enterprise code quality
- Accessibility-first implementation
- SEO-friendly pages
- High-performance rendering
- AI-assisted development

---

# Target Users

Primary users include:

- Business owners
- Startup founders
- Enterprise clients
- Marketing teams
- Internal administrators
- Developers

---

# Core Modules

Current and planned modules include:

- Homepage
- Authentication
- Dashboard
- CRM
- CMS
- AI Services
- Portfolio
- Services
- Blog
- Contact
- Pricing
- Case Studies

---

# Tech Stack

Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript (Strict Mode)
- Tailwind CSS v4
- Framer Motion
- shadcn/ui

Backend

- FastAPI
- PostgreSQL
- JWT Authentication

---

# Project Structure

```text
src/
 ├── app/
 ├── features/
 ├── components/
 ├── services/
 ├── hooks/
 ├── lib/
 ├── types/
 ├── utils/
 ├── config/
 └── styles/

docs/

.cursor/
```

---

# Architecture Principles

The project follows:

- Feature-based architecture
- Thin routing layer
- Server Components first
- Shared UI components
- Reusable services
- Separation of concerns

Business logic should remain inside feature modules.

---

# Coding Standards

Always:

- Use TypeScript strict mode.
- Prefer functional components.
- Prefer composition over inheritance.
- Reuse existing components.
- Keep functions small.
- Keep code production-ready.

Never:

- Use `any`.
- Duplicate logic.
- Add unnecessary dependencies.
- Modify unrelated files.

---

# Design System

Follow the Bitcraftly Design System.

Use:

- Shared colors
- Shared spacing
- Shared typography
- Shared radius
- Shared shadows
- Shared animations
- Design tokens

Avoid hardcoded design values.

---

# Accessibility

Every feature must satisfy:

- Semantic HTML
- Keyboard accessibility
- Visible focus
- Accessible forms
- Proper heading hierarchy
- WCAG 2.2 AA where practical

---

# SEO

For public pages:

- Metadata API
- Open Graph
- Structured Data
- Canonical URLs
- Sitemap
- Robots
- Optimized images

---

# Performance

Prefer:

- Server Components
- Dynamic imports
- Lazy loading
- Optimized images
- Optimized fonts
- Cached data fetching

Protect Core Web Vitals.

---

# Protected Areas

Do not modify without explicit approval:

- Shared architecture
- Shared components
- Design tokens
- Authentication flow
- Global layouts
- Public brand assets

---

# AI Workflow

For every task:

1. Read this file.
2. Apply the relevant rules from `.cursor/rules/`.
3. Work only within the requested scope.
4. Make the smallest safe change.
5. Preserve existing architecture.

For architecture-level or multi-file changes:

- Read `PROJECT_FOUNDATION_REVIEW.md`.

---

# Project Priorities

Priority order:

1. Correctness
2. Maintainability
3. Accessibility
4. Performance
5. SEO
6. Developer Experience

---

# Definition of Success

A successful implementation:

- Solves the requested problem.
- Preserves architecture.
- Reuses existing components.
- Introduces no regressions.
- Maintains accessibility.
- Maintains performance.
- Keeps the codebase clean and maintainable.