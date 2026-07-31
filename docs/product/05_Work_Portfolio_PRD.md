# Work / Portfolio — Product Specification

**Surface:** `/work` (+ hubs, filters, project detail)  
**Feature module:** `src/features/work/`  
**Status:** Product specification (architecture companion; implementation follows separately)  
**Isolation:** Do not modify Homepage, Services, Solutions, or Industries. Work owns a page-specific hero.

Related:

- Architecture: [work-page.md](../architecture/work-page.md)
- Nav catalog: `src/constants/work.ts`
- Design tokens: Bitcraftly Design System

---

## 1. Goals

### Business goals

- Prove Bitcraftly delivery with **real outcomes**, not pitch decks.
- Help buyers browse work by **industry**, **project type**, and **engagement shape**.
- Drive consultation CTAs from high-intent portfolio moments.
- Support SEO for project and hub URLs.

### Product goals

- Production-quality Work landing distinct from Homepage / Services / Solutions / Industries.
- Filterable portfolio grid with reusable project cards.
- Project detail template with problem → solution → outcome narrative.
- No lorem ipsum; no empty “coming soon” hubs in the ship set.

### Non-goals (this surface)

- Reusing Homepage `Portfolio` section UI or hero.
- Reusing Services / Solutions / Industries heroes.
- Full CMS-backed media pipeline (static feature content first).

---

## 2. Hero

### Intent

Introduce Bitcraftly as an engineering partner that ships measurable work — **portfolio identity**, not a product cube / services catalog / industry network clone.

### Ownership

- **Page-owned** `WorkHero` + `WorkHeroVisual` only.
- Do **not** use `MarketingIllustratedHero`, Homepage Hero, Services / Solutions / Industries heroes.

### Content blocks (required)

| Element       | Guidance                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------- |
| Breadcrumbs   | Home → Work                                                                                   |
| Eyebrow       | e.g. “Work” / “Portfolio”                                                                     |
| H1            | Outcome-led, brand-safe (e.g. domain delivery / measurable systems)                           |
| Lead          | 1–2 sentences: what we ship + for whom + proof posture                                        |
| Primary CTA   | Free consultation (`NAV_ACTIONS.freeConsultation`)                                            |
| Secondary CTA | Browse portfolio → `#work-portfolio` or Featured section                                      |
| Trust strip   | 3 short proof lines (response time, verticals shipped, founder-led QA) — no false brand logos |

### Visual

- Unique Work illustration / composition (browser frames, delivery artifacts, or outcome panels).
- Responsive: stack on mobile; split on desktop.
- Decorative layers `aria-hidden`; single page `h1`.

### Spacing

- Match non-homepage marketing rhythm (`.page-shell` / equal top–bottom) — **do not invent a third padding system**.

### Acceptance

- [ ] Distinct from other marketing heroes at a glance
- [ ] Keyboard-accessible CTAs + visible focus
- [ ] No shared-hero dependency

---

## 3. Portfolio Categories

Categories align with **nav** (`WORK_GROUPS`) and **content filters**.

### Type categories (delivery shape) — Sprint 5 taxonomy

| Category            | Category id           | Hub / filter                                        |
| ------------------- | --------------------- | --------------------------------------------------- |
| Web Applications    | `web-applications`    | `/work/web-applications`                            |
| Enterprise Software | `enterprise-software` | `/work/enterprise-software` (or enterprise hub map) |
| CRM                 | `crm`                 | `/work/crm`                                         |
| ERP                 | `erp`                 | `/work/erp`                                         |
| AI Automation       | `ai-automation`       | `/work/ai-automation`                               |
| SaaS                | `saas`                | `/work/saas`                                        |
| Mobile Apps         | `mobile-apps`         | `/work/mobile-apps`                                 |
| Dashboards          | `dashboards`          | `/work/dashboards`                                  |
| Cloud               | `cloud`               | `/work/cloud`                                       |

