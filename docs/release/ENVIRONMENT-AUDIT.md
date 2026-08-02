# Environment Variable Audit — Bitcraftly Platform V2

**Branch:** `release/v1.0-launch`  
**Audit date:** 2026-07-21  
**Auditor role:** Principal DevOps Engineer  
**Scope:** Full repository scan — application code, Prisma, Next.js config, instrumentation, middleware, auth, lead funnel, GitHub Actions, and scripts.

---

## Executive Summary

The platform uses **8 required production runtime variables** validated at server startup via Zod (`src/lib/env/server-env.schema.ts` + `src/instrumentation.ts`). Database migrations require **`DIRECT_URL`** in CI (GitHub Actions) but it is **not** part of runtime validation — runtime uses pooled `DATABASE_URL` only.

No analytics environment variables (GTM, GA4, Plausible, etc.) are referenced in the codebase. No deprecated application variables were found in active code.

**Security posture:** No server secrets use the `NEXT_PUBLIC_` prefix. One minor pattern concern: a client component references `process.env.SENTRY_DSN`, which does not leak to the browser bundle (Next.js only inlines `NEXT_PUBLIC_*`), but the reference is misleading and should be cleaned up in a future sprint.

---

## Scan Methodology

Sources scanned:

| Source             | Path / pattern                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| Application code   | `process.env.*` across `src/**/*.ts(x)`                                          |
| Zod validation     | `src/lib/env/server-env.schema.ts`                                               |
| Prisma CLI         | `prisma.config.ts`, `prisma/schema.prisma`                                       |
| Next.js config     | `next.config.ts`                                                                 |
| Instrumentation    | `src/instrumentation.ts`                                                         |
| Middleware / auth  | `src/middleware.ts`, `src/features/owner-auth/**`                                |
| Lead funnel        | `src/features/lead-funnel/**`                                                    |
| Observability      | `src/lib/observability/**`, `src/lib/security/security-headers.ts`               |
| SEO / JSON-LD      | `src/lib/seo/site.ts`, `*-schema.tsx`                                            |
| GitHub Actions     | `.github/workflows/ci.yml`, `.github/workflows/db-deploy.yml`                    |
| Scripts            | `scripts/lighthouse-ci.mjs`, `playwright.config.ts`, `lighthouserc.cjs` (legacy) |
| Reference template | `.env.example`                                                                   |

No `import.meta.env` references were found. No dedicated env helper library (e.g. `@t3-oss/env-nextjs`) is used — validation is custom Zod.

---

## Complete Variable Inventory

### Application & Infrastructure Variables

