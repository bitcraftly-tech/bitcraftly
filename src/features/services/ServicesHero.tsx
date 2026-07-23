import Link from "next/link";
import { AnimatedStat } from "@/components/patterns/animated-stat";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import { SERVICES_LANDING } from "./services.content";
import { ServicesHeroVisual } from "./ServicesHeroVisual";
import "./services.css";

interface ServicesHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

const HERO_LEAD =
  "From idea to impact — we design, build, and scale high-performance digital products that drive growth and transform businesses.";

const HERO_PRIMARY_CTA = {
  label: "Book Free Consultation",
  href: SERVICES_LANDING.primaryCta.href,
} as const;

const HERO_SECONDARY_CTA = {
  label: "Explore Services",
  href: "#services-catalog",
} as const;

const HERO_TECH_STACK: readonly {
  id: string;
  label: string;
  icon?: IconName;
}[] = [
  { id: "react", label: "React", icon: "code" },
  { id: "next", label: "Next.js", icon: "globe" },
  { id: "ts", label: "TypeScript", icon: "zap" },
  { id: "node", label: "Node.js", icon: "database" },
  { id: "aws", label: "AWS", icon: "cloud" },
  { id: "more", label: "+ More" },
] as const;

const HERO_STATS: readonly {
  id: string;
  value: string;
  label: string;
  icon: IconName;
  tone: "violet" | "sky" | "indigo" | "amber";
}[] = [
  {
    id: "experience",
    value: "20+",
    label: "Years of Experience",
    icon: "rocket",
    tone: "violet",
  },
  {
    id: "projects",
    value: "300+",
    label: "Projects Delivered",
    icon: "layout-grid",
    tone: "sky",
  },
  {
    id: "industries",
    value: "24+",
    label: "Industries Served",
    icon: "globe",
    tone: "indigo",
  },
  {
    id: "satisfaction",
    value: "100%",
    label: "Client Satisfaction",
    icon: "star",
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
    id: "agile",
    title: "Agile & Transparent",
    description: "Collaborative process with full transparency",
    icon: "shield",
    tone: "violet",
  },
  {
    id: "scalable",
    title: "Scalable Solutions",
    description: "Built to scale with your business growth",
    icon: "layout-grid",
    tone: "sky",
  },
  {
    id: "secure",
    title: "Secure & Reliable",
    description: "Enterprise-grade security and reliability",
    icon: "check",
    tone: "emerald",
  },
  {
    id: "results",
    title: "Results-Driven",
    description: "Focused on delivering measurable results",
    icon: "trending-up",
    tone: "amber",
  },
] as const;

/**
 * Services-only premium hero — page-owned layout matching approved Services mock.
 */
export async function ServicesHero({ breadcrumbs }: ServicesHeroProps) {
  const isMobile = await isMobileUserAgent();
  const titleParts = SERVICES_LANDING.title.split(
    SERVICES_LANDING.titleHighlight,
  );

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby="services-page-heading"
      className={cn(
        "services-hero relative overflow-hidden hero-surface",
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
                name="code"
                size="sm"
                aria-hidden
                className="services-hero__eyebrow-icon"
              />
              <span>{SERVICES_LANDING.eyebrow}</span>
            </p>

            <h1 id="services-page-heading" className="services-hero__title">
              {titleParts[0]}
              <span className="services-hero__title-accent">
                {SERVICES_LANDING.titleHighlight}
              </span>
              {titleParts[1] ?? ""}
            </h1>

            <p className="services-hero__description">{HERO_LEAD}</p>

            <div className="services-hero__cta-row">
              <Link
                href={HERO_PRIMARY_CTA.href}
                className="services-hero__btn services-hero__btn--primary"
                aria-label={HERO_PRIMARY_CTA.label}
              >
                {HERO_PRIMARY_CTA.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={HERO_SECONDARY_CTA.href}
                className="services-hero__btn services-hero__btn--outline"
                aria-label={HERO_SECONDARY_CTA.label}
              >
                {HERO_SECONDARY_CTA.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile ? (
              <div className="services-hero-stack">
                <p className="services-hero-stack__label">
                  Technology stack we work with
                </p>
                <ul className="services-hero-stack__list">
                  {HERO_TECH_STACK.map((item) => (
                    <li key={item.id}>
                      <span
                        className={
                          item.icon
                            ? "services-hero-stack__pill"
                            : "services-hero-stack__pill services-hero-stack__pill--more"
                        }
                      >
                        {item.icon ? (
                          <Icon
                            name={item.icon}
                            size="sm"
                            aria-hidden
                            className="services-hero-stack__pill-icon"
                          />
                        ) : null}
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!isMobile ? (
              <div
                className="services-hero-stats"
                role="list"
                aria-label="Company highlights"
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
                      <dd className="services-hero-stats__label">{stat.label}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="services-hero__visual">
              <ServicesHeroVisual />
            </div>
          ) : null}

        {!isMobile ? (
        <ul className="services-hero-features" aria-label="Delivery principles">
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
