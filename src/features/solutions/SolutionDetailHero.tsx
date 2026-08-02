import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { SolutionsHeroVisual } from './SolutionsHeroVisual';
import type { SolutionPageContent } from './solutions.types';
import './solutions.css';
import '@/features/services/services.css';

interface SolutionDetailHeroProps {
  content: SolutionPageContent;
  breadcrumbs: readonly BreadcrumbItem[];
  contactHref: string;
}

/**
 * Solution detail hero — same shell language as Solutions landing hero.
 */
export async function SolutionDetailHero({
  content,
  breadcrumbs,
  contactHref,
}: SolutionDetailHeroProps) {
  const isMobile = await isMobileUserAgent();
  const headingId = `${content.slug}-page-heading`;
  const chips = content.highlights.slice(0, 4);

  return (
    <Section
      spacing="lg"
      aria-labelledby={headingId}
      className={cn(
        'solutions-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
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

      <div className="solutions-hero__grid">
        <div className="solutions-hero__content">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />

          <p className="solutions-hero__eyebrow">
            <Icon name={content.icon} size="sm" aria-hidden className="h-[14px] w-[14px]" />
            {content.eyebrow}
          </p>

          <p className="solution-detail-hero__group">{content.groupTitle}</p>

          <h1 id={headingId} className="solutions-hero__title">
            {content.headline}
          </h1>

          <p className="solutions-hero__description">{content.intro}</p>

          <div className="solutions-hero__cta-row">
            <Link href={contactHref} className="solutions-hero__btn solutions-hero__btn--primary">
              {content.ctaPrimaryLabel}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
            <Link
              href={ROUTES.solutions}
              className="solutions-hero__btn solutions-hero__btn--outline"
            >
              {content.ctaSecondaryLabel}
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
          </div>

          {!isMobile ? (
            <ul className="solutions-hero__trust" aria-label="What you get">
              {content.outcomes.map((outcome) => (
                <li key={outcome} className="solutions-hero__trust-item">
                  <span className="solutions-hero__trust-check" aria-hidden>
                    <Icon name="check" size="sm" className="h-[11px] w-[11px]" />
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          ) : null}

          {!isMobile && chips.length > 0 ? (
            <ul className="solutions-hero__chips" aria-label="Capability focus">
              {chips.map((chip) => (
                <li key={chip}>
                  <span className="solutions-hero__chip">
                    <span className="solutions-hero__chip-icon" aria-hidden>
                      <Icon name="check" size="sm" className="h-[13px] w-[13px]" />
                    </span>
                    {chip}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {!isMobile ? (
          <div className="solutions-hero__visual">
            <SolutionsHeroVisual />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
