import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';

export function CaseStudyCta() {
  return (
    <Section
      id="cta"
      spacing="lg"
      background="default"
      aria-labelledby="case-cta-heading"
      className="border-b border-border/50"
    >
      <div className="case-study-cta-card rounded-[18px] border border-border bg-surface/60 card-padding">
        <div className="case-study-cta-card__copy max-w-xl">
          <h2
            id="case-cta-heading"
            className="m-0 font-sans text-[24px] font-semibold tracking-[-0.02em] text-foreground"
          >
            Want outcomes like this for your product?
          </h2>
          <p className="m-0 font-sans text-[14px] leading-[1.65] text-muted-foreground">
            Book a free consultation. We’ll map scope, constraints, and a realistic delivery plan.
          </p>
        </div>
        <div className="case-study-cta-card__actions flex flex-wrap gap-[var(--space-sm)]">
          <Link
            href={NAV_ACTIONS.freeConsultation.href}
            className={cn(
              'inline-flex h-[44px] items-center gap-[8px] rounded-[12px] px-[18px]',
              'bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline',
            )}
          >
            {NAV_ACTIONS.freeConsultation.label}
            <Icon name="arrow-up-right" size="sm" aria-hidden />
          </Link>
          <Link
            href={ROUTES.work}
            className="inline-flex h-[44px] items-center rounded-[12px] border border-border px-[18px] font-sans text-[14px] font-semibold text-foreground no-underline"
          >
            View all work
          </Link>
        </div>
      </div>
    </Section>
  );
}
