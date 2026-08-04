import Link from 'next/link';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { PRICING_FAQ, PRICING_FAQ_META } from '../pricing.content';

/**
 * Pricing FAQ — canonical FaqAccordion treatment.
 */
export function PricingFaq() {
  return (
    <Section id="pricing-faq" spacing="lg" aria-labelledby="pricing-faq-heading">
      <div className="flex flex-col gap-[var(--space-4)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p
            className={cn(
              'faq-label m-0 mb-[var(--space-2)]',
              'font-sans text-[12px] font-[var(--font-weight-semibold)]',
              'uppercase tracking-[0.16em]',
            )}
          >
            {PRICING_FAQ_META.eyebrow}
          </p>
          <h2
            id="pricing-faq-heading"
            className={cn(
              'm-0 font-sans font-bold text-foreground',
              'text-[28px] leading-[1.2] tracking-[-0.02em]',
              'sm:text-[32px] lg:text-[34px]',
            )}
          >
            {PRICING_FAQ_META.title}
          </h2>
        </div>
        <Link
          href={PRICING_FAQ_META.viewAllHref}
          className={cn(
            'inline-flex items-center gap-[4px] font-sans text-[14px] font-semibold',
            'text-primary no-underline hover:opacity-80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          {PRICING_FAQ_META.viewAllLabel}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>

      <div className="mt-[var(--space-8)]">
        <FaqAccordion items={[...PRICING_FAQ]} />
      </div>
    </Section>
  );
}
