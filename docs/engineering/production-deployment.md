# Production Deployment Guide

**Sprint:** 004.1 — Production Infrastructure  
**Branch:** `release/v1.0-launch`  
**Last updated:** 2026-07-20

This guide covers the production deployment workflow for Bitcraftly Platform V2: build pipeline, database migrations, environment variables, and CI/CD.

---

## Architecture overview

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | Next.js 16 (App Router), React 19, TypeScript |
| Database   | PostgreSQL (Neon) via Prisma 7                |
| Lead email | Resend API                                    |
| Owner CRM  | Session auth (`/owner/leads`)                 |
| Hosting    | Vercel or compatible Node.js host             |

Application routes live under `src/app/`. There is no root `app/` directory.

---

## Prerequisites

Before deploying to production:

1. Neon (or PostgreSQL) database provisioned
2. Resend account with verified sending domain
3. All required environment variables configured in the hosting provider
4. GitHub **production** environment created with secrets for DB deploy workflow

---

## Environment variables

Copy `.env.example` to `.env.local` for local development. In production, set variables in your hosting provider.

### Required (production runtime)

| Variable               | Scope        | Description                                                   |
| ---------------------- | ------------ | ------------------------------------------------------------- |
| `DATABASE_URL`         | Server       | Pooled PostgreSQL connection string (Neon pooler recommended) |
| `DIRECT_URL`           | Server / CLI | Direct connection for Prisma CLI migrations                   |
| `RESEND_API_KEY`       | Server       | Resend API key (`re_…`)                                       |
| `LEAD_NOTIFICATION_TO` | Server       | Inbox for lead alert emails                                   |
| `LEAD_FROM_EMAIL`      | Server       | Verified sender, e.g. `Bitcraftly <notifications@domain.com>` |
| `NEXT_PUBLIC_SITE_URL` | Public       | Canonical URL, no trailing slash                              |
| `OWNER_AUTH_EMAIL`     | Server       | Owner CRM login email                                         |
| `OWNER_AUTH_PASSWORD`  | Server       | Owner CRM password (min 12 characters)                        |
| `OWNER_SESSION_SECRET` | Server       | HMAC signing secret (min 32 characters)                       |

### Optional

