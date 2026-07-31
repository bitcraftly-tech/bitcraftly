# Industries Page — Implementation Architecture

**Product surface:** `/industries` (+ `/industries/[slug]`)  
**Feature module:** `src/features/industries/`  
**Status:** Architecture plan (implementation follows this document)  
**Isolation:** Do not modify Homepage, Services, or Solutions (frozen). Shared components are **read-only** — invent page-owned heroes/composites when uniqueness is required.

---

## 1. Goals & differentiation

### Goals

- Production-quality **Industries** marketing landing for an enterprise digital agency.
- Feel **visually and structurally different** from Homepage, Services, and Solutions while staying on Bitcraftly design tokens.
- SEO-ready listing + per-industry slug pages.
- Accessible and responsive (desktop → mobile).

### Differentiation (must not look like)

| Page      | Typical pattern                                 | Industries must avoid               |
| --------- | ----------------------------------------------- | ----------------------------------- |
| Homepage  | Product story, calculator, multi-band marketing | Cube/product hero reuse             |
| Services  | Searchable catalog + sticky category nav        | Catalog-first + service cards only  |
| Solutions | Featured media triad + solution groups          | Full-bleed product PNGs as identity |

### Industries identity

- Metaphor: **domain network** — hub + connected vertical nodes.
- Layout: network hero → featured rail → dense industry cards → challenge → offer mapping → proof → process → FAQ → CTA.
- Visual language: accent rails per vertical, dashed illustration wells, metrics band, radial network SVG (not mega-menu clones of Services).

---

## 2. Page architecture

```
Browser
  └─ App Router (thin)
       ├─ src/app/(marketing)/industries/page.tsx          → metadata + <IndustriesLandingPage />
       └─ src/app/(marketing)/industries/[slug]/page.tsx → generateStaticParams + detail shell
            │
            ▼
       src/features/industries/                            → all UI, content, CSS, schema
            │
            ├─ uses (read-only): PageShell, Section, Container, Icon, IconBox,
            │                    MarketingBreadcrumbs, FaqAccordion, MarketingFinalCtaBand,
            │                    JsonLdScript, createPageMetadata, design tokens
            └─ does NOT import: ServicesHero, SolutionsHero, Homepage HeroSection,
                                MarketingIllustratedHero (for landing hero)
```

### Routing ownership

| Route                | Owner                                 | Responsibility                                                              |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `/industries`        | `features/industries`                 | Full landing (13 sections)                                                  |
| `/industries/[slug]` | `features/industries` + thin app page | Industry detail (pain / solutions / CTAs)                                   |
| Header mega-menu     | `src/constants/industries.ts`         | Nav labels (separate from landing catalog; sync in a later chore if needed) |

### Layout chrome

Inherited from `(marketing)/layout.tsx` (Header, Footer, Newsletter, Ask AI). Industries feature owns **page body only**.

---

## 3. Component hierarchy

```
IndustriesLandingPage
├── JsonLdScript                          (shared, read-only)
├── IndustriesHero                        (page-owned)
│   ├── MarketingBreadcrumbs              (shared, read-only)
│   ├── hero copy + CTAs + trust
│   └── IndustriesNetworkVisual           (page-owned illustration)
├── IndustriesFeaturedSection
│   └── IndustryCard[]                    (reusable)
│       └── IndustryIllustration
├── IndustriesGridSection (#industries-grid)
│   └── IndustryCard[]
├── IndustriesChallengesSection
├── IndustriesSolutionsSection            (Bitcraftly solution offers)
├── IndustriesTechSection
├── IndustriesCaseStudiesSection
├── IndustriesMetricsSection
├── IndustriesProcessSection
├── IndustriesWhySection
├── IndustriesFaqSection
│   └── FaqAccordion                      (shared, read-only)
├── IndustriesRelatedServicesSection
└── IndustriesPageCta
    └── MarketingFinalCtaBand             (shared, read-only)
```

### File map (planned feature module)

