# Sprint 004.2 — Production Security & Hardening

**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-20  
**Status:** Complete

---

## Objective

Harden production security for Bitcraftly Platform V2 without changing UI, branding, layouts, or business logic.

---

## Architecture Decisions

### 1. Defense-in-depth for owner routes

**Decision:** Keep middleware as the primary gate and add `requireOwnerSession()` in the owner dashboard layout and CRM data loader.

**Rationale:** Middleware can be misconfigured or bypassed in edge cases. Server-side session verification before loading PII prevents unauthenticated CRM access.

### 2. Shared in-memory rate limiter

**Decision:** Extract `src/lib/security/in-memory-rate-limit.ts` and namespace stores for lead and owner login limits.

**Rationale:** Consistent sliding-window logic, separate namespaces, test reset helpers. Documented limitation: process-local only until Redis migration.

### 3. Dual lead rate limits

**Decision:** Enforce both IP+email (5/15 min default) and IP-only (30/15 min default) limits before validation.

**Rationale:** Prevents single-IP spam across many email addresses while preserving per-email throttling.

### 4. Dual owner login rate limits

**Decision:** Enforce IP limit (10/15 min) and account limit (5/15 min) on every login attempt.

**Rationale:** Mitigates brute-force against a single credential pair and distributed attacks across IPs.

### 5. Centralized security headers

**Decision:** Move header construction to `src/lib/security/security-headers.ts` and import from `next.config.ts`.

**Rationale:** Single source of truth for CSP, COOP, CORP, and existing headers. CSP uses Next.js-compatible directives without weakening frame protection.

### 6. Production-only startup validation unchanged

**Decision:** Sprint 004.1 env validation remains in `instrumentation.ts`; Sprint 004.2 adds runtime route/session hardening only.

**Rationale:** Fail-fast on misconfigured deploys without requiring secrets during CI build.

### 7. Minimal error boundaries

**Decision:** Add root `error.tsx`, `global-error.tsx`, and `not-found.tsx` with semantic HTML and recovery actions.

**Rationale:** Graceful failure without marketing chrome changes. No new layout dependencies.

---

## Security Improvements

| Area                | Before                          | After                                |
| ------------------- | ------------------------------- | ------------------------------------ |
| Owner CRM access    | Middleware only                 | Middleware + `requireOwnerSession()` |
| Owner login         | Unlimited attempts              | IP + account rate limits             |
| Owner cookie        | `sameSite: lax`                 | `sameSite: strict`                   |
| Login path matching | Exact `/owner/login`            | Prefix match includes subpaths       |
| Lead rate limiting  | IP+email only                   | IP+email + IP-only limits            |
| Security headers    | Partial (no CSP/COOP/CORP)      | Full set including CSP               |
| Error handling      | Next.js defaults                | Branded error/not-found boundaries   |
| Debug logging       | Dev `console.info` in analytics | Removed                              |
| Honeypot            | Lead forms only                 | Unchanged (already implemented)      |

---

## Secret Audit

### Server-only (not in client bundles)

| Variable               | Used in                                  |
| ---------------------- | ---------------------------------------- |
| `DATABASE_URL`         | `src/lib/db/prisma.ts`                   |
| `RESEND_API_KEY`       | `lead-notification.service.ts`           |
| `LEAD_NOTIFICATION_TO` | `lead-notification.service.ts`           |
| `LEAD_FROM_EMAIL`      | `lead-notification.service.ts`           |
| `OWNER_AUTH_EMAIL`     | `owner-auth.config.ts`                   |
| `OWNER_AUTH_PASSWORD`  | `owner-auth.config.ts`                   |
| `OWNER_SESSION_SECRET` | `owner-auth.env.ts`, middleware, session |

### `NEXT_PUBLIC_*` (client-safe)

| Variable                   | Purpose                             |
| -------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Canonical URLs in JSON-LD and SEO   |
| `NEXT_PUBLIC_APP_URL`      | Fallback site URL in `getSiteUrl()` |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional Calendly booking link      |

No server secrets found in client components or `NEXT_PUBLIC_*` variables.

---

## Files Changed

| File                                                           | Action                                     |
| -------------------------------------------------------------- | ------------------------------------------ |
| `src/lib/security/in-memory-rate-limit.ts`                     | Created                                    |
| `src/lib/security/client-ip.ts`                                | Created                                    |
| `src/lib/security/security-headers.ts`                         | Created                                    |
| `src/features/owner-auth/require-owner-session.ts`             | Created                                    |
| `src/features/owner-auth/owner-login-rate-limit.ts`            | Created                                    |
| `src/features/owner-auth/owner-login-rate-limit.test.ts`       | Created                                    |
| `src/features/owner-auth/actions/owner-auth.actions.ts`        | Modified — login rate limit, strict cookie |
| `src/features/owner-auth/owner-auth.utils.ts`                  | Modified — login path prefix               |
| `src/features/owner-auth/owner-auth.utils.test.ts`             | Modified                                   |
| `src/features/owner-crm/owner-leads.loader.ts`                 | Modified — requireOwnerSession             |
| `src/app/owner/(dashboard)/layout.tsx`                         | Modified — requireOwnerSession             |
| `src/features/lead-funnel/services/lead-rate-limit.ts`         | Modified — shared limiter + IP limit       |
| `src/features/lead-funnel/services/lead-guard.service.ts`      | Modified — IP rate limit                   |
| `src/features/lead-funnel/services/lead-guard.service.test.ts` | Modified                                   |
| `src/features/lead-funnel/services/lead-server-context.ts`     | Modified — shared client IP                |
| `src/features/lead-funnel/analytics.ts`                        | Modified — removed debug logging           |
| `src/features/homepage/CostCalculator/analytics.ts`            | Modified — removed debug logging           |
| `src/app/error.tsx`                                            | Created                                    |
| `src/app/global-error.tsx`                                     | Created                                    |
| `src/app/not-found.tsx`                                        | Created                                    |
| `next.config.ts`                                               | Modified — centralized security headers    |
| `.env.example`                                                 | Modified — rate limit env vars             |
| `SECURITY.md`                                                  | Modified — roadmap updated                 |
| `docs/engineering/production-deployment.md`                    | Modified — security section                |

---

## Verification Results

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass
npm run test:unit -- src/features/owner-auth/owner-login-rate-limit.test.ts src/features/lead-funnel/services/lead-guard.service.test.ts src/features/owner-auth/owner-auth.utils.test.ts  # pass
```

### Acceptance criteria

| Criterion                 | Status                              |
| ------------------------- | ----------------------------------- |
| Build passes              | ✅                                  |
| Lint passes               | ✅                                  |
| Typecheck passes          | ✅                                  |
| No public owner access    | ✅ Middleware + requireOwnerSession |
| No secret exposure        | ✅ Audit complete                   |
| No debug code             | ✅ console.info removed             |
| Security headers verified | ✅ CSP, COOP, CORP added            |
| Rate limiting implemented | ✅ Lead + owner login               |
| Honeypot implemented      | ✅ Existing lead honeypot verified  |

---

## Git Diff Summary

Run `git diff --stat` after commit for final counts. Expected scope: ~20 files, infrastructure and security only, no UI/branding changes.

---

## Out of Scope (Sprint 004.3+)

- Admin panel authentication
- Distributed Redis rate limiting
- Sentry / APM integration
- CAPTCHA on login
- Session revocation store
- Middleware → proxy migration
