import { FloatMetricCard, HeroStage } from '@/components/patterns/hero-compositions';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

/**
 * Events hero visual — calendar / session board metaphor.
 */
export function EventsHeroVisual() {
  return (
    <HeroStage>
      <div className={cn('mh-panel absolute inset-x-[6%] top-[8%] z-[1] p-[16px]', 'mh-bob')}>
        <div className="mb-[12px] flex items-center justify-between gap-[8px]">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Session board
            </p>
            <p className="m-0 mt-[2px] font-sans text-[16px] font-bold tracking-[-0.02em] text-foreground">
              Upcoming
            </p>
          </div>
          <span className="inline-flex items-center gap-[6px] rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] px-[8px] py-[4px] font-sans text-[10px] font-semibold text-primary">
            <Icon name="calendar" size="sm" aria-hidden className="h-[12px] w-[12px]" />
            Live
          </span>
        </div>

        <ul className="m-0 grid list-none gap-[8px] p-0">
          {[
            { title: 'Industry Systems webinar', meta: '45 min · Register' },
            { title: 'AI delivery AMA', meta: 'Founder · Waitlist' },
            { title: 'Next.js systems talk', meta: 'On-demand' },
          ].map((row) => (
            <li
              key={row.title}
              className="rounded-[12px] border border-[color:var(--hp-card-border,var(--border))] bg-background p-[10px]"
            >
              <p className="m-0 font-sans text-[13px] font-semibold text-foreground">{row.title}</p>
              <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">{row.meta}</p>
            </li>
          ))}
        </ul>
      </div>

      <FloatMetricCard
        className="absolute right-[4%] bottom-[10%] z-[2]"
        title="Formats"
        value="3"
        hint="Webinar · AMA · Workshop"
        icon="calendar"
      />
    </HeroStage>
  );
}
