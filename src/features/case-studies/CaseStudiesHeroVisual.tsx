import { FloatMetricCard, HeroStage } from '@/components/patterns/hero-compositions';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/**
 * Case Studies-only: before/after, ROI, and growth metrics composition.
 */
export function CaseStudiesHeroVisual() {
  return (
    <HeroStage>
      <div
        className={cn(
          'mh-panel absolute inset-x-[4%] top-[6%] z-[1] grid grid-cols-2 gap-[10px] p-[14px]',
          'mh-bob',
        )}
      >
        <div className="rounded-[var(--token-radius-lg)] border border-[color:var(--hp-card-border,var(--border))] bg-surface p-[12px]">
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Before
          </p>
          <p className="m-0 mt-[8px] font-sans text-[22px] font-extrabold tracking-[-0.03em] text-foreground">
            18%
          </p>
          <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">
            Conversion rate
          </p>
          <div className="mt-[10px] flex h-[28px] items-end gap-[2px] opacity-50">
            {[20, 24, 18, 26, 22, 28].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-muted-foreground"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[var(--token-radius-lg)] border border-primary/20 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_8%,var(--border))] p-[12px]">
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
            After
          </p>
          <p className="m-0 mt-[8px] font-sans text-[22px] font-extrabold tracking-[-0.03em] text-foreground">
            41%
          </p>
          <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">
            Conversion rate
          </p>
          <div className="mt-[10px] flex h-[28px] items-end gap-[2px]">
            {[35, 48, 42, 62, 58, 78].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary to-accent"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] left-[4%] z-[2] w-[48%] p-[14px]',
          'mh-bob mh-bob-delay-1',
        )}
      >
        <div className="flex items-center gap-[8px]">
          <span className="grid size-[32px] place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary">
            <Icon name="trending-up" size="sm" className="h-[16px] w-[16px]" />
          </span>
          <div>
            <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              ROI
            </p>
            <p className="m-0 font-sans text-[20px] font-extrabold tracking-[-0.02em] text-foreground">
              3.2× payback
            </p>
          </div>
        </div>
        <p className="m-0 mt-[8px] font-sans text-[12px] leading-[1.5] text-muted-foreground">
          Measured within the first two quarters after launch.
        </p>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] right-[4%] z-[2] w-[40%] p-[12px] mh-hide-sm',
          'mh-bob mh-bob-delay-2',
        )}
        aria-hidden
      >
        <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Growth
        </p>
        <svg viewBox="0 0 140 48" className="mt-[8px] h-[48px] w-full" aria-hidden>
          <path
            d="M0,40 L20,36 L40,38 L60,24 L80,28 L100,12 L120,16 L140,6"
            fill="none"
            stroke="url(#case-growth)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="case-growth" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <FloatMetricCard
        title="Satisfaction"
        value="98%"
        hint="client NPS"
        icon="star"
        className="right-[6%] top-[42%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
