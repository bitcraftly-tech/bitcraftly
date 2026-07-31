import { cn } from '@/lib/cn';

interface MarketingSectionIntroProps {
  eyebrow?: string;
  headingId: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Marketing section intro — Homepage-aligned H2 scale via services-page-section-heading.
 * Vertical rhythm: global section tokens (section-rhythm.css).
 */
export function MarketingSectionIntro({
  eyebrow,
  headingId,
  title,
  description,
  className,
  align = 'left',
}: MarketingSectionIntroProps) {
  return (
    <div
      className={cn(
        'services-section-intro max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'services-page-label services-section-intro__eyebrow',
            'font-sans text-[12px] font-semibold uppercase tracking-[0.16em]',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 id={headingId} className="services-page-section-heading services-section-intro__heading">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'services-section-intro__description',
            'font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
