import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import "@/features/homepage/Hero/hero.css";
import { INDUSTRIES_LANDING } from "./industries.content";
import { IndustriesHeroVisual } from "./IndustriesHeroVisual";
import { IndustriesTrustedBy } from "./IndustriesTrustedBy";
import "./industries.css";

interface IndustriesHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Industries-only hero — matches approved Industries marketing mock.
 * Right column uses `/industries-hero.webp` like Services / Solutions.
 * Background layers match Services / Solutions (`hero-surface` + grids + aurora).
 */
export async function IndustriesHero({ breadcrumbs }: IndustriesHeroProps) {
  const isMobile = await isMobileUserAgent();
  const title = INDUSTRIES_LANDING.title;
  const highlight = INDUSTRIES_LANDING.titleHighlight;
  const [titleBefore, titleAfter] = title.includes(highlight)
    ? title.split(highlight)
    : [title, ""];

  const resolvedTrust = isMobile
    ? INDUSTRIES_LANDING.trust.slice(0, 2)
    : INDUSTRIES_LANDING.trust;

  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-page-heading"
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
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-[var(--space-3)]" />

          <p className="industries-hero__eyebrow">
            <Icon name="globe" size="sm" aria-hidden className="h-[14px] w-[14px]" />
            {INDUSTRIES_LANDING.eyebrow}
          </p>

          <h1 id="industries-page-heading" className="industries-hero__title">
            {titleBefore}
            {title.includes(highlight) ? (
              <span className="industries-hero__title-mark">{highlight}</span>
            ) : null}
            {titleAfter}
          </h1>

          <p className="industries-hero__description">
            {INDUSTRIES_LANDING.description}
          </p>

          {!isMobile ? (
            <ul className="industries-hero__highlights" aria-label="Why Bitcraftly for industries">
              {INDUSTRIES_LANDING.highlights.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "industries-hero__highlight",
                    `industries-hero__highlight--${item.tone}`,
                  )}
                >
                  <div className="industries-hero__highlight-head">
                    <span className="industries-hero__highlight-icon" aria-hidden>
                      <Icon name={item.icon} size="sm" className="h-[18px] w-[18px]" />
                    </span>
                    <span className="industries-hero__highlight-title">{item.title}</span>
                  </div>
                  <p className="industries-hero__highlight-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="industries-hero__actions">
            <Link
              href={INDUSTRIES_LANDING.primaryCta.href}
              className="industries-hero__btn industries-hero__btn--primary"
            >
              {INDUSTRIES_LANDING.primaryCta.label}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
            <Link
              href={INDUSTRIES_LANDING.secondaryCta.href}
              className="industries-hero__btn industries-hero__btn--outline"
            >
              {INDUSTRIES_LANDING.secondaryCta.label}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="industries-hero__trust" aria-label="Trust indicators">
            {resolvedTrust.map((item) => (
              <li key={item}>
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="h-[12px] w-[12px] text-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {!isMobile ? <IndustriesHeroVisual /> : null}
      </div>

      {!isMobile ? <IndustriesTrustedBy /> : null}
    </Section>
  );
}
