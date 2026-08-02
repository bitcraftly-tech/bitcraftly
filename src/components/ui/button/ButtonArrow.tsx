import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/** Shared CTA arrow — tilted up-right, no background chip. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <span className={cn('bc-btn__arrow', className)} aria-hidden>
      <Icon name="arrow-up-right" size="sm" className="h-[1em] w-[1em]" />
    </span>
  );
}
