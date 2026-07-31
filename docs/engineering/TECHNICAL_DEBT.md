# Bitcraftly Platform — Technical Debt Register

**Audit date:** 2026-07-23  
**Branch:** `release/v1.0-launch` @ `bd2d377`  
**Companion:** `PROJECT_EXECUTIVE_AUDIT.md` · `PRODUCTION_READINESS.md`

Debt IDs use `TD-###`. Priority aligns with production taxonomy (P0–P3).

---

## 1. Summary

| Priority | Count | Theme                               |
| -------- | ----: | ----------------------------------- |
| P0       |     3 | Launch-blocking / unsafe if public  |
| P1       |     7 | Should fix for honest production GO |
| P2       |     9 | Scale, depth, hygiene               |
| P3       |     6 | Future / strategic                  |

Technical debt is **manageable**. The codebase is not a rewrite candidate. Main clusters: **performance CSS**, **auth gaps**, **ops verification**, **doc/stack drift**.

---

## 2. P0 — Must address before unrestricted production

| ID     | Debt                                         | Location / evidence                 | Risk                                           | Recommended fix                                               |
| ------ | -------------------------------------------- | ----------------------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| TD-001 | Lighthouse Perf below target (≥90)           | Sprint 004.3-B/004.5; scores ~73–86 | Poor CWV / SEO ranking risk; fails stated gate | Sprint 005 Phase C: defer heavy CSS, LCP image/priority audit |
| TD-002 | Resend / DNS verification not proven in-repo | Handover 2026-07-22 knownIssues     | Silent lead notification failure               | Ops verify domain; smoke submit                               |
| TD-003 | `/admin/*` unauthenticated scaffolds         | `(admin)/`, Sprint 004.2 deferred   | Content/admin abuse if crawled/shared          | Auth **or** deny/noindex + remove from nav                    |

---

## 3. P1 — Should finish for production quality

| ID     | Debt                                                  | Evidence                                       | Risk                                    | Fix                           |
| ------ | ----------------------------------------------------- | ---------------------------------------------- | --------------------------------------- | ----------------------------- |
| TD-004 | Feature JSON-LD hardcodes `https://bitcraftly.com`    | Feature `*-schema` modules                     | Wrong canonical host on preview/staging | Use `getSiteUrl()`            |
| TD-005 | Sitemap incomplete (resources, possibly events/press) | `src/app/sitemap.ts`                           | Discoverability gaps                    | Expand static entries         |
| TD-006 | Portal `/login` is UI-only                            | `portal-login`                                 | User trust / broken expectation         | Real auth or disable CTA      |
| TD-007 | In-memory rate limiting                               | `in-memory-rate-limit.ts`                      | Ineffective multi-instance              | Upstash/Redis                 |
| TD-008 | Sentry hooks without package                          | instrumentation / observability                | Blind production errors                 | Add `@sentry/nextjs`          |
| TD-009 | Work JSON-LD helpers unused                           | Exported builders unused                       | Missed rich results                     | Wire into pages               |
| TD-010 | Standards claim FastAPI/JWT backend                   | README / PROJECT_STATE / engineering standards | Onboarding confusion                    | Update docs or schedule spike |

---

## 4. P2 — After launch / next hardening

| ID     | Debt                                       | Notes                                                                                               |
| ------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| TD-011 | Large per-feature CSS bundles              | `services.css`, `work.css`, homepage critical/deferred — primary LCP pressure                       |
| TD-012 | Marketing hero composition duplication     | Careers/Blog/Services/Solutions similar shells — extract carefully without breaking protected pages |
| TD-013 | Stub feature folders                       | `ai/`, `auth/`, `cms/`, `crm/`, `dashboard/` — clutter + false affordances                          |
| TD-014 | Thin Playwright coverage vs ~39 pages      | Only 3 e2e specs                                                                                    |
| TD-015 | `@axe-core/cli` unused as script           | A11y relies on Lighthouse                                                                           |
| TD-016 | Testimonials / resources content depth     | Shells ahead of content                                                                             |
| TD-017 | Trust document library disabled            | Product promise incomplete                                                                          |
| TD-018 | Mobile Lighthouse not in CI                | Desktop-biased gates                                                                                |
| TD-019 | CSP allows `unsafe-inline` / `unsafe-eval` | Next-compatible; tighten when feasible                                                              |

---

## 5. P3 — Future enhancements

| ID     | Debt                          | Notes                                 |
| ------ | ----------------------------- | ------------------------------------- |
| TD-020 | No `vercel.json` / Dockerfile | Fine on Vercel; hurts portable deploy |
| TD-021 | GTM/GA/RUM absent             | Conversion analytics blind spot       |
| TD-022 | Captcha absent                | Honeypot + rate limit only            |
| TD-023 | `/dashboard/*` missing        | Marketing dead-ends if linked         |
| TD-024 | `/packages` route unused      | Navigation constant only              |
| TD-025 | Dark-mode marketing           | Tokens exist; not productized         |

---

## 6. Debt by engineering domain

### Architecture

- Stub modules (TD-013)
- Hero/CSS duplication (TD-011, TD-012)
- Stack doc drift FastAPI (TD-010)

### Performance

- Phase C pending (TD-001, TD-011)
- Dynamic SSR variance from UA headers (documented in 004.5; monitor)

### Security

- Admin/portal auth (TD-003, TD-006)
- Rate limit scale (TD-007)
- CSP strictness (TD-019)

### SEO

- Sitemap (TD-005)
- JSON-LD host + unused builders (TD-004, TD-009)

### Testing

- E2E breadth (TD-014)
- axe script (TD-015)

### Ops

- Email/DNS proof (TD-002)
- Sentry (TD-008)

### Content

- Testimonials/resources/trust library (TD-016, TD-017)

---

## 7. Intentionally accepted debt (do not “fix” without product ask)

| Item                       | Why accepted                           |
| -------------------------- | -------------------------------------- |
| CAREER_ROLES empty         | Hiring paused; empty state intentional |
| Trust library CTA disabled | No document store yet                  |
| Homepage protected         | Stability > drive-by redesigns         |
| No FastAPI in monorepo     | Lead path works via server actions     |

---

## 8. Paydown plan (maps to sprints)

| Sprint        | Debt IDs                                         |
| ------------- | ------------------------------------------------ |
| Immediate ops | TD-002                                           |
| Sprint 005    | TD-001, TD-003, TD-004, TD-005, TD-009 (stretch) |
| Sprint 006    | TD-007, TD-008, TD-014, TD-016, TD-018           |
| Sprint 007    | TD-006, TD-010, TD-013, TD-023                   |
| Later         | TD-011/012 (incremental), TD-019–TD-025          |

---

## 9. Tracking guidance

- Keep this register updated at sprint boundaries
- Prefer linking PR descriptions to `TD-###`
- Do not expand scope into protected homepage/services/solutions unless Founder-approved
