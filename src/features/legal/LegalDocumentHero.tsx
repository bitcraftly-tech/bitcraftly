import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import type { LegalDocument } from './legal.content';
import { LegalHeroVisual } from './LegalHeroVisual';
import { LegalSiteNav, type LegalSiteNavActive } from './LegalSiteNav';
import './legal.css';

interface LegalDocumentHeroProps {
  document: LegalDocument;
  headingId: string;
  breadcrumbs: readonly BreadcrumbItem[];
  activeNav: LegalSiteNavActive;
}

const PRIVACY_FEATURES: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'transparent',
    title: 'Transparent use',
    description: 'Clear purposes for every data touchpoint',
    icon: 'sparkles',
    tone: 'violet',
  },
  {
    id: 'secure',
    title: 'Secure storage',
    description: 'Reasonable controls on modern infrastructure',
    icon: 'shield',
    tone: 'sky',
  },
  {
    id: 'rights',
    title: 'Your rights',
    description: 'Access, correction, export, or deletion',
    icon: 'check',
    tone: 'emerald',
  },
  {
    id: 'response',
    title: 'Verified handling',
    description: 'We act on confirmed requests promptly',
    icon: 'zap',
    tone: 'amber',
  },
] as const;

const TERMS_FEATURES: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'clear',
    title: 'Clear acceptance',
    description: 'Using the site means these terms apply',
    icon: 'check',
    tone: 'violet',
  },
  {
    id: 'scope',
    title: 'Defined scope',
    description: 'Web, apps, and custom work as agreed',
    icon: 'layout-grid',
    tone: 'sky',
  },
  {
    id: 'payments',
    title: 'Milestone payments',
    description: 'Written quotes before work begins',
    icon: 'zap',
    tone: 'emerald',
  },
  {
    id: 'fair',
    title: 'Fair engagement',
    description: 'India law · clear liability limits',
    icon: 'shield',
    tone: 'amber',
  },
] as const;

/**
 * Legal document hero — Services shell language (aurora, grid, CTAs, visual).
 */
export async function LegalDocumentHero({
  document,
  headingId,
  breadcrumbs,
  activeNav,
}: LegalDocumentHeroProps) {
  const isMobile = await isMobileUserAgent();
  const highlight = document.titleHighlight;
  const titleParts = highlight ? document.title.split(highlight) : [document.title, ''];

  const primaryHref = `#${document.sections[0]?.id ?? ''}`;
  const isTerms = activeNav === 'terms';
  const primaryLabel = isTerms ? 'Read terms' : 'Read policy';
  const features = isTerms ? TERMS_FEATURES : PRIVACY_FEATURES;
  const featuresLabel = isTerms ? 'Engagement principles' : 'Privacy principles';

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'lux-hero legal-hero relative overflow-hidden hero-surface',
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

      <Container size="xl" className="legal-hero__container">
        <div className="legal-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="legal-hero__grid">
          <div className="legal-hero__content">
            <p className="legal-hero__eyebrow">
              <Icon name="shield" size="sm" aria-hidden className="legal-hero__eyebrow-icon" />
              <span>{document.eyebrow}</span>
            </p>

            <h1 id={headingId} className="legal-hero__title">
              {titleParts[0]}
              {highlight ? <span className="legal-hero__title-accent">{highlight}</span> : null}
              {titleParts[1] ?? ''}
            </h1>

            <p className="legal-hero__description">{document.description}</p>
            <p className="legal-hero__updated">{document.updatedLabel}</p>

            <LegalSiteNav active={activeNav} className="legal-hero__site-nav" />

            <div className="legal-hero__cta-row">
              <a href={primaryHref} className="legal-hero__btn legal-hero__btn--primary">
                {primaryLabel}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </a>
              <Link href={ROUTES.trust} className="legal-hero__btn legal-hero__btn--outline">
                Trust Center
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>
          </div>

          {!isMobile ? (
            <div className="legal-hero__visual">
              <LegalHeroVisual variant={isTerms ? 'terms' : 'privacy'} />
            </div>
          ) : null}

          {!isMobile ? (
            <ul className="legal-hero-features" aria-label={featuresLabel}>
              {features.map((item) => (
                <li key={item.id} className="legal-hero-features__item">
                  <span className="legal-hero-features__head">
                    <span
                      className={`legal-hero-features__icon legal-hero-features__icon--${item.tone}`}
                      aria-hidden
                    >
                      <Icon name={item.icon} size="sm" />
                    </span>
                    <span className="legal-hero-features__title">{item.title}</span>
                  </span>
                  <span className="legal-hero-features__desc">{item.description}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
