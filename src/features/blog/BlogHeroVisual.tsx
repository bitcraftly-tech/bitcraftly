import { FloatMetricCard, HeroStage } from '@/components/patterns/hero-compositions';
import { Icon, type IconName } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

const TOPICS: readonly { label: string; icon: IconName }[] = [
  { label: 'AI Development', icon: 'brain' },
  { label: 'Next.js', icon: 'code' },
  { label: 'React', icon: 'layout-grid' },
  { label: 'SEO', icon: 'trending-up' },
];

const FEED: readonly {
  category: string;
  title: string;
  meta: string;
  active?: boolean;
}[] = [
  {
    category: 'AI',
    title: 'Ship LLM features without chaos',
    meta: '8 min · Delivery notes',
    active: true,
  },
  {
    category: 'Next.js',
    title: 'App Router for marketing sites',
    meta: '6 min · Architecture',
  },
  {
    category: 'SEO',
    title: 'Technical SEO checklist',
    meta: '5 min · Growth',
  },
];

/**
 * Blog hero visual — reading desk / article feed metaphor.
 */
export function BlogHeroVisual() {
  return (
    <HeroStage>
      <div className={cn('mh-panel absolute inset-x-[5%] top-[5%] z-[1] p-[14px]', 'mh-bob')}>
        <div className="mb-[12px] flex items-center justify-between gap-[8px]">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              From the desk
            </p>
            <p className="m-0 mt-[2px] font-sans text-[15px] font-bold tracking-[-0.02em] text-foreground">
              Engineering notes
            </p>
          </div>
          <span className="mh-status-badge">Updated weekly</span>
        </div>

        <ul className="m-0 grid list-none gap-[8px] p-0">
          {FEED.map((item) => (
            <li
              key={item.title}
              className={cn(
                'rounded-[12px] border px-[10px] py-[9px]',
                item.active
                  ? 'border-primary/30 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_12%,var(--background))] to-[color-mix(in_srgb,var(--accent)_8%,var(--background))]'
                  : 'border-[color:var(--hp-card-border,var(--border))] bg-background',
              )}
            >
              <div className="flex items-start justify-between gap-[8px]">
                <div className="min-w-0">
                  <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                    {item.category}
                  </p>
                  <p className="m-0 mt-[3px] font-sans text-[12px] font-semibold leading-snug text-foreground">
                    {item.title}
                  </p>
                  <p className="m-0 mt-[3px] font-sans text-[10px] text-muted-foreground">
                    {item.meta}
                  </p>
                </div>
                <span
                  className={cn(
                    'mt-[2px] grid size-[26px] shrink-0 place-items-center rounded-[8px]',
                    item.active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-muted-foreground',
                  )}
                >
                  <Icon name="quote" size="sm" className="h-[12px] w-[12px]" />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] left-[5%] z-[2] w-[58%] p-[12px]',
          'mh-bob mh-bob-delay-1',
        )}
      >
        <div className="mb-[8px] flex items-center gap-[6px]">
          <Icon name="sparkles" size="sm" className="h-[14px] w-[14px] text-primary" />
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Topics
          </p>
        </div>
        <div className="flex flex-wrap gap-[6px]">
          {TOPICS.map((topic) => (
            <span
              key={topic.label}
              className="inline-flex items-center gap-[5px] rounded-full border border-[color:var(--hp-card-border,var(--border))] bg-surface px-[8px] py-[4px] font-sans text-[10px] font-semibold text-foreground"
            >
              <Icon name={topic.icon} size="sm" className="h-[11px] w-[11px] text-primary" />
              {topic.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] right-[5%] z-[2] w-[32%] p-[12px] mh-hide-sm',
          'mh-bob mh-bob-delay-2',
        )}
      >
        <div className="flex items-center gap-[6px]">
          <Icon name="check" size="sm" className="h-[14px] w-[14px] text-primary" />
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Focus
          </p>
        </div>
        <p className="m-0 mt-[8px] font-sans text-[16px] font-extrabold tracking-[-0.02em] text-foreground">
          Ship-ready
        </p>
        <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">
          Real builds · clear takeaways
        </p>
      </div>

      <FloatMetricCard
        title="Read time"
        value="5–8m"
        hint="practical notes"
        icon="zap"
        className="right-[3%] top-[46%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
