import { FloatMetricCard, HeroStage } from '@/components/patterns/hero-compositions';
import { Icon, type IconName } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

const PIPELINE: readonly {
  label: string;
  status: 'done' | 'active' | 'next';
  icon: IconName;
}[] = [
  { label: 'Apply', status: 'done', icon: 'mail' },
  { label: 'Founder review', status: 'active', icon: 'search' },
  { label: 'Chat', status: 'next', icon: 'message' },
  { label: 'Offer', status: 'next', icon: 'check' },
];

const STACK: readonly { label: string; icon: IconName }[] = [
  { label: 'Next.js', icon: 'code' },
  { label: 'FastAPI', icon: 'zap' },
  { label: 'TypeScript', icon: 'layout-grid' },
];

/**
 * Careers hero visual — hiring pipeline + founder review metaphor.
 */
export function CareersHeroVisual() {
  return (
    <HeroStage>
      <div className={cn('mh-panel absolute inset-x-[5%] top-[5%] z-[1] p-[14px]', 'mh-bob')}>
        <div className="mb-[12px] flex items-center justify-between gap-[8px]">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Hiring pipeline
            </p>
            <p className="m-0 mt-[2px] font-sans text-[15px] font-bold tracking-[-0.02em] text-foreground">
              General applications
            </p>
          </div>
          <span className="mh-status-badge">Open anytime</span>
        </div>

        <ol className="m-0 grid list-none gap-[8px] p-0 sm:grid-cols-2">
          {PIPELINE.map((step) => (
            <li
              key={step.label}
              className={cn(
                'flex items-center gap-[10px] rounded-[12px] border px-[10px] py-[9px]',
                step.status === 'active'
                  ? 'border-primary/30 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_12%,var(--background))] to-[color-mix(in_srgb,var(--accent)_8%,var(--background))]'
                  : 'border-[color:var(--hp-card-border,var(--border))] bg-background',
              )}
            >
              <span
                className={cn(
                  'grid size-[28px] place-items-center rounded-[8px]',
                  step.status === 'active'
                    ? 'bg-primary text-primary-foreground'
                    : step.status === 'done'
                      ? 'bg-[color-mix(in_srgb,var(--primary)_14%,var(--background))] text-primary'
                      : 'bg-surface text-muted-foreground',
                )}
              >
                <Icon name={step.icon} size="sm" className="h-[14px] w-[14px]" />
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-[12px] font-semibold text-foreground">
                  {step.label}
                </span>
                <span className="block font-sans text-[10px] text-muted-foreground">
                  {step.status === 'done'
                    ? 'Submitted'
                    : step.status === 'active'
                      ? 'In progress'
                      : 'Next'}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] left-[5%] z-[2] w-[54%] p-[12px]',
          'mh-bob mh-bob-delay-1',
        )}
      >
        <div className="mb-[8px] flex items-center gap-[8px]">
          <span className="grid size-[34px] place-items-center rounded-[11px] bg-gradient-to-br from-primary to-accent font-sans text-[13px] font-extrabold text-primary-foreground">
            S
          </span>
          <div className="min-w-0">
            <p className="m-0 font-sans text-[12px] font-bold tracking-[-0.015em] text-foreground">
              Read by Sanjay
            </p>
            <p className="m-0 mt-[1px] font-sans text-[10px] text-muted-foreground">
              Founder review · no keyword bots
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-[6px]">
          {STACK.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-[5px] rounded-full border border-[color:var(--hp-card-border,var(--border))] bg-surface px-[8px] py-[4px] font-sans text-[10px] font-semibold text-foreground"
            >
              <Icon name={item.icon} size="sm" className="h-[11px] w-[11px] text-primary" />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          'mh-panel absolute bottom-[8%] right-[5%] z-[2] w-[36%] p-[12px] mh-hide-sm',
          'mh-bob mh-bob-delay-2',
        )}
      >
        <div className="flex items-center gap-[6px]">
          <Icon name="globe" size="sm" className="h-[14px] w-[14px] text-primary" />
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Work model
          </p>
        </div>
        <p className="m-0 mt-[8px] font-sans text-[18px] font-extrabold tracking-[-0.02em] text-foreground">
          Remote-first
        </p>
        <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">
          Async delivery · high ownership
        </p>
      </div>

      <FloatMetricCard
        title="Reply"
        value="<48h"
        hint="typical review"
        icon="zap"
        className="right-[3%] top-[48%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
