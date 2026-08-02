import { cn } from '@/lib/cn';
import { Container } from '../container';
import { buildResponsiveClasses } from '../typography/utils';
import type { SectionBackground, SectionElement, SectionProps, SectionSpacing } from './types';

const backgroundStyles: Record<SectionBackground, string> = {
  default: 'bg-background text-foreground',
  surface: 'bg-surface text-surface-foreground',
  muted: 'bg-surface text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
};

/**
 * Vertical rhythm for non-homepage marketing sections.
 * `lg` / `xl` → `.page-shell` (equal 36 / 48 / 60 top & bottom).
 * `sm` / `md` → compact toolbars only (`.page-shell-sm`).
 * Homepage sections use `.homepage-section` separately — do not couple.
 */
const spacingStyles: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'page-shell-sm',
  md: 'page-shell-sm',
  lg: 'page-shell',
  xl: 'page-shell',
};

export function Section({
  background = 'default',
  spacing = 'lg',
  as: Component = 'section',
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  const Element = Component as SectionElement;

  return (
    <Element
      className={cn(
        backgroundStyles[background],
        buildResponsiveClasses(spacing, spacingStyles, 'lg'),
        className,
      )}
      {...props}
    >
      {contained ? <Container size="xl">{children}</Container> : children}
    </Element>
  );
}
