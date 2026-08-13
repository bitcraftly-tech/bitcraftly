import Image from 'next/image';
import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { WORK_LANDING } from './work.content';
import { getWorkHubHeroConfig } from './work.hub-heroes';
import type { WorkProject } from './work.types';
import './work.css';

interface WorkCollectionHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  headingId: string;
  hubSlug: string;
  hubTitle: string;
  description: string;
  projects: readonly WorkProject[];
}

/**
 * Shared redesigned hero for Work mega-menu / hub collection pages.
 */
export async function WorkCollectionHero({
  breadcrumbs,
  headingId,
  hubSlug,
  hubTitle,
  description,
  projects,
}: WorkCollectionHeroProps) {
  const isMobile = await isMobileUserAgent();
  const config = getWorkHubHeroConfig(hubSlug, hubTitle);
  const featured = projects[0];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'work-hero work-collection-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-45 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-18 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[8%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-12)] -left-[10%] size-[480px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="work-hero__container work-collection-hero__container">
        <div className="work-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="work-collection-hero__grid">
          <div className="work-collection-hero__content">
            <p className="work-hero__eyebrow">
              <Icon
                name={config.eyebrowIcon}
                size="sm"
                aria-hidden
                className="work-hero__eyebrow-icon"
              />
              <span>{config.eyebrow}</span>
            </p>

            <h1 id={headingId} className="work-collection-hero__title">
              {config.titleBefore ? `${config.titleBefore} ` : null}
              <span className="work-hero__title-mark">{config.titleMark}</span>
              {config.titleAfter ? ` ${config.titleAfter}` : null}
            </h1>

            <p className="work-collection-hero__description">{description}</p>

            <div className="work-hero__cta-row">
              <Link
                href={NAV_ACTIONS.freeConsultation.href}
                className="work-hero__btn work-hero__btn--primary"
              >
                {WORK_LANDING.primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link href={ROUTES.work} className="work-hero__btn work-hero__btn--outline">
                Browse all work
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            <ul className="work-collection-hero__chips" aria-label={`${hubTitle} strengths`}>
              {config.chips.map((chip) => (
                <li key={chip}>
                  <span className="work-collection-hero__chip">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="work-collection-hero__visual" aria-label={`${hubTitle} preview`}>
            <div className="work-collection-hero__stage">
              {featured ? (
                <article className="work-collection-hero__preview">
                  <div className="work-collection-hero__preview-bar" aria-hidden>
                    <span className="work-collection-hero__preview-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="work-collection-hero__preview-host">
                      {featured.previewHost ?? 'bitcraftly.com'}
                    </span>
                    <span className="work-collection-hero__live">
                      {featured.badge ?? 'Showcase'}
                    </span>
                  </div>
                  <div className="work-collection-hero__preview-frame">
                    <Image
                      src={featured.coverImage}
                      alt={featured.coverImageAlt ?? `${featured.title} showcase`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="work-collection-hero__preview-meta">
                    <div>
                      <p className="work-collection-hero__preview-title">{featured.title}</p>
                      <p className="work-collection-hero__preview-summary">{featured.summary}</p>
                    </div>
                    {featured.industry ? (
                      <span className="work-collection-hero__preview-badge">
                        {featured.industry}
                      </span>
                    ) : null}
                  </div>
                </article>
              ) : null}

              {!isMobile ? (
                <ul className="work-collection-hero__caps" aria-label={`${hubTitle} highlights`}>
                  {config.capabilities.map((item) => (
                    <li key={item.id} className="work-collection-hero__cap">
                      <span className="work-collection-hero__cap-icon" aria-hidden>
                        <Icon name="sparkles" size="sm" />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <span className="work-collection-hero__cap-detail">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <dl className="work-collection-hero__stats" aria-label={`${hubTitle} delivery highlights`}>
          {config.stats.map((stat) => (
            <div key={stat.id} className="work-collection-hero__stat">
              <dt className="work-collection-hero__stat-value">{stat.value}</dt>
              <dd className="work-collection-hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