| Variable                                   | Required               | Environment                   | Server/Client   | Default                                                                             | Files Used                                                                                                                                                                    | Purpose                                                                          |
| ------------------------------------------ | ---------------------- | ----------------------------- | --------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `DATABASE_URL`                             | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `src/lib/db/prisma.ts`, `src/lib/env/server-env.schema.ts`, `prisma.config.ts`, `.github/workflows/db-deploy.yml`                                                             | Pooled PostgreSQL connection for Prisma Client at runtime                        |
| `DIRECT_URL`                               | **Yes** (migrations)   | Production (CI), Staging, Dev | Server / CLI    | Falls back to `DATABASE_URL` in `prisma.config.ts`                                  | `prisma.config.ts`, `.github/workflows/db-deploy.yml`                                                                                                                         | Direct Neon/PostgreSQL connection for Prisma CLI (`db:deploy`, `migrate status`) |
| `SHADOW_DATABASE_URL`                      | No                     | Development only              | Server / CLI    | None                                                                                | `prisma.config.ts`                                                                                                                                                            | Optional shadow DB for `npm run db:migrate` (local dev)                          |
| `RESEND_API_KEY`                           | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `src/features/lead-funnel/services/lead-notification.service.ts`, `server-env.schema.ts`                                                                                      | Resend API key for lead notification emails                                      |
| `LEAD_NOTIFICATION_TO`                     | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `lead-notification.service.ts`, `server-env.schema.ts`                                                                                                                        | Destination inbox for lead alert emails                                          |
| `LEAD_FROM_EMAIL`                          | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `lead-notification.service.ts`, `server-env.schema.ts`                                                                                                                        | Verified Resend sender address                                                   |
| `NEXT_PUBLIC_SITE_URL`                     | **Yes** (prod runtime) | Production, Staging, Preview  | Client + Server | `https://bitcraftly.com` (hardcoded fallback in `getSiteUrl()` and JSON-LD schemas) | `server-env.schema.ts`, `src/lib/seo/site.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `blog-schema.tsx`, `case-study-schema.tsx`, `work-schema.tsx` | Canonical site origin for SEO, sitemap, robots, JSON-LD                          |
| `OWNER_AUTH_EMAIL`                         | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `owner-auth.config.ts`, `server-env.schema.ts`                                                                                                                                | Owner CRM login email                                                            |
| `OWNER_AUTH_PASSWORD`                      | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `owner-auth.config.ts`, `server-env.schema.ts`                                                                                                                                | Owner CRM login password (min 12 chars)                                          |
| `OWNER_SESSION_SECRET`                     | **Yes** (prod runtime) | Production, Staging           | Server          | None                                                                                | `owner-auth.env.ts`, `owner-auth.config.ts`, `middleware.ts`, `require-owner-session.ts`, `server-env.schema.ts`                                                              | HMAC secret for owner session cookie signing (min 32 chars)                      |
| `LEAD_RATE_LIMIT_MAX`                      | No                     | Production, Staging           | Server          | `5`                                                                                 | `src/features/lead-funnel/services/lead-rate-limit.ts`                                                                                                                        | Max lead submissions per IP+email per window                                     |
| `LEAD_RATE_LIMIT_IP_MAX`                   | No                     | Production, Staging           | Server          | `30`                                                                                | `lead-rate-limit.ts`                                                                                                                                                          | Max lead submissions per IP (all emails) per window                              |
| `LEAD_RATE_LIMIT_WINDOW_MS`                | No                     | Production, Staging           | Server          | `900000` (15 min)                                                                   | `lead-rate-limit.ts`                                                                                                                                                          | Lead rate limit sliding window duration                                          |
| `OWNER_LOGIN_RATE_LIMIT_MAX`               | No                     | Production, Staging           | Server          | `10`                                                                                | `src/features/owner-auth/owner-login-rate-limit.ts`                                                                                                                           | Max owner login attempts per IP per window                                       |
| `OWNER_LOGIN_RATE_LIMIT_WINDOW_MS`         | No                     | Production, Staging           | Server          | `900000` (15 min)                                                                   | `owner-login-rate-limit.ts`                                                                                                                                                   | Owner login IP rate limit window                                                 |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX`       | No                     | Production, Staging           | Server          | `5`                                                                                 | `owner-login-rate-limit.ts`                                                                                                                                                   | Max owner login attempts per account per window                                  |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_WINDOW_MS` | No                     | Production, Staging           | Server          | `900000` (15 min)                                                                   | `owner-login-rate-limit.ts`                                                                                                                                                   | Owner login account rate limit window                                            |
| `NEXT_PUBLIC_CALENDLY_URL`                 | No                     | Production, Staging, Preview  | Client + Server | `""` (empty — CTAs fall back to contact)                                            | `src/features/lead-funnel/lead-funnel.config.ts`, client CTAs (`CalendlyCta.tsx`, etc.)                                                                                       | Optional Calendly booking URL                                                    |
| `NEXT_PUBLIC_APP_URL`                      | No                     | Production, Staging, Preview  | Client + Server | None (falls through to hardcoded `https://bitcraftly.com`)                          | `src/lib/seo/site.ts`                                                                                                                                                         | Secondary public site URL fallback for `getSiteUrl()`                            |
| `SENTRY_DSN`                               | No                     | Production, Staging           | Server          | None                                                                                | `src/lib/observability/report-error.ts`, `src/lib/security/security-headers.ts`, `report-client-error.ts` (see security note)                                                 | Future Sentry server integration; enables CSP `connect-src` for Sentry ingest    |
| `NEXT_PUBLIC_SENTRY_DSN`                   | No                     | Production, Staging, Preview  | Client          | None                                                                                | `src/lib/observability/report-client-error.ts`                                                                                                                                | Future Sentry client integration                                                 |
| `BUILD_ID`                                 | No                     | All                           | Server          | `"local"`                                                                           | `src/lib/observability/build-info.ts`                                                                                                                                         | Manual build identifier fallback for `/api/health` metadata                      |
| `SKIP_ENV_VALIDATION`                      | No                     | CI / Dev emergency            | Server          | None (must be `"true"` to skip)                                                     | `src/instrumentation.ts`, `.github/workflows/ci.yml`, `scripts/lighthouse-ci.mjs`                                                                                             | Bypass production env validation — **never set in production**                   |

