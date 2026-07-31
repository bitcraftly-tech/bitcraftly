import { cn } from '@/lib/cn';
import { CONTAINER_INSET_CLASS } from '@/lib/layout/page-shell';
import { buildResponsiveClasses } from '../typography/utils';
import type { ContainerElement, ContainerProps, ContainerSize } from './types';

/**
 * Marketing default (`xl`) uses design tokens that match the Header:
 * --container-xl (1280px) + responsive --container-padding.
 * Do not override with per-page max-width utilities.
 */
const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-[var(--container-sm)]',
  md: 'max-w-[var(--container-md)]',
  lg: 'max-w-[var(--container-lg)]',
  xl: 'max-w-[var(--container-xl)]',
  full: 'max-w-full',
};

export function Container({
  size = 'xl',
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  const Element = Component as ContainerElement;

  return (
    <Element
      className={cn(
        'mx-auto w-full',
        CONTAINER_INSET_CLASS,
        buildResponsiveClasses(size, sizeStyles, 'xl'),
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
