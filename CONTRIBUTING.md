# Contributing to Bitcraftly Platform

Thank you for contributing to the **Bitcraftly Platform**.

This document outlines the development workflow, engineering standards, and contribution guidelines to ensure the project remains scalable, maintainable, secure, and production-ready.

Whether you're fixing a bug, implementing a feature, improving documentation, or enhancing the developer experience, please follow these guidelines before submitting changes.

---

# Development Philosophy

Every contribution should follow these core principles:

- Keep changes focused and minimal.
- Preserve the existing architecture.
- Prefer reusable components over duplication.
- Follow the feature-based architecture.
- Maintain strict TypeScript.
- Accessibility is mandatory.
- Performance is a feature, not an afterthought.
- Documentation should evolve with the code.

---

# Getting Started

## Prerequisites

Ensure you have the following installed:

- Node.js 20+
- npm
- Git

For full-stack development:

- FastAPI Backend
- PostgreSQL Database

---

## Clone the Repository

```bash
git clone <repository-url>
cd bitcraftly-platform
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

```bash
cp .env.example .env.local
```

Update the required environment variables before running the application.

> Never commit `.env.local` or any sensitive credentials.

---

## Start the Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# Branch Strategy

Create a dedicated branch for every feature, bug fix, or documentation update.

Examples:

- `feature/auth-login`
- `feature/dashboard-shell`
- `fix/navbar-overflow`
- `refactor/button-component`
- `docs/readme-update`
- `chore/dependency-updates`

Never commit directly to the `main` branch.

---

# Coding Standards

Every contribution must:

- Follow TypeScript strict mode.
- Prefer Server Components where applicable.
- Avoid using `any`.
- Reuse existing components.
- Preserve project architecture.
- Follow Accessibility Standards.
- Keep components focused and maintainable.
- Avoid unnecessary abstractions.
- Implement the smallest safe change.

---

# AI Development Workflow

Bitcraftly Platform is optimized for AI-assisted development.

Before implementing any feature:

1. Read `README.md`
2. Read `AGENTS.md`
3. Read `PROJECT_CONTEXT.md`
4. Apply the relevant rules from `.cursor/rules/`
5. Explain the implementation plan (for multi-file changes)
6. Implement only the requested scope
7. Perform a self-review
8. Validate the implementation

---

# Commit Guidelines

This project follows the **Conventional Commits** specification.

## Commit Format

```text
<type>(<scope>): <description>
```

Examples:

```text
feat(auth): add login page
fix(hero): improve responsive layout
docs(readme): update setup guide
refactor(ui): simplify card component
perf(images): optimize hero banner loading
chore(deps): update dependencies
```

---

# Pull Request Guidelines

Every Pull Request should:

- Solve one logical problem.
- Keep changes focused.
- Preserve existing architecture.
- Pass all Quality Gates.
- Update documentation if required.
- Avoid unrelated refactoring.
- Include screenshots for UI changes (if applicable).

---

# Code Review Checklist

Before requesting review, verify:

- Project builds successfully.
- ESLint passes.
- TypeScript passes.
- Accessibility requirements are satisfied.
- Performance regressions are avoided.
- No unrelated files were modified.
- Existing architecture has been preserved.
- Documentation has been updated where required.

---

# Quality Gates

Run the following commands before opening a Pull Request:

```bash
npm run lint
npm run typecheck
npm run build
```

Every Pull Request should satisfy:

- ✅ Build passes
- ✅ ESLint passes
- ✅ TypeScript passes
- ✅ Accessibility maintained
- ✅ Performance preserved
- ✅ Documentation updated (when required)

---

# Documentation

Update documentation whenever you:

- Introduce a new feature.
- Change the architecture.
- Modify the development workflow.
- Add new engineering rules.
- Update setup or deployment instructions.

Documentation is part of the implementation—not an afterthought.

---

# Reporting Issues

When reporting an issue, include:

- Expected behavior
- Actual behavior
- Steps to reproduce
- Environment details
- Browser and operating system
- Screenshots or recordings (if applicable)

---

# Contact

For architecture discussions, major refactoring, or platform-level decisions, contact the project maintainers before implementation.

---

# Thank You

Thank you for helping improve the Bitcraftly Platform.

Every contribution—whether code, documentation, design, or feedback—helps make the platform more scalable, maintainable, and reliable.