### Platform, Framework & Tooling Variables

These are referenced in code but are not operator-configured secrets. They are injected by Node.js, Next.js, Vercel, GitHub Actions, or npm.

| Variable                | Required | Environment    | Server/Client    | Default                   | Files Used                                                                                                           | Purpose                                              |
| ----------------------- | -------- | -------------- | ---------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `NODE_ENV`              | Auto     | All            | Server (+ build) | `"development"`           | `instrumentation.ts`, `prisma.ts`, `next.config.ts`, `security-headers.ts`, `owner-auth.actions.ts`, `build-info.ts` | Node/Next.js environment mode                        |
| `NEXT_PHASE`            | Auto     | Build          | Server           | None                      | `src/instrumentation.ts`                                                                                             | Skips env validation during `phase-production-build` |
| `VERCEL_GIT_COMMIT_SHA` | Auto     | Vercel         | Server           | None                      | `src/lib/observability/build-info.ts`                                                                                | Git commit SHA on Vercel deploys                     |
| `VERCEL_DEPLOYMENT_ID`  | Auto     | Vercel         | Server           | None                      | `build-info.ts`                                                                                                      | Vercel deployment ID for health metadata             |
| `GITHUB_SHA`            | Auto     | GitHub Actions | Server           | None                      | `build-info.ts`                                                                                                      | Commit SHA in CI/non-Vercel hosts                    |
| `COMMIT_SHA`            | No       | Any            | Server           | `"unknown"`               | `build-info.ts`                                                                                                      | Manual commit SHA override                           |
| `npm_package_version`   | Auto     | All            | Server           | `"0.1.0"`                 | `build-info.ts`                                                                                                      | App version from `package.json` (npm-injected)       |
| `CI`                    | Auto     | CI             | Server / Test    | None                      | `playwright.config.ts`, `.github/workflows/ci.yml`                                                                   | Standard CI flag (retries, reporters, forbidOnly)    |
| `ANALYZE`               | No       | Dev / CI       | Build            | `false`                   | `next.config.ts`, `package.json` (`npm run analyze`)                                                                 | Enables `@next/bundle-analyzer`                      |
| `LHCI_PORT`             | No       | CI / Dev       | Script           | `3099`                    | `scripts/lighthouse-ci.mjs`                                                                                          | Port for Lighthouse CI production server             |
| `PLAYWRIGHT_PORT`       | No       | CI / Dev       | Test             | `3000`                    | `playwright.config.ts`, `.github/workflows/ci.yml`                                                                   | E2E test server port                                 |
| `PLAYWRIGHT_BASE_URL`   | No       | CI / Dev       | Test             | `http://127.0.0.1:{PORT}` | `playwright.config.ts`                                                                                               | E2E base URL override                                |

---

## Categorization

### Required for Production

Validated at server startup (`instrumentation.ts` → `validateProductionServerEnv()`):

| Variable               | Notes                                       |
| ---------------------- | ------------------------------------------- |
| `DATABASE_URL`         | Pooled connection recommended (Neon pooler) |
| `RESEND_API_KEY`       |                                             |
| `LEAD_NOTIFICATION_TO` | Must be valid email                         |
| `LEAD_FROM_EMAIL`      | Must use Resend-verified domain             |
| `NEXT_PUBLIC_SITE_URL` | Must be valid URL; use production domain    |
| `OWNER_AUTH_EMAIL`     | Must be valid email                         |
| `OWNER_AUTH_PASSWORD`  | Min 12 characters                           |
| `OWNER_SESSION_SECRET` | Min 32 characters; rotate on compromise     |

