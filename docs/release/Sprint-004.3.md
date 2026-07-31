# Sprint 004.3 — Production Performance, SEO & Observability

**Branch:** `release/v1.0-launch`  
**Date:** 2026-07-20  
**Status:** Complete

---

## Objective

Improve production performance foundations, SEO correctness, observability hooks, and deployment diagnostics without UI, branding, or business logic changes.

---

## Audit Summary

### Critical (fixed)

| #   | Issue                                                               | Fix                                                                                               |
| --- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| C1  | Industry slug drift — sitemap listed `/industries/enterprise` (404) | Replaced `enterprise` with `saas` in nav + services cross-link; sitemap uses `INDUSTRIES_CATALOG` |
| C2  | `not-found.tsx` inherited `index: true` from root layout            | Added `createNoIndexMetadata()` export on 404 page                                                |
| C3  | Sitemap missing ~46+ indexable URLs                                 | Added services, solutions, work hubs, work projects, `/case-studies`                              |
| C4  | No production health endpoint                                       | Added `GET /api/health` with build info                                                           |
| C5  | No structured error reporting                                       | Added observability layer + `onRequestError` hook                                                 |

### High (fixed)

| #   | Issue                                                              | Fix                                                                                                     |
| --- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| H1  | Invalid `SearchAction` JSON-LD (`/search` does not exist)          | Removed `potentialAction` from website schema                                                           |
| H2  | Default OG image wrong (`/brand/icon.png` as 1200×630)             | Default now `/opengraph-image.webp` via `createPageMetadata`                                            |
| H3  | Invalid slug routes emitted indexable metadata before `notFound()` | Dynamic `[slug]` pages return `createNoIndexMetadata()` for missing entities                            |
| H4  | Hardcoded `https://bitcraftly.com` in metadata pipeline            | `getSiteUrl()` / `getAbsoluteUrl()` used in layout, `createPageMetadata`, organization, website schemas |
| H5  | No request error hook                                              | `instrumentation.ts` exports `onRequestError`                                                           |
| H6  | Error boundaries only logged to console                            | `reportClientError()` in `error.tsx` / `global-error.tsx`                                               |
| H7  | No cache headers for static assets                                 | `Cache-Control: immutable` for `/_next/static/*`                                                        |
| H8  | Weak Lighthouse CI coverage                                        | Added `/services` route; raised performance warn gate to 50%                                            |

### Medium (documented — not implemented)

| #   | Issue                                                | Recommendation                                                            |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| M1  | JSON-LD still hardcodes URLs in feature schema files | Migrate `services-schema`, `solutions-schema`, etc. to `getAbsoluteUrl()` |
| M2  | No industry detail JSON-LD                           | Add `buildIndustryDetailJsonLd()`                                         |
| M3  | Unused work hub/project JSON-LD builders             | Wire into work slug pages                                                 |
| M4  | Thin work hub scaffold pages indexable               | Add `noindex` when content ships or gate indexing                         |
| M5  | No Real User Monitoring (web-vitals)                 | Add RUM bridge in Sprint 004.4                                            |
| M6  | Desktop-only Lighthouse CI                           | Enable mobile emulation when scores stable                                |
| M7  | No GTM/GA script loaded                              | Wire analytics container when marketing approves                          |
| M8  | Static sitemap `lastModified` date                   | Derive from content `updatedAt` fields                                    |

### Low (documented)

| #   | Issue                                                          |
| --- | -------------------------------------------------------------- |
| L1  | Organization `sameAs` empty                                    |
| L2  | No Twitter `@site` / `@creator` handles                        |
| L3  | `robots.ts` stale `/dashboard/` disallow paths                 |
| L4  | Mono font loaded globally on all pages                         |
| L5  | No `@sentry/nextjs` package yet — hooks ready via `SENTRY_DSN` |

---

## Architecture Decisions

### 1. Centralized SEO helpers

- `getSiteUrl()` / `getAbsoluteUrl()` in `src/lib/seo/site.ts`
- `createNoIndexMetadata()` in `src/lib/seo/noindex-metadata.ts`
- `buildWebsiteSchema()` / `buildOrganizationSchema()` for env-aware JSON-LD

### 2. Sitemap driven by content catalogs

Sitemap imports slug arrays from:

- `INDUSTRIES_CATALOG`
- `SERVICE_SLUGS`, `SOLUTION_SLUGS`
- `WORK_STATIC_SLUGS`, `WORK_PROJECTS`
- Blog + case study content modules

Single source of truth prevents 404 URLs in sitemap.

### 3. Observability without mandatory Sentry dependency

- `src/lib/observability/` emits structured JSON logs
- `SENTRY_DSN` flag in payloads for future `@sentry/nextjs` wiring
- CSP `connect-src` allows `*.ingest.sentry.io` when `SENTRY_DSN` is set

### 4. Health endpoint for probes

`GET /api/health` returns:

