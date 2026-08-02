# Bitcraftly Platform — Engineering Handover Report

**Document date:** 2026-07-22  
**Authoring context:** Single source of truth for engineering continuity  
**Branch:** `release/v1.0-launch`  
**Latest commit:** `6af0a1e` — `feat(lead-funnel): send submitter confirmation emails via Resend`  
**Tags:** `v1.0.0-rc5`, `v1.0-launch-candidate`

---

# 1. Executive Summary

## Current project status

Bitcraftly Platform V2 is an enterprise Next.js marketing and lead-capture application with Owner CRM, production CI/CD, security hardening, and performance optimization through Sprint 004.3 Phase B. The codebase ships **~122 static routes**, full marketing pages, Prisma-backed lead persistence, Resend email delivery (team + submitter confirmation), and owner-authenticated CRM at `/owner/leads`.

**Platform version:** `0.1.0` (pre-release)  
**Overall maturity:** Active development on release branch; infrastructure sprints complete; launch blocked on DNS/email verification and performance Phase C.

## Current release branch

| Item                 | Value                                                          |
| -------------------- | -------------------------------------------------------------- |
| Branch               | `release/v1.0-launch`                                          |
| Remote               | `origin` → `https://github.com/bitcraftly-tech/bitcraftly.git` |
| Latest RC tag        | `v1.0.0-rc5`                                                   |
| Launch candidate tag | `v1.0-launch-candidate`                                        |

## Production readiness

| Area              | Status                                                    |
| ----------------- | --------------------------------------------------------- |
| Application build | ✅ Passes lint, typecheck, unit tests, build              |
| CI pipeline       | ✅ GitHub Actions on `main`, `develop`, `release/**`      |
| Database          | ✅ Prisma + Neon; migration workflow documented           |
| Lead capture      | ✅ Persist + notify; confirmation email added 2026-07-22  |
| Security          | ✅ Headers, rate limits, owner auth, env validation       |
| SEO / A11y        | ✅ Lighthouse A11y/BP/SEO 100 on key routes               |
| Performance       | ⚠️ Perf 73–75 (target 90) — Phase C pending               |
| Email delivery    | ⚠️ Requires Resend domain **Verified** (`bitcraftly.com`) |
| DNS               | ⚠️ Cloudflare migration in progress (2026-07-22)          |

**Verdict:** **Conditional GO** — deploy-ready after Resend domain verification, Vercel env confirmation, and smoke tests.

## Pending work

1. Complete Cloudflare nameserver propagation → Resend domain Verified
2. Set `LEAD_FROM_EMAIL=Bitcraftly <hello@bitcraftly.com>` in Vercel (all environments)
3. Lead capture smoke on staging + production
4. Sprint 004.3 **Phase C** — LCP / render-blocking CSS (Perf ≥ 90)
5. Distributed rate limiting (Redis/Upstash)
6. Sentry package integration (hooks exist)
7. Mobile Lighthouse in CI
8. Admin panel authentication

---

# 2. Repository Information

## Repositories

| Repository          | URL                                                        | Remote     | Purpose                     | Status     |
| ------------------- | ---------------------------------------------------------- | ---------- | --------------------------- | ---------- |
| **bitcraftly**      | `https://github.com/bitcraftly-tech/bitcraftly.git`        | `origin`   | Primary production monorepo | **Active** |
| bitcraftly-platform | `https://github.com/uideveloper09/bitcraftly-platform.git` | `personal` | Developer mirror            | Secondary  |

## Deprecated / legacy

| Item                               | Notes                               |
| ---------------------------------- | ----------------------------------- |
| `origin/development`               | Legacy integration branch           |
| `origin/release/v2-platform`       | Superseded by `release/v1.0-launch` |
| Legacy `feat/*` branches on origin | Historical; do not deploy           |

## Branch strategy

| Branch                   | Role                                                      |
| ------------------------ | --------------------------------------------------------- |
| `release/v1.0-launch`    | **Current release** — deploy staging/production from here |
| `main`                   | Stable integration target                                 |
| `develop`                | Active development integration                            |
| `feature/*`              | Feature branches (merge to develop or release)            |
| `integration/release-v1` | Historical integration                                    |

**CI triggers:** push/PR on `main`, `develop`, `release/**`

## Remote configuration

```bash
origin   https://github.com/bitcraftly-tech/bitcraftly.git
personal https://github.com/uideveloper09/bitcraftly-platform.git
```

**Deploy source of truth:** `origin/release/v1.0-launch`

## Tags (release markers)

| Tag                      | Points to | Notes                           |
| ------------------------ | --------- | ------------------------------- |
| `v1.0.0-rc5`             | `6af0a1e` | Latest RC — confirmation emails |
| `v1.0-launch-candidate`  | `6af0a1e` | Launch candidate                |
| `v1.0.0-rc4`             | `8f57e69` | Sprint 004.3 Phase A            |
| `v1.0-lead-intelligence` | `5def6fe` | Sprint 003                      |
| `v1.0.0`                 | `5def6fe` | Historical marker               |

---

# 3. Architecture

## Stack

| Layer           | Technology           | Version          |
| --------------- | -------------------- | ---------------- |
| Framework       | Next.js (App Router) | 16.2.10          |
| UI              | React                | 19.2.4           |
| Language        | TypeScript           | 5.x strict       |
| Styling         | Tailwind CSS         | v4               |
| ORM             | Prisma               | 7.8.0            |
| Database        | PostgreSQL (Neon)    | —                |
| Email           | Resend API           | —                |
| Validation      | Zod                  | 4.4.3            |
| Forms           | react-hook-form      | 7.81.0           |
| Planned backend | FastAPI + JWT        | Not in this repo |

