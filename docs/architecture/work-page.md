# Work / Portfolio — Architecture & Design Blueprint (Sprint 5)

**Surface:** `/work`  
**Feature:** `src/features/work/`  
**Status:** Architecture & design blueprint — **awaiting approval · no feature code yet**  
**Product companion:** [work-portfolio-spec.md](../product/work-portfolio-spec.md)  
**Identity thesis:** _Real Products. Real Engineering. Real Business Impact._

---

## Isolation (non-negotiable)

| Frozen (read-only)                     | Rule                        |
| -------------------------------------- | --------------------------- |
| Homepage                               | Do not modify               |
| Services                               | Do not modify               |
| Solutions                              | Do not modify               |
| Industries                             | Do not modify               |
| Shared components used by frozen pages | **READ ONLY** — import only |

**Allowed later (implementation):** `src/features/work/**`, `src/app/(marketing)/work/**`  
Optional thin: `src/constants/work.ts`, `src/lib/seo/breadcrumbs.ts` — only if Work needs nav/SEO helpers **without** changing frozen page UX.

**Do not** copy Homepage / Services / Solutions / Industries layout or heroes. Work must feel closer to Stripe / Linear / Framer / Vercel Enterprise / Awwwards-level craft — not a dashboard clone, not a CRM shell, not an industry network node map.

---

# 1. Architecture document summary

| Pillar    | Decision                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Pattern   | Thin App Router pages + thick `features/work` module (same as Industries/Services)   |
| Hero      | **Page-owned** showcase composition (laptop / mobile / browser / floating cards)     |
| Portfolio | Content-driven catalog + client filter island                                        |
| Detail    | `/work/projects/[slug]` primary SEO URL                                              |
| Design    | Large whitespace, glass cards, soft gradients, premium shadows, token colors only    |
| Content   | No lorem; testimonials may use **explicit empty/placeholder state** (no fake quotes) |

---

# 2. Folder structure

```
src/app/(marketing)/work/
├── page.tsx                            # Landing metadata → WorkLandingPage
├── [slug]/page.tsx                     # Category / hub pages
├── projects/[slug]/page.tsx             # Project detail
├── case-studies/[slug]/page.tsx         # Optional deep narrative
└── testimonials/[slug]/page.tsx        # Optional individual testimonial

src/features/work/
├── index.ts
├── WorkLandingPage.tsx
├── WorkHero.tsx                        # PAGE-OWNED
├── WorkHeroVisual.tsx                  # PAGE-OWNED showcase
├── WorkSections.tsx                    # Sections 3–12 exports
├── WorkPageCta.tsx
├── WorkFeaturedProjectCard.tsx         # Large showcase card
├── WorkProjectCard.tsx                 # Grid card
├── WorkPortfolioFilters.tsx            # Client
├── WorkPortfolioGrid.tsx               # Client
├── WorkTestimonialCard.tsx             # Reusable (+ empty state)
├── WorkProjectDetailPage.tsx
├── WorkHubPage.tsx
├── work.content.ts
├── work.types.ts
├── work.filters.ts
├── work-schema.tsx
└── work.css

public/work/
├── hero/                               # Hero collage assets
└── projects/{slug}/                    # card.webp, hero.webp, gallery-*

docs/architecture/work-page.md          # This blueprint
docs/product/work-portfolio-spec.md     # Product contracts
```

---

# 3. Components

## Landing hierarchy

```
WorkLandingPage
├── JsonLdScript
├── WorkHero
│   ├── MarketingBreadcrumbs
│   ├── Left: eyebrow · H1 · description · CTAs · metrics · tech chips
│   └── WorkHeroVisual (right showcase)
├── WorkFeaturedSection          → WorkFeaturedProjectCard[]
├── WorkCategoriesSection        → category tiles → hubs / filter presets
├── WorkPortfolioSection (#work-portfolio)
│   ├── WorkPortfolioFilters
│   └── WorkPortfolioGrid → WorkProjectCard[]
├── WorkResultsSection           → KPI cards
├── WorkTechExpertiseSection     → grouped stacks
├── WorkProcessSection           → timeline steps
├── WorkTestimonialsSection      → WorkTestimonialCard[] | EmptyState
├── WorkFaqSection               → FaqAccordion
├── WorkRelatedServicesSection
└── WorkPageCta                  → MarketingFinalCtaBand
```

