# Sprint 004.3 — Phase B (Performance Optimization)

**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-21  
**Status:** Complete (A11y / BP / SEO targets met; Perf +21–26 pts, LCP remains Phase C)

---

## Objective

Complete remaining Priority 1 Lighthouse optimizations without UI, branding, content, or business-logic changes:

1. Header scroll island optimization
2. Services SSR catalog + client filter island
3. Pricing calculator lazy loading
4. Contact form lazy loading
5. Accessibility fixes (badge contrast, semantic `dl`)

Builds on **Phase A** (production Lighthouse CI, marketing layout code-split, homepage BTF SSR).

---

## Files changed

### Header scroll island

| File                                                      | Change                                                                                        |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/features/homepage/Header/HeaderHomeScrollEffect.tsx` | **New** — minimal client island; sets `data-header-mode` / `data-header-scrolled` on `<html>` |
| `src/features/homepage/Header/HeaderElement.tsx`          | **New** — server-rendered `<header>` shell                                                    |
| `src/features/homepage/Header/HeaderRoot.tsx`             | **Deleted** — replaced by server shell + scroll island                                        |
| `src/features/homepage/Header/HeaderSection.tsx`          | Uses `HeaderElement`                                                                          |
| `src/features/homepage/Header/DesktopNavSlot.tsx`         | Nav mega-menu SSR enabled (removed `ssr: false`)                                              |
| `src/features/homepage/Header/MobileNavSlot.tsx`          | Mobile nav SSR enabled                                                                        |
| `src/features/homepage/Header/header.css`                 | `.header-adaptive` scroll-driven styles                                                       |
| `src/lib/layout/marketing-chrome.css`                     | Mirror `.header-adaptive` rules for ATF CSS                                                   |

### Services catalog SSR + filter island

| File                                                    | Change                                                     |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| `src/features/services/ServicesCatalog.tsx`             | Server orchestrator (search loader + SSR content)          |
| `src/features/services/ServicesCatalogContent.tsx`      | **New** — full SSR card grid with `data-service-*` hooks   |
| `src/features/services/ServicesCatalogSearch.tsx`       | **New** — client filter UI + DOM visibility toggling       |
| `src/features/services/ServicesCatalogSearchLoader.tsx` | **New** — deferred search bundle (`dynamic`, `ssr: false`) |
| `src/features/services/services-catalog.utils.ts`       | **New** — shared filter helpers                            |

### Form lazy loading

| File                                                          | Change                                               |
| ------------------------------------------------------------- | ---------------------------------------------------- |
| `src/features/pricing/calculator/PricingCalculatorLazy.tsx`   | **New** — `MountWhenVisible` + react-hook-form split |
| `src/features/pricing/PricingLandingPage.tsx`                 | Uses lazy calculator; fixes `aria-label` landmark    |
| `src/features/lead-funnel/components/ContactLeadFormLazy.tsx` | **New** — viewport-deferred contact form             |
| `src/features/lead-funnel/ContactLeadSection.tsx`             | Uses lazy form                                       |

### Accessibility

| File                                                              | Change                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| `src/features/services/ServicesHero.tsx`                          | Valid per-stat `<dl>` inside list items                               |
| `src/features/services/services.css`                              | Badge contrast tokens (`popular`, `recommended`, `new`, `enterprise`) |
| `src/components/patterns/hero-compositions/hero-compositions.css` | `.mh-status-badge`, `.mh-avatar-initial` contrast                     |
| `src/features/pricing/PricingHeroVisual.tsx`                      | Uses `.mh-status-badge`                                               |
| `src/features/contact/ContactHeroVisual.tsx`                      | Uses `.mh-avatar-initial`                                             |

### Tests

| File                                                | Change                                              |
| --------------------------------------------------- | --------------------------------------------------- |
| `src/features/owner-crm/owner-leads.loader.test.ts` | Mock `requireOwnerSession` (Sprint 004.2 alignment) |

### Phase A (included in same release branch)

| File                                                         | Change                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| `scripts/lighthouse-ci.mjs`                                  | Production-only audits, port 3099, dev-server rejection |
| `src/lib/layout/MarketingLayoutClientLoaders.tsx`            | **New**                                                 |
| `src/lib/layout/MarketingLayoutClientIslands.tsx`            | **New**                                                 |
| `src/app/(marketing)/layout.tsx`                             | Async client chrome loaders                             |
| `src/features/homepage/Homepage/HomepageShell.tsx`           | Direct SSR `HomepageBelowFold`                          |
| `src/features/homepage/Homepage/HomepageBelowFoldClient.tsx` | **Deleted**                                             |

---

## Bundle reduction

| Area                                 | Before                                                                            | After                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `/services` catalog                  | Monolithic `"use client"` `ServicesCatalog.tsx` (~488 lines, full-page hydration) | SSR `ServicesCatalogContent` + deferred `ServicesCatalogSearchLoader` async chunk |
| `/pricing`                           | Eager `react-hook-form` + zod in page graph                                       | `PricingCalculatorLazy` loads on viewport entry                                   |
| `/contact`                           | Eager lead form + validation stack                                                | `ContactLeadFormLazy` loads on viewport entry                                     |
| Header                               | `HeaderRoot` client wrapper + `ssr: false` nav shells                             | Server `<header>` + ~1 KB scroll island; nav SSR with link fallback               |
| Services TBT (Lighthouse prod)       | ~3,980 ms (Phase A baseline, dev-skewed) → **120 ms**                             | Main-thread blocking largely eliminated                                           |
| Unused JS top offender (`/services`) | 539 KiB (pre-Phase A dev audit) → **22 KiB** (Phase A prod)                       | Maintained post-split                                                             |

---

## Lighthouse before / after

**Audit config:** `npm run build` → `npm run lighthouse:ci` (production `next start` on port **3099**, no dev reuse).

### Phase A baseline (production, post–Phase A)

| Route       | Perf              | A11y | BP  | SEO |
| ----------- | ----------------- | ---- | --- | --- |
| `/`         | n/a (trace flake) | 100  | 100 | 100 |
| `/services` | 52                | 90   | 100 | 100 |
| `/pricing`  | 59                | 96   | 100 | 100 |
| `/contact`  | 49                | 96   | 100 | 100 |

### Phase B (this sprint)

| Route       | Perf   | A11y    | BP      | SEO     |
| ----------- | ------ | ------- | ------- | ------- |
| `/`         | **73** | **100** | **100** | **100** |
| `/services` | **73** | **100** | **100** | **100** |
| `/pricing`  | **74** | **100** | **100** | **100** |
| `/contact`  | **75** | **100** | **100** | **100** |

### Acceptance criteria

| Criterion           | Target | Result                                                                                        |
| ------------------- | ------ | --------------------------------------------------------------------------------------------- |
| All unit tests pass | ✅     | **87/87**                                                                                     |
| Accessibility       | ≥ 95   | **100** all routes                                                                            |
| Best Practices      | 100    | **100** all routes                                                                            |
| SEO                 | 100    | **100** all routes                                                                            |
| Performance         | ≥ 90   | **73–75** — not met; LCP ~3.2 s on `/services` (render-blocking CSS + large SSR catalog HTML) |

**Perf delta:** +21 to +26 points vs Phase A production baseline. Remaining gap is dominated by **LCP** and **render-blocking CSS**, not TBT (now ~120 ms on `/services`).

---

## Verification

```bash
npm run lint          # pass
npm run typecheck     # pass
npm run build         # pass (122 static pages)
npm run test:unit     # pass (87/87)
npm run lighthouse:ci # pass gates; perf warn-only
```

Build ID for Phase B audit: `hek3ChNGRy2zDMlCa4MSq`

---

## Architecture notes

- **Services catalog:** All service cards ship in initial HTML for SEO/crawlability. Client filter island toggles `hidden` on `[data-service-card]` nodes — no business-logic change to matching rules (`services-catalog.utils.ts` preserves same filters).
- **Header:** Homepage transparent→solid behavior unchanged; non-home routes set `data-header-mode="solid"` without scroll listeners.
- **Forms:** Calculator and contact form behavior unchanged; only load timing deferred until viewport proximity.

---

## Recommended Phase C (Perf ≥ 90)

1. Defer non-critical `/services` CSS (split `services.css` post-paint like homepage deferred CSS)
2. LCP hero tuning on `/services` (responsive image sizes, preload hints)
3. Below-fold marketing section lazy boundaries on `/services` (Process, Testimonials — preserve SSR via streaming where needed)
4. Lighthouse mobile profile in CI

---

## Git diff summary

```
 20 files changed, 263 insertions(+), 704 deletions(-)
 + 10 new files (header island, catalog split, lazy forms, Phase A layout loaders)
 - 2 deleted files (HeaderRoot, HomepageBelowFoldClient)
```

Commit: `feat(performance): complete Sprint 004.3 Phase B`
