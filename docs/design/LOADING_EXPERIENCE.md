# Bitcraftly Loading Experience

**Sprint:** 004.5 — Premium Loading Experience (Apple × Vercel × Linear style)  
**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-22  
**Status:** Implemented

---

## Objective

Deliver a modern, premium, enterprise-grade loading experience that improves **perceived performance** without blocking users, changing branding, or regressing Core Web Vitals.

**Principles**

1. Meaningful content first (header + hero copy + CTA)
2. Skeletons over spinners
3. No fullscreen blocking loaders
4. Zero layout shift (reserved dimensions)
5. Progressive streaming and hydration

---

## Loading strategy

### Layer 1 — Instant shell (always visible)

On every marketing route, the shared layout renders immediately:

- Skip link
- Header (logo + navigation shell)
- Main landmark (`#main-content`)

No route waits on a fullscreen spinner.

### Layer 2 — Route `loading.tsx` (navigation)

During client navigations, Next.js App Router shows route-specific skeletons **inside** the persistent layout. Header/footer remain mounted.

| Route group | Skeleton |
|-------------|----------|
| `(marketing)/loading.tsx` | Default hero + card grid |
| `/services`, `/solutions`, `/industries` | Hub hero + service cards |
| `/pricing` | Hero + pricing cards |
| `/contact` | Hero + form skeleton |
| `/work` | Hero + case study rows |
| `/blog` | Hero + blog cards |
| `/owner/leads` | CRM stats + table skeleton |

Mobile routes use `isMobileUserAgent()` to omit hero illustration placeholders (Sprint 004.4 alignment).

### Layer 3 — Suspense streaming (homepage)

`HomepageBelowFoldStream` wraps heavy below-the-fold sections in React `Suspense` with `connection()` deferral:

- Technologies
- Portfolio
- Founder message
- Cost calculator
- Testimonials
- FAQ

Hero and light sections (TrustedBy, Services, Process, etc.) stream first without suspending.

### Layer 4 — Viewport-deferred islands

`MountWhenVisible` + `next/dynamic` load interactive bundles when near viewport. Fallbacks now use shared skeleton compositions:

- Contact lead form → `FormSkeleton`
- Pricing calculator → `FormSkeleton`
- Testimonials carousel → carousel skeleton
- Cost calculator wizard → `FormSkeleton`
- Founder audio → audio panel skeleton

### Layer 5 — Button micro-states

Shared `Button` replaces SVG spinners with a subtle **opacity pulse** (`button--loading`, 250ms) and `loadingText` (default: "Loading…"). Maintains `aria-busy` and disabled duplicate submits.

---

## Skeleton architecture

```
src/components/ui/skeleton/
├── Skeleton.tsx          # Base primitive (shimmer, variants)
├── skeleton.css          # Tokens, shimmer keyframes, reduced-motion
├── types.ts
└── index.ts

src/components/patterns/skeletons/
├── HeroLoadingSkeleton.tsx
├── CardSkeletons.tsx     # Card, Service, Pricing, Blog, CaseStudy grids
├── DataSkeletons.tsx     # Form, Table, Chart, Dashboard, LeadList, Avatar, Image
├── MarketingRouteLoading.tsx  # Route shells + homepage section fallbacks
└── index.ts
```

### Base primitive

```tsx
<Skeleton className="h-[44px] w-[180px]" />
<Skeleton variant="circular" className="size-[40px]" />
<Skeleton variant="text" className="w-[60%]" />
```

- Shimmer duration: **1.4s** (within 1.2–1.6s spec)
- `aria-hidden="true"` on decorative placeholders
- `prefers-reduced-motion`: shimmer → opacity pulse

### Design tokens (skeleton.css)

| Token | Purpose |
|-------|---------|
| `--skeleton-base` | Placeholder fill |
| `--skeleton-highlight` | Shimmer sweep |
| `--skeleton-duration` | 1.4s animation cycle |

Uses existing `--border`, `--surface`, `--background` — no new brand colors.

---

## Component map

