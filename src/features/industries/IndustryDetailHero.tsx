import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import { IndustriesHeroVisual } from "./IndustriesHeroVisual";
import type { IndustryModel } from "./industries.types";
import "./industries.css";

interface IndustryDetailHeroProps {
  industry: IndustryModel;
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Industry detail hero — same shell language as Industries landing hero.
 */
export async function IndustryDetailHero({
  industry,
  breadcrumbs,
}: IndustryDetailHeroProps) {
  const isMobile = await isMobileUserAgent();
  const headingId = `${industry.slug}-page-heading`;

  return (
    <Section
      spacing="lg"
      aria-labelledby={headingId}
      className={cn(
        "industries-hero relative overflow-hidden hero-surface",
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
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[12%] size-[680px] rounded-full blur-3xl opacity-90 hero-aurora-accent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[14%] size-[560px] rounded-full blur-3xl opacity-85 hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 size-[460px] -translate-x-1/2 rounded-full opacity-50 blur-3xl hero-aurora-blend"
            aria-hidden
          />
        </>
      ) : null}

      <div className="industries-hero__layout relative">
        <div className="industries-hero__content min-w-0">
          <MarketingBreadcrumbs
            items={breadcrumbs}
            className="mb-[var(--space-3)]"
          />

          <p className="industries-hero__eyebrow">
            <Icon
              name={industry.icon}
              size="sm"
              aria-hidden
              className="h-[14px] w-[14px]"
            />
            Industry
          </p>

          <h1 id={headingId} className="industries-hero__title">
            {industry.label}{" "}
            <span className="industries-hero__title-mark">solutions</span>
          </h1>

          <p className="industries-hero__description">{industry.description}</p>

          {!isMobile ? (
            <ul
              className="industries-hero__highlights"
              aria-label="Engagement snapshot"
            >
              <li className="industries-hero__highlight industries-hero__highlight--primary">
                <div className="industries-hero__highlight-head">
                  <span className="industries-hero__highlight-icon" aria-hidden>
                    <Icon name="layout-grid" size="sm" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="industries-hero__highlight-title">
                    Company size
                  </span>
                </div>
                <p className="industries-hero__highlight-desc">
                  {industry.companySize}
                </p>
              </li>
              <li className="industries-hero__highlight industries-hero__highlight--accent">
                <div className="industries-hero__highlight-head">
                  <span className="industries-hero__highlight-icon" aria-hidden>
                    <Icon name="zap" size="sm" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="industries-hero__highlight-title">
                    Typical duration
                  </span>
                </div>
                <p className="industries-hero__highlight-desc">
                  {industry.projectDuration}
                </p>
              </li>
            </ul>
          ) : null}

          <div className="industries-hero__actions">
            <Link
              href={`${NAV_ACTIONS.freeConsultation.href}?intent=${encodeURIComponent(`industry-${industry.slug}`)}&source=industry-page`}
              className="industries-hero__btn industries-hero__btn--primary"
            >
              {NAV_ACTIONS.freeConsultation.label}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
            <Link
              href={`${ROUTES.industries}#industries-grid`}
              className="industries-hero__btn industries-hero__btn--outline"
            >
              All industries
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="industries-hero__trust" aria-label="Business goals">
            {industry.businessGoals.map((goal) => (
              <li key={goal}>
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="h-[12px] w-[12px] text-primary"
                />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        {!isMobile ? <IndustriesHeroVisual /> : null}
      </div>
    </Section>
  );
}
