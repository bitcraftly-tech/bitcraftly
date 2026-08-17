import Image from 'next/image';
import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { WorkHeroVisual } from './WorkHeroVisual';
import './work.css';

export interface WorkInternalHeroMetric {
  id: string;
  value: string;
  label: string;
}

export interface WorkInternalHeroCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface WorkInternalHeroCover {
  src: string;
  alt: string;
  hostname?: string;
  badge?: string;
}

interface WorkInternalHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  headingId: string;
  eyebrow: string;
  eyebrowIcon?: IconName;
  title: string;
  titleMark?: string;
  description: string;
  primaryCta: WorkInternalHeroCta;
  secondaryCta: WorkInternalHeroCta;
  chips?: readonly string[];
  metrics?: readonly WorkInternalHeroMetric[];
  cover?: WorkInternalHeroCover;
}

/**
 * Shared Work internal hero — same aurora / work-hero shell as the Work landing page.
 */
export async function WorkInternalHero({
  breadcrumbs,
  headingId,
  eyebrow,
  eyebrowIcon = 'sparkles',
  title,
  titleMark,
  description,
  primaryCta,
  secondaryCta,
  chips,
  metrics,
  cover,
}: WorkInternalHeroProps) {
  const isMobile = await isMobileUserAgent();
  const [titleBefore, titleAfter] =
    titleMark && title.includes(titleMark) ? title.split(titleMark) : [title, ''];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'lux-hero work-hero relative overflow-hidden hero-surface',
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

      <Container size="xl" className="work-hero__container">
        <div className="work-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="work-hero__grid">
          <div className="work-hero__content">
            <p className="work-hero__eyebrow">
              <Icon name={eyebrowIcon} size="sm" aria-hidden className="work-hero__eyebrow-icon" />
              <span>{eyebrow}</span>
            </p>

            <h1 id={headingId} className="work-hero__title">
              {titleMark && title.includes(titleMark) ? (
                <>
                  {titleBefore.trimEnd()} <span className="work-hero__title-mark">{titleMark}</span>
                  {titleAfter}
                </>
              ) : (
                title
              )}
            </h1>

            <p className="work-hero__description">{description}</p>

            <div className="work-hero__cta-row">
              <Link
                href={primaryCta.href}
                className="work-hero__btn work-hero__btn--primary"
                {...(primaryCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={secondaryCta.href}
                className="work-hero__btn work-hero__btn--outline"
                {...(secondaryCta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {secondaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile && chips && chips.length > 0 ? (
              <ul className="work-detail-hero__chips" aria-label="Tags">
                {chips.map((chip) => (
                  <li key={chip}>
                    <span className="work-detail-hero__chip">{chip}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="work-hero__visual">
              {cover ? (
                <div className="work-detail-hero__cover">
                  {cover.hostname || cover.badge ? (
                    <div className="work-detail-hero__cover-bar">
                      <span className="work-detail-hero__cover-dots" aria-hidden>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="work-detail-hero__cover-host">
                        {cover.hostname ?? cover.badge}
                      </span>
                    </div>
                  ) : null}
                  <div className="work-detail-hero__cover-frame">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              ) : (
                <WorkHeroVisual />
              )}
            </div>
          ) : null}
        </div>

        {!isMobile && metrics && metrics.length > 0 ? (
          <dl className="work-hero-stats" aria-label="Project highlights">
            {metrics.map((stat) => (
              <div key={stat.id} className="work-hero-stats__item">
                <div className="work-hero-stats__head">
                  <dt className="work-hero-stats__value">{stat.value}</dt>
                </div>
                <dd className="work-hero-stats__label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </Section>
  );
}