## Architectural principles

- **Feature-based modules** under `src/features/`
- **Thin routing** — `src/app/**/page.tsx` delegates to feature modules
- **Server Components by default** — client islands for interactivity
- **Colocated tests** — `*.test.ts` beside services
- **Shared UI** — `src/components/ui/`, design tokens in `src/styles/`

## App Router structure

```text
src/app/
├── (marketing)/          # Public marketing site
│   ├── page.tsx          # Homepage
│   ├── contact/, pricing/, services/, solutions/, work/, ...
│   └── layout.tsx
├── (admin)/admin/        # Admin scaffold (unauthenticated)
├── owner/                # Owner CRM (authenticated)
│   ├── login/
│   └── (dashboard)/leads/
├── api/health/           # Health probe
├── layout.tsx            # Root layout
├── sitemap.ts, robots.ts
├── error.tsx, global-error.tsx, not-found.tsx
└── instrumentation.ts    # via src/instrumentation.ts
```

## Feature structure (top level)

```text
src/features/
├── homepage/       # Protected — homepage modules
├── services/       # Protected — services pages
├── solutions/      # Protected — solutions pages
├── lead-funnel/    # Contact + newsletter capture
├── owner-auth/     # Owner login/session
├── owner-crm/      # Lead dashboard
├── contact/, pricing/, work/, industries/, blog/, ...
└── admin/, auth/, crm/, cms/, dashboard/, ai/  # Scaffolds (.gitkeep / partial)
```

## Middleware

**File:** `src/middleware.ts`  
**Matcher:** `/owner/:path*`  
**Behavior:** Validates HMAC owner session cookie; redirects unauthenticated users to `/owner/login`; redirects authenticated users away from login page.

## Authentication

| Surface        | Mechanism                                                          |
| -------------- | ------------------------------------------------------------------ |
| Owner CRM      | Env credentials + HMAC session cookie (`bitcraftly_owner_session`) |
| Public site    | None                                                               |
| Admin scaffold | **Not authenticated** (future sprint)                              |
| End-user auth  | Planned FastAPI JWT — not implemented                              |

**Defense in depth:** Middleware + `requireOwnerSession()` in owner layout and CRM loader.

## Owner CRM

- **Routes:** `/owner/login`, `/owner/leads`
- **Features:** `src/features/owner-auth/`, `src/features/owner-crm/`
- **Data:** Reads from Prisma `Lead` model via `lead.repository.ts`
- **UI:** Filters, stat cards, status badges, notification delivery status

## Lead capture

```text
UI (ContactLeadForm, NewsletterSection)
  → submitLeadFromClient (user-safe error mapping)
    → submitLeadAction ["use server"]
      → lead.service.processLeadSubmission
        ├── lead-guard (honeypot + rate limits)
        ├── Zod validation (contact / newsletter schemas)
        ├── lead.repository.saveLead (Prisma)
        └── lead-notification.service.sendLeadNotification (Resend)
              ├── Team email → LEAD_NOTIFICATION_TO
              └── Confirmation email → submitter (best-effort)
```

## Environment validation

**Startup:** `src/instrumentation.ts` → `validateProductionServerEnv()`  
**Schema:** `src/lib/env/server-env.schema.ts` (Zod)  
**When:** `NODE_ENV=production`, not during build, unless `SKIP_ENV_VALIDATION=true`

## Security (summary)

- CSP, HSTS, COOP, CORP, Permissions-Policy via `src/lib/security/security-headers.ts`
- Rate limits: lead submission + owner login (in-memory)
- Honeypot on all lead forms
- HTML escaping in email templates
- No server secrets in `NEXT_PUBLIC_*`

## Folder structure (full `src/` top levels)

See `docs/engineering/PROJECT_STATE.json` and `PROJECT_CONTEXT.md` for the canonical tree.

---

# 4. Completed Sprints

> **Note:** Sprint 001 and 002 do not have dedicated `docs/release/Sprint-00x.md` files. Summaries below are reconstructed from git history and engineering checklists.

---

## Sprint 001 — Platform Foundation & Marketing Scaffold

### Purpose

Establish engineering foundation, documentation, design-system direction, and premium marketing site scaffold including homepage freeze and route structure.

### Files changed (representative)

- `README.md`, `docs/engineering/*`, `docs/architecture/ADR-001-src-directory.md`
- `src/app/(marketing)/**` — marketing route groups
- `src/features/homepage/**` — full homepage feature modules
- `src/constants/navigation.ts`, `src/lib/seo/createPageMetadata.ts`
- `package.json` — scripts and tooling baseline

### Architecture decisions

- Feature-based architecture under `src/features/`
- Marketing route group `(marketing)` with shared layout
- Server-first homepage composition via `HomepageShell`
- Centralized navigation and SEO metadata helpers

### Performance impact

- Homepage heavy sections; later addressed in Sprint 004.3
- Image assets added (hero, brand); later WebP migration in subsequent work

### Security impact

- Minimal — public marketing site only

### Testing

- Manual QA; formal CI expanded in later sprints

### Acceptance criteria

- Homepage redesign complete and frozen
- Marketing routes render
- Engineering docs and standards established

### Git commit

| Commit    | Message                                                         |
| --------- | --------------------------------------------------------------- |
| `1ba49d6` | `docs: establish production-ready engineering foundation`       |
| `70ee7eb` | `feat(homepage): complete premium homepage redesign and freeze` |

