import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeElement = 'span' | 'div' | 'strong';

export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  as?: BadgeElement;
  children: ReactNode;
}
