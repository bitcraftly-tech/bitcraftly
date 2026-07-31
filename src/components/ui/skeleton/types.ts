import type { CSSProperties } from 'react';

export type SkeletonVariant = 'default' | 'circular' | 'text';

export interface SkeletonProps {
  className?: string;
  variant?: SkeletonVariant;
  shimmer?: boolean;
  style?: CSSProperties;
}
