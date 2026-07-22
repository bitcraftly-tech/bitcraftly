import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";

interface CardGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function CardGridSkeleton({
  count = 6,
  columns = 3,
  className,
}: CardGridSkeletonProps) {
  const gridClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={cn("grid grid-cols-1 gap-[var(--space-3)]", gridClass, className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading content</span>
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={`card-skeleton-${index}`} />
      ))}
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-2)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-3)]",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="aspect-[16/10] w-full rounded-[var(--token-radius-md)]" />
      <Skeleton className="h-[12px] w-[38%]" />
      <Skeleton className="h-[18px] w-[82%]" />
      <Skeleton className="h-[14px] w-full" />
      <Skeleton className="h-[14px] w-[68%]" />
    </div>
  );
}

export function ServiceCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-2)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-3)]",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-[var(--space-2)]">
        <Skeleton variant="circular" className="size-[40px]" />
        <Skeleton className="h-[16px] w-[55%]" />
      </div>
      <Skeleton className="h-[14px] w-full" />
      <Skeleton className="h-[14px] w-[78%]" />
      <Skeleton className="h-[36px] w-[120px] rounded-[var(--token-radius-md)]" />
    </div>
  );
}

export function PricingCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-2)] rounded-[var(--token-radius-xl)] border border-border/60 p-[var(--space-4)]",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="h-[12px] w-[40%]" />
      <Skeleton className="h-[32px] w-[48%]" />
      <Skeleton className="h-[14px] w-full" />
      <Skeleton className="h-[14px] w-[88%]" />
      <div className="flex flex-col gap-[10px] pt-[var(--space-2)]">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={`pricing-line-${index}`} className="h-[12px] w-[72%]" />
        ))}
      </div>
      <Skeleton className="mt-[var(--space-2)] h-[44px] w-full rounded-[var(--token-radius-md)]" />
    </div>
  );
}

export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-[var(--space-2)]", className)} aria-hidden="true">
      <Skeleton className="aspect-[16/9] w-full rounded-[var(--token-radius-lg)]" />
      <Skeleton className="h-[12px] w-[28%]" />
      <Skeleton className="h-[20px] w-[92%]" />
      <Skeleton className="h-[14px] w-full" />
    </div>
  );
}

export function CaseStudyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-[var(--space-3)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-3)] md:grid-cols-[140px_1fr]",
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="aspect-square w-full rounded-[var(--token-radius-md)]" />
      <div className="flex flex-col gap-[var(--space-2)]">
        <Skeleton className="h-[12px] w-[34%]" />
        <Skeleton className="h-[20px] w-[80%]" />
        <Skeleton className="h-[14px] w-full" />
        <Skeleton className="h-[14px] w-[70%]" />
      </div>
    </div>
  );
}
