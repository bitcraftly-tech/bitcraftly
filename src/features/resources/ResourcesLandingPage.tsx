import Link from 'next/link';
import type { CSSProperties } from 'react';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { MarketingStagger } from '@/components/patterns/marketing-stagger';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { RESOURCE_GROUPS, RESOURCES_FEATURED } from '@/constants/resources';
import { buildResourcesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { cn } from '@/lib/cn';
import { ResourcesHero } from './ResourcesHero';
import { ResourcesPageCta } from './ResourcesPageCta';
import { RESOURCES_LANDING } from './resources.content';
import './resources.css';

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

/**
 * Resources hub — Services/Work-style hero + learning/company card groups.
 */
export function ResourcesLandingPage() {
  const breadcrumbs = buildResourcesBreadcrumbs();

  return (
    <PageShell className="resources-page">
      <ResourcesHero
        breadcrumbs={breadcrumbs}
        headingId="resources-page-heading"
        eyebrow={RESOURCES_LANDING.eyebrow}
        title={`${RESOURCES_LANDING.title} ${RESOURCES_LANDING.titleHighlight}`}
        titleHighlight={RESOURCES_LANDING.titleHighlight}
        description={RESOURCES_LANDING.description}
        primaryCta={RESOURCES_LANDING.primaryCta}
        secondaryCta={RESOURCES_LANDING.secondaryCta}
        chips={['Guides', 'Documentation', 'FAQ', 'Blog', 'Case studies']}
      />

      <Section
        spacing="lg"
        aria-labelledby="resources-featured-heading"
        className="border-b border-border/40 bg-background"
      >
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <div className="max-w-2xl">
            <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
              Featured
            </p>
            <h2
              id="resources-featured-heading"
              className="services-page-section-heading m-0 mt-[10px]"
            >
              Start with the latest insights
            </h2>
            <p className="m-0 mt-[12px] font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
              Fresh ideas on AI, product, and digital engineering from the Bitcraftly team.
            </p>
          </div>
          <Link
            href={RESOURCES_FEATURED.href}
            className={cn(
              'inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline',
              'transition-opacity duration-200 hover:opacity-80',
              focusRing,
            )}
          >
            {RESOURCES_FEATURED.ctaLabel}
            <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
          </Link>
        </div>

        <article className="resources-featured mt-[24px]">
          <div className="flex flex-wrap items-start justify-between gap-[16px]">
            <div className="max-w-xl">
              <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {RESOURCES_FEATURED.eyebrow}
              </p>
              <h3 className="m-0 mt-[8px] font-sans text-[20px] font-bold tracking-[-0.02em] text-foreground sm:text-[22px]">
                {RESOURCES_FEATURED.label}
              </h3>
              <p className="m-0 mt-[8px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
                {RESOURCES_FEATURED.description}
              </p>
              {RESOURCES_FEATURED.highlights ? (
                <ul className="m-0 mt-[14px] flex list-none flex-wrap gap-[8px] p-0">
                  {RESOURCES_FEATURED.highlights.map((item) => (
                    <li key={item} className="resources-featured__pill">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Link
              href={RESOURCES_FEATURED.href}
              className={cn(
                'inline-flex min-h-[44px] items-center justify-center gap-[8px] rounded-[12px] px-[18px]',
                'bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline',
                'transition-opacity duration-200 hover:opacity-90',
                focusRing,
              )}
            >
              {RESOURCES_FEATURED.ctaLabel}
              <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
            </Link>
          </div>
        </article>
      </Section>

      {RESOURCE_GROUPS.map((group) => (
        <Section
          key={group.id}
          spacing="lg"
          background={group.id === 'learning' ? 'default' : 'surface'}
          aria-labelledby={`resources-${group.id}-heading`}
          className="border-b border-border/40"
        >
          <MarketingSectionIntro
            className="section-intro-row"
            eyebrow={group.title}
            headingId={`resources-${group.id}-heading`}
            title={
              group.id === 'learning'
                ? 'Learn from delivery, not just theory'
                : 'Company resources and policies'
            }
            description={
              group.id === 'learning'
                ? 'Blog posts, case studies, guides, and FAQs for founders and product teams.'
                : 'Careers, contact, events, press, and the legal pages that keep engagement clear.'
            }
          />

          <MarketingStagger
            as="ul"
            className={cn(
              'm-0 mt-[24px] grid w-full list-none gap-[16px] p-0',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {group.items.map((item, index) => (
              <li
                key={item.slug}
                className="mkt-stagger__item min-w-0"
                style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
              >
                <Link href={item.href} className={cn('group resources-link-card', focusRing)}>
                  <div className="resources-link-card__head">
                    <span className="resources-link-card__icon" aria-hidden>
                      <Icon name={item.icon as IconName} size="sm" className="h-[16px] w-[16px]" />
                    </span>
                    <h3 className="resources-link-card__title">{item.label}</h3>
                  </div>
                  <p className="resources-link-card__desc">{item.description}</p>
                  <span className="resources-link-card__cta">
                    Explore
                    <Icon
                      name="arrow-right"
                      size="sm"
                      aria-hidden
                      className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-[2px]"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </MarketingStagger>
        </Section>
      ))}

      <ResourcesPageCta />
    </PageShell>
  );
}
