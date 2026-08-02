import { cn } from '@/lib/cn';
import type { LabelProps } from './types';

export function Label({ required = false, className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn('font-sans text-sm font-medium leading-normal text-foreground', className)}
      {...props}
    >
      {children}
      {required ? (
        <>
          <span className="text-error" aria-hidden="true">
            {' '}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}
