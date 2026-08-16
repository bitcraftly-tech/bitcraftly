import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { ResourcesHeroVisual } from './ResourcesHeroVisual';
import './resources.css';

export interface ResourcesHeroCta {
  label: string;
  href: string;
}

interface ResourcesHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  headingId: string;
  eyebrow: string;
  eyebrowIcon?: IconName;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta: ResourcesHeroCta;
  secondaryCta: ResourcesHeroCta;
  chips?: readonly string[];
}

/**
 * Resources hero — same aurora / hero-surface shell as Services & Work.
 */
export async function ResourcesHero({
  breadcrumbs,
  headingId,
  eyebrow,
  eyebrowIcon = 'sparkles',
  title,
  titleHighlight,
  description,
  primaryCta,
  secondaryCta,
  chips,
}: ResourcesHeroProps) {
  const isMobile = await isMobileUserAgent();
  const [titleBefore, titleAfter] =
    titleHighlight && title.includes(titleHighlight) ? title.split(titleHighlight) : [title, ''];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'lux-hero resources-hero relative overflow-hidden hero-surface',
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

      <Container size="xl" className="resources-hero__container">
        <div className="resources-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="resources-hero__grid">
          <div className="resources-hero__content">
            <p className="resources-hero__eyebrow">
              <Icon
                name={eyebrowIcon}
                size="sm"
                aria-hidden
                className="resources-hero__eyebrow-icon"
              />
              <span>{eyebrow}</span>
            </p>

            <h1 id={headingId} className="resources-hero__title">
              {titleHighlight && title.includes(titleHighlight) ? (
                <>
                  {titleBefore.trimEnd()}{' '}
                  <span className="resources-hero__title-mark">{titleHighlight}</span>
                  {titleAfter}
                </>
              ) : (
                title
              )}
            </h1>

            <p className="resources-hero__description">{description}</p>

            <div className="resources-hero__cta-row">
              <Link
                href={primaryCta.href}
                className="resources-hero__btn resources-hero__btn--primary"
              >
                {primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={secondaryCta.href}
                className="resources-hero__btn resources-hero__btn--outline"
              >
                {secondaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile && chips && chips.length > 0 ? (
              <ul className="resources-hero__chips" aria-label="Resource types">
                {chips.map((chip) => (
                  <li key={chip}>
                    <span className="resources-hero__chip">{chip}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="resources-hero__visual">
              <ResourcesHeroVisual />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