### Lessons learned

- Early route + feature structure investment paid off for Sprint 004 performance splits
- Protected homepage rule prevents accidental regressions during perf work

---

## Sprint 002 — Production Lead Capture

### Purpose

Wire contact form and newsletter to server actions with Resend team notifications, validation, honeypot, and user-safe error handling. Documented as **Sprint 002 — Production Lead Capture** in lead deployment checklists.

### Files changed (representative)

- `src/features/lead-funnel/**` — forms, schemas, server actions, Resend service
- `src/features/contact/ContactLandingPage.tsx`
- `src/features/homepage/Newsletter/NewsletterSection.tsx`
- `docs/engineering/lead-capture-*-checklist.md`

### Architecture decisions

- Server Actions for submission (no public API route)
- Typed error codes: `VALIDATION`, `HONEYPOT`, `RATE_LIMIT`, `PERSISTENCE`, `DELIVERY`
- User-facing messages never expose Resend internals (mapped in `submit-lead.client.ts`)
- Reply-To set to submitter email on team notifications

### Performance impact

- Contact form client bundle; lazy-loaded in Phase B (`ContactLeadFormLazy`)

### Security impact

- Honeypot field (`LeadHoneypotField`)
- Initial rate limiting (expanded in 004.2)

### Testing

- `lead-notification.service.test.ts`, `lead.service.test.ts`, `submit-lead.client.test.ts`

### Acceptance criteria

- Form submits via server action
- Resend notification on success (when configured)
- Friendly errors on failure
- Checklists: `docs/engineering/lead-capture-staging-verification-checklist.md`

### Git commit

Lead funnel foundation including Resend service introduced in repository documentation sprint area (`cdc56e1` and subsequent lead-funnel commits). Formal checklist labeled Sprint 002.

### Lessons learned

- Resend sandbox (`onboarding@resend.dev`) cannot email arbitrary recipients — domain verification required for production
- Distinguish team notification vs submitter confirmation (added post-rc5 in `6af0a1e`)

---

## Sprint 003 — Lead Intelligence Platform

### Purpose

Persist leads to PostgreSQL, add Owner CRM dashboard, owner authentication, and middleware protection.

### Files changed

51 files, +4013 lines — see commit stat for `5def6fe`:

- `prisma/schema.prisma`, migrations, `src/lib/db/prisma.ts`
- `src/features/lead-funnel/services/lead.repository.ts`
- `src/features/owner-auth/**`, `src/features/owner-crm/**`
- `src/app/owner/**`, `src/middleware.ts`

### Architecture decisions

- Prisma 7 with `@prisma/adapter-pg` pooled connection
- `Lead` model with notification status fields
- Owner session: HMAC-signed cookie, 7-day max age
- CRM loader pattern with server-side auth gate

### Performance impact

- Minimal — server-side DB writes on form submit

### Security impact

- Owner routes protected by middleware
- Credentials from env; timing-safe password compare
- Robots disallow owner paths

### Testing

- `lead.repository.test.ts` (441 lines), `owner-auth.*.test.ts`, `owner-leads.loader.test.ts`

### Acceptance criteria

- Leads persist to Neon
- Owner can log in and view leads at `/owner/leads`
- Notification status tracked (sent/failed)

### Git commit

| Commit    | Message                                                          |
| --------- | ---------------------------------------------------------------- |
| `5def6fe` | `feat(lead-crm): complete Sprint 003 lead intelligence platform` |

### Lessons learned

- Repository layer abstraction enables future FastAPI migration
- Dual auth layers (middleware + loader) recommended before exposing PII

---

## Sprint 004.1 — Production Infrastructure

### Purpose

Harden production infrastructure: Prisma in build, CI branch coverage, env validation, DB deploy workflow, deployment docs.

**Full doc:** `docs/release/Sprint-004.1.md`

### Files changed

14 files — `instrumentation.ts`, `src/lib/env/*`, `.github/workflows/*`, `.env.example`, `docs/engineering/production-deployment.md`

### Architecture decisions

- `prebuild` → `prisma generate` mandatory
- Production env validated at server startup only (not build)
- `SKIP_ENV_VALIDATION=true` in CI only
- DB migrations via manual GitHub workflow (never `migrate dev` in prod)

### Performance impact

- Slightly longer build from Prisma generate — acceptable

### Security impact

- Fail-fast on missing production secrets at runtime

### Testing

- `validate-server-env.test.ts`

### Acceptance criteria

All 7 deliverables ✅ in Sprint doc; lint/typecheck/build pass

### Git commit

| Commit    | Message                                                         |
| --------- | --------------------------------------------------------------- |
| `b738466` | `chore(infra): complete Sprint 004.1 production infrastructure` |

### Lessons learned

- `DIRECT_URL` required in GitHub production env for migrations but not runtime validation
- Document ops steps separately from code deliverables

---

## Sprint 004.2 — Production Security & Hardening

### Purpose

Security hardening without UI changes: headers, rate limits, owner auth depth, error boundaries.

**Full doc:** `docs/release/Sprint-004.2.md`

### Files changed

~20 files — `src/lib/security/*`, owner login limits, lead IP limits, `error.tsx`, `global-error.tsx`, `not-found.tsx`

### Architecture decisions

- Centralized `security-headers.ts`
- Shared in-memory rate limiter with namespaces
- Owner cookie `sameSite: strict`
- CSP allows Sentry ingest when `SENTRY_DSN` set

### Performance impact

- Negligible

