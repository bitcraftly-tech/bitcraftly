import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PageShellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Root wrapper for a marketing page body (inside `<main>`).
 * New marketing pages should start with PageShell so spacing and
 * flex growth stay consistent under the shared MarketingLayout.
 */
export function PageShell({ children, className, ...props }: PageShellProps) {
  return (
    <div className={cn('flex w-full flex-1 flex-col', className)} {...props}>
      {children}
    </div>
  );
}