```json
{
  "status": "ok",
  "service": "bitcraftly-platform",
  "checks": { "process": "ok" },
  "build": {
    "version": "0.1.0",
    "commit": "...",
    "buildId": "...",
    "environment": "production",
    "nodeVersion": "v22.x"
  }
}
```

---

## Performance Review

| Area                | Status      | Notes                                        |
| ------------------- | ----------- | -------------------------------------------- |
| Images              | ✅ Strong   | AVIF/WebP, `next/image`, hero `priority`     |
| Fonts               | ✅ Strong   | `next/font`, `display: swap`, sans preloaded |
| Dynamic imports     | ✅ Strong   | Homepage/marketing chrome deferred           |
| Bundle size         | ⚠️ Medium   | Large chunks documented; analyzer available  |
| Route prefetch      | ✅ Default  | Next.js `<Link>` prefetch                    |
| Caching             | ✅ Improved | Static asset `Cache-Control` added           |
| Streaming           | ⚠️ Medium   | No Suspense boundaries yet                   |
| Server Components   | ✅ Default  | Marketing routes server-first                |
| Metadata generation | ✅ Fixed    | Env-aware canonicals + OG                    |

---

## SEO Review

| Area            | Status                                           |
| --------------- | ------------------------------------------------ |
| robots.txt      | ✅ Dynamic `robots.ts`                           |
| sitemap.xml     | ✅ Expanded (~80+ URLs)                          |
| Canonical URLs  | ✅ Fixed in metadata pipeline                    |
| OpenGraph       | ✅ Fixed default image                           |
| Twitter cards   | ✅ Inherit from OG                               |
| Structured data | ✅ Fixed website schema; feature schemas pending |
| Breadcrumbs     | ✅ UI present; JSON-LD gaps remain (Medium)      |
| 404 indexing    | ✅ Fixed with noindex                            |
| hreflang        | N/A — single locale (`en_IN`)                    |

---

## Accessibility Review

| Area                 | Status                         |
| -------------------- | ------------------------------ |
| Lighthouse a11y gate | ✅ 85% error threshold in CI   |
| ARIA                 | ✅ Existing patterns preserved |
| Keyboard navigation  | ✅ Unchanged                   |
| Focus management     | ✅ Unchanged                   |
| Color contrast       | ✅ Design tokens unchanged     |

No accessibility regressions introduced.

---

## Monitoring

| Component              | Path                                           |
| ---------------------- | ---------------------------------------------- |
| Server error reporting | `src/lib/observability/report-error.ts`        |
| Client error reporting | `src/lib/observability/report-client-error.ts` |
| Request error hook     | `src/instrumentation.ts` → `onRequestError`    |
| Build info             | `src/lib/observability/build-info.ts`          |
| Health check           | `src/app/api/health/route.ts`                  |

---

## Files Changed

| File                                        | Action                                             |
| ------------------------------------------- | -------------------------------------------------- |
| `src/lib/seo/site.ts`                       | Modified — added `getAbsoluteUrl()`                |
| `src/lib/seo/createPageMetadata.ts`         | Modified — env URLs + OG image                     |
| `src/lib/seo/noindex-metadata.ts`           | Created                                            |
| `src/lib/seo/website.ts`                    | Modified — removed SearchAction                    |
| `src/lib/seo/organization.ts`               | Modified — env-aware builder                       |
| `src/components/seo/StructuredData.tsx`     | Modified — dynamic schema builders                 |
| `src/app/sitemap.ts`                        | Modified — full catalog coverage                   |
| `src/app/not-found.tsx`                     | Modified — noindex metadata                        |
| `src/app/layout.tsx`                        | Modified — env-aware `metadataBase`                |
| `src/app/error.tsx`                         | Modified — observability hook                      |
| `src/app/global-error.tsx`                  | Modified — observability hook                      |
| `src/app/api/health/route.ts`               | Created                                            |
| `src/instrumentation.ts`                    | Modified — `onRequestError`                        |
| `src/lib/observability/*`                   | Created                                            |
| Dynamic `[slug]` pages (5)                  | Modified — noindex for invalid slugs               |
| `src/constants/industries.ts`               | Modified — enterprise → saas                       |
| `src/features/services/services.content.ts` | Modified — fixed cross-link                        |
| `next.config.ts`                            | Modified — cache headers, `poweredByHeader: false` |
| `src/lib/security/security-headers.ts`      | Modified — Sentry CSP allowance                    |
| `scripts/lighthouse-ci.mjs`                 | Modified — expanded routes + gate                  |
| `.env.example`                              | Modified — Sentry + build vars                     |

---

## Verification Results

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass (includes /api/health)
```

---

## Git Diff Summary

Run `git diff --stat` after commit. Expected: ~30 files, SEO/observability/performance infrastructure only.

---

## Out of Scope (Sprint 004.4+)

- Full `@sentry/nextjs` package integration
- OpenTelemetry SDK wiring
- Feature-level JSON-LD URL migration
- Mobile Lighthouse emulation
- GTM/GA container loading
- Work hub scaffold `noindex`
- Distributed rate limiting (Redis)
