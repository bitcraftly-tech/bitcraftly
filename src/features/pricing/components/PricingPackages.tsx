'use client';

import Link from 'next/link';
import { useState } from 'react';
import { bcButtonClassName } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import {
  PRICING_PACKAGES,
  PRICING_PACKAGES_META,
  PRICING_PACKAGE_TABS,
  type PricingPackageTabId,
} from '../pricing.content';

const popularCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'md',
  fullWidth: true,
  className: 'h-[44px]',
});

const defaultCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'md',
  fullWidth: true,
  className: 'h-[44px]',
});

export function PricingPackages() {
  const [tab, setTab] = useState<PricingPackageTabId>('websites');
  const packages = PRICING_PACKAGES[tab];

  return (
    <Section
      id="pricing-packages"
      spacing="lg"
      aria-labelledby="pricing-packages-heading"
      className="pp-packages-section"
    >
      <div className="pp-section-head">
        <p className="pp-section-eyebrow">{PRICING_PACKAGES_META.eyebrow}</p>
        <h2 id="pricing-packages-heading" className="pp-section-title">
          {PRICING_PACKAGES_META.title}
        </h2>
        <p className="pp-section-desc">{PRICING_PACKAGES_META.description}</p>
      </div>

      <div className="pp-tabs" role="tablist" aria-label="Package categories">
        {PRICING_PACKAGE_TABS.map((item) => {
          const selected = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn('pp-tabs__btn', selected && 'is-active')}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="pp-packages" role="tabpanel">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className={cn('pp-package', pkg.popular && 'is-popular')}
            aria-label={pkg.name}
          >
            {pkg.popular ? (
              <span className="pp-package__badge">
                <Icon name="star" size="sm" aria-hidden className="h-[11px] w-[11px]" />
                Most Popular
              </span>
            ) : null}
            <div className="pp-package__top">
              <h3 className="pp-package__name">{pkg.name}</h3>
              <p className="pp-package__desc">{pkg.description}</p>
            </div>
            <div className="pp-package__price-block">
              <span className="pp-package__suffix">{pkg.priceSuffix}</span>
              <p className="pp-package__price">{pkg.priceLabel}</p>
            </div>
            <ul className="pp-package__features">
              {pkg.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" size="sm" aria-hidden className="h-[14px] w-[14px]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pp-package__cta">
              <Link
                href={pkg.ctaHref}
                className={pkg.popular ? popularCtaClassName : defaultCtaClassName}
              >
                {pkg.ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="pp-packages-meta">
        <p className="pp-packages-decision">{PRICING_PACKAGES_META.decisionCue}</p>
        <ul className="pp-trust-strip" aria-label="Pricing guarantees">
          {PRICING_PACKAGES_META.trustItems.map((item) => (
            <li key={item}>
              <Icon name="check" size="sm" aria-hidden className="h-[13px] w-[13px]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pp-packages-footnote">{PRICING_PACKAGES_META.footnote}</p>
        <Link href={PRICING_PACKAGES_META.compareHref} className="pp-packages-compare">
          {PRICING_PACKAGES_META.compareLabel}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>
    </Section>
  );
}
