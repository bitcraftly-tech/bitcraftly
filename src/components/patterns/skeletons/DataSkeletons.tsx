import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';

export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-[24rem] w-full flex-col gap-[var(--space-3)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-4)]',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading form</span>
      <Skeleton className="h-[14px] w-[42%]" />
      <Skeleton className="h-[44px] w-full rounded-[var(--token-radius-md)]" />
      <Skeleton className="h-[44px] w-full rounded-[var(--token-radius-md)]" />
      <Skeleton className="h-[44px] w-full rounded-[var(--token-radius-md)]" />
      <Skeleton className="h-[120px] w-full rounded-[var(--token-radius-md)]" />
      <Skeleton className="mt-auto h-[44px] w-[160px] rounded-[var(--token-radius-md)]" />
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col gap-[var(--space-2)]', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading table</span>
      <div
        className="grid gap-[var(--space-2)]"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }, (_, index) => (
          <Skeleton key={`table-head-${index}`} className="h-[14px] w-[80%]" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={`table-row-${rowIndex}`}
          className="grid gap-[var(--space-2)]"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          aria-hidden="true"
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton key={`table-cell-${rowIndex}-${colIndex}`} className="h-[36px] w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-[220px] flex-col gap-[var(--space-3)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-4)]',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading chart</span>
      <Skeleton className="h-[14px] w-[34%]" />
      <Skeleton className="min-h-[140px] flex-1 w-full rounded-[var(--token-radius-md)]" />
      <div className="flex gap-[var(--space-2)]">
        <Skeleton className="h-[10px] w-[18%]" />
        <Skeleton className="h-[10px] w-[18%]" />
        <Skeleton className="h-[10px] w-[18%]" />
      </div>
    </div>
  );
}

export function DashboardCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-[var(--space-2)] rounded-[var(--token-radius-lg)] border border-border/60 p-[var(--space-3)]',
        className,
      )}
      aria-hidden="true"
    >
      <Skeleton className="h-[12px] w-[50%]" />
      <Skeleton className="h-[28px] w-[40%]" />
      <Skeleton className="h-[12px] w-[65%]" />
    </div>
  );
}

export function LeadListSkeleton({
  statCount = 6,
  rowCount = 5,
  className,
}: {
  statCount?: number;
  rowCount?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('flex flex-col gap-[var(--space-4)]', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading leads</span>
      {statCount > 0 ? (
        <div className="grid gap-[var(--space-2)] sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: statCount }, (_, index) => (
            <DashboardCardSkeleton key={`lead-stat-${index}`} />
          ))}
        </div>
      ) : null}
      {rowCount > 0 ? <TableSkeleton rows={rowCount} columns={5} /> : null}
    </div>
  );
}

export function AvatarSkeleton({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Skeleton variant="circular" className={cn(className)} style={{ width: size, height: size }} />
  );
}

export function ImageSkeleton({
  aspectRatio = '16/10',
  className,
}: {
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <Skeleton
      className={cn('w-full rounded-[var(--token-radius-md)]', className)}
      style={{ aspectRatio }}
    />
  );
}
