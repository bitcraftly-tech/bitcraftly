import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

interface HeroLoadingSkeletonProps {
  compact?: boolean;
  className?: string;
}

/** Matches marketing hero ATF layout — prevents CLS during route transitions. */
export function HeroLoadingSkeleton({
  compact = false,
  className,
}: HeroLoadingSkeletonProps) {
  return (
    <Section
      spacing="none"
      className={cn(
        "relative overflow-hidden border-b border-border/60 hero-surface",
        compact ? "marketing-hero--compact py-[var(--space-4)]" : "py-[var(--space-6)]",
        className,
      )}
      aria-busy="true"
      aria-label="Loading page hero"
    >
      <Container size="xl">
        <div
          className={cn(
            "grid grid-cols-1 gap-[var(--space-4)]",
            !compact && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center",
          )}
        >
          <div className="flex min-w-0 flex-col gap-[14px]">
            {!compact ? (
              <Skeleton className="h-[32px] w-[min(280px,70%)] rounded-full" />
            ) : null}
            <Skeleton className="h-[44px] w-full max-w-[520px]" />
            <Skeleton className="h-[44px] w-full max-w-[420px]" />
            <Skeleton className="h-[14px] w-full max-w-[480px]" />
            <Skeleton className="h-[14px] w-full max-w-[360px]" />
            <div className="flex flex-wrap gap-[var(--space-2)] pt-[var(--space-1)]">
              <Skeleton className="h-[44px] w-[180px] rounded-[var(--token-radius-md)]" />
              <Skeleton className="h-[44px] w-[150px] rounded-[var(--token-radius-md)]" />
            </div>
            <div className="flex flex-wrap gap-[var(--space-2)]">
              <Skeleton className="h-[14px] w-[140px]" />
              <Skeleton className="h-[14px] w-[120px]" />
            </div>
          </div>
          {!compact ? (
            <Skeleton
              className="hidden min-h-[320px] w-full rounded-[var(--token-radius-xl)] lg:block"
              aria-hidden="true"
            />
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
