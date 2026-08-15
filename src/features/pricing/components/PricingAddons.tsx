import Link from 'next/link';
import { bcButtonClassName } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { PRICING_ADDONS, PRICING_ADDONS_META } from '../pricing.content';

const consultCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  className: 'mt-[4px] h-[44px] w-full sm:w-auto',
});

export function PricingAddons() {
  return (
    <Section
      id="pricing-addons"
      spacing="lg"
      aria-labelledby="pricing-addons-heading"
      className="pp-section--soft"
    >
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_ADDONS_META.eyebrow}</p>
        <h2 id="pricing-addons-heading" className="pp-section-title">
          {PRICING_ADDONS_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_ADDONS_META.description}</p>
      </div>

      <div className="pp-addons">
        <div className="pp-addons__grid">
          {PRICING_ADDONS.map((addon) => (
            <article key={addon.id} className="pp-addon">
              <span className="pp-addon__icon" aria-hidden>
                <Icon name={addon.icon} size="sm" className="h-[16px] w-[16px]" />
              </span>
              <p className="pp-addon__label">{addon.label}</p>
              <p className="pp-addon__price">{addon.priceLabel}</p>
            </article>
          ))}
        </div>

        <aside className="pp-consult" aria-label={PRICING_ADDONS_META.consultTitle}>
          <h3 className="pp-consult__title">{PRICING_ADDONS_META.consultTitle}</h3>
          <p className="pp-consult__body">{PRICING_ADDONS_META.consultBody}</p>
          <ul className="pp-consult__points">
            {PRICING_ADDONS_META.consultPoints.map((point) => (
              <li key={point}>
                <Icon
                  name="check"
                  size="sm"
                  aria-hidden
                  className="h-[14px] w-[14px] text-primary"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="pp-consult__visual" aria-hidden />
          <Link href={PRICING_ADDONS_META.consultCta.href} className={consultCtaClassName}>
            {PRICING_ADDONS_META.consultCta.label}
          </Link>
        </aside>
      </div>
    </Section>
  );
}
