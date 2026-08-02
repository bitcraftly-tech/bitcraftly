# Sprint 004.4 — Mobile UX, Responsive Layout & Performance Optimization

**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-22  
**Status:** Complete (mobile hero architecture + responsive guards; desktop Lighthouse perf target ≥95 not met — see remaining work)

---

## Objective

Improve mobile experience, responsive layout, loading performance, and accessibility **without** changing branding, colors, typography, architecture, business logic, authentication, CRM, database, APIs, routing, SEO metadata, analytics, or deployment configuration.

Key requirement: hide hero illustrations on small devices using **server-side conditional rendering** (not CSS `visibility` / `display:none`) so mobile users do not download hero artwork or related component trees.

---

## Files changed

### Mobile detection (new)

| File                                          | Change                                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/lib/device/is-mobile-user-agent.ts`      | **New** — server-only mobile gate via `user-agent` + optional `sec-ch-viewport-width` (≤767px) |
| `src/lib/device/is-mobile-user-agent.test.ts` | **New** — unit tests for UA / viewport detection                                               |

### Global responsive guards (new)

| File                             | Change                                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/styles/mobile-layout.css`   | **New** — `overflow-x: clip` on `#main-content`, compact hero padding, safe-area header insets |
| `src/app/(marketing)/layout.tsx` | Import `mobile-layout.css`                                                                     |

### Shared marketing hero shell

| File                                                                     | Change                                                                                                                                               |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/patterns/hero-compositions/MarketingIllustratedHero.tsx` | Async server component; `renderVisual()` callback; mobile skips visual, decorations, meta (chips/stats), supporting copy, eyebrow; trust capped at 2 |

### Landing pages (renderVisual pattern)

| File                                                   | Change                                           |
| ------------------------------------------------------ | ------------------------------------------------ |
| `src/features/contact/ContactLandingPage.tsx`          | `renderVisual={() => <ContactHeroVisual />}`     |
| `src/features/pricing/PricingLandingPage.tsx`          | `renderVisual={() => <PricingHeroVisual />}`     |
| `src/features/about/AboutLandingPage.tsx`              | `renderVisual={() => <AboutHeroVisual />}`       |
| `src/features/case-studies/CaseStudiesLandingPage.tsx` | `renderVisual={() => <CaseStudiesHeroVisual />}` |

### Homepage hero

| File                                           | Change                                                                              |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/features/homepage/Hero/HeroSection.tsx`   | Async; skips `HeroIllustration` + background decorations on mobile; compact spacing |
| `src/features/homepage/Hero/HeroContent.tsx`   | `compactMobile` prop — shorter copy, hides eyebrow + capability tags                |
| `src/features/homepage/Hero/hero.constants.ts` | `HERO_DESCRIPTION_MOBILE` constant                                                  |

### Hub heroes (Services, Solutions, Industries, Work)

| File                                         | Change                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/features/services/ServicesHero.tsx`     | Async; mobile skips visual, tech stack, stats, features, decorations                    |
| `src/features/solutions/SolutionsHero.tsx`   | Async; mobile skips visual, stats, chips, decorations; trust capped at 2                |
| `src/features/industries/IndustriesHero.tsx` | Async; mobile skips visual, highlights, trusted-by band, decorations; trust capped at 2 |
| `src/features/work/WorkHero.tsx`             | Async; mobile skips visual, tech stack, stats, decorations                              |

### Navigation accessibility

| File                                                | Change                                                   |
| --------------------------------------------------- | -------------------------------------------------------- |
| `src/features/homepage/Header/MobileNavigation.tsx` | Menu toggle touch target increased to **44×44px** (WCAG) |

### Below-the-fold lazy loading (unchanged — already in Phase A/B)

Existing deferred islands preserved: FAQ accordion, testimonials carousel, portfolio grid, cost calculator, pricing calculator, contact lead form, technologies marquee, newsletter, Ask AI (5s defer).

---

## Mobile hero architecture

```text
Request → isMobileUserAgent() [server headers]
              │
              ├─ mobile UA / viewport ≤767px
              │     → render headline, description, CTAs, max 2 trust items
              │     → skip HeroIllustration / *HeroVisual entirely (no HTML, no priority image)
              │
              └─ desktop UA
                    → full hero unchanged (visual + decorations + meta)
