# Bitcraftly SEO Audit

Date: 22 August 2026  
Branch: `feature/seo-indexability`  
Scope: Production marketing site at `NEXT_PUBLIC_SITE_URL` (canonical host `https://bitcraftly.com`)  
Method: Code inspection of App Router routes, metadata helpers, sitemap/robots, JSON-LD, images, headings, and internal linking. No Lighthouse run in this pass.

This document is the audit first. Implementation notes at the end are updated after the production SEO pass.

---

## Current SEO status

Technical SEO is **partially production-ready**, not complete.

**Already in place**

- Next.js Metadata API via `createPageMetadata()` on marketing routes
- Root `metadataBase`, title template, default robots, Open Graph, Twitter cards, icons
- `src/app/robots.ts` and `src/app/sitemap.ts`
- Organization + WebSite JSON-LD in `src/components/seo/StructuredData.tsx`
- Page JSON-LD on home, about, services listing/detail, solutions listing/detail, industries listing/detail, work listing, blog listing/posts, case-study articles, contact, pricing FAQ, resources FAQ
- Canonical paths from `createPageMetadata` (resolved against `metadataBase`)
- `getSiteUrl()` / `getAbsoluteUrl()` in `src/lib/seo/site.ts`
- Skip link + `<main id="main-content">` in the marketing layout
- Noindex on admin, owner CRM, 404, login, assistant, careers apply, `/portfolio/*`, `/interactive-demos/*`
- RSS at `/feed.xml`, `llms.txt`, Google verification env hook
- Image pipeline: AVIF/WebP, `next/image` on marketing surfaces, Geist `display: swap`

**Score (audit-time, technical only)**

| Area | Before this implementation pass | After this pass | Notes |
|---|---|---|---|
| Metadata coverage | Strong | Strong | Most public routes use `createPageMetadata` |
| Canonical / domain config | Mixed | Strong | Helper + JSON-LD now use `getAbsoluteUrl` |
| Robots | Strong | Strong | Public allow; private/demo paths disallowed |
| Sitemap | Good | Strong | Dynamic; 108 public URLs in local build |
| JSON-LD | Mixed | Strong | Env-aware graphs; hubs/projects/listings wired |
| Indexability | Mixed | Strong | Missing-slug metadata is noindex |
| Open Graph / Twitter | Strong | Strong | Named blog authors; project cover images |
| Internal linking | Good | Good | Existing nav; no artificial blocks added |
| Image SEO | Good | Good | Alts unchanged; project OG images added |
| Semantic HTML | Good | Good | `lang="en-IN"` |
| Core Web Vitals | Unknown | Unknown | Not measured; no boot-splash refactor |
| **Overall technical SEO** | **~72 / 100** | **~86 / 100** | Eligible to rank; GSC + content still required |

Content, backlinks, and Search Console verification are outside this codebase pass. Google will not rank from schema alone.

---

## Problems found

1. **Hardcoded production origin in JSON-LD**  
   `services-schema.tsx` and `solutions-schema.tsx` embed `https://bitcraftly.com` instead of `getAbsoluteUrl()` / `ORGANIZATION_ID` / `WEBSITE_ID`. Staging/preview hosts emit production schema. Blog, work, and case-study schemas duplicate a local `SITE_URL` helper instead of `src/lib/seo/site.ts`.

2. **Indexable metadata on missing dynamic routes**  
   `blog/[slug]`, `work/testimonials/[slug]`, and `work/case-studies/[slug]` call `createPageMetadata()` when the entity is missing, then `notFound()`. Those URLs can advertise an indexable title/canonical before the 404 metadata wins.

3. **Incomplete Service/Solution ItemLists**  
   Services listing JSON-LD lists three section anchors (`#ai-automation`, `#development`, `#digital-growth`), not the actual service URLs. Solutions listing lists two section hashes, not solution URLs.

4. **JSON-LD builders exist but are unused**  
   `buildWorkHubJsonLd` and `buildWorkProjectJsonLd` are exported and never rendered. Work hubs and `/work/projects/[slug]` have no structured data.