**Also required for production operations (not runtime-validated):**

| Variable     | Where                                   | Notes                                                                                          |
| ------------ | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `DIRECT_URL` | GitHub Actions `production` environment | Required for `prisma migrate deploy`; not needed on Vercel runtime unless migrations run there |

### Required for Staging

Same as production runtime set, with staging-specific values:

- `NEXT_PUBLIC_SITE_URL` → staging hostname (e.g. `https://staging.bitcraftly.com`)
- `DATABASE_URL` / `DIRECT_URL` → staging Neon branch or database
- `LEAD_NOTIFICATION_TO` → staging inbox (avoid polluting production leads)
- `RESEND_API_KEY` → can share or use separate Resend key
- Owner auth secrets → can share or use staging-specific credentials

### Optional (Production / Staging)

| Variable                                   | Default   | When to set                                                                     |
| ------------------------------------------ | --------- | ------------------------------------------------------------------------------- |
| `LEAD_RATE_LIMIT_MAX`                      | `5`       | Tune abuse protection                                                           |
| `LEAD_RATE_LIMIT_IP_MAX`                   | `30`      | Tune abuse protection                                                           |
| `LEAD_RATE_LIMIT_WINDOW_MS`                | `900000`  | Tune abuse protection                                                           |
| `OWNER_LOGIN_RATE_LIMIT_MAX`               | `10`      | Tune brute-force protection                                                     |
| `OWNER_LOGIN_RATE_LIMIT_WINDOW_MS`         | `900000`  | Tune brute-force protection                                                     |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX`       | `5`       | Tune brute-force protection                                                     |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_WINDOW_MS` | `900000`  | Tune brute-force protection                                                     |
| `NEXT_PUBLIC_CALENDLY_URL`                 | Empty     | Enable live Calendly booking CTAs                                               |
| `NEXT_PUBLIC_APP_URL`                      | —         | Only if `NEXT_PUBLIC_SITE_URL` is unset (prefer setting `NEXT_PUBLIC_SITE_URL`) |
| `SENTRY_DSN`                               | —         | When `@sentry/nextjs` is wired                                                  |
| `NEXT_PUBLIC_SENTRY_DSN`                   | —         | When client Sentry is wired                                                     |
| `BUILD_ID`                                 | `"local"` | Custom build label for non-Vercel hosts                                         |

### Development Only

| Variable              | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `SHADOW_DATABASE_URL` | Local `db:migrate` with shadow database     |
| `SKIP_ENV_VALIDATION` | Local/CI bypass (already used in CI builds) |
| `ANALYZE`             | Bundle analysis (`npm run analyze`)         |
| `LHCI_PORT`           | Local Lighthouse CI port override           |
| `PLAYWRIGHT_PORT`     | Local E2E port override                     |
| `PLAYWRIGHT_BASE_URL` | Local E2E URL override                      |

### Unused (Safe to Delete)

**None.** Every variable documented in `.env.example` is referenced in application code, Prisma config, or CI. No orphaned env keys were found in active source.

### Deprecated

**None in active code.** `lighthouserc.cjs` is marked legacy (superseded by `scripts/lighthouse-ci.mjs`) but does not define custom environment variables.

---

## `.env.example` Comparison

### ✓ Variables in `.env.example` — all accounted for