## Phase → component map

| Phase          | Component(s)                                                   |
| -------------- | -------------------------------------------------------------- |
| 2 Hero         | `WorkHero`, `WorkHeroVisual`                                   |
| 3 Featured     | `WorkFeaturedSection`, `WorkFeaturedProjectCard`               |
| 4 Categories   | `WorkCategoriesSection`                                        |
| 5 Grid         | `WorkPortfolioFilters`, `WorkPortfolioGrid`, `WorkProjectCard` |
| 6 Results      | `WorkResultsSection`                                           |
| 7 Tech         | `WorkTechExpertiseSection`                                     |
| 8 Process      | `WorkProcessSection`                                           |
| 9 Testimonials | `WorkTestimonialsSection`, `WorkTestimonialCard`               |
| 10 FAQ         | `WorkFaqSection` + shared accordion                            |
| 11 Related     | `WorkRelatedServicesSection`                                   |
| 12 Final CTA   | `WorkPageCta`                                                  |

## Shared (read-only)

`PageShell`, `Section`, `Container`, `Icon`, `MarketingBreadcrumbs`, `FaqAccordion`, `MarketingFinalCtaBand`, `JsonLdScript`, `createPageMetadata`, tokens.

## Forbidden

Any frozen-page hero or Homepage `Portfolio/**` UI. No dashboard / CRM / network motif as Work identity.

---

# 4. Data model

```ts
type WorkAccent = 'teal' | 'indigo' | 'amber' | 'rose' | 'sky' | 'emerald';

/** Portfolio category taxonomy (Phase 4) */
type WorkCategoryId =
  | 'web-applications'
  | 'enterprise-software'
  | 'crm'
  | 'erp'
  | 'ai-automation'
  | 'saas'
  | 'mobile-apps'
  | 'dashboards'
  | 'cloud';

type WorkFilterId = 'all' | 'featured' | WorkCategoryId | string; // industry slug when needed

interface WorkMetric {
  id: string;
  value: string;
  label: string;
}

interface WorkProject {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  industry: string;
  industrySlug?: string;
  businessGoal: string;
  services: readonly string[];
  techStack: readonly string[];
  categories: readonly WorkCategoryId[];
  filterIds: readonly WorkFilterId[];
  duration: string; // e.g. "8–12 weeks"
  timeline?: string; // featured-card alias / richer label
  result: string; // outcome line
  outcome: string; // longer outcome for detail
  problem: string;
  solution: string;
  metrics: readonly WorkMetric[];
  featured?: boolean;
  year?: number;
  accent: WorkAccent;
  gallery?: readonly string[];
  caseStudySlug?: string;
  testimonialId?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface WorkCategory {
  id: WorkCategoryId;
  label: string;
  description: string;
  href: string; // /work/{slug} or #work-portfolio with preset
  icon: string; // IconName
}

interface WorkResultKpi {
  id: string;
  value: string;
  label: string;
  hint?: string;
  icon: string;
  tone: 'primary' | 'accent' | 'emerald' | 'amber' | 'sky';
}

interface WorkProcessStep {
  id: string;
  title: string; // Discovery … Support
  description: string;
  icon: string;
}

interface WorkTechGroup {
  id: string;
  category: 'Frontend' | 'Backend' | 'Cloud' | 'AI' | 'Automation' | 'Database' | 'DevOps';
  icon: string;
  items: readonly string[];
}

interface WorkTestimonial {
  id: string;
  quote: string;
  attribution: string;
  role: string;
  industry?: string;
  projectSlug?: string;
  approved: boolean; // false → do not render as real quote
}

interface WorkFaqItem {
  id: string;
  question: string;
  answer: string;
}

interface WorkRelatedService {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}
```

### Project schema (minimum ship fields)