> Nav mega-menu (`WORK_GROUPS`) may lag this taxonomy; architecture maps nav items ↔ categories carefully without editing frozen pages.

### Featured / engagement hubs

| Hub               | Path                      | Preset                  |
| ----------------- | ------------------------- | ----------------------- |
| Featured projects | `/work/featured-projects` | `featured`              |
| Latest work       | `/work/latest`            | recency / `latest`      |
| Enterprise        | `/work/enterprise`        | `enterprise`            |
| Portfolio index   | `/work/portfolio`         | `all` (or default grid) |

### Industry case hubs (narrative grouping)

Healthcare, Education, FinTech, Retail, Logistics — hubs under `/work/{industry-slug}` that filter projects by industry (and may link to `/industries/{slug}`).

### Results hubs

Success stories, Testimonials, Business outcomes — proof-oriented, not the primary filter grid.

### Rules

- Every hub in the ship set has **real copy + at least one project** (or an intentional empty state with CTA).
- Reserved path segments never used as category slugs: `projects`, `case-studies`, `testimonials`.

---

## 4. Featured Projects

### Placement

Landing section **immediately after Hero** (before or adjacent to the full filterable gallery — prefer Featured rail, then full Portfolio Gallery with filters).

### Selection criteria

A project may be featured when it has:

- Clear **problem → solution → measurable outcome**
- Strong vertical signal (regulated, peak-load, or multi-role ops)
- At least one **metric** suitable for card + KPI panel

### Presentation

- 3–4 cards max on desktop rail (equal height).
- Same `WorkProjectCard` component as the gallery (consistency).
- Badge: “Featured” optional; priority accents allowed via `accent` / `featured`.

### CTA

- Card primary: “View project” → `/work/projects/{slug}`
- Section tertiary: “Browse all work” → `#work-portfolio`

### Acceptance

- [ ] Featured set is editorial (content flag), not random
- [ ] Equal card heights; no layout shift on load

---

## 5. Project Card Design

### Anatomy (fixed layout — polish only later)

```
┌─────────────────────────────────────┐
│ [Accent media / glyph well]         │
│ Title                               │
│ Client type · Industry              │
│ Summary (2–3 lines clamp)           │
│ Tech tags (max 3–4)                 │
│ • Outcome highlight (1–2)         │
│ [Primary CTA]  [Secondary optional] │
└─────────────────────────────────────┘
```

### Required fields on card

- Title
- Client type (not invented Fortune logos unless approved)
- Industry label
- Short summary
- 1 primary metric **or** 1–2 outcome bullets
- Tech tags (subset)
- Primary CTA → project detail

### Visual rules

- Design tokens only (no hardcoded one-off brand colors).
- Consistent icon box size, radius (`token-radius-xl`), soft shadow, hover lift with `prefers-reduced-motion` fallback.
- Equal heights in grid; CTA row pinned to bottom (`margin-top: auto`).

### Interaction

- Whole-card clickable **or** title + CTA as links (pick one pattern and keep it).
- Focus ring on interactive elements; decorative icons `aria-hidden`.

### Do not

- Dense dual pain/solution columns on the card (save depth for detail).
- Autoplaying video on cards.

---

## 6. Filters

### UX

- Chip group above the gallery (`id="work-portfolio"`).
- Default: **All**.
- Chips: All · Featured · Websites · Web apps · Mobile · AI · Enterprise · (+ optional industry chips if density allows; otherwise industry via hubs).

### Behavior

- Client island (`WorkPortfolioFilters` + `WorkPortfolioGrid`).
- `aria-pressed` on active chip; `role="group"` + accessible name.
- Result count announced politely (`aria-live="polite"`).
- Empty state: short message + “Talk to us” CTA + reset to All.
- Hub pages open with a **preset filter** already applied (URL may use path, not query, for SEO hubs).

### Logic (pure helpers)

- Predicates from `filterIds` / `projectType` / `featured` / `enterprise` on `WorkProject`.
- No content mutation; filtering is display-only.