5. **Case studies listing has no JSON-LD**  
   `/case-studies` is a real CollectionPage with six articles and no graph. `/work/case-studies` is a separate work hub (featured project cards). Two URLs, different intent — both should be described, not collapsed blindly.

6. **Resources hub has no JSON-LD**  
   `/resources` is a crawlable hub with internal links and no CollectionPage graph.

7. **`html lang="en"` vs content locale `en-IN`**  
   Root layout language does not match `openGraph.locale: en_IN` or WebSite `inLanguage: en-IN`.

8. **Root metadata gaps**  
   No `applicationName`, `category`, or `formatDetection`. No `hreflang` (`en-IN` / `x-default`) on page metadata.

9. **Blog Open Graph `authors` uses author id**  
   `openGraph.authors: [post.authorId]` emits `sanjay-kr-singh` instead of the person name.

10. **Work project social image omitted**  
    Project pages pass title/description only. Cover images are not used as OG images.

11. **Work project JSON-LD drops relative images**  
    `buildWorkProjectJsonLd` only emits `image` when `coverImage` is already absolute.

12. **Thin testimonial detail**  
    Sitemap includes `/work/testimonials/northstar-health` with generic copy and no quote. Thin URLs dilute crawl quality.

13. **`ROUTES.packages` (`/packages`) has no page**  
    Dead route in navigation constants. Not in sitemap (good). Still a broken internal link if anything points at it.

14. **Nav “Learn more” labels**  
    Services comparison cards and solutions featured nav card use “Learn more”. Cards wrap a heading so the accessible name is not empty, but the visible CTA is vague.

15. **Root keywords inherit onto pages without their own keywords**  
    Not stuffing, but child pages that omit `keywords` inherit the homepage set. Harmless; not a ranking lever.

16. **Sitemap `lastModified: new Date()` on static routes**  
    Signals “always fresh”. Google often ignores this; it is not harmful, just noisy.

---

## Missing SEO features

- Absolute, env-aware JSON-LD on services/solutions (and shared helpers on blog/work/case studies)
- `hreflang` for the single locale (`en-IN` + `x-default`)
- `applicationName` / `category` / `formatDetection` on root metadata
- `lang="en-IN"` on `<html>`
- Work hub + work project JSON-LD
- `/case-studies` and `/resources` CollectionPage JSON-LD
- Noindex metadata for missing blog/testimonial/legacy case-study slugs
- Project-level OG images
- Named blog OG authors
- Search Console token still env-only (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) — operators must set it in Vercel
- No web app manifest (optional; not required for marketing SEO)
- No `JobPosting` schema — `CAREER_ROLES` is empty (correct: do not invent jobs)
- No `SearchAction` — there is no public `/search` route (correct)
- No `AggregateRating` / review stars (correct: do not fake)

---

## Duplicate metadata issues

- Homepage title/description differ slightly from root defaults. Child `createPageMetadata` overrides OG/title on `/`. Acceptable.
- `/case-studies` vs `/work/case-studies`: different templates (article cards vs work hub). Not identical duplicates. Both are indexable.
- `/work/case-studies/[slug]` permanently redirects to `/work/[slug]` and already sets canonical to `getCaseStudyHref`. Correct.
- Organization/WebSite JSON-LD is global (layout). Homepage only emits WebPage. About no longer emits a second Organization. Good after the earlier pass.
- Blog listing metadata vs post metadata are unique. Good.

---

## Indexability issues

**Should be indexed (public marketing)**

`/`, `/about`, `/services` + slugs, `/solutions` + slugs, `/industries` + slugs, `/work` + hubs + projects + case studies, `/blog` + posts, `/pricing`, `/contact`, `/careers` (listing only), `/resources` + faq/guides/documentation, `/case-studies`, `/events`, `/press`, `/ai-studio`, `/privacy`, `/terms`, `/trust`

**Should not be indexed**

| Route | Mechanism |
|---|---|
| `/admin/*` | Layout robots + robots.txt |
| `/owner/*` | Layout robots + robots.txt |
| `/login` | `createNoIndexMetadata` + robots.txt |
| `/assistant` | noindex + robots.txt |
| `/careers/apply` | noindex (crawlable) |
| `/portfolio/*` | layout noindex + robots.txt |
| `/interactive-demos/*` | layout noindex + robots.txt |
| `/api/*` | robots.txt |
| 404 | `createNoIndexMetadata` |

