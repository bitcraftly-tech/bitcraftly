# Bitcraftly Platform — Next Steps Roadmap

**Audit date:** 2026-07-23  
**Branch baseline:** `release/v1.0-launch` @ `bd2d377`  
**Companion:** `PROJECT_EXECUTIVE_AUDIT.md` · `PRODUCTION_READINESS.md`

---

## 1. Immediate actions (this week — outside sprint ceremony)

| # | Action | Owner | Outcome |
|---|--------|-------|---------|
| 1 | Verify Cloudflare DNS + Resend domain **Verified** | Founder / Ops | Production email works |
| 2 | Confirm Vercel Production + Preview env vars | Ops | No silent lead failures |
| 3 | Staging smoke: `/`, `/contact`, `/owner/login`, `/owner/leads`, `/careers`, `/blog` | Eng | Confidence on HEAD |
| 4 | Decide: Perf ≥90 is **hard launch gate** vs **post-staging Phase C** | Founder + Arch | Sprint 005 scope lock |
| 5 | Decide: `/admin` blocked/noindex vs auth before public launch | Founder + Arch | Security posture |

---

## 2. Sprint 005 — Launch Performance & Production Gates

**Theme:** Close the last engineering gates that block an honest production GO.  
**Estimated effort:** 1–1.5 weeks (1–2 engineers)  
**Dependencies:** Staging env healthy; Resend/DNS path known; freeze non-essential marketing redesigns on protected pages

### Objectives

1. Execute **Sprint 004.3 Phase C** — LCP + render-blocking CSS toward Lighthouse Perf **≥90** on `/`, `/services`, `/pricing`, `/contact`
2. SEO hygiene: sitemap coverage for `/resources*`; migrate feature JSON-LD base URLs to `getSiteUrl()`
3. Production hardening checklist: admin exposure policy implemented; lead smoke documented
4. Optional: wire unused Work JSON-LD helpers; mobile Lighthouse CI profile (stretch)

### Deliverables

| Deliverable | Acceptance |
|-------------|------------|
| Phase C performance changes | Desktop LH Perf ≥90 on 4 core routes (or documented waiver with Founder sign-off) |
| Sitemap update | Resources (+ decided secondary hubs) present |
| JSON-LD URL fix | No hardcoded production host in feature schemas |
| Admin posture | Middleware/robots/auth decision implemented |
| Smoke report | Staging + prod lead submit evidence |

### Dependencies

- Ability to run Lighthouse locally/CI against preview  
- Content freeze on homepage/services/solutions during Perf work (protected pages)

### Expected outcome

**Conditional → Production GO** (assuming ops email/DNS green).  
Project completion moves ~91% → **~94%**; production readiness ~78 → **~88**.

---

## 3. Sprint 006 — Conversion Reliability & Observability

**Theme:** Make launches measurable and abuse-resistant under real traffic.  
**Estimated effort:** 1–2 weeks  
**Dependencies:** Sprint 005 production GO (or parallel after staging traffic)

### Objectives

1. Integrate **Sentry** (`@sentry/nextjs`) using existing instrumentation hooks  
2. Introduce **distributed rate limiting** (Upstash Redis or equivalent) for lead + owner login  
3. Expand Playwright coverage: contact happy-path, careers apply smoke, owner leads auth gate  
4. Soft analytics: privacy-safe event plumbing or GTM container decision  
5. Content ops: approved testimonials; resources long-form pilot (1–2 articles)

### Deliverables

| Deliverable | Acceptance |
|-------------|------------|
| Sentry errors on staging/prod | Alert on 5xx / action failures |
| Redis rate limits | Documented multi-instance behavior |
| E2E suite expansion | ≥3 new critical flows green in CI |
| Testimonials content | Non-placeholder on testimonials surface |
| Resources pilot | ≥1 long-form guide indexed |

### Dependencies

- Sentry project + DSN secrets  
- Upstash (or Redis) provisioning  
- Founder-approved testimonial copy

### Expected outcome

Operational confidence under load; conversion funnel measurable.  
Completion ~94% → **~96%**; readiness ~88 → **~92**.

---

## 4. Sprint 007 — Product Surfaces Beyond Marketing

**Theme:** Decide and start the next product layer (portal/admin/dashboard) without blocking marketing.  
**Estimated effort:** 2–3 weeks (can split into 007.A / 007.B)  
**Dependencies:** Clear product decision: client portal vs admin CMS priority

### Objectives

1. **Portal auth MVP** for `/login` (session or OAuth) **or** remove/disable route from primary nav permanently  
2. Admin authentication for `/admin/*` **or** remove from deploy surface  
3. Spec `/dashboard/*` IA (or remove dead links from marketing)  
4. Optional FastAPI spike **only if** product needs non-Next workloads (otherwise defer indefinitely and update standards docs)  
5. Captcha evaluation for lead forms if abuse appears

### Deliverables

| Deliverable | Acceptance |
|-------------|------------|
| Auth decision doc + implementation | No unauthenticated privileged UI on public host |
| Dashboard IA or link purge | Zero marketing 404s to `/dashboard` |
| Standards sync | README/AGENTS no longer imply FastAPI exists if deferred |
| Abuse controls | Captcha or equivalent if metrics warrant |

### Dependencies

- Identity provider choice (Credentials / Google / magic link)  
- Legal/privacy review for portal data  

### Expected outcome

Platform narrative matches reality; marketing remains stable while product auth lands.  
Completion **~97–98%** for “marketing + lead platform”; product portal becomes a new program track.

---

## 5. Post-007 backlog (parking lot)

- Trust document library  
- Full CMS (replace admin scaffolds)  
- AI assistant deepening (`/assistant`)  
- Packages/pricing SKUs as first-class route  
- Internationalization  
- Dark-mode marketing theme  
- Containerized deploy (Docker) if leaving Vercel

---

## 6. Suggested calendar

| Window | Focus |
|--------|-------|
| Days 0–3 | Ops P0 + Sprint 005 kickoff |
| Days 4–10 | Sprint 005 delivery + production GO review |
| Days 11–24 | Sprint 006 |
| Days 25–45 | Sprint 007 (auth/product) |

---

## 7. RACI (lightweight)

| Decision | Responsible | Accountable | Consulted |
|----------|-------------|-------------|-----------|
| Perf gate vs waiver | Eng Lead | Founder | Arch |
| Admin/portal auth | Eng | Founder | Security |
| DNS/Resend | Ops/Founder | Founder | Eng |
| Content depth | Content | Founder | Marketing Eng |

---

## 8. Success metrics

| Metric | Target by end of Sprint 005 | Target by end of Sprint 006 |
|--------|-----------------------------|-----------------------------|
| LH Perf (core 4) | ≥90 or signed waiver | Maintain ≥90 |
| Lead email success | ≥99% on verified domain | Same + alerting |
| Owner CRM uptime | Smoke pass | Error budget via Sentry |
| Marketing 404s to product stubs | 0 critical | 0 |
| CI green on `release/**` | Required | Required |
