import { FloatMetricCard, HeroStage } from '@/components/patterns/hero-compositions';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/**
 * Assistant hero visual — chat console metaphor.
 */
export function AssistantHeroVisual() {
  return (
    <HeroStage>
      <div className={cn('mh-panel absolute inset-x-[6%] top-[8%] z-[1] p-[16px]', 'mh-bob')}>
        <div className="mb-[12px] flex items-center justify-between gap-[8px]">
          <div className="flex items-center gap-[10px]">
            <span className="grid size-[36px] place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--primary)_12%,var(--background))] text-primary">
              <Icon name="bot" size="sm" aria-hidden />
            </span>
            <div>
              <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Live preview
              </p>
              <p className="m-0 mt-[2px] font-sans text-[15px] font-bold tracking-[-0.02em] text-foreground">
                Bitcraftly AI
              </p>
            </div>
          </div>
          <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] px-[8px] py-[4px] font-sans text-[10px] font-semibold text-primary">
            Demo
          </span>
        </div>

        <ul className="m-0 grid list-none gap-[8px] p-0">
          {[
            { role: 'You', text: 'What does a typical project cost?' },
            { role: 'AI', text: 'Packages start with clear scope…' },
          ].map((row) => (
            <li
              key={row.role}
              className="rounded-[12px] border border-[color:var(--hp-card-border,var(--border))] bg-background p-[10px]"
            >
              <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {row.role}
              </p>
              <p className="m-0 mt-[4px] font-sans text-[12px] font-semibold text-foreground">
                {row.text}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <FloatMetricCard
        className="absolute right-[4%] bottom-[10%] z-[2]"
        title="Topics"
        value="4"
        hint="Pricing · Services · AI · Start"
        icon="sparkles"
      />
    </HeroStage>
  );
}