**Gaps**

- Missing blog/testimonial/legacy case-study slugs can emit indexable `generateMetadata`
- Showcase demos under `/portfolio` are correctly noindex so they do not compete with `/work`

---

## Technical SEO issues

- Hardcoded schema.org URLs (services/solutions)
- `html lang` mismatch
- Relative canonicals rely on `metadataBase` (works; absolute is clearer)
- No `trailingSlash` in `next.config.ts` (default off). URLs are slash-free except `/`. Consistent.
- Middleware does not rewrite marketing URLs. No duplicate slash/query canonicalization beyond Next defaults. Query params on contact (`?source=`, `?intent=`) inherit the `/contact` canonical. Good.
- `Host:` is correctly omitted from robots.txt
- CSS/JS/images are not disallowed

---

## Performance-related SEO issues

Not measured in this pass. Code-level risks:

- `AppBootShell` runs on every document (brand vs demo). Extra client JS before first paint can delay LCP on marketing pages.
- Marketing layout loads header/footer plus deferred client loaders (Ask AI, lead funnel, newsletter).
- Geist Sans is preloaded with `display: swap` (good). Geist Mono is not preloaded (good).
- Homepage hero uses `next/image`; decorative carousel alts are empty (correct).
- JSON-LD is inline `<script type="application/ld+json">` in the body (valid; no hydration contract because it is not a hydrated island).
- Do **not** treat a boot-splash rewrite as in-scope. High risk to shared architecture.

---

## Accessibility issues affecting SEO

- Marketing pages generally have one `h1` in the hero. Services landing uses `ServicesPageHero` only (no double H1 with the unused older `ServicesHero` on that route).
- Header logo mark uses `alt=""` beside visible “Bitcraftly” text (correct).
- Skip link present.
- Vague “Learn more” on services comparison cards (link accessible name still includes the card title).
- Form labels exist on the contact lead funnel (not re-audited field-by-field here).
- `error.tsx` is a client boundary with a real `h1` and a named retry button. No metadata export (client). Acceptable.

---

## Structured-data opportunities

Implement only if true:

| Type | Where | Status / action |
|---|---|---|
| Organization + ProfessionalService | Root | Present |
| WebSite (no SearchAction) | Root | Present |
| WebPage | Home | Present |
| AboutPage + Person + FAQ | About | Present |
| Service + FAQ + breadcrumbs | Service/solution/industry detail | Present; fix URLs |
| CollectionPage + ItemList | Services, solutions, industries, work, blog | Partial; complete ItemLists |
| FAQPage | Pricing, resources FAQ, about, work, services | Present where FAQs exist |
| ContactPage | Contact | Present |
| BlogPosting | Blog posts | Present; point publisher `@id` at Organization |
| Article | Case study detail | Present |
| CreativeWork / CollectionPage | Work projects / hubs | Builders unused — wire up |
| BreadcrumbList | Many pages | Reuse `buildBreadcrumbListJsonLd` |
| JobPosting | Careers | **Do not add** (empty openings) |
| Event | Events | **Do not add** unless items have real ISO dates |
| AggregateRating | Anywhere | **Do not add** |

---

## Internal-linking opportunities

Already reasonable: header mega-nav, footer columns, work↔services maps in `src/constants/work.ts`, case-study listing → `/work/[slug]`, resources hub → guides/FAQ/blog, industries CTA → contact.

Safe improvements (no new pages):

- Keep descriptive card titles as the primary link name (already true for most cards)
- Do not add footer keyword blocks
- Do not invent `/packages`
- Testimonials need real quotes before promoting them more heavily

---

## Recommended implementation plan