| `.env.example` entry                                | Status                           |
| --------------------------------------------------- | -------------------------------- |
| `DATABASE_URL`                                      | Used — runtime + Prisma          |
| `DIRECT_URL`                                        | Used — Prisma CLI                |
| `SHADOW_DATABASE_URL` (commented)                   | Used — `prisma.config.ts`        |
| `RESEND_API_KEY`                                    | Used                             |
| `LEAD_NOTIFICATION_TO`                              | Used                             |
| `LEAD_FROM_EMAIL`                                   | Used                             |
| `OWNER_AUTH_EMAIL`                                  | Used                             |
| `OWNER_AUTH_PASSWORD`                               | Used                             |
| `OWNER_SESSION_SECRET`                              | Used                             |
| `NEXT_PUBLIC_SITE_URL`                              | Used                             |
| Rate limit vars (commented)                         | Used — defaults apply when unset |
| `NEXT_PUBLIC_CALENDLY_URL` (commented)              | Used                             |
| `NEXT_PUBLIC_APP_URL` (commented)                   | Used                             |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` (commented) | Used                             |
| `BUILD_ID` (commented)                              | Used                             |
| `SKIP_ENV_VALIDATION` (commented)                   | Used — CI only                   |

### ✓ Missing from `.env.example` (used in code)

These are intentionally omitted from `.env.example` because they are platform-injected or tooling-only:

| Variable                | Reason omitted                                           |
| ----------------------- | -------------------------------------------------------- |
| `NODE_ENV`              | Set automatically by Next.js / Node                      |
| `NEXT_PHASE`            | Next.js internal build phase                             |
| `VERCEL_GIT_COMMIT_SHA` | Vercel auto-injected                                     |
| `VERCEL_DEPLOYMENT_ID`  | Vercel auto-injected                                     |
| `GITHUB_SHA`            | GitHub Actions auto-injected                             |
| `COMMIT_SHA`            | Optional CI override — rarely needed                     |
| `npm_package_version`   | npm auto-injected from `package.json`                    |
| `CI`                    | Standard CI flag                                         |
| `ANALYZE`               | Dev script flag — could be added as commented optional   |
| `LHCI_PORT`             | Lighthouse script — could be added as commented optional |
| `PLAYWRIGHT_PORT`       | Test config — typically not in `.env.example`            |
| `PLAYWRIGHT_BASE_URL`   | Test config — typically not in `.env.example`            |

**Recommendation:** Add commented optional entries for `ANALYZE` and `LHCI_PORT` in `.env.example` in a future docs pass (not required for launch).

### ✓ Variables in `.env.example` but unused

**None.**

### ✓ Validation gap: `DIRECT_URL`

`DIRECT_URL` is documented in `.env.example` and required for Prisma CLI, but it is **not** included in `productionServerEnvSchema`. This is intentional for serverless runtime (pooled `DATABASE_URL` suffices at runtime), but operators must ensure `DIRECT_URL` exists in the **GitHub `production` environment** for migration workflows.

---

## Security Audit

### 1. No secrets prefixed with `NEXT_PUBLIC_`

| `NEXT_PUBLIC_*` variable   | Contains secret?                          | Verdict            |
| -------------------------- | ----------------------------------------- | ------------------ |
| `NEXT_PUBLIC_SITE_URL`     | No — public URL                           | ✓ Safe             |
| `NEXT_PUBLIC_APP_URL`      | No — public URL fallback                  | ✓ Safe             |
| `NEXT_PUBLIC_CALENDLY_URL` | No — public booking link                  | ✓ Safe             |
| `NEXT_PUBLIC_SENTRY_DSN`   | Semi-public by design (Sentry client DSN) | ✓ Expected pattern |

**Pass:** No server secrets (database, Resend, owner auth) use the `NEXT_PUBLIC_` prefix.

### 2. Server secrets cannot reach client bundles

| Secret                 | Access surface                  | Client import path?                                    | Verdict |
| ---------------------- | ------------------------------- | ------------------------------------------------------ | ------- |
| `DATABASE_URL`         | `src/lib/db/prisma.ts`          | No — server-only module                                | ✓ Safe  |
| `DIRECT_URL`           | `prisma.config.ts` (CLI)        | No                                                     | ✓ Safe  |
| `RESEND_API_KEY`       | `lead-notification.service.ts`  | No — server action path                                | ✓ Safe  |
| `LEAD_NOTIFICATION_TO` | `lead-notification.service.ts`  | No                                                     | ✓ Safe  |
| `LEAD_FROM_EMAIL`      | `lead-notification.service.ts`  | No                                                     | ✓ Safe  |
| `OWNER_AUTH_EMAIL`     | `owner-auth.config.ts`          | No — server actions only                               | ✓ Safe  |
| `OWNER_AUTH_PASSWORD`  | `owner-auth.config.ts`          | No                                                     | ✓ Safe  |
| `OWNER_SESSION_SECRET` | `owner-auth.env.ts`, middleware | Middleware runs on Edge/server — not bundled to client | ✓ Safe  |

**Pass:** All authentication and database secrets are accessed only from server modules, middleware, or CLI config.

### 3. AUTH secrets are server-only

- `OWNER_AUTH_EMAIL`, `OWNER_AUTH_PASSWORD`, `OWNER_SESSION_SECRET` — server-only ✓
- Session cookie: `httpOnly`, `secure` in production, `sameSite: strict` ✓
- Middleware validates session before `/owner/*` protected routes ✓

### 4. Prisma URLs are server-only

- `DATABASE_URL` read only in `src/lib/db/prisma.ts` (server) ✓
- `DIRECT_URL` / `SHADOW_DATABASE_URL` read only in `prisma.config.ts` (CLI) ✓

### 5. Findings & recommendations

| ID      | Severity | Finding                                                                                                                                                                                                                                              | Recommendation                                                                               |
| ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| SEC-001 | Low      | `report-client-error.ts` (`"use client"`) references `process.env.SENTRY_DSN` alongside `NEXT_PUBLIC_SENTRY_DSN`. Next.js does **not** inline non-`NEXT_PUBLIC_` vars in client bundles, so the DSN does not leak — but the reference is misleading. | Remove `process.env.SENTRY_DSN` from the client reporter; use `NEXT_PUBLIC_SENTRY_DSN` only. |
| SEC-002 | Info     | `SKIP_ENV_VALIDATION=true` is set in CI workflows for builds. This is correct (build-time only); ensure it is never configured in Vercel Production/Preview environments.                                                                            | Add Vercel environment policy note in deploy checklist.                                      |
| SEC-003 | Info     | No analytics env vars exist — no third-party tracking keys to audit.                                                                                                                                                                                 | N/A until analytics is added.                                                                |

---

## Vercel Deployment Checklist

Configure these in **Vercel → Project → Settings → Environment Variables**.  
Do **not** set `SKIP_ENV_VALIDATION`, `SHADOW_DATABASE_URL`, or test/tooling vars in Vercel.

### Production Variables

Set for **Production** environment only.

| Variable               | Value guidance                               |
| ---------------------- | -------------------------------------------- |
| `DATABASE_URL`         | Neon **pooled** connection string            |
| `RESEND_API_KEY`       | Production Resend API key                    |
| `LEAD_NOTIFICATION_TO` | Production team inbox                        |
| `LEAD_FROM_EMAIL`      | Verified sender on production domain         |
| `NEXT_PUBLIC_SITE_URL` | `https://bitcraftly.com` (no trailing slash) |
| `OWNER_AUTH_EMAIL`     | Production owner login email                 |
| `OWNER_AUTH_PASSWORD`  | Strong password (≥ 12 chars)                 |
| `OWNER_SESSION_SECRET` | Cryptographically random (≥ 32 chars)        |

**Optional (Production):**

| Variable                                   | When                                      |
| ------------------------------------------ | ----------------------------------------- |
| `NEXT_PUBLIC_CALENDLY_URL`                 | Live Calendly link                        |
| `LEAD_RATE_LIMIT_MAX`                      | Custom rate limits                        |
| `LEAD_RATE_LIMIT_IP_MAX`                   | Custom rate limits                        |
| `LEAD_RATE_LIMIT_WINDOW_MS`                | Custom rate limits                        |
| `OWNER_LOGIN_RATE_LIMIT_MAX`               | Custom login limits                       |
| `OWNER_LOGIN_RATE_LIMIT_WINDOW_MS`         | Custom login limits                       |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX`       | Custom login limits                       |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_WINDOW_MS` | Custom login limits                       |
| `SENTRY_DSN`                               | When Sentry server integration is enabled |
| `NEXT_PUBLIC_SENTRY_DSN`                   | When Sentry client integration is enabled |

**Not on Vercel Production runtime:**

| Variable     | Where instead                                                      |
| ------------ | ------------------------------------------------------------------ |
| `DIRECT_URL` | GitHub Actions `production` environment (for `db-deploy` workflow) |

### Preview Variables

Set for **Preview** environment (PR/staging deploys).

| Variable               | Value guidance                                |
| ---------------------- | --------------------------------------------- |
| `DATABASE_URL`         | Staging/preview Neon branch (pooled)          |
| `RESEND_API_KEY`       | Staging key or shared (with caution)          |
| `LEAD_NOTIFICATION_TO` | Staging inbox — **not** production leads      |
| `LEAD_FROM_EMAIL`      | Verified sender (can match production domain) |
| `NEXT_PUBLIC_SITE_URL` | Preview URL or staging domain                 |
| `OWNER_AUTH_EMAIL`     | Staging owner credentials                     |
| `OWNER_AUTH_PASSWORD`  | Staging password                              |
| `OWNER_SESSION_SECRET` | Staging secret (can differ from production)   |

**Optional (Preview):** Same optional set as Production, with staging-appropriate values.

**Never on Preview:**

- `SKIP_ENV_VALIDATION`
- `SHADOW_DATABASE_URL`

### Development Variables

Set in **local** `.env.local` (copied from `.env.example`). Vercel **Development** environment (if used for `vercel dev`):

| Variable                       | Notes                                               |
| ------------------------------ | --------------------------------------------------- |
| All 8 required production vars | Use local/staging values                            |
| `DIRECT_URL`                   | Local or Neon dev direct connection                 |
| `SHADOW_DATABASE_URL`          | Optional — local migrations                         |
| `NEXT_PUBLIC_CALENDLY_URL`     | Optional                                            |
| `SKIP_ENV_VALIDATION`          | Optional — only if debugging startup issues locally |

**Do not configure on Vercel Development:** `CI`, `PLAYWRIGHT_*`, `LHCI_PORT`, `ANALYZE` — these are local/CI tooling flags.

---

## GitHub Actions Secrets

### `production` environment (db-deploy workflow)

| Secret         | Required |
| -------------- | -------- |
| `DATABASE_URL` | Yes      |
| `DIRECT_URL`   | Yes      |

### CI workflow (`ci.yml`)

No repository secrets required. Uses inline env:

- `SKIP_ENV_VALIDATION=true` (build/test only)
- `CI=true`
- `PLAYWRIGHT_PORT=3000` (E2E job)

---

## Recommended Cleanup (Future Sprints)

1. **SEC-001:** Remove `process.env.SENTRY_DSN` from `report-client-error.ts`; rely on `NEXT_PUBLIC_SENTRY_DSN` for client-side Sentry readiness checks.
2. **Docs:** Add commented optional entries in `.env.example` for `ANALYZE` and `LHCI_PORT`.
3. **Validation:** Consider documenting `DIRECT_URL` in `production-deployment.md` as "required for migrations, not runtime" — already partially documented; this audit consolidates that distinction.
4. **Analytics:** When adding GTM/GA4/Plausible, introduce dedicated env vars with clear Server/Client classification and update this audit.
5. **Legacy file:** `lighthouserc.cjs` can be removed when the team confirms no external tooling references it.

---

## Quick Reference — Production Minimum

```
DATABASE_URL
RESEND_API_KEY
LEAD_NOTIFICATION_TO
LEAD_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
OWNER_AUTH_EMAIL
OWNER_AUTH_PASSWORD
OWNER_SESSION_SECRET
```

Plus GitHub `production` secrets for migrations:

```
DATABASE_URL
DIRECT_URL
```

---

_This document is the definitive environment variable inventory for `release/v1.0-launch`. Re-run this audit when adding integrations (Sentry, analytics, payment providers) or new server actions that require secrets._
