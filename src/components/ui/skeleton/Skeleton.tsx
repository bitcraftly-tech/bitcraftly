import { cn } from '@/lib/cn';
import type { SkeletonProps } from './types';
import './skeleton.css';

/**
 * Base skeleton primitive — shimmer by default, aria-hidden for assistive tech.
 */
export function Skeleton({ className, variant = 'default', shimmer = true, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        shimmer && 'skeleton--shimmer',
        variant === 'circular' && 'skeleton--circle',
        variant === 'text' && 'skeleton--text',
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
