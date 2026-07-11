# Bitcraftly Platform

Enterprise web platform for Bitcraftly — a unified frontend built with Next.js, designed to scale across product domains including authentication, CRM, CMS, AI, and dashboard experiences.

---

## Project Overview

Bitcraftly Platform is the primary frontend application for the Bitcraftly ecosystem. It provides a modern, type-safe, and feature-oriented codebase that integrates with a FastAPI backend and PostgreSQL database.

The repository is structured for long-term maintainability: clear separation of concerns, strict TypeScript, Server Components by default, and documentation-driven engineering practices.

---

## Vision

Build a production-grade platform that:

- Scales across multiple product features without architectural drift
- Maintains high code quality through standards, reviews, and automated checks
- Delivers fast, accessible user experiences with minimal client-side JavaScript
- Integrates cleanly with backend services through well-defined API boundaries
- Enables teams to ship independently within shared conventions

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Backend | FastAPI |
| Database | PostgreSQL |
| Authentication | JWT |

---

## Architecture

Bitcraftly Platform follows a **feature-based architecture** with a thin routing layer and domain-focused modules.

```
Browser
   │
   ▼
Next.js App Router (src/app/)        ← Routing & layouts only
   │
   ▼
Feature Modules (src/features/)        ← Domain logic & UI per feature
   │
   ├── Shared Components (src/components/)
   ├── Services (src/services/)      ← API & external integrations
   ├── Lib (src/lib/)                 ← Framework adapters & clients
   └── Utils / Types / Hooks          ← Shared primitives
   │
   ▼
FastAPI Backend
   │
   ▼
PostgreSQL
```

### Key principles

- **Server Components first** — Client Components only when interactivity requires them
- **Thin routes** — Pages in `src/app/` delegate to feature modules
- **Colocated features** — Each domain owns its components, hooks, services, and types
- **Shared UI in `components/ui`** — Design system primitives live outside features
- **No business logic in route files** — Keep `page.tsx` files as entry points only

See [docs/architecture/](docs/architecture/) for Architecture Decision Records and system design documents.

---

## Folder Structure

```
bitcraftly-platform/
├── docs/                    # Project documentation
│   ├── architecture/        # ADRs, system design
│   ├── design/              # UI/UX, design tokens
│   ├── engineering/         # Coding standards, workflows
│   ├── product/             # Product specs, requirements
│   ├── prompts/             # AI agent prompt libraries
│   └── reviews/             # Audit & review reports
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router (routes, layouts)
│   ├── components/          # Shared UI components
│   │   ├── common/
│   │   ├── layout/
│   │   ├── marketing/
│   │   ├── providers/
│   │   └── ui/
│   ├── config/              # Application configuration
│   ├── data/                # Static / seed data
│   ├── features/            # Feature modules
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── cms/
│   │   ├── crm/
│   │   ├── dashboard/
│   │   └── homepage/
│   ├── hooks/               # Shared React hooks
│   ├── lib/                 # Framework adapters, clients
│   ├── services/            # API & external service layer
│   ├── styles/              # Global styles (if not colocated in app/)
│   ├── types/               # Shared TypeScript types
│   └── utils/               # Pure utility functions
├── AGENTS.md                # AI agent instructions
├── CLAUDE.md                # Claude Code agent entry point
├── next.config.ts
├── tsconfig.json
└── package.json
```

Path alias: `@/*` resolves to `./src/*`

---

## Development Setup

### Prerequisites

- Node.js 20 or later
- npm (or compatible package manager)
- Access to the FastAPI backend (when integrating API features)

### Installation

```bash
git clone <repository-url>
cd bitcraftly-platform
npm install
```

### Environment variables

Copy the environment template when available:

```bash
cp .env.example .env.local
```

Configure required variables for your local environment. Environment files are gitignored.

### Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Next.js development server with Turbopack |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server (requires `build` first) |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run TypeScript compiler without emitting files |

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code; protected |
| `develop` | Integration branch for upcoming releases (when adopted) |
| `feature/*` | New features (e.g. `feature/auth-login`) |
| `fix/*` | Bug fixes (e.g. `fix/route-redirect`) |
| `chore/*` | Tooling, docs, maintenance |
| `refactor/*` | Non-functional code improvements |

### Workflow

1. Branch from `main` (or `develop` if using Git Flow)
2. Keep changes focused and small
3. Open a pull request with a clear description
4. Ensure `lint`, `typecheck`, and `build` pass before merge
5. Squash or merge according to team preference

---

## Conventional Commits

All commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

[optional body]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Maintenance, tooling, dependencies |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

### Examples

```
feat(auth): add login form validation
fix(routing): resolve App Router src directory conflict
docs: add engineering coding standards
chore: add typecheck script to package.json
```

---

## Roadmap (High Level)

| Phase | Focus |
|-------|-------|
| **Foundation** | App Router, docs, standards, CI pipeline |
| **Design System** | Tokens, UI primitives, layout shell |
| **Authentication** | JWT integration, protected routes, session handling |
| **Core Features** | Homepage, dashboard shell, navigation |
| **Domain Modules** | CRM, CMS, AI feature integration |
| **Production** | Monitoring, performance, security hardening |

Detailed product requirements live in [docs/product/](docs/product/).

---

## Documentation

| Directory | Contents |
|-----------|----------|
| [docs/architecture/](docs/architecture/) | ADRs, system design |
| [docs/design/](docs/design/) | Design system, UI guidelines |
| [docs/engineering/](docs/engineering/) | Coding standards, workflows |
| [docs/product/](docs/product/) | Product specs |
| [docs/prompts/](docs/prompts/) | AI prompt templates |
| [docs/reviews/](docs/reviews/) | Audit and review reports |

---

## License

Private — All rights reserved.
