import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { PRICING_HERO } from '../pricing.content';
import { PricingAiEstimator } from './PricingAiEstimator';

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[48px] px-[20px]',
});

const secondaryCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'lg',
  className: 'h-[48px] px-[20px]',
});

export function PricingPageHero() {
  return (
    <section className="pp-hero" aria-labelledby="pricing-page-heading">
      <Container size="xl">
        <div className="pp-hero__grid">
          <div>
            <p className="pp-hero__eyebrow">{PRICING_HERO.eyebrow}</p>
            <h1 id="pricing-page-heading" className="pp-hero__title">
              {PRICING_HERO.titleBefore}{' '}
              <span className="pp-hero__highlight">{PRICING_HERO.titleHighlight}</span>
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
                    <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <PricingAiEstimator compact />
        </div>
      </Container>
    </section>
  );
}
