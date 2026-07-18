# Lead Capture — Production Deployment Checklist

**Sprint:** 002 — Production Lead Capture  
**Scope:** Contact form + newsletter → Resend notification delivery  
**Last updated:** 2026-07-18

Use this checklist before merging to `main` and deploying to production.

---

## Pre-merge (repository)

- [ ] Lead capture changes are on **`feature/lead-capture`** (not mixed with About or unrelated polish)
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run test:unit -- src/features/lead-funnel` passes (23 tests)
- [ ] `npm run build` passes
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

| Variable | Required | Scope | Notes |
|----------|----------|-------|-------|
| `RESEND_API_KEY` | **Yes** | Server only | Resend API key (`re_…`) |
| `LEAD_NOTIFICATION_TO` | **Yes** | Server only | Team inbox for lead alerts |
| `LEAD_FROM_EMAIL` | **Yes** | Server only | Verified sender, e.g. `Bitcraftly <notifications@domain.com>` |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Public | Canonical production URL, no trailing slash |
| `LEAD_RATE_LIMIT_MAX` | No | Server only | Default: `5` |
| `LEAD_RATE_LIMIT_WINDOW_MS` | No | Server only | Default: `900000` (15 min) |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Public | Optional; CTAs fall back to contact if unset |

- [ ] All three Resend variables set for **Production** environment
- [ ] `NEXT_PUBLIC_SITE_URL` matches live domain (e.g. `https://bitcraftly.com`)
- [ ] Variables are **not** prefixed with `NEXT_PUBLIC_` for secrets (Resend key stays server-only)
- [ ] Redeploy triggered after env var changes

---

## Deployment steps

1. [ ] Merge approved PR to `main`
2. [ ] Confirm CI green (lint, typecheck, unit tests, build, E2E, Lighthouse per pipeline)
3. [ ] Deploy to production (or promote staging → production)
4. [ ] Verify deployment logs show no Resend/env errors on cold start
5. [ ] Run [Staging Verification Checklist](./lead-capture-staging-verification-checklist.md) against **production** URLs

---

## Post-deploy smoke (minimum)

| Check | Pass |
|-------|------|
| `/contact` loads; form visible | ☐ |
| Contact submit → success UI (with valid data + Resend configured) | ☐ |
| Notification email received at `LEAD_NOTIFICATION_TO` | ☐ |
| Homepage newsletter submit → success UI | ☐ |
| Newsletter notification email received | ☐ |
| Invalid email → client validation (no success UI) | ☐ |
| Missing Resend vars → user-friendly DELIVERY message (no internal error text) | ☐ |
| `form_submit_success` in dataLayer **only** after server success (see staging checklist) | ☐ |

---

## Error handling verification (production)

User-facing messages must **never** expose internal config or Resend errors.

| Code | Expected user message (approx.) |
|------|----------------------------------|
| `VALIDATION` | Field-level or Zod message from server |
| `HONEYPOT` | “Unable to submit your request…” |
| `RATE_LIMIT` | “Too many submissions…” |
| `DELIVERY` | “We could not deliver your message…” |
| `UNKNOWN` | “Something went wrong…” |

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

| Item | Status |
|------|--------|
| Lead persistence (CRM/DB) | Not implemented — email is sole delivery channel |
| Rate limiter | In-memory per instance — not suitable for multi-instance scale |
| E2E automated lead tests | Not yet in Playwright suite — manual smoke required |
| `form_submit_error` analytics | Intentionally removed — failures not tracked |

---

## Sign-off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Engineering | | | ☐ |
| Product | | | ☐ |
| QA / Manual smoke | | | ☐ |