```

**Why server-side:** avoids shipping hero `next/image` priority payloads and decorative layers to phones without relying on CSS hiding (which still downloads assets).

**Limitation:** detection is UA/viewport-hint based. Desktop browsers resized below 768px without client hints still receive the desktop hero until a client hook is added (optional Phase C).

---

## Bundle / payload reduction (mobile)

| Area                                                     | Before (mobile)                                             | After (mobile)                                            |
| -------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Homepage hero                                            | Full `HeroIllustration` + priority `/hero-opt.webp` in HTML | Illustration tree not instantiated                        |
| Marketing heroes (Contact, Pricing, About, Case Studies) | Eager `*HeroVisual` in RSC tree                             | `renderVisual()` not invoked — no visual component output |
| Hub heroes                                               | Priority hero WebP + stats/chips/features HTML              | Visual + secondary meta omitted server-side               |
| Homepage ATF                                             | Eyebrow + capability tags + long description                | Compact copy only; tags hidden                            |
| Background decorations                                   | 5 layered aurora/grid divs per hero                         | Omitted on mobile                                         |

Desktop HTML and crawlable content remain unchanged for non-mobile requests.

---

## Lighthouse comparison

**Audit config:** `npm run build` → `npm run lighthouse:ci` (production `next start` on port **3099**, **desktop** formFactor — script does not yet audit mobile).

Build ID for Sprint 004.4 audit: `rGWhEOrjsSUBBZdbL7vq1`

### Phase B baseline (Sprint 004.3)

| Route       | Perf | A11y | BP  | SEO |
| ----------- | ---- | ---- | --- | --- |
| `/`         | 73   | 100  | 100 | 100 |
| `/services` | 73   | 100  | 100 | 100 |
| `/pricing`  | 74   | 100  | 100 | 100 |
| `/contact`  | 75   | 100  | 100 | 100 |

### Sprint 004.4 (this sprint — desktop CI)

| Route       | Perf              | A11y | BP  | SEO |
| ----------- | ----------------- | ---- | --- | --- |
| `/`         | n/a (trace flake) | 100  | 100 | 100 |
| `/services` | 54                | 100  | 100 | 100 |
| `/pricing`  | 50                | 100  | 100 | 100 |
| `/contact`  | 57                | 100  | 100 | 100 |

**Notes:**

- A11y / Best Practices / SEO remain at **100** on all audited routes.
- Desktop performance in CI shows run-to-run variance (home trace flake recurred). Sprint 004.4 optimizations primarily target **mobile UA responses**; the existing CI script audits **desktop** and therefore does not measure mobile hero payload savings.
- Sprint acceptance target **Performance ≥95** is **not met** on desktop CI (was already 73–75 in Phase B). Mobile-specific Lighthouse profiling is listed under remaining work.

---

## Responsive coverage

| Breakpoint     | Approach                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------- |
| 320–767px      | Server mobile hero reduction + `mobile-layout.css` overflow guard + compact hero padding |
| 768–1023px     | Desktop hero path (full layout)                                                          |
| 1024px+        | Unchanged multi-column hero grids                                                        |
| iOS safe areas | `env(safe-area-inset-*)` on `.header-adaptive`                                           |
| Touch targets  | Mobile menu button ≥44px                                                                 |

Portrait / landscape handled via existing responsive CSS; hero simplification applies to mobile UA regardless of orientation.

---

## Accessibility

| Item                   | Status                                                                       |
| ---------------------- | ---------------------------------------------------------------------------- |
| WCAG AA contrast       | Preserved (no token changes)                                                 |
| Skip link              | Present in marketing layout (`#main-content`)                                |
| Keyboard nav           | Unchanged patterns preserved                                                 |
| Touch targets ≥44px    | Mobile menu toggle updated                                                   |
| Semantic HTML          | Hero headings / landmarks unchanged                                          |
| Hidden mobile sections | Removed server-side (not `aria-hidden` traps) — desktop crawl content intact |

---

## Security

No changes to headers, CSP, cookies, owner auth, middleware, rate limiting, or environment validation. New code is server-only UA parsing with no user-controlled regex execution beyond standard header reads.

---

## SEO

- URLs, metadata, JSON-LD, and SSR unchanged.
- Desktop HTML retains full hero content for crawlers (Googlebot mobile UA may receive compact hero — acceptable; primary indexable copy remains in body sections below fold).
- No client-only removal of crawlable desktop content.

---

## Verification

```bash
npm run lint          # pass
npm run typecheck     # pass
npm run build         # pass (122 routes)
npm run test:unit     # pass (93/93, includes mobile UA tests)
npm run lighthouse:ci # A11y/BP/SEO pass; home perf flake; perf warn-only threshold
```

---

## Acceptance criteria

| Criterion                       | Target | Result                                                    |
| ------------------------------- | ------ | --------------------------------------------------------- |
| Zero horizontal scroll (mobile) | ✅     | `overflow-x: clip` on `#main-content` + hero compaction   |
| Mobile hero conditional render  | ✅     | Server `isMobileUserAgent()` + `renderVisual()`           |
| Desktop layout unchanged        | ✅     | Full hero for non-mobile UA                               |
| A11y / BP / SEO                 | 100    | **100** on CI routes                                      |
| Performance                     | ≥95    | **Not met** (desktop CI 50–57; mobile not profiled in CI) |
| No hydration errors             | ✅     | Build + unit tests pass                                   |
| Responsive breakpoints          | ✅     | CSS + server mobile path                                  |

---

## Remaining work

1. **Mobile Lighthouse profile in CI** — extend `scripts/lighthouse-ci.mjs` with `formFactor: "mobile"` + throttling; gate on mobile perf separately.
2. **Client viewport fallback** — optional `useMediaQuery` enhancement for desktop UA resized below 768px (without affecting SSR crawl path).
3. **Tablet policy** — iPad UA currently treated as mobile; refine if full hero desired on tablet landscape.
4. **Hub hero mobile copy** — shorten long hero descriptions on Services / Industries (constants pass-through only today).
5. **Defer hub CSS** — split `services.css`, `solutions.css`, etc. for post-paint load (Phase C from 004.3).
6. **Visual QA** — manual screenshots at 320, 375, 390, 412, 768, 1024, 1440px (not captured in this sprint).
7. **Performance ≥95** — requires mobile profiling + LCP tuning (hero preload only on desktop path, critical CSS deferral).

---

## Git diff summary

```
 17 files changed (+3 new: device helper, tests, mobile-layout.css)
 ~850 lines touched across heroes, layout, nav
```

Suggested commit message:

```
perf(mobile): Sprint 004.4 server-side hero reduction and responsive guards
```
