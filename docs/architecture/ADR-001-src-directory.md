# ADR-001: Adopt `src/` Directory Layout

| Field       | Value                  |
| ----------- | ---------------------- |
| **Status**  | Accepted               |
| **Date**    | 2026-07-11             |
| **Authors** | Bitcraftly Engineering |

---

## Context

The Bitcraftly Platform was initially scaffolded with `create-next-app`, which placed the App Router entry point at the project root (`app/`). As the platform grew, we needed a clearer separation between application code, configuration, and documentation.

An enterprise frontend with multiple feature domains (auth, CRM, CMS, AI, dashboard) requires a scalable folder structure. Placing all source code under a dedicated `src/` directory is a widely adopted convention in Next.js projects and aligns with our feature-based architecture goals.

During migration, a transitional state existed where both root `app/` and `src/app/` coexisted. Next.js prioritizes root `app/` when present, which caused routing failures until the migration was completed.

---

## Decision

Adopt the **`src/` directory** as the canonical location for all application source code.

### Structure

```
src/
├── app/           # Next.js App Router (routing only)
├── components/    # Shared UI components
├── features/      # Feature modules (domain logic)
├── services/      # API & external integrations
├── lib/           # Framework adapters
├── hooks/         # Shared React hooks
├── types/         # Shared TypeScript types
├── utils/         # Pure utility functions
├── config/        # Application configuration
└── data/          # Static / seed data
```

### Rules

1. **No root `app/` directory** — App Router lives exclusively in `src/app/`
2. **Path alias** — `@/*` maps to `./src/*` in `tsconfig.json`
3. **Thin routes** — `src/app/` contains routing and layouts; business logic lives in `src/features/`
4. **Colocated features** — Each feature module owns its components, hooks, services, and types

---

## Benefits

| Benefit            | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| **Clear boundary** | Separates source code from config, docs, and tooling at the project root   |
| **Scalability**    | Feature folders, shared components, and services have defined homes        |
| **Convention**     | Matches Next.js `src` directory documentation and community practice       |
| **Tooling**        | TypeScript path aliases, linters, and test runners scope cleanly to `src/` |
| **Onboarding**     | New engineers locate application code in one predictable location          |

---

## Consequences

### Positive

- Single App Router entry point eliminates routing ambiguity
- Feature-based architecture can grow without polluting the project root
- Documentation, CI, and IDE tooling can target `src/` consistently

### Negative

- Engineers familiar with root-level `app/` must adapt to `src/app/`
- Import paths use the `@/` alias rather than relative paths from root
- Migration required a one-time cleanup of the obsolete root `app/` directory

### Neutral

- `public/`, `docs/`, and configuration files remain at the project root
- Next.js automatically detects `src/app/` when no root `app/` exists

---

## Alternatives Considered

### 1. Keep root `app/` (create-next-app default)

**Rejected.** Does not scale well for a multi-feature enterprise platform. Application code would mix with configuration and documentation at the root level.

### 2. Monorepo with packages per feature

**Deferred.** Appropriate at larger scale but adds complexity (workspace tooling, shared package versioning) that is premature for the current project stage.

### 3. Hybrid root `app/` + `src/` for everything else

**Rejected.** Next.js does not support splitting App Router across root `app/` and `src/app/`. A root `app/` directory takes precedence and ignores `src/app/`, which caused the routing failure during the incomplete migration.

---

## References

- [Next.js `src` directory](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder)
- [PROJECT_FOUNDATION_REVIEW.md](../../PROJECT_FOUNDATION_REVIEW.md) — Initial audit that identified the migration issue
