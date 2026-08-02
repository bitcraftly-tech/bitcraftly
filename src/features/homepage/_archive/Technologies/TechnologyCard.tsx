import Link from 'next/link';
import { cn } from '@/lib/cn';
import { TechnologyLogo } from './tech-logos';
import type { HomepageTechnology } from './technologies.types';

interface TechnologyCardProps {
  technology: HomepageTechnology;
  className?: string;
  /** Use `-1` for decorative marquee duplicates so they are not keyboard-focusable. */
  tabIndex?: number;
}

export function TechnologyCard({ technology, className, tabIndex }: TechnologyCardProps) {
  return (
    <Link
      href={technology.href}
      tabIndex={tabIndex}
      className={cn(
        'technologies-card group flex h-full flex-col items-center text-center',
        'rounded-[16px] card-padding no-underline',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <span className="technologies-card-logo inline-flex items-center justify-center">
        <TechnologyLogo id={technology.id} />
      </span>

      <span className="technologies-card__title font-sans text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-foreground">
        {technology.name}
      </span>

      <span className="technologies-card__meta font-sans text-[12px] font-medium leading-[1.4] text-muted-foreground">
        {technology.category}
      </span>
    </Link>
  );
}
