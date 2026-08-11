import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { PRICING_HERO } from '../pricing.content';
import { PricingAiEstimator } from './PricingAiEstimator';

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] px-[24px]',
});

const secondaryCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'lg',
  className: 'h-[50px] px-[24px] pp-hero__cta-secondary',
});

export function PricingPageHero() {
  return (
    <section className="pp-hero" aria-labelledby="pricing-page-heading">
      <div className="pp-hero__atmosphere" aria-hidden="true">
        <span className="pp-hero__orb pp-hero__orb--a" />
        <span className="pp-hero__orb pp-hero__orb--b" />
        <span className="pp-hero__orb pp-hero__orb--c" />
      </div>

      <Container size="xl">
        <div className="pp-hero__grid">
          <div className="pp-hero__copy">
            <p className="pp-hero__badge">
              <span className="pp-hero__badge-tag">
                <span className="pp-hero__badge-dot" aria-hidden="true" />
                <span className="pp-hero__badge-text">{PRICING_HERO.eyebrow}</span>
              </span>
            </p>

            <h1 id="pricing-page-heading" className="pp-hero__title">
              <span className="pp-hero__title-line">{PRICING_HERO.titleBefore}</span>
              <span className="pp-hero__highlight-wrap">
                <span className="pp-hero__highlight">{PRICING_HERO.titleHighlight}</span>
                <span className="pp-hero__highlight-underline" aria-hidden="true" />
              </span>
            </h1>

            <p className="pp-hero__desc">{PRICING_HERO.description}</p>

            <div className="pp-hero__actions">
              <Link href={PRICING_HERO.primaryCta.href} className={primaryCtaClassName}>
                <span>{PRICING_HERO.primaryCta.label}</span>
                <ButtonArrow className="text-[15px]" />
              </Link>
              <Link href={PRICING_HERO.secondaryCta.href} className={secondaryCtaClassName}>
                {PRICING_HERO.secondaryCta.label}
              </Link>
            </div>

            <ul className="pp-hero__trust">
              {PRICING_HERO.trustItems.map((item) => (
                <li key={item}>
                  <span className="pp-hero__trust-icon" aria-hidden>
                    <Icon name="check" size="sm" className="h-[12px] w-[12px]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pp-hero__stage">
            <div className="pp-hero__stage-glow" aria-hidden="true" />
            <div className="pp-hero__stage-shell">
              <PricingAiEstimator compact />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