### Acceptance

- [ ] Keyboard operable chips
- [ ] No hydration mismatch
- [ ] Hub presets match filter results

---

## 7. Project Detail Template

**URL:** `/work/projects/{slug}`

### Section order (locked unless product revises)

| #   | Block              | Purpose                                                |
| --- | ------------------ | ------------------------------------------------------ |
| 1   | Detail hero        | Title, industry badge, client type, primary CTA        |
| 2   | Snapshot metrics   | 2–4 KPI tiles from `metrics`                           |
| 3   | Problem            | Operator / business friction                           |
| 4   | Solution           | What Bitcraftly built / approach                       |
| 5   | Outcome            | Business result narrative                              |
| 6   | Scope strip        | Services used · tech stack · delivery model / timeline |
| 7   | Gallery (optional) | Static images only if assets exist                     |
| 8   | Related            | Sibling projects + related services / industry links   |
| 9   | CTA                | Consultation band                                      |

### Optional deepenings

- Link to `/work/case-studies/{slug}` when `caseStudySlug` is set (longer narrative / quote).
- Testimonial pull-quote when `testimonialId` is set.

### CTA hierarchy on detail

1. Free consultation
2. Browse more work (`/work#work-portfolio` or hub)
3. Related service deeplink

### Acceptance

- [ ] SSG via `generateStaticParams`
- [ ] `notFound()` for unknown slug
- [ ] Breadcrumbs: Home → Work → [Hub optional] → Project

---

## 8. SEO

### Landing `/work`

- Title / description via `createPageMetadata`
- JSON-LD: `CollectionPage` + `ItemList` (featured or full catalog) + `BreadcrumbList`

### Hubs `/work/{slug}`

- Unique title/description per hub content record
- JSON-LD: filtered `CollectionPage` / `ItemList`

### Project `/work/projects/{slug}`

- Title: `{project.title} | Work` (or outcome-led variant)
- Description: outcome-first summary (≤ ~155 chars ideal)
- JSON-LD: `CreativeWork` **or** `SoftwareApplication` (choose one convention and stick to it) + breadcrumbs
- Canonical = project URL

### Rules

- No duplicate titles across hubs.
- No soft-404 placeholder pages in production params.
- Sitemap includes all static work URLs after content is real.

### Breadcrumbs helper

Extend `buildWorkBreadcrumbs` for hub + project depth.

---

## 9. Data Model

Conceptual TypeScript models (implement in `work.types.ts` + `work.content.ts`):

```ts
type WorkAccent = 'teal' | 'indigo' | 'amber' | 'rose' | 'sky' | 'emerald';

type WorkProjectType = 'website' | 'web-app' | 'mobile' | 'ai' | 'platform' | 'ops';

type WorkFilterId =
  'all' | 'featured' | 'website' | 'web-app' | 'mobile' | 'ai' | 'enterprise' | 'latest' | string; // industry slug when used as filter

interface WorkMetric {
  id: string;
  value: string;
  label: string;
}

interface WorkProject {
  slug: string;
  title: string;
  summary: string;
  clientType: string;
  industry: string;
  industrySlug?: string;
  projectType: WorkProjectType;
  filterIds: readonly WorkFilterId[];
  services: readonly string[];
  techStack: readonly string[];
  problem: string;
  solution: string;
  outcome: string;
  metrics: readonly WorkMetric[];
  featured?: boolean;
  enterprise?: boolean;
  year?: number;
  accent: WorkAccent;
  heroImage?: string;
  gallery?: readonly string[];
  caseStudySlug?: string;
  testimonialId?: string;
}

interface WorkCaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  challenge: string;
  approach: string;
  results: string;
  metrics: readonly WorkMetric[];
  quote?: { text: string; attribution: string; role: string };
}

interface WorkHubContent {
  slug: string;
  title: string;
  description: string;
  filterPreset: WorkFilterId;
  seoTitle: string;
  seoDescription: string;
}

interface WorkFaqItem {
  id: string;
  question: string;
  answer: string;
}
```