### Security impact

- **Major** — CSP, COOP, CORP, dual rate limits, requireOwnerSession

### Testing

- `owner-login-rate-limit.test.ts`, `lead-guard.service.test.ts`

### Acceptance criteria

All 9 criteria ✅ in Sprint doc

### Git commit

| Commit    | Message                                                      |
| --------- | ------------------------------------------------------------ |
| `83db2a3` | `feat(security): complete Sprint 004.2 production hardening` |

### Lessons learned

- In-memory rate limiter documented as pre-scale limitation
- Remove debug `console.info` from analytics paths

---

## Sprint 004.3 Phase A — Performance, SEO & Observability

### Purpose

SEO correctness, sitemap expansion, health endpoint, observability hooks, cache headers, Lighthouse CI improvements.

**Full doc:** `docs/release/Sprint-004.3.md`

### Files changed

~30 files — `src/lib/seo/*`, `src/lib/observability/*`, `src/app/api/health/route.ts`, sitemap, noindex fixes

### Architecture decisions

- Env-aware canonical URLs via `getSiteUrl()` / `getAbsoluteUrl()`
- Sitemap driven by content catalogs (single source of truth)
- Observability without mandatory Sentry dependency

### Performance impact

- Static asset `Cache-Control: immutable`
- Lighthouse CI production-only audits

### Security impact

- Sentry CSP allowance conditional on env

### Testing

- Build includes `/api/health`; manual Lighthouse CI

### Acceptance criteria

Critical/High audit items fixed per Sprint doc

### Git commit

| Commit    | Message                                                            |
| --------- | ------------------------------------------------------------------ |
| `8f57e69` | `feat(performance): complete Sprint 004.3 production optimization` |

### Lessons learned

- Invalid sitemap URLs hurt SEO — generate from catalogs only
- Feature JSON-LD URL migration deferred (Medium items)

---

## Sprint 004.3 Phase B — Performance Optimization

### Purpose

Header scroll island, services SSR catalog + filter island, lazy pricing/contact forms, a11y contrast fixes.

**Full doc:** `docs/release/Sprint-004.3-Phase-B.md`

### Files changed

20 files, +263 / −704 lines

### Architecture decisions

- Services: full SSR catalog HTML + client filter toggles `hidden` on cards
- Header: server `<header>` + ~1 KB scroll island
- Forms: viewport-deferred via `MountWhenVisible` pattern

### Performance impact

| Route       | Perf before (Phase A prod) | Perf after (Phase B) |
| ----------- | -------------------------- | -------------------- |
| `/`         | n/a                        | **73**               |
| `/services` | 52                         | **73**               |
| `/pricing`  | 59                         | **74**               |
| `/contact`  | 49                         | **75**               |

- TBT on `/services`: ~3980 ms → **120 ms**
- Unused JS on `/services`: 539 KiB → **22 KiB**

### Security impact

- None

### Testing

- 87/87 unit tests at sprint completion (now 90)
- Lighthouse: A11y/BP/SEO **100** all routes

### Acceptance criteria

Perf ≥ 90 **not met** — LCP ~3.2s remains; Phase C recommended

### Git commit

| Commit    | Message                                            |
| --------- | -------------------------------------------------- |
| `8c25779` | `feat(performance): complete Sprint 004.3 Phase B` |

### Lessons learned

- TBT fixes ≠ LCP fixes — Phase C must target CSS and hero assets
- Delete `HeaderRoot`, `HomepageBelowFoldClient` — net bundle reduction

---

## Post-handover addition (2026-07-22)

| Commit    | Change                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------ |
| `6af0a1e` | Submitter confirmation emails; `confirmationSent` on `SubmitLeadSuccess`; conditional success UI |

---

# 5. Production Infrastructure

## Prisma

| Item          | Location                                                 |
| ------------- | -------------------------------------------------------- |
| Schema        | `prisma/schema.prisma`                                   |
| Client output | `src/generated/prisma/` (gitignored, generated at build) |
| Runtime       | `src/lib/db/prisma.ts` — pooled via `@prisma/adapter-pg` |
| Config        | `prisma.config.ts`                                       |

**Model:** `Lead` — contact/newsletter leads with notification status fields.

## Database

- **Provider:** Neon PostgreSQL
- **Runtime connection:** `DATABASE_URL` (pooled `-pooler` hostname recommended)
- **Migration connection:** `DIRECT_URL` (non-pooler)

## Migration workflow

| Environment   | Command                         | When                              |
| ------------- | ------------------------------- | --------------------------------- |
| Local dev     | `npm run db:migrate`            | Schema changes during development |
| Production    | `npm run db:deploy`             | Via GitHub Actions only           |
| Never in prod | `prisma migrate dev`, `db push` | —                                 |

**Workflow:** `.github/workflows/db-deploy.yml` — manual dispatch, must type `deploy`, uses GitHub `production` environment secrets.

## GitHub Actions

| Workflow        | Trigger                                 | Jobs                                                        |
| --------------- | --------------------------------------- | ----------------------------------------------------------- |
| `ci.yml`        | push/PR `main`, `develop`, `release/**` | quality (lint, typecheck, coverage, build), e2e, lighthouse |
| `db-deploy.yml` | manual                                  | `prisma migrate deploy` + status check                      |

## CI

- `SKIP_ENV_VALIDATION=true` during CI builds
- `npm run db:generate` before every build job
- Playwright: desktop + mobile chromium projects
- Lighthouse: `scripts/lighthouse-ci.mjs` on port 3099

## CD

