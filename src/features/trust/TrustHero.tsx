import Link from 'next/link';
import { AnimatedStat } from '@/components/patterns/animated-stat';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { LegalSiteNav } from '@/features/legal/LegalSiteNav';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { getTrustOverviewStats, TRUST_LANDING } from './trust.content';
import { TrustHeroVisual } from './TrustHeroVisual';
import './trust.css';

interface TrustHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

const HERO_FEATURES: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'public',
    title: 'Public summaries',
    description: 'Approved standards visible to visitors',
    icon: 'globe',
    tone: 'violet',
  },
  {
    id: 'governed',
    title: 'Governed areas',
    description: 'Business through Responsible AI coverage',
    icon: 'layout-grid',
    tone: 'sky',
  },
  {
    id: 'access',
    title: 'Controlled access',
    description: 'Full library stays in the dashboard',
    icon: 'shield',
    tone: 'emerald',
  },
  {
    id: 'founder',
    title: 'Founder-led',
    description: 'Clear ownership and accountability',
    icon: 'star',
    tone: 'amber',
  },
] as const;

/**
 * Trust Center hero — Services shell + https://bitcraftly.com/trust copy.
 */
export async function TrustHero({ breadcrumbs }: TrustHeroProps) {
  const isMobile = await isMobileUserAgent();
  const stats = getTrustOverviewStats();
  const highlight = TRUST_LANDING.titleHighlight;
  const titleParts = TRUST_LANDING.title.split(highlight);

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby="trust-page-heading"
      className={cn(
        'trust-hero relative overflow-hidden hero-surface',
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

      <Container size="xl" className="trust-hero__container">
        <div className="trust-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="trust-hero__grid">
          <div className="trust-hero__content">
            <p className="trust-hero__eyebrow">
              <Icon name="shield" size="sm" aria-hidden className="trust-hero__eyebrow-icon" />
              <span>{TRUST_LANDING.eyebrow}</span>
            </p>

            <h1 id="trust-page-heading" className="trust-hero__title">
              {titleParts[0]}
              <span className="trust-hero__title-accent">{highlight}</span>
              {titleParts[1] ?? ''}
            </h1>

            <p className="trust-hero__description">{TRUST_LANDING.description}</p>

            <LegalSiteNav active="trust" className="trust-hero__site-nav" />

            <div className="trust-hero__cta-row">
              <a
                href={TRUST_LANDING.primaryCta.href}
                className="trust-hero__btn trust-hero__btn--primary"
              >
                {TRUST_LANDING.primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </a>
              <a
                href={TRUST_LANDING.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="trust-hero__btn trust-hero__btn--outline"
              >
                {TRUST_LANDING.secondaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </a>
            </div>

            {!isMobile ? (
              <div className="trust-hero-stats" role="list" aria-label="Trust Center overview">
                <div role="listitem" className="trust-hero-stats__item">
                  <dl className="trust-hero-stats__pair m-0">
                    <dt className="trust-hero-stats__value">
                      <span className="trust-hero-stats__head">
                        <span
                          className="trust-hero-stats__icon trust-hero-stats__icon--violet"
                          aria-hidden
                        >
                          <Icon name="layout-grid" size="sm" />
                        </span>
                        <AnimatedStat value={`${stats.governedAreas}`} />
                      </span>
                    </dt>
                    <dd className="trust-hero-stats__label">Governed areas</dd>
                  </dl>
                </div>
                <div role="listitem" className="trust-hero-stats__item">
                  <dl className="trust-hero-stats__pair m-0">
                    <dt className="trust-hero-stats__value">
                      <span className="trust-hero-stats__head">
                        <span
                          className="trust-hero-stats__icon trust-hero-stats__icon--sky"
                          aria-hidden
                        >
                          <Icon name="check" size="sm" />
                        </span>
                        <span className="trust-hero-stats__value-text">
                          <AnimatedStat value={`${stats.approvedPdfs}`} />
                          <span className="trust-hero-stats__suffix"> approved</span>
                        </span>
                      </span>
                    </dt>
                    <dd className="trust-hero-stats__label">Public PDFs</dd>
                  </dl>
                </div>
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="trust-hero__visual">
              <TrustHeroVisual />
            </div>
          ) : null}

          {!isMobile ? (
            <ul className="trust-hero-features" aria-label="Trust Center principles">
              {HERO_FEATURES.map((item) => (
                <li key={item.id} className="trust-hero-features__item">
                  <span className="trust-hero-features__head">
                    <span
                      className={`trust-hero-features__icon trust-hero-features__icon--${item.tone}`}
                      aria-hidden
                    >
                      <Icon name={item.icon} size="sm" />
                    </span>
                    <span className="trust-hero-features__title">{item.title}</span>
                  </span>
                  <span className="trust-hero-features__desc">{item.description}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
