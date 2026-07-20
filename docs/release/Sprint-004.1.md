# Sprint 004.1 — Production Infrastructure

**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-20  
**Status:** Complete

---

## Objective

Harden production infrastructure for Bitcraftly Platform V2 launch without changing application behavior or UI.

---

## Deliverables

| # | Deliverable | Status |
|---|-------------|--------|
| 1 | Prisma generate in build pipeline | ✅ |
| 2 | Production-safe `db:deploy` workflow | ✅ |
| 3 | GitHub Actions for `main`, `develop`, `release/**` | ✅ |
| 4 | Production-ready `.env.example` | ✅ |
| 5 | Required env var validation at startup | ✅ |
| 6 | Updated deployment documentation | ✅ |
| 7 | lint · typecheck · build verification | ✅ |

---

## Changes

### 1. Build pipeline — Prisma generate

**File:** `package.json`

Added `prebuild` script:

```json
"prebuild": "npm run db:generate"
```

Every `npm run build` now generates the Prisma client before Next.js compiles. This prevents CI and fresh-clone build failures when `src/generated/prisma/` is absent.

### 2. Production database deploy workflow

**File:** `.github/workflows/db-deploy.yml`

- Manual trigger only (`workflow_dispatch`)
- Requires typing `deploy` to confirm
- Uses GitHub **production** environment for `DATABASE_URL` and `DIRECT_URL` secrets
- Runs `npm run db:deploy` (`prisma migrate deploy`)
- Verifies status with `prisma migrate status`
- **Never** runs `prisma migrate dev`

### 3. CI branch coverage

**File:** `.github/workflows/ci.yml`

Extended triggers to include `release/**` on push and pull_request.

Added explicit `npm run db:generate` step before build in all jobs.

Set `SKIP_ENV_VALIDATION=true` during CI builds to avoid requiring production secrets in GitHub Actions.

### 4. Environment variable contract

**File:** `.env.example`

Documents all required and optional variables with descriptions and safe placeholder values.

### 5. Startup env validation

**Files:**

- `src/lib/env/server-env.schema.ts` — Zod schema for production env contract
- `src/lib/env/validate-server-env.ts` — validation function
- `src/lib/env/validate-server-env.test.ts` — unit tests
- `src/instrumentation.ts` — runs validation on production server startup

Validation runs when:

- `NODE_ENV === "production"`
- Server is starting (not during `next build`)
- `SKIP_ENV_VALIDATION` is not `"true"`

Required variables validated:

- `DATABASE_URL`
- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_TO`
- `LEAD_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `OWNER_AUTH_EMAIL`
- `OWNER_AUTH_PASSWORD` (min 12 chars)
- `OWNER_SESSION_SECRET` (min 32 chars)

### 6. Documentation

| File | Change |
|------|--------|
| `docs/engineering/production-deployment.md` | **New** — master production deploy guide |
| `docs/engineering/lead-capture-production-deployment-checklist.md` | Updated env vars, DB persistence, build pipeline |
| `docs/engineering/README.md` | Added link to production deployment guide |

---

## Verification

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass (prebuild runs db:generate)
npm run test:unit -- src/lib/env  # pass
```

---

## GitHub setup required (ops)

Before first production deploy:

1. Create GitHub **production** environment
2. Add secrets: `DATABASE_URL`, `DIRECT_URL`
3. Configure hosting provider env vars per `.env.example`
4. Run **Database Migrate Deploy** workflow before first traffic

---

## Out of scope (future sprints)

- Sentry / APM integration
- Admin panel authentication
- Distributed rate limiting
- E2E lead capture automation
- Middleware → proxy migration (Next.js 16 deprecation)

---

## Files changed

| File | Action |
|------|--------|
| `package.json` | Modified — added `prebuild` |
| `.env.example` | Created |
| `.github/workflows/ci.yml` | Modified — branches, db:generate, SKIP_ENV_VALIDATION |
| `.github/workflows/db-deploy.yml` | Created |
| `src/lib/env/server-env.schema.ts` | Created |
| `src/lib/env/validate-server-env.ts` | Created |
| `src/lib/env/validate-server-env.test.ts` | Created |
| `src/lib/env/index.ts` | Created |
| `src/instrumentation.ts` | Created |
| `docs/engineering/production-deployment.md` | Created |
| `docs/engineering/lead-capture-production-deployment-checklist.md` | Modified |
| `docs/engineering/README.md` | Modified |
| `docs/release/Sprint-004.1.md` | Created |

---

## Rollback

Infrastructure changes are additive. To rollback:

1. Revert commit
2. Remove `prebuild` if Prisma generate causes issues (not expected)
3. Remove `src/instrumentation.ts` to disable startup validation
4. CI will revert to previous branch triggers

Database migrations applied via `db:deploy` are forward-only — plan forward fixes if needed.
