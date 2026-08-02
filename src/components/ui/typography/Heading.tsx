import { cn } from '@/lib/cn';
import type { HeadingElement, HeadingLevel, HeadingProps } from './types';
import { buildResponsiveClasses, resolveHeadingLevel } from './utils';

const levelStyles: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold leading-tight tracking-tight',
  2: 'text-3xl font-semibold leading-tight tracking-tight',
  3: 'text-2xl font-semibold leading-snug',
  4: 'text-xl font-semibold leading-snug',
  5: 'text-lg font-medium leading-normal',
  6: 'text-base font-medium leading-normal',
};

const defaultElement: Record<HeadingLevel, HeadingElement> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

export function Heading({ as, level, className, children, ...props }: HeadingProps) {
  const semanticLevel = resolveHeadingLevel(as, level);
  const Component = as ?? defaultElement[semanticLevel];

  const visualClasses =
    level !== undefined && typeof level === 'object'
      ? buildResponsiveClasses(level, levelStyles, semanticLevel)
      : levelStyles[semanticLevel];

  return (
    <Component
      className={cn('font-sans text-heading text-balance', visualClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