`slug`, `title`, `summary`, `coverImage`, `industry`, `businessGoal`, `services`, `techStack`, `categories`, `duration`, `result`, `outcome`, `problem`, `solution`, `metrics`, `accent`.

---

# 5. Implementation plan (post-approval)

### Design identity (locks)

- Theme line: **Real Products. Real Engineering. Real Business Impact.**
- Visual system: glass cards, soft gradients, premium shadows, large whitespace, modern type hierarchy, minimal noise.
- Hero right: **portfolio showcase** — laptop mockup, mobile frame, browser windows, analytics overlays, floating project cards, performance metrics, success badges. **Not** dashboard / CRM / network.

### Phase execution order

1. Scaffold types + content + empty shells (no frozen edits)
2. Hero (left + showcase visual)
3. Featured showcase cards
4. Category tiles
5. Filterable grid + cards
6. KPI results
7. Tech groups
8. Process timeline
9. Testimonials (real or empty state)
10. FAQ
11. Related services
12. Final CTA
13. Project detail + hubs + JSON-LD
14. QA gates

### SEO structure

- Landing / hub / project `createPageMetadata`
- `buildWorkBreadcrumbs`
- SSG params; `notFound()` for unknown slugs
- Reserved segments: `projects`, `case-studies`, `testimonials`

### JSON-LD

- Listing: `CollectionPage` + `ItemList` + `BreadcrumbList`
- Hub: filtered `ItemList`
- Project: `CreativeWork` (default convention) + breadcrumbs
- Case study (if used): `Article`

### Accessibility plan

- One `h1`; decorative showcase `aria-hidden`
- Filters: named group + `aria-pressed`
- Live result count optional
- Focus visible; reduced motion; token contrast
- Testimonial empty state announced clearly (not fake content)

---

# 6. Files to create (implementation wave)

| Path                                            | Purpose                                       |
| ----------------------------------------------- | --------------------------------------------- |
| `src/features/work/WorkHero.tsx`                | Page-owned hero                               |
| `src/features/work/WorkHeroVisual.tsx`          | Showcase composition (replace stub if needed) |
| `src/features/work/WorkSections.tsx`            | Phases 3–11                                   |
| `src/features/work/WorkFeaturedProjectCard.tsx` | Large featured card                           |
| `src/features/work/WorkProjectCard.tsx`         | Grid card                                     |
| `src/features/work/WorkPortfolioFilters.tsx`    | Filters                                       |
| `src/features/work/WorkPortfolioGrid.tsx`       | Grid                                          |
| `src/features/work/WorkTestimonialCard.tsx`     | Testimonial + empty                           |
| `src/features/work/WorkProjectDetailPage.tsx`   | Detail                                        |
| `src/features/work/WorkHubPage.tsx`             | Hubs                                          |
| `src/features/work/WorkPageCta.tsx`             | Final CTA wrapper                             |
| `src/features/work/WorkLandingPage.tsx`         | Recompose landing                             |
| `src/features/work/work.types.ts`               | Models                                        |
| `src/features/work/work.content.ts`             | Content                                       |
| `src/features/work/work.filters.ts`             | Predicates                                    |
| `src/features/work/work-schema.tsx`             | JSON-LD                                       |
| `src/features/work/work.css`                    | Page-owned styles                             |
| `src/features/work/index.ts`                    | Barrel updates                                |
| App pages under `work/**`                       | Wire metadata / params / notFound             |
| `public/work/**`                                | Images                                        |

Existing stub files (`WorkLandingPage`, `WorkHeroVisual`, app routes) will be **rewritten in place** within allowed paths — not copied from frozen pages.

---

# 7. Files that will remain untouched

**Entire frozen surfaces (examples, not exhaustive):**

- `src/features/homepage/**`
- `src/features/services/**`
- `src/features/solutions/**`
- `src/features/industries/**`
- `src/app/(marketing)/page.tsx` and other frozen marketing pages owned by those features
- Shared pattern **implementations** (FaqAccordion, MarketingFinalCtaBand, etc.) unless a future approved shared bugfix — default: **no edits**

