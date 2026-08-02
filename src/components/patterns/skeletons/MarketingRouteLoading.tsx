import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';
import {
  BlogCardSkeleton,
  CardGridSkeleton,
  CaseStudyCardSkeleton,
  PricingCardSkeleton,
  ServiceCardSkeleton,
} from './CardSkeletons';
import { HeroLoadingSkeleton } from './HeroLoadingSkeleton';

export type MarketingLoadingVariant =
  'default' | 'hub' | 'pricing' | 'blog' | 'case-study' | 'detail';

interface MarketingRouteLoadingProps {
  variant?: MarketingLoadingVariant;
  compact?: boolean;
  className?: string;
}

function SectionBlockSkeleton({ className }: { className?: string }) {
  return (
    <Section spacing="lg" className={cn('border-b border-border/40', className)} aria-hidden="true">
      <Container size="xl">
        <div className="mx-auto mb-[var(--space-4)] flex max-w-[640px] flex-col items-center gap-[var(--space-2)] text-center">
          <Skeleton className="h-[12px] w-[120px]" />
          <Skeleton className="h-[28px] w-[min(420px,90%)]" />
          <Skeleton className="h-[14px] w-[min(520px,95%)]" />
        </div>
      </Container>
    </Section>
  );
}

/** Route-level marketing loading shell — never fullscreen spinner. */
export function MarketingRouteLoading({
  variant = 'default',
  compact = false,
  className,
}: MarketingRouteLoadingProps) {
  return (
    <div className={cn('marketing-route-loading', className)} aria-live="polite">
      <HeroLoadingSkeleton compact={compact} />

      <Section spacing="lg" className="border-b border-border/40">
        <Container size="xl">
          {variant === 'pricing' ? (
            <div className="grid gap-[var(--space-3)] md:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <PricingCardSkeleton key={`pricing-skeleton-${index}`} />
              ))}
            </div>
          ) : null}

          {variant === 'hub' ? (
            <div className="grid gap-[var(--space-3)] sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <ServiceCardSkeleton key={`service-skeleton-${index}`} />
              ))}
            </div>
          ) : null}

          {variant === 'blog' ? (
            <div className="grid gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <BlogCardSkeleton key={`blog-skeleton-${index}`} />
              ))}
            </div>
          ) : null}

          {variant === 'case-study' ? (
            <div className="flex flex-col gap-[var(--space-3)]">
              {Array.from({ length: 4 }, (_, index) => (
                <CaseStudyCardSkeleton key={`case-study-skeleton-${index}`} />
              ))}
            </div>
          ) : null}

          {variant === 'default' || variant === 'detail' ? (
            <CardGridSkeleton count={variant === 'detail' ? 3 : 6} columns={3} />
          ) : null}
        </Container>
      </Section>

      {variant !== 'detail' ? <SectionBlockSkeleton /> : null}
    </div>
  );
}

/** Homepage below-fold Suspense fallbacks — reserve space, zero CLS. */
export function TestimonialsSectionSkeleton() {
  return (
    <Section
      spacing="lg"
      className="homepage-section bg-surface"
      aria-busy="true"
      aria-label="Loading testimonials"
    >
      <Container size="xl">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-[var(--space-3)]">
          <Skeleton className="h-[12px] w-[120px]" />
          <Skeleton className="h-[32px] w-[min(480px,90%)]" />
          <Skeleton className="h-[14px] w-[min(560px,95%)]" />
          <Skeleton className="mt-[var(--space-2)] min-h-[220px] w-full rounded-[var(--token-radius-xl)]" />
        </div>
      </Container>
    </Section>
  );
}

export function FaqSectionSkeleton() {
  return (
    <Section spacing="lg" className="homepage-section" aria-busy="true" aria-label="Loading FAQ">
      <Container size="md">
        <div className="mx-auto flex max-w-[640px] flex-col gap-[var(--space-3)]">
          <Skeleton className="mx-auto h-[28px] w-[220px]" />
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={`faq-skeleton-${index}`}
              className="h-[56px] w-full rounded-[var(--token-radius-md)]"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function CalculatorSectionSkeleton() {
  return (
    <Section
      spacing="lg"
      className="homepage-section"
      aria-busy="true"
      aria-label="Loading calculator"
    >
      <Container size="lg">
        <Skeleton className="mx-auto mb-[var(--space-4)] h-[28px] w-[min(360px,80%)]" />
        <Skeleton className="mx-auto min-h-[320px] w-full max-w-[720px] rounded-[var(--token-radius-xl)]" />
      </Container>
    </Section>
  );
}

export function PortfolioSectionSkeleton() {
  return (
    <Section
      spacing="lg"
      className="homepage-section"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <Container size="xl">
        <Skeleton className="mx-auto mb-[var(--space-4)] h-[28px] w-[280px]" />
        <CardGridSkeleton count={6} columns={3} />
      </Container>
    </Section>
  );
}

export function TechnologiesSectionSkeleton() {
  return (
    <Section
      spacing="lg"
      className="homepage-section"
      aria-busy="true"
      aria-label="Loading technologies"
    >
      <Container size="xl">
        <Skeleton className="mx-auto mb-[var(--space-4)] h-[28px] w-[240px]" />
        <div className="flex flex-wrap justify-center gap-[var(--space-2)]">
          {Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={`tech-skeleton-${index}`} className="h-[36px] w-[100px] rounded-full" />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function FounderMessageSectionSkeleton() {
  return (
    <Section
      spacing="lg"
      className="homepage-section"
      aria-busy="true"
      aria-label="Loading founder message"
    >
      <Container size="lg">
        <div className="grid gap-[var(--space-4)] md:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-[var(--space-2)]">
            <Skeleton className="h-[28px] w-[70%]" />
            <Skeleton className="h-[14px] w-full" />
            <Skeleton className="h-[14px] w-[88%]" />
          </div>
          <Skeleton className="min-h-[180px] rounded-[var(--token-radius-lg)]" />
        </div>
      </Container>
    </Section>
  );
}