1. Keep existing helpers (`createPageMetadata`, `getSiteUrl`, `JsonLdScript`). No SEO library.
2. Point all JSON-LD graphs at `getAbsoluteUrl` / `ORGANIZATION_ID` / `WEBSITE_ID`.
3. Complete services/solutions ItemLists with real URLs.
4. Render work hub + work project JSON-LD; add listing JSON-LD for `/case-studies` and `/resources`.
5. Noindex missing dynamic slugs in `generateMetadata`.
6. Root `lang="en-IN"`, `applicationName`, `hreflang` on page metadata.
7. Blog OG author names; work project OG images; absolute project images in JSON-LD.
8. Do not redesign UI, do not change homepage/services/solutions layout, do not fake ratings/jobs/search.
9. Validate with lint + build. Record remaining content/GSC work.

---

## Completed

Implemented on `feature/seo-indexability` after this audit.

- Production metadata helper: unique title/description, absolute canonical, `en-IN` / `x-default` hreflang, explicit index robots, OG + Twitter
- Root metadata: `applicationName`, `category`, `formatDetection`, Google verification env hook, `lang="en-IN"`
- Robots.txt: allow public pages; disallow `/api/`, `/admin/`, `/owner/`, `/assistant/`, `/dashboard/`, `/private/`, `/login`, `/portfolio/`, `/interactive-demos/`
- Dynamic sitemap: named `STATIC_SITEMAP_PATHS` plus industries, services, solutions, work hubs/projects, testimonials, blog, case studies (108 URLs in local build). No login/admin/portfolio/apply URLs
- JSON-LD uses `getAbsoluteUrl`, `ORGANIZATION_ID`, `WEBSITE_ID` (no hardcoded origin in services/solutions/blog/work/case-study graphs)
- Organization + WebSite in root layout; homepage WebPage only (no duplicate org)
- Service/Solution ItemLists now list real URLs, not section hashes
- Work hub + work project JSON-LD rendered; `/case-studies` and `/resources` CollectionPage graphs added
- ContactPage, Pricing FAQ, Resources FAQ, industry detail Service graphs
- Noindex: login, assistant, careers apply, portfolio, interactive demos, missing blog/testimonial/legacy case-study slugs
- Blog RSS `/feed.xml`, `llms.txt`, blog RSS alternate
- Blog OG authors use person name; work project OG image uses cover
- Fallback work hub pages now use the real slug in JSON-LD URLs
- Validation: `npm run lint` (0 errors, 77 pre-existing warnings), `npm run typecheck`, `npm test` (95 passed), `npm run build` succeeded
- Generated artifacts inspected: `robots.txt`, `sitemap.xml`, `feed.xml`, `llms.txt`

Local build origin was `http://localhost:3000` because `.env.local` overrides site URL. Production must set `NEXT_PUBLIC_SITE_URL=https://bitcraftly.com`.

## Remaining

Intentionally not done (or not claimed as verified):

- **Core Web Vitals** — not measured (no Lighthouse in this pass). Boot splash and marketing client loaders were left unchanged
- **Search Console / ranking** — token env var is documented; operators must verify the property and submit the sitemap after deploy
- **Thin testimonial** — `/work/testimonials/northstar-health` stays indexable until real quotes exist. Do not invent reviews
- **JobPosting / Event schema** — `CAREER_ROLES` is empty; event dates are display labels. Fake jobs/events were not added
- **SearchAction** — no public `/search` route
- **AggregateRating** — not added
- **UI redesign / heading copy / “Learn more” on services cards** — protected visual surfaces left unchanged; card titles already provide the accessible name
- **`/packages`** — dead constant, no page. Not added to sitemap
- **Web app manifest** — optional PWA file, not required for marketing SEO
- **Image filename inventory / bulk `priority`** — not rewritten; would change assets without ranking certainty
- **Sitemap lastmod on static routes** — still `new Date()` at generate time; noisy but valid
- **Duplicate intent URLs** — `/case-studies` (articles) vs `/work/case-studies` (work hub) kept because content differs

## SEO Checklist

- [x] Metadata
- [x] Canonical
- [x] Robots
- [x] Sitemap
- [x] JSON-LD
- [x] Open Graph
- [x] Twitter
- [x] Internal linking (existing nav/footer/hubs preserved; no artificial keyword links added)
- [x] Image SEO (content alts preserved; project OG images added; no visual redesign)
- [x] Semantic HTML (marketing landmarks preserved; `lang="en-IN"`)
- [x] Accessibility (overlap fixes only: language, noindex 404 metadata; full WCAG recrawl not claimed)
- [ ] Core Web Vitals (not measured in this pass)
- [x] Build validation

