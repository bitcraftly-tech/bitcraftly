# Bitcraftly Platform — AI Context

**Read this file before making any code changes.**

Primary companion documents:

- `AGENTS.md` — agent entry rules
- `PROJECT_CONTEXT.md` — concise project overview
- `docs/engineering/PROJECT_STATE.json` — structured machine-readable state
- `docs/engineering/ENGINEERING_HANDOVER_2026.md` — full human handover report
- `.cursor/rules/` — engineering, architecture protection, accessibility standards

---

## Project identity

| Item | Value |
|------|--------|
| Active repo | `https://github.com/bitcraftly-tech/bitcraftly.git` (`origin`) |
| Release branch | `release/v1.0-launch` |
| Latest tag | `v1.0.0-rc5`, `v1.0-launch-candidate` |
| Stack | Next.js 16.2.10, React 19.2.4, TS strict, Tailwind v4, Prisma 7, PostgreSQL (Neon), Resend |

---

## Non-negotiable rules

1. **Scope** — Modify only files required by the user request. Never refactor unrelated code.
2. **Protected pages** — Do not change `src/features/homepage/**`, `src/features/services/**`, or `src/features/solutions/**` unless the user explicitly requests it.
3. **Architecture** — Feature-based layout. Thin route files in `src/app/`. Business logic in `src/features/*`.
4. **Server first** — Prefer Server Components. Client Components only when interactivity requires them.
5. **No secrets in client** — Never use `NEXT_PUBLIC_` for database, Resend, or owner auth values.
6. **Accessibility** — WCAG 2.2 AA minimum. Keyboard, focus, semantic HTML, one `h1` per page.
7. **TypeScript** — Strict mode. No `any`.
8. **Styling** — Tailwind v4 + design tokens. No hardcoded colors/spacing.
9. **Dependencies** — Do not add packages without explicit user approval.
10. **Generated files** — Do not edit `src/generated/prisma/`, `.next/`, or lock files unless requested.

---

## Lead capture (critical path)

Flow:

```text
ContactLeadForm / NewsletterSection
  → submitLeadFromClient
    → submitLeadAction (server)
      → lead.service (guard → validate → persist → notify)
        → lead.repository (Prisma)
        → lead-notification.service (Resend)
```

Emails sent on successful submit:

1. **Team notification** → `LEAD_NOTIFICATION_TO` (required — failure blocks submit)
2. **Submitter confirmation** → form email (best-effort — `confirmationSent` flag)

Required env vars (production):

- `RESEND_API_KEY`, `LEAD_NOTIFICATION_TO`, `LEAD_FROM_EMAIL`
- `LEAD_FROM_EMAIL` must use a **Resend-verified domain** (e.g. `hello@bitcraftly.com`)

Resend sandbox (`onboarding@resend.dev`) only delivers to the Resend account email.

---

## Owner CRM

- Routes: `/owner/login`, `/owner/leads`
- Auth: HMAC session cookie + `src/middleware.ts` + `requireOwnerSession()`
- Env: `OWNER_AUTH_EMAIL`, `OWNER_AUTH_PASSWORD` (min 12), `OWNER_SESSION_SECRET` (min 32)

---

## Environment validation

Production startup validates 8 vars via `src/instrumentation.ts`.

CI/build uses `SKIP_ENV_VALIDATION=true` — never set that in Vercel Production.

---

## Testing before marking done

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

For lead-funnel changes, also run:

```bash
npm run test:unit -- src/features/lead-funnel
```

---

## Deployment notes

- DB migrations: GitHub Actions `db-deploy.yml` (manual, type `deploy`) — never `db:migrate` in prod
- Vercel env vars must match `.env.example` contract
- DNS for email: Cloudflare manages DNS when nameservers point to Cloudflare; Resend requires `bounces` MX + TXT

---

## Do not modify without explicit approval

- Shared layouts (`src/lib/layout/`, marketing layout)
- Global providers and routing structure
- Design tokens (`src/styles/`)
- `next.config.ts` security headers (unless security task)
- Protected marketing features listed above

---

## When planning multi-file changes

1. Read `PROJECT_FOUNDATION_REVIEW.md`
2. Explain plan and affected files
3. Request confirmation if shared architecture changes

---

## Current known blockers (2026-07-22)

- Resend domain verification in progress (Cloudflare DNS migration from Namecheap)
- Lighthouse performance 73–75 (target 90) — Phase C not started
- In-memory rate limits — not multi-instance safe

See `docs/engineering/ENGINEERING_HANDOVER_2026.md` for full detail.