- **Vercel** Git integration from `release/v1.0-launch` (and configured branch mappings)
- Build command: `npm run build` (includes `prebuild` prisma generate)

## Environment validation

See Section 9. Validated at runtime via `instrumentation.ts`.

## Production startup validation

Fails deploy startup if any of 8 required vars missing/invalid (see `server-env.schema.ts`).

## Database deployment workflow

1. Merge to release branch
2. Configure GitHub `production` environment secrets (`DATABASE_URL`, `DIRECT_URL`)
3. Run **Database Migrate Deploy** workflow
4. Verify `prisma migrate status` in workflow output
5. Deploy application to Vercel

---

# 6. Security

## Headers

**Source:** `src/lib/security/security-headers.ts` → `next.config.ts`

| Header                              | Value / notes                                           |
| ----------------------------------- | ------------------------------------------------------- |
| `Strict-Transport-Security`         | `max-age=31536000; includeSubDomains; preload`          |
| `X-Content-Type-Options`            | `nosniff`                                               |
| `X-Frame-Options`                   | `DENY`                                                  |
| `Referrer-Policy`                   | `strict-origin-when-cross-origin`                       |
| `Permissions-Policy`                | Restrictive defaults                                    |
| `Content-Security-Policy`           | See file — `frame-ancestors 'none'`, conditional Sentry |
| `Cross-Origin-Opener-Policy`        | `same-origin-allow-popups`                              |
| `Cross-Origin-Resource-Policy`      | `same-site`                                             |
| `X-Permitted-Cross-Domain-Policies` | `none`                                                  |

## Middleware

Owner route protection only (`/owner/*`). See Section 3.

## Rate limits

| Surface                 | Defaults    | Env overrides              |
| ----------------------- | ----------- | -------------------------- |
| Lead per email+IP       | 5 / 15 min  | `LEAD_RATE_LIMIT_*`        |
| Lead per IP             | 30 / 15 min | `LEAD_RATE_LIMIT_IP_*`     |
| Owner login per IP      | 10 / 15 min | `OWNER_LOGIN_RATE_LIMIT_*` |
| Owner login per account | 5 / 15 min  | `OWNER_LOGIN_ACCOUNT_*`    |

**Limitation:** In-memory — not shared across Vercel instances.

## Owner login

- Env credentials (not database users)
- Rate limited IP + account
- Session cookie: `httpOnly`, `secure` in prod, `sameSite: strict`, path `/owner`

## Lead submission

- Honeypot must remain empty
- Zod validation on all fields
- HTML escaped in email templates
- Team notification failure → `DELIVERY` error to user (generic message)

## Cookie strategy

| Cookie                     | Purpose           | Flags                                     |
| -------------------------- | ----------------- | ----------------------------------------- |
| `bitcraftly_owner_session` | Owner CRM session | httpOnly, secure (prod), strict, `/owner` |

## CSP

Documented in `security-headers.ts`. Production adds `upgrade-insecure-requests`.

## COOP / CORP

`same-origin-allow-popups` and `same-site` respectively — see headers table.

## HSTS

One-year max-age with preload directive in production.

## Permissions Policy

Disables unused browser features — see `security-headers.ts`.

## Error boundaries

- `src/app/error.tsx` — route-level recovery
- `src/app/global-error.tsx` — root fallback
- `src/app/not-found.tsx` — 404 with noindex metadata
- Client/server errors reported via observability layer

## Secrets audit

**Pass:** No server secrets use `NEXT_PUBLIC_` prefix. Full table in `docs/release/ENVIRONMENT-AUDIT.md` Section Security Audit.

---

# 7. Performance

## Before vs after (Phase A → Phase B)

| Route       | Perf (Phase A prod) | Perf (Phase B) | Δ   |
| ----------- | ------------------- | -------------- | --- |
| `/`         | n/a                 | 73             | —   |
| `/services` | 52                  | 73             | +21 |
| `/pricing`  | 59                  | 74             | +15 |
| `/contact`  | 49                  | 75             | +26 |

| Category       | Phase B            |
| -------------- | ------------------ |
| Accessibility  | **100** all routes |
| Best Practices | **100**            |
| SEO            | **100**            |

## Bundle sizes

- `/services` unused JS: 539 KiB → 22 KiB (Phase A prod)
- Header client island: ~1 KB
- Services catalog: monolithic client → SSR + deferred search chunk

## SSR

- Marketing routes server-first
- Services catalog cards in initial HTML
- Homepage below-fold SSR via `HomepageShell`

## Lazy loading

- `ContactLeadFormLazy`, `PricingCalculatorLazy`
- Marketing chrome idle-deferred
- Homepage heavy widgets dynamically imported

## Client islands

- `HeaderHomeScrollEffect` — scroll state only
- `ServicesCatalogSearch` — filter UI only
- Lead funnel widgets — idle dynamic import

## Header optimization

Server `HeaderElement` + minimal scroll island (Phase B). Removed `HeaderRoot`.

## Services optimization

SSR `ServicesCatalogContent` + client filter on `data-service-card` nodes.

## Pricing optimization

Calculator loads on viewport entry — react-hook-form + zod split.

## Homepage optimization

Phase A: removed `HomepageBelowFoldClient` wrapper; direct SSR below-fold.

## Lighthouse improvements

- CI gates: A11y/SEO 85% error; Perf 50% warn
- Production-only audits (no dev server reuse)
- Routes: `/`, `/services`, `/pricing`, `/contact`

## Remaining bottlenecks

