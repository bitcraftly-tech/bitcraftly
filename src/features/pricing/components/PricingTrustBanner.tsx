import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { PRICING_TRUST_BANNER } from '../pricing.content';

const ctaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[48px] px-[20px]',
});

export function PricingTrustBanner() {
  return (
    <Section
      id="pricing-trust-banner"
      spacing="lg"
      aria-labelledby="pricing-trust-banner-heading"
      className="pp-trust-banner-section"
    >
      <div className="pp-trust-banner">
        <div className="pp-trust-banner__copy">
          <h2 id="pricing-trust-banner-heading" className="pp-trust-banner__title">
            {PRICING_TRUST_BANNER.title}
          </h2>
          <p className="pp-trust-banner__desc">{PRICING_TRUST_BANNER.description}</p>
        </div>
        <Link href={PRICING_TRUST_BANNER.cta.href} className={ctaClassName}>
          <span>{PRICING_TRUST_BANNER.cta.label}</span>
          <ButtonArrow className="text-[15px]" />
        </Link>
      </div>
    </Section>
  );
}