| File                          | Role                      |
| ----------------------------- | ------------------------- |
| `IndustriesLandingPage.tsx`   | Section composition       |
| `IndustriesHero.tsx`          | Unique hero shell         |
| `IndustriesNetworkVisual.tsx` | Network illustration      |
| `IndustryCard.tsx`            | Reusable industry card    |
| `IndustryIllustration.tsx`    | Glyph / illustration well |
| `IndustriesSections.tsx`      | Mid-page section exports  |
| `IndustriesPageCta.tsx`       | Final CTA wrapper         |
| `industries.content.ts`       | Copy + catalog data       |
| `industries.types.ts`         | Models                    |
| `industries.css`              | Page-owned styles         |
| `industries-schema.ts(x)`     | JSON-LD builders          |
| `index.ts`                    | Public exports            |

**Do not** place Industries landing logic under `homepage/`, `services/`, or `solutions/`.

---

## 4. Section order (locked)

Landing scroll order — **do not reorder without product sign-off**:

| #   | Section              | Anchor / notes                                      |
| --- | -------------------- | --------------------------------------------------- |
| 1   | Unique Hero          | Top; secondary CTA may deep-link `#industries-grid` |
| 2   | Featured Industries  | Subset of catalog (`featured: true`)                |
| 3   | Industries Grid      | `id="industries-grid"` — full catalog               |
| 4   | Business Challenges  | Cross-vertical friction themes                      |
| 5   | Bitcraftly Solutions | Offer tiles linking Services/Solutions              |
| 6   | Technology Stack     | Chip / category list                                |
| 7   | Case Studies         | Outcome cards → Work / Case Studies routes          |
| 8   | Success Metrics      | 4-up metrics band                                   |
| 9   | Process              | 4-step vertical engagement path                     |
| 10  | Why Bitcraftly       | Industry-angled differentiators                     |
| 11  | FAQs                 | Accordion                                           |
| 12  | Related Services     | Service deep-links                                  |
| 13  | Final CTA            | Dark band — consultation + secondary                |

---

## 5. Data model

### Core: `IndustryModel`

| Field          | Type                                                            | Purpose                                          |
| -------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| `slug`         | `string`                                                        | URL key                                          |
| `label`        | `string`                                                        | Display name                                     |
| `shortLabel`   | `string`                                                        | Network node label                               |
| `description`  | `string`                                                        | Card / detail lead                               |
| `icon`         | `IconName`                                                      | Nav / node icon                                  |
| `illustration` | union key                                                       | Illustration preset (`care`, `learn`, `shop`, …) |
| `painPoints`   | `string[]`                                                      | 3 bullets                                        |
| `solutions`    | `string[]`                                                      | 3 bullets                                        |
| `featured?`    | `boolean`                                                       | Featured rail inclusion                          |
| `accent`       | `"teal" \| "indigo" \| "amber" \| "rose" \| "sky" \| "emerald"` | Card accent token class                          |

### Supporting models

- `IndustryChallenge` — id, title, description, icon
- `IndustrySolutionOffer` — id, title, description, icon, href
- `IndustryTechItem` — name, category
- `IndustryCaseStudy` — id, industry, title, result, metric, href
- `IndustryMetric` — id, value, label, hint
- `IndustryProcessStep` — id, title, description, icon
- `IndustryWhyItem` — id, title, description, icon
- `IndustryFaqItem` — id, question, answer
- `IndustryRelatedService` — id, title, description, href, icon

### Content modules (`industries.content.ts`)

- `INDUSTRIES_CATALOG` — authoritative list for landing + `generateStaticParams`
- `INDUSTRIES_LANDING` — hero / section headings / CTA copy
- Arrays for challenges, offers, tech, cases, metrics, process, why, FAQs, related services
- Helpers: `getIndustryModelBySlug`, `industryDetailHref`

### Source of truth rules

1. **Landing catalog** lives in the feature module (product-controlled).
2. **Header nav** may remain on `src/constants/industries.ts` until a dedicated sync chore.
3. Prefer **one catalog** long-term; avoid drift between nav constants and feature content.

---

## 6. Industry slug structure

### Canonical list (12)