## Files Changed

### Created

| File | Purpose |
|---|---|
| `docs/seo-audit.md` | This audit, plan, and post-implementation record |
| `src/app/feed.xml/route.ts` | Blog RSS 2.0 |
| `src/app/llms.txt/route.ts` | AI crawler summary of public URLs |
| `src/app/interactive-demos/layout.tsx` | Noindex interactive demo routes |
| `src/features/resources/resources-schema.ts` | Resources hub CollectionPage JSON-LD |
| `src/features/work/work-testimonials.content.ts` | Shared testimonial catalog for pages + sitemap |
| `src/lib/seo/json-ld-breadcrumbs.ts` | Reusable BreadcrumbList builder |
| `src/lib/seo/json-ld-faq.ts` | Reusable FAQPage builder |

### Modified

| File | Purpose |
|---|---|
| `.env.example` | Document `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` |
| `src/app/layout.tsx` | Locale, application metadata, verification, org/website stay in layout |
| `src/app/robots.ts` | Disallow auth, demos, private prefixes |
| `src/app/sitemap.ts` | Indexable URLs only; easier static path list |
| `src/app/portfolio/layout.tsx` | Noindex showcase demos |
| `src/lib/seo/createPageMetadata.ts` | Absolute canonical, hreflang, robots, env-aware URLs |
| `src/lib/seo/organization.ts` | Canonical Organization / ProfessionalService graph |
| `src/lib/seo/website.ts` | WebSite graph without SearchAction |
| `src/app/(marketing)/page.tsx` | Homepage WebPage JSON-LD only |
| `src/app/(marketing)/login/page.tsx` | Noindex |
| `src/app/(marketing)/assistant/page.tsx` | Noindex |
| `src/app/(marketing)/careers/apply/page.tsx` | Noindex |
| `src/app/(marketing)/blog/page.tsx` | RSS alternate |
| `src/app/(marketing)/blog/[slug]/page.tsx` | Noindex missing slugs; named OG authors |
| `src/app/(marketing)/work/[slug]/page.tsx` | Pass real slug into hub fallback |
| `src/app/(marketing)/work/projects/[slug]/page.tsx` | Project OG image |
| `src/app/(marketing)/work/testimonials/[slug]/page.tsx` | Shared content + noindex missing slugs |
| `src/app/(marketing)/work/case-studies/[slug]/page.tsx` | Noindex missing legacy slugs |
| `src/features/services/services-schema.tsx` | Env-aware URLs; full service ItemList |
| `src/features/solutions/solutions-schema.tsx` | Env-aware URLs; full solution ItemList |
| `src/features/work/work-schema.tsx` | Shared URL helpers; hub/project graphs |
| `src/features/work/WorkHubPage.tsx` | Render hub JSON-LD; real fallback slug |
| `src/features/work/WorkProjectDetailPage.tsx` | Render project JSON-LD |
| `src/features/blog/blog-schema.tsx` | Shared URL helpers; publisher `@id` |
| `src/features/case-studies/case-study-schema.tsx` | Listing + article graphs |
| `src/features/case-studies/CaseStudiesLandingPage.tsx` | Emit listing JSON-LD |
| `src/features/case-studies/index.ts` | Export listing builder |
| `src/features/about/about-schema.ts` | AboutPage graph without duplicate Organization |
| `src/features/contact/ContactLandingPage.tsx` | ContactPage + breadcrumbs |
| `src/features/pricing/PricingLandingPage.tsx` | FAQ JSON-LD |
| `src/features/resources/ResourcesFaqPage.tsx` | FAQ JSON-LD |
| `src/features/resources/ResourcesLandingPage.tsx` | CollectionPage JSON-LD |
| `src/features/industries/industries-schema.tsx` | Industry detail Service + breadcrumbs |
| `src/features/industries/IndustryDetailPage.tsx` | Emit industry JSON-LD |