1. **LCP ~3.2s** on `/services` — render-blocking CSS
2. Perf score 73–75 vs target 90
3. Mobile Lighthouse not in CI
4. No RUM / web-vitals bridge

**Phase C recommendations:** Defer `/services` CSS, hero LCP tuning, mobile CI profile.

---

# 8. Testing

## Vitest

- **Config:** `vitest.config.ts`
- **Environment:** happy-dom
- **Command:** `npm run test:unit`
- **Current:** **90/90** tests, **19** files — all passing

## Playwright

- **Config:** `playwright.config.ts`
- **Specs:** `tests/marketing.spec.ts`, `tests/admin.spec.ts`
- **Projects:** desktop-chromium, mobile-chromium
- **CI:** build + `npx playwright install chromium` + `test:e2e`

## Lighthouse

- **Script:** `scripts/lighthouse-ci.mjs`
- **Command:** `npm run lighthouse:ci`
- **Port:** 3099 (`LHCI_PORT`)

## Coverage

Scoped files only (see `vitest.config.ts`):

| Metric     | Value  |
| ---------- | ------ |
| Statements | 85.33% |
| Branches   | 70.45% |
| Functions  | 85%    |
| Lines      | 84.61% |

Thresholds: 80/80/70/80 — **passing**

## Current pass rate

| Suite      | Status                         |
| ---------- | ------------------------------ |
| Unit       | ✅ 90/90                       |
| E2E        | ✅ in CI (marketing + admin)   |
| Lighthouse | ✅ gates pass (perf warn-only) |

## Known issues

- No automated E2E for lead form → Resend (manual smoke required)
- Coverage scope intentionally narrow — most features untested by coverage thresholds
- `PROJECT_STATUS.md` predates Prisma lead capture — do not use for lead status

---

# 9. Environment Variables

> Full audit: `docs/release/ENVIRONMENT-AUDIT.md`

| Variable                                   | Purpose                   | Required         | Local       | Preview   | Production  | Sensitive |
| ------------------------------------------ | ------------------------- | ---------------- | ----------- | --------- | ----------- | --------- |
| `DATABASE_URL`                             | Pooled PostgreSQL runtime | Yes              | Yes         | Yes       | Yes         | **Yes**   |
| `DIRECT_URL`                               | Direct DB for Prisma CLI  | Yes (migrations) | Yes         | Yes       | GitHub only | **Yes**   |
| `SHADOW_DATABASE_URL`                      | Local migrate shadow DB   | No               | Optional    | No        | No          | **Yes**   |
| `RESEND_API_KEY`                           | Resend API auth           | Yes              | Yes         | Yes       | Yes         | **Yes**   |
| `LEAD_NOTIFICATION_TO`                     | Team inbox for leads      | Yes              | Yes         | Yes       | Yes         | No        |
| `LEAD_FROM_EMAIL`                          | Verified sender address   | Yes              | Yes         | Yes       | Yes         | No        |
| `NEXT_PUBLIC_SITE_URL`                     | Canonical site URL        | Yes              | Yes         | Yes       | Yes         | No        |
| `OWNER_AUTH_EMAIL`                         | Owner login email         | Yes              | Yes         | Yes       | Yes         | No        |
| `OWNER_AUTH_PASSWORD`                      | Owner login password      | Yes              | Yes         | Yes       | Yes         | **Yes**   |
| `OWNER_SESSION_SECRET`                     | Session HMAC secret       | Yes              | Yes         | Yes       | Yes         | **Yes**   |
| `LEAD_RATE_LIMIT_MAX`                      | Lead rate limit           | No               | Optional    | Optional  | Optional    | No        |
| `LEAD_RATE_LIMIT_IP_MAX`                   | Lead IP limit             | No               | Optional    | Optional  | Optional    | No        |
| `LEAD_RATE_LIMIT_WINDOW_MS`                | Lead window ms            | No               | Optional    | Optional  | Optional    | No        |
| `OWNER_LOGIN_RATE_LIMIT_MAX`               | Owner IP limit            | No               | Optional    | Optional  | Optional    | No        |
| `OWNER_LOGIN_RATE_LIMIT_WINDOW_MS`         | Owner IP window           | No               | Optional    | Optional  | Optional    | No        |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX`       | Owner account limit       | No               | Optional    | Optional  | Optional    | No        |
| `OWNER_LOGIN_ACCOUNT_RATE_LIMIT_WINDOW_MS` | Owner account window      | No               | Optional    | Optional  | Optional    | No        |
| `NEXT_PUBLIC_CALENDLY_URL`                 | Calendly booking URL      | No               | Optional    | Optional  | Optional    | No        |
| `NEXT_PUBLIC_APP_URL`                      | Fallback site URL         | No               | Optional    | Optional  | Optional    | No        |
| `SENTRY_DSN`                               | Server Sentry (future)    | No               | Optional    | Optional  | Optional    | Semi      |
| `NEXT_PUBLIC_SENTRY_DSN`                   | Client Sentry (future)    | No               | Optional    | Optional  | Optional    | Semi      |
| `BUILD_ID`                                 | Health metadata label     | No               | Optional    | Optional  | Optional    | No        |
| `SKIP_ENV_VALIDATION`                      | Bypass startup validation | No               | Dev/CI only | **Never** | **Never**   | No        |
| `NODE_ENV`                                 | Node environment          | Auto             | Auto        | Auto      | Auto        | No        |
| `NEXT_PHASE`                               | Next build phase          | Auto             | Auto        | Auto      | Auto        | No        |
| `VERCEL_GIT_COMMIT_SHA`                    | Deploy commit             | Auto             | —           | Auto      | Auto        | No        |
| `VERCEL_DEPLOYMENT_ID`                     | Deploy ID                 | Auto             | —           | Auto      | Auto        | No        |
| `GITHUB_SHA`                               | CI commit SHA             | Auto             | —           | CI        | —           | No        |
| `CI`                                       | CI flag                   | Auto             | —           | CI        | —           | No        |
| `ANALYZE`                                  | Bundle analyzer           | No               | Optional    | No        | No          | No        |
| `LHCI_PORT`                                | Lighthouse port           | No               | Optional    | CI        | No          | No        |
| `PLAYWRIGHT_PORT`                          | E2E port                  | No               | Optional    | CI        | No          | No        |
| `PLAYWRIGHT_BASE_URL`                      | E2E base URL              | No               | Optional    | CI        | No          | No        |

---

# 10. Deployment Guide

## Local

```bash
cp .env.example .env.local
# Fill DATABASE_URL, DIRECT_URL, Resend vars, owner auth, NEXT_PUBLIC_SITE_URL