| Variable                             | Default  | Description                                    |
| ------------------------------------ | -------- | ---------------------------------------------- |
| `LEAD_RATE_LIMIT_MAX`                | `5`      | Max submissions per IP+email per window        |
| `LEAD_RATE_LIMIT_IP_MAX`             | `30`     | Max submissions per IP across all emails       |
| `LEAD_RATE_LIMIT_WINDOW_MS`          | `900000` | Rate limit window (15 min)                     |
| `OWNER_LOGIN_RATE_LIMIT_MAX`         | `10`     | Max login attempts per IP per window           |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX` | `5`      | Max login attempts per account per window      |
| `OWNER_LOGIN_RATE_LIMIT_WINDOW_MS`   | `900000` | Owner login rate limit window                  |
| `NEXT_PUBLIC_CALENDLY_URL`           | —        | Calendly link; CTAs fall back to contact       |
| `SHADOW_DATABASE_URL`                | —        | Shadow DB for `db:migrate` (local dev only)    |
| `SKIP_ENV_VALIDATION`                | —        | Emergency bypass — **never use in production** |

### Startup validation

Production server startup validates all required runtime variables via `src/instrumentation.ts`. Misconfigured deploys fail fast before serving traffic.

Validation is skipped during:

- `next build` (CI and local builds)
- Development (`NODE_ENV !== "production"`)
- When `SKIP_ENV_VALIDATION=true` (CI only)

---

## Production security (Sprint 004.2)

| Control                   | Implementation                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Owner route protection    | Middleware + `requireOwnerSession()` in dashboard layout and CRM loaders            |
| Owner login rate limiting | IP + account sliding windows (`owner-login-rate-limit.ts`)                          |
| Lead bot protection       | Honeypot field + server-side Zod validation                                         |
| Lead rate limiting        | Per IP+email and per-IP limits (`lead-guard.service.ts`)                            |
| Security headers          | CSP, HSTS, COOP, CORP, X-Frame-Options, Permissions-Policy                          |
| Error boundaries          | `error.tsx`, `global-error.tsx`, `not-found.tsx`                                    |
| Secret exposure           | Server secrets are server-only; `NEXT_PUBLIC_*` vars are site URL and Calendly only |

Owner session cookie flags: `httpOnly`, `secure` (production), `sameSite: strict`, `path: /owner`.

### Observability & health (Sprint 004.3)

| Endpoint / Hook                         | Purpose                                          |
| --------------------------------------- | ------------------------------------------------ |
| `GET /api/health`                       | Liveness probe + build metadata                  |
| `instrumentation.ts` → `onRequestError` | Structured SSR/server-action error logging       |
| `src/lib/observability/report-error.ts` | Server error reporter (Sentry-ready)             |
| Error boundaries                        | Client errors reported via `reportClientError()` |

Set `SENTRY_DSN` when connecting `@sentry/nextjs` in a future sprint. CSP allows Sentry ingest when DSN is configured.

---

## Build pipeline

### Local / CI build

```bash
npm ci
npm run db:generate   # runs automatically via prebuild before build
npm run build
```

The `prebuild` script ensures the Prisma client is generated before `next build`. The generated client lives at `src/generated/prisma/` (gitignored).

### Production build (hosting provider)

Configure your build command:

```bash
npm run build
```

`prebuild` runs `prisma generate` automatically. No separate generate step is required if using `npm run build`.

---

## Database migrations

### Local development

```bash
npm run db:migrate    # prisma migrate dev — LOCAL ONLY
```

Never run `db:migrate` against production.

### Production deployment

**Option A — GitHub Actions (recommended)**

1. Configure GitHub **production** environment secrets:
   - `DATABASE_URL`
   - `DIRECT_URL`
2. Go to **Actions → Database Migrate Deploy**
3. Click **Run workflow**
4. Type `deploy` in the confirmation field
5. Verify job completes and `prisma migrate status` shows no pending migrations

**Option B — Manual (emergency)**

```bash
DATABASE_URL="..." DIRECT_URL="..." npm run db:deploy
```

### Migration order for new environments

1. Run `db:deploy` against production database
2. Deploy application code
3. Verify lead capture and owner CRM

---

## CI/CD

### Branch → environment flow

| Stage | Branch | Vercel target | URL |
|-------|--------|---------------|-----|
| Feature work | `feature/*` | Preview (PR) | Vercel preview URL |
| Staging / UT | `develop` | Preview + branch domain | https://staging.bitcraftly.com |
| Production | `main` | Production | https://bitcraftly.com |

Promoted path:

1. Open PR: `feature/*` → `develop`
2. Merge to `develop` → auto-deploys staging for UT
3. After UT pass, open PR: `develop` → `main`
4. Merge to `main` → auto-deploys production

Connected Git repo (Vercel project `bitcraftly-tech-v2`): `bitcraftly-tech/bitcraftly`.  
Production branch: `main`. Staging domain `staging.bitcraftly.com` is assigned to Git branch `develop`.

### Continuous Integration (`ci.yml`)

Runs on:

- `main`
- `develop`
- `release/**`

Jobs: lint → typecheck · unit tests · Prisma generate · build · E2E · Lighthouse.

### Database deploy (`db-deploy.yml`)

- Manual trigger only (`workflow_dispatch`)
- Requires typing `deploy` to confirm
- Uses GitHub **production** environment for secret protection
- Runs `prisma migrate deploy` only — never `migrate dev`

---

## Deployment checklist

### Pre-deploy

- [ ] CI green on target branch
- [ ] Staging UT passed on https://staging.bitcraftly.com (`develop`)
- [ ] `.env.example` reviewed; all production vars set in hosting provider
- [ ] Resend domain verified (SPF, DKIM)
- [ ] `db:deploy` run against production (no pending migrations)
- [ ] Deployment SHA tagged or noted for rollback

### Deploy

1. [ ] Merge `develop` → `main` (after staging UT)
2. [ ] Confirm build succeeds (`prebuild` → `db:generate` → `next build`)
3. [ ] Confirm production server starts (env validation passes)

### Post-deploy smoke

| Check                                                  | Pass |
| ------------------------------------------------------ | ---- |
| Homepage loads                                         | ☐    |
| `/contact` form submits → success UI                   | ☐    |
| Lead row in database                                   | ☐    |
| Notification email at `LEAD_NOTIFICATION_TO`           | ☐    |
| `/owner/login` → authenticate → `/owner/leads`         | ☐    |
| Invalid env would fail at startup (spot-check staging) | ☐    |

See also:

- [Lead Capture Production Checklist](./lead-capture-production-deployment-checklist.md)
- [Lead Capture Staging Verification](./lead-capture-staging-verification-checklist.md)

---

## Rollback

1. Roll back application deployment to previous SHA
2. Database migrations are **forward-only** — do not revert migration files without a planned down migration
3. If schema mismatch occurs, deploy fixed forward migration rather than rolling back DDL

---

## Known limitations

| Item                   | Status                                         |
| ---------------------- | ---------------------------------------------- |
| Rate limiter           | In-memory per instance — not distributed       |
| Admin panel auth       | UI preview only — `/admin/*` not authenticated |
| E2E lead capture tests | Manual smoke required                          |
| Error monitoring       | Not yet integrated (Sentry planned)            |

---

## Related documents

- [Sprint 004.1 Release Notes](../release/Sprint-004.1.md)
- [Database README](../database/README.md)
- [Lead Capture Production Checklist](./lead-capture-production-deployment-checklist.md)
