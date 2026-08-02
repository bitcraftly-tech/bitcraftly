import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ProcessRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

/** Server Component — CSS scroll reveal, no client hydration. Always visible. */
export function ProcessReveal({ children, className, delayMs = 0 }: ProcessRevealProps) {
  const style = delayMs > 0 ? ({ '--reveal-delay': `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div
      className={cn('process-reveal', 'is-visible', 'hp-scroll-reveal', className)}
      style={style}
    >
      {children}
    </div>
  );
}