npm ci
npm run db:migrate        # or db:push for quick dev
npm run dev                 # http://localhost:3000
```

**Resend local testing:** Use `onboarding@resend.dev` until domain verified; sandbox only emails Resend account address.

## Staging

1. Deploy `release/v1.0-launch` to Vercel Preview/ staging project
2. Set env vars with staging values (`NEXT_PUBLIC_SITE_URL=https://staging.bitcraftly.com`)
3. Use staging inbox for `LEAD_NOTIFICATION_TO`
4. Run `docs/engineering/lead-capture-staging-verification-checklist.md`

## Production

1. Verify Resend domain **Verified**
2. Set all 8 required runtime env vars in Vercel Production
3. Run GitHub **Database Migrate Deploy** workflow
4. Merge/deploy `release/v1.0-launch`
5. Run post-deploy smoke (`docs/engineering/production-deployment.md`)
6. Run lead capture production checklist

## Database deployment

- **Never** `db:migrate` or `db push` against production manually from laptop
- Use `.github/workflows/db-deploy.yml` with `production` environment secrets

## Rollback

1. Revert Vercel deployment to previous build
2. Database migrations are **forward-only** — plan forward-fix migrations if schema changed
3. Tag/note deployment SHA before go-live (`v1.0.0-rc*` tags used as markers)

## Recovery

- Lead data in Neon — point `DATABASE_URL` to backup/branch if Neon PITR enabled
- Resend delivery failures logged in `Lead.notificationError` field
- Health check: `GET /api/health`

---

# 11. DNS

## Current state (2026-07-22)

Migration from Namecheap BasicDNS → **Cloudflare DNS** in progress for `bitcraftly.com`.

| Provider       | Role                                                   |
| -------------- | ------------------------------------------------------ |
| **Namecheap**  | Domain registration; nameservers pointed to Cloudflare |
| **Cloudflare** | Authoritative DNS (when active)                        |
| **Vercel**     | Hosting (`76.76.21.21` A record, `www` CNAME)          |
| **Resend**     | Transactional email                                    |
| **Zoho**       | Business mail verification (TXT records)               |

## Vercel

| Record          | Value                  |
| --------------- | ---------------------- |
| A `@`           | `76.76.21.21`          |
| CNAME `www`     | `cname.vercel-dns.com` |
| CNAME `staging` | Vercel staging target  |
| TXT `_vercel`   | Domain verification    |

**Proxy:** DNS only (grey cloud) recommended for Vercel + email records.

## Namecheap

Legacy Advanced DNS records copied to Cloudflare. After nameserver switch, **do not edit Namecheap DNS**.

## Resend (Enable Sending)

Required on subdomain `bounces`:

| Type | Host                | Value                                                 |
| ---- | ------------------- | ----------------------------------------------------- |
| MX   | `bounces`           | `feedback-smtp.us-east-1.amazonses.com` (priority 10) |
| TXT  | `bounces`           | `v=spf1 include:amazonses.com ~all`                   |
| TXT  | `resend._domainkey` | DKIM key from Resend dashboard                        |

## Zoho

| Record  | Purpose                                               |
| ------- | ----------------------------------------------------- |
| TXT `@` | `zoho-verification=...`                               |
| TXT `@` | SPF including Zoho (separate from Resend bounces SPF) |

## SPF

- **Resend sending:** `bounces` subdomain TXT
- **Zoho mail:** `@` TXT with `include:zoho.in` or similar

Do not merge into conflicting single SPF on same host.

## DKIM

- `resend._domainkey` TXT (verified in Resend during setup)
- Optional `resend2._domainkey` CNAME

## DMARC

- `_dmarc` TXT — `v=DMARC1; p=none;` (monitoring mode)

## MX

- **Resend bounce handling:** `bounces.bitcraftly.com` MX → Amazon SES
- **Zoho inbox mail:** separate MX on `@` if using Zoho hosted mail (configure per Zoho docs)

## Click tracking

Resend click tracking not enabled in current implementation. Links in emails are direct URLs.

---

# 12. Vercel

> Vercel project settings are not stored in-repo. Confirm in Vercel dashboard.

## Expected configuration

| Environment    | Branch / trigger                                       | Domain                                 |
| -------------- | ------------------------------------------------------ | -------------------------------------- |
| **Production** | `release/v1.0-launch` or `main` (confirm in dashboard) | `bitcraftly.com`, `www.bitcraftly.com` |
| **Preview**    | PR branches                                            | `*.vercel.app`                         |
| **Staging**    | `staging.bitcraftly.com` → staging deployment          | CNAME in Cloudflare                    |

