# Lead Capture — Production Deployment Checklist

**Sprint:** 002 — Production Lead Capture (updated Sprint 004.1)  
**Scope:** Contact form + newsletter → Resend notification + Prisma persistence + Owner CRM  
**Last updated:** 2026-07-20

Use this checklist before merging to `main` and deploying to production.

For the full deploy workflow, see [Production Deployment Guide](./production-deployment.md).

---

## Pre-merge (repository)

- [ ] Changes are on the correct release branch (e.g. `release/v1.0-launch`)
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test:unit` passes
- [ ] `npm run build` passes (`prebuild` runs `db:generate` automatically)
- [ ] CI green on `main`, `develop`, or `release/**`
- [ ] No secrets committed (`.env.local`, API keys, etc.)
- [ ] `.env.example` documents all required variables

---

## Resend configuration

- [ ] Resend account created and billing/plan suitable for expected volume
- [ ] **Sending domain** added and DNS records verified (SPF, DKIM, optional DMARC)
- [ ] `LEAD_FROM_EMAIL` uses a **verified** domain address in Resend
- [ ] Test send from Resend dashboard succeeds to `LEAD_NOTIFICATION_TO`
- [ ] `reply_to` on lead emails (lead’s email) is acceptable for your workflow

---

## Required environment variables (production)

Set in the hosting provider (e.g. Vercel → Project → Settings → Environment Variables).

Startup validation (`src/instrumentation.ts`) enforces these at production server boot.

| Variable                    | Required | Scope        | Notes                                                         |
| --------------------------- | -------- | ------------ | ------------------------------------------------------------- |
| `DATABASE_URL`              | **Yes**  | Server only  | Neon pooled PostgreSQL connection                             |
| `DIRECT_URL`                | **Yes**  | Server / CLI | Direct Neon connection for Prisma CLI                         |
| `RESEND_API_KEY`            | **Yes**  | Server only  | Resend API key (`re_…`)                                       |
| `LEAD_NOTIFICATION_TO`      | **Yes**  | Server only  | Team inbox for lead alerts                                    |
| `LEAD_FROM_EMAIL`           | **Yes**  | Server only  | Verified sender, e.g. `Bitcraftly <notifications@domain.com>` |
| `NEXT_PUBLIC_SITE_URL`      | **Yes**  | Public       | Canonical production URL, no trailing slash                   |
| `OWNER_AUTH_EMAIL`          | **Yes**  | Server only  | Owner CRM login email                                         |
| `OWNER_AUTH_PASSWORD`       | **Yes**  | Server only  | Min 12 characters                                             |
| `OWNER_SESSION_SECRET`      | **Yes**  | Server only  | Min 32 characters — session signing                           |
| `LEAD_RATE_LIMIT_MAX`       | No       | Server only  | Default: `5`                                                  |
| `LEAD_RATE_LIMIT_WINDOW_MS` | No       | Server only  | Default: `900000` (15 min)                                    |
| `NEXT_PUBLIC_CALENDLY_URL`  | No       | Public       | Optional; CTAs fall back to contact if unset                  |

- [ ] All required variables set for **Production** environment
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain (e.g. `https://bitcraftly.com`)
- [ ] Variables are **not** prefixed with `NEXT_PUBLIC_` for secrets
- [ ] Redeploy triggered after env var changes
- [ ] Production server starts without env validation errors

---

## Deployment steps

1. [ ] Merge approved PR to `main` or deploy from release branch
2. [ ] Confirm CI green (lint, typecheck, unit tests, build, E2E, Lighthouse)
3. [ ] Run **Database Migrate Deploy** GitHub Action (or `npm run db:deploy` manually)
4. [ ] Confirm no pending migrations (`prisma migrate status`)
5. [ ] Deploy to production (build runs `prebuild` → `db:generate` → `next build`)
6. [ ] Verify deployment logs show no env validation errors on cold start
7. [ ] Run [Staging Verification Checklist](./lead-capture-staging-verification-checklist.md) against **production** URLs

---

## Post-deploy smoke (minimum)

| Check                                                                                    | Pass |
| ---------------------------------------------------------------------------------------- | ---- |
| `/contact` loads; form visible                                                           | ☐    |
| Contact submit → success UI (with valid data + Resend configured)                        | ☐    |
| Lead row persisted in database                                                           | ☐    |
| Notification email received at `LEAD_NOTIFICATION_TO`                                    | ☐    |
| Homepage newsletter submit → success UI                                                  | ☐    |
| Newsletter notification email received                                                   | ☐    |
| Invalid email → client validation (no success UI)                                        | ☐    |
| Missing Resend vars → user-friendly DELIVERY message (no internal error text)            | ☐    |
| `form_submit_success` in dataLayer **only** after server success (see staging checklist) | ☐    |

---

## Error handling verification (production)

User-facing messages must **never** expose internal config or Resend errors.

| Code         | Expected user message (approx.)        |
| ------------ | -------------------------------------- |
| `VALIDATION` | Field-level or Zod message from server |
| `HONEYPOT`   | “Unable to submit your request…”       |
| `RATE_LIMIT` | “Too many submissions…”                |
| `DELIVERY`   | “We could not deliver your message…”   |
| `UNKNOWN`    | “Something went wrong…”                |

- [ ] Spot-check DELIVERY path (temporarily unset one Resend var in staging first — **never** in prod for extended periods)

---

## Analytics

- [ ] GTM/dataLayer container loads on production site
- [ ] `lead_funnel_form_submit_success` fires **only** after `{ ok: true }`
- [ ] Failed submissions do **not** emit `form_submit_error` (removed by design)
- [ ] Newsletter success includes `source: "newsletter"` in payload

---

## Accessibility (production spot-check)

- [ ] Contact form: keyboard-only submit works
- [ ] Contact success/error: focus moves to status/alert region
- [ ] Newsletter error: `role="alert"`, focus on error
- [ ] Newsletter success: `role="status"`, focus on success message
- [ ] Honeypot field not in tab order (`tabIndex={-1}`)

---

## Rollback plan

- [ ] Tag or note deployment SHA before go-live
- [ ] If lead delivery fails in production: revert merge commit or roll back deployment
- [ ] Confirm rollback restores previous UI behavior
- [ ] Fix Resend/domain/env issue before re-deploy

---

## Known limitations (document for ops)

| Item                          | Status                                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| Lead persistence (CRM/DB)     | **Implemented** — Prisma + Neon; verify with owner CRM at `/owner/leads`                            |
| Build pipeline                | `prebuild` runs `prisma generate` before every build                                                |
| DB migrations                 | Use GitHub **Database Migrate Deploy** workflow or `npm run db:deploy` — never `db:migrate` in prod |
| Rate limiter                  | In-memory per instance — not suitable for multi-instance scale                                      |
| E2E automated lead tests      | Not yet in Playwright suite — manual smoke required                                                 |
| `form_submit_error` analytics | Intentionally removed — failures not tracked                                                        |

---

## Sign-off

| Role              | Name | Date | Approved |
| ----------------- | ---- | ---- | -------- |
| Engineering       |      |      | ☐        |
| Product           |      |      | ☐        |
| QA / Manual smoke |      |      | ☐        |
