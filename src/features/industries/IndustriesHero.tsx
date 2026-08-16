import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { INDUSTRIES_LANDING } from './industries.content';
import { IndustriesHeroPanel } from './IndustriesHeroPanel';
import { IndustriesTrustedBy } from './IndustriesTrustedBy';
import './industries.css';

interface IndustriesHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

/**
 * Industries-only hero — Corporate / Trust treatment.
 *
 * Reading order is credibility-first: positioning, then actions, then the
 * assurance checklist, then a ruled credentials band. Surface, type and accents
 * come from the shared `lux-hero--corporate` variant.
 */
export async function IndustriesHero({ breadcrumbs }: IndustriesHeroProps) {
  const isMobile = await isMobileUserAgent();
  const title = INDUSTRIES_LANDING.title;
  const highlight = INDUSTRIES_LANDING.titleHighlight;
  const [titleBefore, titleAfter] = title.includes(highlight)
    ? title.split(highlight)
    : [title, ''];

  return (
    <Section
      spacing="lg"
      aria-labelledby="industries-page-heading"
      className={cn(
        'lux-hero lux-hero--corporate industries-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
      )}
    >
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

          <p className="industries-hero__description">{INDUSTRIES_LANDING.description}</p>

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
            {INDUSTRIES_LANDING.trust.map((item) => (
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

          <ul className="industries-hero__highlights" aria-label="Why Bitcraftly for industries">
            {INDUSTRIES_LANDING.highlights.map((item) => (
              <li key={item.id} className="industries-hero__highlight">
                <div className="industries-hero__highlight-head">
                  <span className="industries-hero__highlight-icon" aria-hidden>
                    <Icon name={item.icon} size="sm" className="h-[16px] w-[16px]" />
                  </span>
                  <span className="industries-hero__highlight-title">{item.title}</span>
                </div>
                <p className="industries-hero__highlight-desc">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {!isMobile ? <IndustriesHeroPanel /> : null}
      </div>

      {!isMobile ? <IndustriesTrustedBy /> : null}
    </Section>
  );
}