## Branch mapping (recommended)

| Vercel env  | Git branch            | Notes                             |
| ----------- | --------------------- | --------------------------------- |
| Production  | `release/v1.0-launch` | Tag deployments with `v1.0.0-rc5` |
| Preview     | PRs to release/main   | Staging env vars                  |
| Development | Optional              | Local `vercel dev` only           |

## Domains

- `bitcraftly.com`
- `www.bitcraftly.com`
- `staging.bitcraftly.com`

## Deployment protection

Staging may have Vercel Deployment Protection enabled — requires login to access preview URLs.

---

# 13. Known Issues

## Lighthouse / performance

- Perf 73–75 vs 90 target
- LCP ~3.2s on `/services`
- Render-blocking CSS on services page
- Mobile Lighthouse not in CI

## Future Phase C

See `docs/release/Sprint-004.3-Phase-B.md` — defer CSS, LCP hero tuning, below-fold lazy boundaries.

## Technical debt

- In-memory rate limiter (multi-instance unsafe)
- Admin routes unauthenticated
- Feature JSON-LD still hardcodes URLs in some schema files
- `PROJECT_STATUS.md` outdated on lead capture status
- Middleware → proxy migration deferred (Next.js 16)
- Sentry hooks without `@sentry/nextjs` package

## Future optimizations

- Redis/Upstash rate limiting
- RUM / web-vitals
- GTM/GA when marketing approves
- OpenTelemetry
- E2E lead capture automation

---

# 14. Roadmap

## Immediate (launch blockers)

1. Cloudflare Active + Resend domain Verified
2. Vercel production env vars finalized
3. Production lead capture smoke test
4. Confirm staging deployment protection access for QA

## Next sprint

- Sprint 004.3 **Phase C** — Performance ≥ 90
- Sentry integration
- Mobile Lighthouse CI
- Admin authentication

## Future

- FastAPI backend integration
- End-user authentication
- CMS / CRM product modules
- Distributed rate limiting
- Feature JSON-LD URL migration

## Long term

- Multi-tenant platform modules
- AI services integration
- Full analytics stack
- Redis session store + rate limit backend

---

# 15. Final Engineering Notes

## Best practices

- Read `docs/engineering/AI_CONTEXT.md` before coding
- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- One feature per branch / PR
- Run lint + typecheck + unit tests before push
- Never commit `.env.local` or secrets
- Use `db:migrate` locally, `db:deploy` in production CI only

## Do not remove

- Honeypot fields on lead forms
- `requireOwnerSession()` on owner routes
- Production env validation in `instrumentation.ts`
- Security headers in `next.config.ts`
- Protected homepage / services / solutions without explicit approval

## Do not modify without approval

- `src/features/homepage/**` (protected)
- `src/features/services/**` (protected)
- `src/features/solutions/**` (protected)
- Global design tokens
- Shared layout architecture
- `next.config.ts` security headers (unless security task)

## Migration warnings

- Production migrations are **forward-only**
- Always run `db-deploy` workflow before first traffic on schema changes
- `DIRECT_URL` must be set in GitHub production environment
- Never run `prisma migrate dev` against production database

## Branch warnings

- Deploy from `release/v1.0-launch` — not legacy `development` or `feat/*` branches
- `personal` remote is a mirror — `origin` is deploy source
- Tag releases with `v1.0.0-rc*` for rollback reference

## Deployment checklist

1. CI green
2. Resend domain verified
3. Vercel env complete (8 required vars)
4. DB migrate workflow run
5. Deploy
6. Smoke: homepage, contact form, owner login, `/api/health`
7. Verify lead email (team + confirmation)

**Checklists:**

- `docs/engineering/lead-capture-production-deployment-checklist.md`
- `docs/engineering/lead-capture-staging-verification-checklist.md`
- `docs/engineering/production-deployment.md`

## Repository ownership recommendations

| Role                    | Access                                                              |
| ----------------------- | ------------------------------------------------------------------- |
| **bitcraftly-tech org** | Owns `origin` — production deploy keys, Vercel, Neon, Resend        |
| **Developers**          | Write access to `release/v1.0-launch` via PR                        |
| **CI secrets**          | GitHub `production` environment — `DATABASE_URL`, `DIRECT_URL` only |
| **Personal mirror**     | `personal` remote optional — not for production deploy              |

---

## Related documents

| Document                | Path                                                         |
| ----------------------- | ------------------------------------------------------------ |
| AI context (read first) | `docs/engineering/AI_CONTEXT.md`                             |
| Machine-readable state  | `docs/engineering/PROJECT_STATE.json`                        |
| Environment audit       | `docs/release/ENVIRONMENT-AUDIT.md`                          |
| Production deployment   | `docs/engineering/production-deployment.md`                  |
| Sprint 004.1            | `docs/release/Sprint-004.1.md`                               |
| Sprint 004.2            | `docs/release/Sprint-004.2.md`                               |
| Sprint 004.3            | `docs/release/Sprint-004.3.md`                               |
| Sprint 004.3 Phase B    | `docs/release/Sprint-004.3-Phase-B.md`                       |
| Engineering standards   | `.cursor/rules/Bitcraftly-Engineering-Standards.mdc`         |
| Architecture protection | `.cursor/rules/Bitcraftly-Architecture-Protection-Rules.mdc` |

---

_End of Engineering Handover Report — 2026-07-22_