| Skeleton | File | Used by |
|----------|------|---------|
| `Skeleton` | `ui/skeleton` | All compositions |
| `HeroLoadingSkeleton` | patterns/skeletons | Route loading, marketing shells |
| `CardSkeleton` / `CardGridSkeleton` | patterns/skeletons | Default routes, portfolio fallback |
| `ServiceCardSkeleton` | patterns/skeletons | Services, Solutions, Industries loading |
| `PricingCardSkeleton` | patterns/skeletons | Pricing loading |
| `BlogCardSkeleton` | patterns/skeletons | Blog loading |
| `CaseStudyCardSkeleton` | patterns/skeletons | Work loading |
| `FormSkeleton` | patterns/skeletons | Contact, pricing calculator, lead funnel |
| `TableSkeleton` | patterns/skeletons | Owner CRM leads |
| `ChartSkeleton` | patterns/skeletons | Available for dashboard charts |
| `DashboardCardSkeleton` | patterns/skeletons | Owner CRM stats |
| `LeadListSkeleton` | patterns/skeletons | Owner leads loading |
| `AvatarSkeleton` | patterns/skeletons | Reusable avatar placeholder |
| `ImageSkeleton` | patterns/skeletons | Reusable image placeholder |
| `TestimonialsSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `FaqSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `CalculatorSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `PortfolioSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `TechnologiesSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `FounderMessageSectionSkeleton` | MarketingRouteLoading | Homepage Suspense |
| `MarketingRouteLoading` | patterns/skeletons | App Router `loading.tsx` |

---

## Animation guidelines

| Interaction | Animation | Max duration |
|-------------|-----------|--------------|
| Skeleton shimmer | Horizontal gradient sweep | 1.4s loop |
| Hero illustration (desktop) | Fade + scale enter | 250ms (`hero-illustration-reveal`) |
| Button loading | Opacity pulse | 250ms |
| Reduced motion | Opacity pulse only | 1.4s |

**Avoided:** fullscreen spinners, bounce, generic rotating loaders.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Skeletons decorative | `aria-hidden="true"` on skeleton nodes |
| Loading regions | `aria-busy="true"` + `aria-label` on section shells |
| Live updates | `aria-live="polite"` on route loading containers |
| Buttons | `aria-busy`, disabled during submit |
| Reduced motion | Shimmer disabled; opacity pulse fallback |
| Skip link | Unchanged in marketing layout |
| WCAG AA | No token/color changes |

FAQ lazy accordion keeps **SSR static fallback** with real question text for SEO and screen readers (not replaced by skeleton).

---

## Hero & mobile (Sprint 004.4 preserved)

- **Desktop:** Hero illustration renders with 250ms fade-in; priority `next/image` unchanged
- **Mobile:** Server `isMobileUserAgent()` skips illustration import/render — no heavy asset download
- Route skeletons respect `compact` mode (no illustration column)

---

## Performance impact

### Expected improvements

| Metric | Mechanism |
|--------|-----------|
| **LCP** | ATF hero copy streams first; illustration deferred on mobile |
| **CLS** | Skeleton dimensions match final layout; reserved min-heights |
| **INP** | Fewer blocking spinners; deferred hydration unchanged |
| **TBT** | Homepage Suspense allows earlier paint of hero + header |
| **Perceived speed** | Shimmer skeletons vs blank/gray boxes |

### Before vs after

| Area | Before (004.4) | After (004.5) |
|------|----------------|---------------|
| Route navigation | Blank main or layout-only wait | Hero + section skeletons |
| Homepage BTF | Full synchronous SSR block | Suspense streaming + skeleton fallbacks |
| Contact/pricing forms | Gray `min-h` boxes | Structured `FormSkeleton` |
| Testimonials carousel | Gray box | Carousel-shaped skeleton |
| Owner CRM | Custom pulse divs | Shared `LeadListSkeleton` + `TableSkeleton` |
| Button loading | SVG spinner | Opacity pulse + loading label |
| Shared skeleton system | None | `ui/skeleton` + compositions |
| React Suspense | None | Homepage below-fold boundaries |

### Lighthouse (desktop CI — unchanged script)

Sprint 004.5 focuses on **perceived UX** and streaming architecture. Desktop Lighthouse Performance ≥95 remains a **Phase C** target (see Sprint 004.4 remaining work). A11y/BP/SEO targets remain **100** on audited routes.

Run validation:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run lighthouse:ci
```

Build ID (004.5): from latest `npm run build` output.

---

## Files changed

### New — skeleton system

- `src/components/ui/skeleton/Skeleton.tsx`
- `src/components/ui/skeleton/skeleton.css`
- `src/components/ui/skeleton/types.ts`
- `src/components/ui/skeleton/index.ts`
- `src/components/patterns/skeletons/*` (compositions + index)

### New — route loading

- `src/app/(marketing)/loading.tsx`
- `src/app/(marketing)/services/loading.tsx`
- `src/app/(marketing)/pricing/loading.tsx`
- `src/app/(marketing)/contact/loading.tsx`
- `src/app/(marketing)/work/loading.tsx`
- `src/app/(marketing)/blog/loading.tsx`
- `src/app/(marketing)/solutions/loading.tsx`
- `src/app/(marketing)/industries/loading.tsx`

### New — homepage streaming

- `src/features/homepage/Homepage/HomepageBelowFoldStream.tsx`

### Modified

- `src/styles/globals.css` — import skeleton CSS
- `src/components/ui/index.ts` — export Skeleton
- `src/components/ui/button/Button.tsx` — pulse loading (no spinner)
- `src/components/ui/button/types.ts` — `loadingText`
- `src/features/homepage/Homepage/HomepageShell.tsx` — use stream module
- `src/features/homepage/Hero/HeroIllustration.tsx` — desktop fade-in
- `src/features/homepage/CostCalculator/CostCalculatorExperience.tsx`
- `src/features/homepage/CostCalculator/FounderMessageExperience.tsx`
- `src/features/homepage/Testimonials/TestimonialsCarouselLazy.tsx`
- `src/features/lead-funnel/components/ContactLeadFormLazy.tsx`
- `src/features/pricing/calculator/PricingCalculatorLazy.tsx`
- `src/app/owner/(dashboard)/leads/loading.tsx`

---

## Remaining work

1. **Mobile Lighthouse profile** in CI to measure mobile hero skip + skeleton UX
2. **Detail route loading** — `/blog/[slug]`, `/services/[slug]` detail skeletons
3. **Admin routes** — `loading.tsx` for CMS pages
4. **Pricing calculator submit** — migrate raw `<button>` to shared `Button` with loading/success states
5. **Newsletter form** — align status machine with `Button` loading pattern
6. **Chart/dashboard pages** — wire `ChartSkeleton` when analytics views ship

---

## Acceptance checklist

| Criterion | Status |
|-----------|--------|
| No fullscreen spinner | ✅ |
| Skeleton-based loading | ✅ |
| Route `loading.tsx` on major marketing routes | ✅ |
| Suspense below-the-fold (homepage) | ✅ |
| Mobile hero illustration skipped (server) | ✅ (004.4) |
| `prefers-reduced-motion` | ✅ |
| `aria-busy` / `aria-hidden` | ✅ |
| No branding/color/typography changes | ✅ |
| lint / typecheck / build / tests | ✅ |
| Lighthouse Performance ≥95 | ⏳ Phase C |

Suggested commit:

```
feat(ux): Sprint 004.5 premium skeleton loading experience
```