| Label         | Slug               | Notes                                                |
| ------------- | ------------------ | ---------------------------------------------------- |
| Healthcare    | `healthcare`       | Aligns with nav                                      |
| Education     | `education`        | Aligns with nav                                      |
| Retail        | `retail-ecommerce` | Keep existing SEO slug                               |
| Manufacturing | `manufacturing`    | Aligns with nav                                      |
| Finance       | `fintech`          | Keep existing SEO slug                               |
| Real Estate   | `real-estate`      | Aligns with nav                                      |
| Logistics     | `logistics`        | Aligns with nav                                      |
| Hospitality   | `hospitality`      | Feature-owned (may be absent from old nav constants) |
| Travel        | `travel`           | Aligns with nav                                      |
| Government    | `government`       | Feature-owned                                        |
| Startups      | `startups`         | Aligns with nav                                      |
| SaaS          | `saas`             | Feature-owned                                        |

### URL patterns

```
/industries
/industries/{slug}
```

### Static generation

- `generateStaticParams()` → map `INDUSTRIES_CATALOG` slugs.
- Unknown slug → `notFound()`.

### Detail page minimum content

- Breadcrumbs: Home → Industries → {Label}
- Title, description
- Pain points + solutions
- Illustration
- Primary CTA (consultation) + back to grid

_(Later epic: expand slug pages with process, case studies, related solutions — out of landing MVP unless scoped.)_

---

## 7. SEO plan

### Listing `/industries`

| Element     | Spec                                                             |
| ----------- | ---------------------------------------------------------------- |
| Title       | `Industries` (template → `Industries \| Bitcraftly`)             |
| Description | Domain + verticals + measurable delivery                         |
| Canonical   | `/industries`                                                    |
| Keywords    | industry software, verticals Bitcraftly serves                   |
| OG/Twitter  | via `createPageMetadata` (upgrade to 1200×630 industry OG later) |

### JSON-LD (listing)

`@graph` including:

1. `CollectionPage` — listing identity
2. `ItemList` — each industry URL
3. `FAQPage` — landing FAQ entities

### Slug pages

| Element     | Spec                         |
| ----------- | ---------------------------- |
| Title       | `{Label} Industry Solutions` |
| Description | Industry `description`       |
| Canonical   | `/industries/{slug}`         |
| Keywords    | label + industry software    |

### Internal linking

- Cards → slug pages
- Solutions / Related Services → `/services/*`, `/solutions/*`
- Case studies → `/work`, `/case-studies`
- Hero secondary → `#industries-grid`

### Robots / sitemap (platform-level, not Industries-only)

Ensure `/industries` and all catalog slugs are included when `sitemap.ts` is added.

---

## 8. Reusable components

### Page-owned (Industries feature)

| Component                 | Reuse scope                                            | Notes                                                             |
| ------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- |
| `IndustryCard`            | Listing featured + grid (+ optional related elsewhere) | Required fields: illustration, description, pains, solutions, CTA |
| `IndustryIllustration`    | Cards + slug header                                    | Swap to rasters later without API break                           |
| `IndustriesNetworkVisual` | Hero only                                              | Unique; do not share with Services/Solutions                      |
| `IndustriesHero`          | Landing only                                           | Unique layout; no `MarketingIllustratedHero`                      |
| Section modules           | Landing composition                                    | Thin wrappers around content arrays                               |

### Shared (import only — do not edit in Sprint 4)

| Component                             | Use                |
| ------------------------------------- | ------------------ |
| `PageShell` / `Section` / `Container` | Rhythm & width     |
| `Icon` / `IconBox`                    | Glyphs             |
| `MarketingBreadcrumbs`                | Hero + detail      |
| `FaqAccordion`                        | FAQ section        |
| `MarketingFinalCtaBand`               | Final CTA          |
| `JsonLdScript`                        | Schema injection   |
| `createPageMetadata`                  | App route metadata |

### Explicitly forbidden reuse for hero

- `HeroSection` (Homepage)
- `ServicesHero` / `SolutionsHero`
- Full shared `MarketingIllustratedHero` as the Industries landing hero identity

---

## 9. Image requirements

### Phase A (MVP — ship without blocking on art)

| Asset                       | Spec                                           |
| --------------------------- | ---------------------------------------------- |
| Network hero                | CSS + SVG + icon nodes (no raster required)    |
| Industry illustration wells | Icon-based presets via `illustration` key      |
| OG default                  | Platform brand icon until dedicated art exists |

### Phase B (production polish)