**Also untouched by default:**

- Homepage public heroes / service / solution / industries hero assets used as those pages’ identity

---

# 8. Risk analysis

| Risk                                            | Impact       | Mitigation                                                                                       |
| ----------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| Accidental frozen-page edits                    | High         | Strict path allowlist; diff review before merge                                                  |
| Visual mimic of Industries/Services             | Medium       | Hero showcase brief + design review checkpoint                                                   |
| Fake testimonials                               | High / trust | `approved` flag + empty state UI; no invented quotes                                             |
| Nav taxonomy vs new categories                  | Medium       | Map Phase-4 categories in content; sync `constants/work.ts` carefully without breaking mega-menu |
| Image CLS / heavy DOM in hero                   | Medium       | Fixed aspect frames; prioritized LCP image; lazy gallery; mockup CSS over video                  |
| Filter hydration mismatch                       | Medium       | Server-render grid HTML for default All; client enhance chips                                    |
| Soft-404 hubs                                   | SEO          | Ship only hubs with content or intentional empty + CTA                                           |
| Scope creep (case studies + testimonials depth) | Schedule     | Landing + grid + featured + detail first; deepen case studies in follow sprint                   |

---

# 9. Sprint breakdown

### Sprint 5A — Foundation (post-approval)

- Types, content skeleton, CSS tokens/shell
- Landing composition stubs
- Architecture gate: frozen paths clean

### Sprint 5B — Hero + Featured

- Unique hero left + showcase right
- Featured large cards (image, industry, goal, tech, timeline, result, CTA)

### Sprint 5C — Categories + Grid

- Category tiles (9 categories)
- Filters + reusable project cards
- Responsive polish

### Sprint 5D — Proof bands

- KPI results
- Tech expertise groups
- Delivery process timeline

### Sprint 5E — Trust + convert

- Testimonials (real or empty)
- FAQ
- Related services
- Final CTA

### Sprint 5F — Detail + SEO + QA

- Project detail template
- Hub pages + JSON-LD
- `lint` / `typecheck` / `build`
- A11y + responsive pass

### Quality gate (every sub-sprint exit)

```
npm run lint
npm run typecheck
npm run build
```

---

## Landing section order (locked)

1. Hero
2. Featured Projects
3. Portfolio Categories
4. Portfolio Grid (+ filters)
5. Business Results
6. Technology Expertise
7. Delivery Process
8. Testimonials
9. FAQs
10. Related Services
11. Final CTA

---

## Portfolio categories (Phase 4 — locked for filters/tiles)

1. Web Applications
2. Enterprise Software
3. CRM
4. ERP
5. AI Automation
6. SaaS
7. Mobile Apps
8. Dashboards
9. Cloud

---

## Featured / grid card fields

| Surface   | Fields                                                                        |
| --------- | ----------------------------------------------------------------------------- |
| Featured  | Cover image · Industry · Business goal · Technology · Timeline · Result · CTA |
| Grid card | Cover image · Industry · Services · Tech stack · Duration · Outcome · CTA     |

---

## Business Results KPIs (examples)

- Projects Delivered
- Client Satisfaction
- Performance Gains
- Revenue Growth
- Automation Hours Saved

---

## Delivery Process steps

Discovery → Design → Development → QA → Launch → Support

---

## Technology groups

Frontend · Backend · Cloud · AI · Automation · Database · DevOps

---

## Design rules (implementation must obey)

- Large whitespace
- Premium shadows
- Glass cards
- Soft gradients
- Modern typography
- Minimal visual noise
- High readability
- Token-only color/spacing

## Responsive

Desktop · Laptop · Tablet · Mobile — verified before merge.

## Performance

`next/image` · no CLS · lazy non-LCP images · minimal hero DOM · no autoplay video in v1.

---

## Approval gate

**Do not implement feature code until this blueprint is approved.**

After approval, implementation stays inside:

- `src/features/work/**`
- `src/app/(marketing)/work/**`

and must leave Homepage, Services, Solutions, and Industries untouched.
