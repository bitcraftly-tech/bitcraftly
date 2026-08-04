import Link from 'next/link';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { AI_FAQ, AI_FAQ_META } from './ai-solutions.content';

/**
 * AI Solutions FAQ — canonical FaqAccordion treatment.
 */
export function AiSolutionsFaq() {
  return (
    <Section
      id="ai-solutions-faq"
      spacing="lg"
      aria-labelledby="ai-solutions-faq-heading"
      className="border-b border-border/40 bg-background text-foreground"
    >
      <div className="flex flex-col gap-[var(--space-4)] sm:flex-row sm:items-end sm:justify-between">
        <header className="max-w-2xl">
          <p
            className={cn(
              'faq-label m-0 mb-[var(--space-2)]',
              'font-sans text-[12px] font-[var(--font-weight-semibold)]',
              'uppercase tracking-[0.16em]',
            )}
          >
            {AI_FAQ_META.eyebrow}
          </p>
          <h2
            id="ai-solutions-faq-heading"
            className={cn(
              'm-0 font-sans font-bold text-foreground',
              'text-[28px] leading-[1.2] tracking-[-0.02em]',
              'sm:text-[32px] lg:text-[34px]',
            )}
          >
            {AI_FAQ_META.title}
          </h2>
          <p
            className={cn(
              'm-0 mt-[var(--space-2)] max-w-2xl',
              'font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground',
              'sm:text-[16px]',
            )}
          >
            {AI_FAQ_META.description}
          </p>
        </header>
        <Link
          href={AI_FAQ_META.viewAllHref}
          className={cn(
            'inline-flex shrink-0 items-center gap-[4px] font-sans text-[14px] font-semibold',
            'text-primary no-underline hover:opacity-80',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          )}
        >
          {AI_FAQ_META.viewAllLabel}
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
        </Link>
      </div>

      <div className="mt-[var(--space-8)]">
        <FaqAccordion items={[...AI_FAQ]} />
      </div>
    </Section>
  );
}
