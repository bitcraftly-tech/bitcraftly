import Link from "next/link";
import { AnimatedStat } from "@/components/patterns/animated-stat";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { BLOG_CATEGORIES } from "@/content/blog";
import type { BlogCategoryId } from "@/content/blog";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import "@/features/services/services.css";
import { BlogHeroVisual } from "./BlogHeroVisual";
import "./blog.css";

interface BlogHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  activeCategory?: BlogCategoryId | "all";
  query?: string;
}

function buildListingHref(options: {
  category?: BlogCategoryId | "all";
  q?: string;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (options.category && options.category !== "all") {
    params.set("category", options.category);
  }
  if (options.q?.trim()) {
    params.set("q", options.q.trim());
  }
  if (options.page && options.page > 1) {
    params.set("page", String(options.page));
  }
  const qs = params.toString();
  return qs ? `${ROUTES.blog}?${qs}` : ROUTES.blog;
}

const HERO_TITLE = "Engineering notes for builders shipping real products";
const HERO_HIGHLIGHT = "real products";

const HERO_LEAD =
  "Practical writing on AI development, Next.js, React, performance, and SEO — from the Bitcraftly delivery desk.";

const HERO_STATS: readonly {
  id: string;
  value: string;
  label: string;
  icon: IconName;
  tone: "violet" | "sky" | "indigo" | "amber";
}[] = [
  {
    id: "topics",
    value: String(BLOG_CATEGORIES.length),
    label: "Topic categories",
    icon: "layout-grid",
    tone: "violet",
  },
  {
    id: "ai",
    value: "AI",
    label: "Product & LLM notes",
    icon: "brain",
    tone: "sky",
  },
  {
    id: "web",
    value: "Web",
    label: "Next.js & React",
    icon: "code",
    tone: "indigo",
  },
  {
    id: "seo",
    value: "SEO",
    label: "Performance & growth",
    icon: "trending-up",
    tone: "amber",
  },
] as const;

const HERO_FEATURES: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: "violet" | "sky" | "emerald" | "amber";
}[] = [
  {
    id: "practical",
    title: "Delivery-first",
    description: "Notes from real client builds — not theory dumps",
    icon: "check",
    tone: "violet",
  },
  {
    id: "stack",
    title: "Modern stack",
    description: "Next.js, React, TypeScript, and AI tooling",
    icon: "zap",
    tone: "sky",
  },
  {
    id: "perf",
    title: "Performance minded",
    description: "Core Web Vitals, SEO, and shipping discipline",
    icon: "rocket",
    tone: "emerald",
  },
  {
    id: "builders",
    title: "For builders",
    description: "Founders, engineers, and product teams",
    icon: "sparkles",
    tone: "amber",
  },
] as const;

/**
 * Blog hero — same aurora / services-hero shell as Services landing.
 */
export async function BlogHero({
  breadcrumbs,
  activeCategory = "all",
  query = "",
}: BlogHeroProps) {
  const isMobile = await isMobileUserAgent();
  const [titleBefore, titleAfter] = HERO_TITLE.includes(HERO_HIGHLIGHT)
    ? HERO_TITLE.split(HERO_HIGHLIGHT)
    : [HERO_TITLE, ""];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby="blog-page-heading"
      className={cn(
        "services-hero blog-hero relative overflow-hidden hero-surface",
        "border-b border-border/60",
        isMobile && "marketing-hero--compact",
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-55 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[12%] size-[680px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[14%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl hero-aurora-blend"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="services-hero__container">
        <div className="services-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="services-hero__grid">
          <div className="services-hero__content">
            <p className="services-hero__eyebrow">
              <Icon
                name="quote"
                size="sm"
                aria-hidden
                className="services-hero__eyebrow-icon"
              />
              <span>Blog</span>
            </p>

            <h1 id="blog-page-heading" className="services-hero__title">
              {titleBefore}
              {HERO_TITLE.includes(HERO_HIGHLIGHT) ? (
                <span className="services-hero__title-accent">
                  {HERO_HIGHLIGHT}
                </span>
              ) : null}
              {titleAfter}
            </h1>

            <p className="services-hero__description">{HERO_LEAD}</p>

            <div className="services-hero__cta-row">
              <Link
                href={NAV_ACTIONS.freeConsultation.href}
                className="services-hero__btn services-hero__btn--primary"
              >
                {NAV_ACTIONS.freeConsultation.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <a
                href="#blog-articles"
                className="services-hero__btn services-hero__btn--outline"
              >
                Browse articles
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </a>
            </div>

            <form
              action={ROUTES.blog}
              method="get"
              role="search"
              className="blog-hero__search"
            >
              {activeCategory !== "all" ? (
                <input type="hidden" name="category" value={activeCategory} />
              ) : null}
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <input
                id="blog-search"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search articles…"
                className="blog-hero__search-input"
              />
              <button type="submit" className="blog-hero__search-btn">
                <Icon name="search" size="sm" aria-hidden />
                Search
              </button>
            </form>

            <nav aria-label="Blog categories" className="blog-hero__categories">
              <Link
                href={buildListingHref({ q: query || undefined })}
                className={cn(
                  "blog-hero__chip",
                  activeCategory === "all" && "blog-hero__chip--active",
                )}
                aria-current={activeCategory === "all" ? "page" : undefined}
              >
                All
              </Link>
              {BLOG_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={buildListingHref({
                    category: category.id,
                    q: query || undefined,
                  })}
                  className={cn(
                    "blog-hero__chip",
                    activeCategory === category.id && "blog-hero__chip--active",
                  )}
                  aria-current={
                    activeCategory === category.id ? "page" : undefined
                  }
                >
                  {category.label}
                </Link>
              ))}
            </nav>

            {!isMobile ? (
              <div
                className="services-hero-stats"
                role="list"
                aria-label="Blog highlights"
              >
                {HERO_STATS.map((stat) => (
                  <div
                    key={stat.id}
                    role="listitem"
                    className="services-hero-stats__item"
                  >
                    <dl className="services-hero-stats__pair m-0">
                      <dt className="services-hero-stats__value">
                        <span className="services-hero-stats__head">
                          <span
                            className={`services-hero-stats__icon services-hero-stats__icon--${stat.tone}`}
                            aria-hidden
                          >
                            <Icon name={stat.icon} size="sm" />
                          </span>
                          <AnimatedStat value={stat.value} />
                        </span>
                      </dt>
                      <dd className="services-hero-stats__label">
                        {stat.label}
                      </dd>
                    </dl>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="services-hero__visual">
              <BlogHeroVisual />
            </div>
          ) : null}

          {!isMobile ? (
            <ul
              className="services-hero-features"
              aria-label="What you will find"
            >
              {HERO_FEATURES.map((item) => (
                <li key={item.id} className="services-hero-features__item">
                  <span className="services-hero-features__head">
                    <span
                      className={`services-hero-features__icon services-hero-features__icon--${item.tone}`}
                      aria-hidden
                    >
                      <Icon name={item.icon} size="sm" />
                    </span>
                    <span className="services-hero-features__title">
                      {item.title}
                    </span>
                  </span>
                  <span className="services-hero-features__desc">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export { buildListingHref };