| Asset                      | Path suggestion                | Spec                       |
| -------------------------- | ------------------------------ | -------------------------- |
| Industries OG              | `/og/industries.png`           | 1200×630                   |
| Per-vertical optional hero | `/industries/{slug}-hero.webp` | ~1600px wide, WebP, ≤200KB |
| Case study thumbs          | `/industries/cases/{id}.webp`  | 800×600 crop               |

### Rules

- Prefer `next/image` when rasters are introduced.
- Keep decoration `aria-hidden`; meaningful images need alt text.
- Do not bind page shipping to photography that does not exist yet.

---

## 10. CTA strategy

### Hierarchy

| Placement        | Primary                         | Secondary                              | Intent                  |
| ---------------- | ------------------------------- | -------------------------------------- | ----------------------- |
| Hero             | Free consultation               | Browse industries (`#industries-grid`) | Convert or explore      |
| Industry card    | Explore {Industry} → slug       | —                                      | Education               |
| Solution offers  | Learn more → Services/Solutions | —                                      | Cross-sell capabilities |
| Case studies     | Open Work / Case Studies        | —                                      | Proof                   |
| Related services | Service detail                  | —                                      | Capability depth        |
| Final CTA        | Free consultation               | Explore services (+ WhatsApp via band) | Close                   |

### Copy principles

- Industry language (“how your vertical runs”) over generic “we build websites”.
- Always offer a **non-sales** exploratory path (grid / services) beside consultation.
- Trust chips near primary CTA (response time, written next steps, no obligation).

### Tracking (future)

- UTM / `?source=industries` on consultation links (optional, consistent with other landings).

---

## 11. Responsive plan

| Breakpoint         | Behavior                                                            |
| ------------------ | ------------------------------------------------------------------- |
| Mobile (&lt;640)   | Single column; hide overflow network nodes; stack CTAs; 1-col grids |
| Tablet (640–1023)  | 2-col featured / challenges / cards; network simplifies             |
| Laptop (1024–1279) | 2-col hero; 3-col industry grid; 4-col process where space allows   |
| Desktop (≥1280)    | Featured 4-up; full network; metrics 4-up                           |

Touch targets ≥44px on CTAs; sticky site header clearance respected via page shell spacing.

---

## 12. Accessibility plan

- One `h1` in hero; section `h2`s with `aria-labelledby`.
- Skip link + `#main-content` from marketing layout.
- Focus-visible rings on cards, offers, CTAs.
- Decorative network / illustrations: `aria-hidden`.
- FAQ: shared accordion keyboard behavior (arrows / Home / End / Escape).
- `prefers-reduced-motion`: disable network float and card lift.

---

## 13. Styling ownership

- All Industries-specific CSS in `features/industries/industries.css`.
- Classes prefixed `industries-` to avoid collisions with `services-*` / homepage CSS.
- Accent via `industries-accent--{token}` on cards.
- Use design tokens (`--primary`, `--space-*`, `--token-radius-*`, `--token-shadow-*`); avoid one-off purple marketing themes.

---

## 14. Implementation sequence (when coding)

1. Types + content catalog (12 industries)
2. `industries.css` + `IndustryIllustration` / `IndustryCard`
3. `IndustriesNetworkVisual` + `IndustriesHero`
4. Remaining sections + `IndustriesLandingPage`
5. App `page.tsx` metadata + JSON-LD
6. Slug page + `generateStaticParams`
7. Responsive / a11y pass
8. Typecheck + lint on feature + routes only

### Acceptance checklist

- [ ] All 13 sections present in locked order
- [ ] Unique network hero (no frozen / illustrated-hero shell)
- [ ] 12 industry cards with illustration, description, pains, solutions, CTA
- [ ] SEO metadata + JSON-LD on listing; slug metadata
- [ ] Mobile / tablet / desktop usable
- [ ] Frozen pages unchanged; shared components unmodified

---

## 15. Out of scope (later)

- Updating `src/constants/industries.ts` nav groups to match all 12 landing slugs
- CMS/backend-driven industry content
- Full case-study CMS integration
- Dedicated OG image pipeline
- Auth / dashboard industry modules

---

## Related docs

- [Architecture README](./README.md)
- [Engineering coding standards](../engineering/coding-standards.md)
- [Design token guide](../design/DESIGN_TOKEN_GUIDE.md)
- Bitcraftly Architecture Protection Rules (`.cursor/rules`) — frozen Homepage / Services / Solutions