### Content ownership

| Layer                            | Location                            |
| -------------------------------- | ----------------------------------- |
| Nav labels / mega-menu           | `src/constants/work.ts`             |
| Portfolio catalog + landing copy | `src/features/work/work.content.ts` |
| Types                            | `src/features/work/work.types.ts`   |
| JSON-LD                          | `src/features/work/work-schema.tsx` |

### Helpers

- `getWorkProjectBySlug`
- `getWorkProjectsByFilter`
- `getWorkProjectHref(slug)` → `/work/projects/{slug}`
- `getWorkHubContent(slug)`

---

## 10. CTA Strategy

### Principles

- Primary conversion is **consultation**, not “contact us” vagueness.
- Secondary paths keep explorers in the Work funnel (portfolio / hubs).
- Tertiary paths hand off to Services / Industries when relevance is clear.

### Placement map

| Surface          | Primary                 | Secondary              | Tertiary                                                          |
| ---------------- | ----------------------- | ---------------------- | ----------------------------------------------------------------- |
| Hero             | Free consultation       | Browse portfolio       | —                                                                 |
| Featured section | View project (per card) | Browse all work        | —                                                                 |
| Portfolio card   | View project            | Talk to us (optional)  | —                                                                 |
| Project detail   | Free consultation       | More work              | Related service                                                   |
| Hub page         | Free consultation       | View matching projects | Related industry                                                  |
| Final CTA band   | Free consultation       | Explore services       | Trust: &lt;24h response · milestone delivery · written next steps |

### Trust messaging (Final CTA)

Align with Industries/Services production tone:

- Response within 24 hours
- Milestone delivery model
- Free consultation · written next steps

### Measurement (product)

- CTA clicks by placement (hero / card / detail / final)
- Filter → project detail open rate
- Detail → consultation rate

---

## 11. Landing section order (recommended)

| #   | Section                     | Notes                         |
| --- | --------------------------- | ----------------------------- |
| 1   | Hero                        | Page-owned                    |
| 2   | Featured Projects           | Editorial rail                |
| 3   | Portfolio Gallery + Filters | `id="work-portfolio"`         |
| 4   | Outcomes / metrics band     | Aggregate proof               |
| 5   | Industries served           | Links to hubs / `/industries` |
| 6   | Technologies used           | Stack chips / groups          |
| 7   | Testimonials                | Short quotes                  |
| 8   | FAQ                         | Accordion                     |
| 9   | Related services            | Cross-sell                    |
| 10  | Final CTA                   | Consultation band             |

Exact section count may flex at implementation, but **Hero → Featured → Filtered Portfolio** order is locked.

---

## 12. Accessibility & responsive (product bar)

- Desktop / tablet / mobile: no horizontal overflow; filter chips wrap.
- Focus visible on all interactive controls.
- Reduced motion: disable card lift / non-essential motion.
- Color: token contrast only.

---

## 13. Acceptance criteria (surface-ready)

- [ ] Spec sections 2–10 reflected in feature implementation plan
- [ ] Page-owned Work hero only
- [ ] Filters + project detail + hub presets work
- [ ] SEO metadata + JSON-LD on listing, hub, project
- [ ] No lorem; no frozen-page edits
- [ ] `lint` / `typecheck` / `build` pass at ship

---

## 14. Open decisions

| Topic                       | Options                                           | Owner           |
| --------------------------- | ------------------------------------------------- | --------------- |
| `/case-studies` alias       | Redirect → `/work/case-studies` vs keep thin page | Product         |
| Industry chips on landing   | In-grid chips vs hubs-only                        | Product         |
| JSON-LD type for projects   | `CreativeWork` vs `SoftwareApplication`           | Eng + SEO       |
| Public brand names on cards | Allowed list vs client-type only                  | Product / Legal |
