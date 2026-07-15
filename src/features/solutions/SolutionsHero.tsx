import Link from "next/link";
import { AnimatedStat } from "@/components/patterns/animated-stat";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import { SOLUTIONS_LANDING } from "./solutions.content";
import { SolutionsHeroVisual } from "./SolutionsHeroVisual";
import "./solutions.css";

interface SolutionsHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

const HERO_STATS = [
  {
    id: "projects",
    value: "200+",
    label: "Projects Delivered",
    icon: "layout-grid" as const,
    tone: "violet",
  },
  {
    id: "satisfaction",
    value: "98%",
    label: "Client Satisfaction",
    icon: "star" as const,
    tone: "emerald",
  },
  {
    id: "support",
    value: "24/7",
    label: "Support Available",
    icon: "headset" as const,
    tone: "sky",
  },
  {
    id: "response",
    value: "24h",
    label: "Avg. Response Time",
    icon: "zap" as const,
    tone: "amber",
  },
] as const;

const HERO_CHIPS: readonly { id: string; label: string; icon: IconName }[] = [
  { id: "crm", label: "CRM & ERP", icon: "workflow" },
  { id: "ai", label: "AI Automation", icon: "shield" },
  { id: "saas", label: "SaaS Platforms", icon: "rocket" },
  { id: "analytics", label: "Analytics", icon: "trending-up" },
];

/**
 * Solutions-only premium hero — left column matches approved Solutions mock.
 */
export function SolutionsHero({ breadcrumbs }: SolutionsHeroProps) {
  const titleParts = SOLUTIONS_LANDING.title.split(
    SOLUTIONS_LANDING.titleHighlight,
  );

  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-page-heading"
      className={cn(
        "solutions-hero relative overflow-hidden hero-surface",
        "border-b border-border/60",
      )}
    >
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

      <div className="solutions-hero__grid">
        <div className="solutions-hero__content">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />

          <p className="solutions-hero__eyebrow">
            <Icon
              name="workflow"
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px]"
            />
            {SOLUTIONS_LANDING.eyebrow}
          </p>

          <h1 id="solutions-page-heading" className="solutions-hero__title">
            {titleParts[0]}
            <span className="solutions-hero__title-accent">
              {SOLUTIONS_LANDING.titleHighlight}
            </span>
            {titleParts[1] ?? ""}
          </h1>

          <p className="solutions-hero__description">
            {SOLUTIONS_LANDING.description}
          </p>

          <div className="solutions-hero__cta-row">
            <Link
              href={SOLUTIONS_LANDING.primaryCta.href}
              className="solutions-hero__btn solutions-hero__btn--primary"
            >
              {SOLUTIONS_LANDING.primaryCta.label}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
            <Link
              href={SOLUTIONS_LANDING.secondaryCta.href}
              className="solutions-hero__btn solutions-hero__btn--outline"
            >
              {SOLUTIONS_LANDING.secondaryCta.label}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="solutions-hero__trust" aria-label="Trust indicators">
            {SOLUTIONS_LANDING.trustIndicators.map((item) => (
              <li key={item} className="solutions-hero__trust-item">
                <span className="solutions-hero__trust-check" aria-hidden>
                  <Icon
                    name="check"
                    size="sm"
                    className="h-[11px] w-[11px]"
                  />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <dl className="solutions-hero__stats" aria-label="Trust metrics">
            {HERO_STATS.map((stat) => (
              <div key={stat.id} className="solutions-hero__stat">
                <div className="solutions-hero__stat-head">
                  <span
                    className={`solutions-hero__stat-icon solutions-hero__stat-icon--${stat.tone}`}
                    aria-hidden
                  >
                    <Icon name={stat.icon} size="sm" />
                  </span>
                  <dt className="solutions-hero__stat-value">
                    <AnimatedStat value={stat.value} />
                  </dt>
                </div>
                <dd className="solutions-hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <ul className="solutions-hero__chips" aria-label="Solution focus">
            {HERO_CHIPS.map((chip) => (
              <li key={chip.id}>
                <span className="solutions-hero__chip">
                  <span className="solutions-hero__chip-icon" aria-hidden>
                    <Icon
                      name={chip.icon}
                      size="sm"
                      className="h-[13px] w-[13px]"
                    />
                  </span>
                  {chip.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="solutions-hero__visual">
          <SolutionsHeroVisual />
        </div>
      </div>
    </Section>
  );
}
