import type { ReactNode } from 'react';
import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import '@/features/services/services.css';

export interface MarketingHeroChip {
  id: string;
  label: string;
  icon: IconName;
}

export interface MarketingHeroStat {
  label: string;
  value: string;
}

interface MarketingIllustratedHeroProps {
  breadcrumbs?: readonly BreadcrumbItem[];
  eyebrow: string;
  eyebrowIcon?: IconName;
  title: string;
  titleHighlight?: string;
  description: string;
  supporting?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  headingId: string;
  /** @deprecated Prefer renderVisual for mobile-safe lazy instantiation */
  visual?: ReactNode;
  /** Renders hero artwork only on desktop-width requests (server UA / viewport gate). */
  renderVisual?: () => ReactNode;
  className?: string;
  trustItems?: readonly string[];
  chips?: readonly MarketingHeroChip[];
  chipsAriaLabel?: string;
  stats?: readonly MarketingHeroStat[];
  statsAriaLabel?: string;
  /** Default: chips then stats (Services). Use stats-first for Solutions. */
  metaLayout?: 'chips-first' | 'stats-first';
  showCenterAurora?: boolean;
  afterDescription?: ReactNode;
  afterCtas?: ReactNode;
}

/**
 * Shared two-column marketing hero shell.
 * Spacing, type, and CTAs match Homepage HeroSection.
 */
export async function MarketingIllustratedHero({
  breadcrumbs,
  eyebrow,
  eyebrowIcon = 'sparkles',
  title,
  titleHighlight,
  description,
  supporting,
  primaryCta,
  secondaryCta,
  headingId,
  visual,
  renderVisual,
  className,
  trustItems,
  chips,
  chipsAriaLabel = 'Highlights',
  stats,
  statsAriaLabel = 'Key metrics',
  metaLayout = 'chips-first',
  showCenterAurora = false,
  afterDescription,
  afterCtas,
}: MarketingIllustratedHeroProps) {
  const isMobile = await isMobileUserAgent();
  const visualNode = isMobile ? null : renderVisual ? renderVisual() : (visual ?? null);
  const resolvedTrustItems = isMobile ? trustItems?.slice(0, 2) : trustItems;
  const showSupporting = Boolean(supporting) && !isMobile;
  const showMeta = !isMobile;
  const showDecorations = !isMobile;
  const titleNode =
    titleHighlight && title.includes(titleHighlight) ? (
      <>
        {title.split(titleHighlight)[0]}
        <span className="hero-gradient-text">{titleHighlight}</span>
        {title.split(titleHighlight)[1] ?? ''}
      </>
    ) : (
      title
    );

  const chipsNode =
    showMeta && chips && chips.length > 0 ? (
      <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0" aria-label={chipsAriaLabel}>
        {chips.map((chip) => (
          <li key={chip.id}>
            <span className="services-page-chip">
              <Icon name={chip.icon} size="sm" aria-hidden className="h-[13px] w-[13px]" />
              {chip.label}
            </span>
          </li>
        ))}
      </ul>
    ) : null;

  const statsNode =
    showMeta && stats && stats.length > 0 ? (
      <dl
        className={cn('m-0 grid w-full max-w-xl grid-cols-2 gap-[10px]', 'sm:grid-cols-4')}
        aria-label={statsAriaLabel}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              'rounded-[var(--token-radius-lg)] border border-[color:var(--hp-card-border,var(--border))] bg-background/80 px-[12px] py-[10px]',
              'transition-[border-color,box-shadow] duration-200',
              'hover:border-primary/35 hover:shadow-[var(--token-shadow-md)]',
              'motion-reduce:transition-none',
            )}
          >
            <dt className="m-0 font-sans text-[18px] font-bold tracking-[-0.02em] text-foreground">
              {stat.value}
            </dt>
            <dd className="m-0 mt-[var(--space-0-5)] font-sans text-[11px] text-muted-foreground">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    ) : null;

  const metaNodes =
    metaLayout === 'stats-first' ? (
      <>
        {statsNode}
        {chipsNode}
      </>
    ) : (
      <>
        {chipsNode}
        {statsNode}
      </>
    );

  return (
    <Section
      spacing="lg"
      aria-labelledby={headingId}
      className={cn(
        'lux-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
        className,
      )}
    >
      {showDecorations ? (
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
          {showCenterAurora ? (
            <div
              className="pointer-events-none absolute top-1/3 left-1/2 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl hero-aurora-blend"
              aria-hidden
            />
          ) : null}
        </>
      ) : null}

      <div
        className={cn(
          'relative grid w-full grid-cols-1 items-center gap-[var(--space-8)]',
          'md:gap-[var(--space-10)]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-[var(--space-3)]',
        )}
      >
        <div className={cn('flex min-w-0 w-full flex-col gap-[14px]', 'md:gap-[16px]')}>
          {breadcrumbs ? <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" /> : null}

          {!isMobile ? (
            <p
              className={cn(
                'hero-eyebrow m-0 inline-flex items-center gap-[8px]',
                'rounded-full px-[14px] py-[8px]',
                'font-sans text-[11px] font-semibold uppercase tracking-[0.14em]',
              )}
            >
              <Icon
                name={eyebrowIcon}
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px] shrink-0"
              />
              <span>{eyebrow}</span>
            </p>
          ) : null}

          <h1
            id={headingId}
            className={cn(
              'hero-heading m-0 max-w-3xl font-sans font-semibold text-foreground text-balance',
              'leading-[1.1] tracking-[-0.04em]',
            )}
          >
            {titleNode}
          </h1>

          <p className="hero-description m-0 max-w-xl font-sans text-muted-foreground">
            {description}
          </p>

          {showSupporting ? (
            <p className="m-0 max-w-xl font-sans text-[12px] leading-[1.6] text-muted-foreground sm:text-[13px]">
              {supporting}
            </p>
          ) : null}

          {afterDescription}

          <div
            className={cn(
              'flex w-full flex-col gap-[var(--space-2)]',
              'sm:flex-row sm:flex-wrap sm:items-center',
            )}
          >
            <Link
              href={primaryCta.href}
              className="hero-cta hero-cta-primary"
              {...(primaryCta.href.startsWith('http')
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {})}
            >
              <span>{primaryCta.label}</span>
              <span className="hero-cta-arrow" aria-hidden>
                <Icon name="arrow-up-right" size="sm" className="h-[14px] w-[14px]" />
              </span>
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                {...(secondaryCta.href.startsWith('http')
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {})}
                className="hero-cta hero-cta-outline"
              >
                <span>{secondaryCta.label}</span>
                <span className="hero-cta-arrow" aria-hidden>
                  <Icon name="arrow-up-right" size="sm" className="h-[14px] w-[14px]" />
                </span>
              </Link>
            ) : null}
          </div>

          {resolvedTrustItems && resolvedTrustItems.length > 0 ? (
            <ul
              className="m-0 flex list-none flex-wrap gap-x-[16px] gap-y-[8px] p-0"
              aria-label="Trust indicators"
            >
              {resolvedTrustItems.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-[6px] font-sans text-[12px] font-medium text-muted-foreground sm:text-[13px]"
                >
                  <span className="services-page-check !h-[20px] !w-[20px] !rounded-[6px]">
                    <Icon name="check" size="sm" aria-hidden className="h-[11px] w-[11px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {metaNodes}

          {afterCtas}
        </div>

        {visualNode ? (
          <div className="marketing-hero-visual min-h-full min-w-0 w-full h-full">{visualNode}</div>
        ) : null}
      </div>
    </Section>
  );
}
