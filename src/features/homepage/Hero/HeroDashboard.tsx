import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import {
  HERO_AUTOMATION,
  HERO_AUTOMATION_STEPS,
  HERO_DASHBOARD,
  HERO_DASHBOARD_STATS,
} from "./hero.constants";

const automationIcons = ["zap", "brain", "message", "check"] as const satisfies readonly IconName[];

function HeroSparkline() {
  return (
    <svg
      viewBox="0 0 160 60"
      className="h-16 w-40 shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" className="hero-sparkline-fill" stopOpacity="0.5" />
          <stop offset="100%" className="hero-sparkline-fill" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-spark-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" className="hero-sparkline-stroke-start" />
          <stop offset="100%" className="hero-sparkline-stroke-end" />
        </linearGradient>
      </defs>
      <g stroke="var(--border)" strokeWidth="0.5" opacity="0.7">
        <line x1="0" y1="15" x2="160" y2="15" strokeDasharray="2 3" />
        <line x1="0" y1="35" x2="160" y2="35" strokeDasharray="2 3" />
      </g>
      <path
        d="M0,44 L20,38 L40,40 L60,26 L80,32 L100,14 L120,20 L140,6 L160,12 L160,60 L0,60 Z"
        fill="url(#hero-spark-fill)"
      />
      <path
        d="M0,44 L20,38 L40,40 L60,26 L80,32 L100,14 L120,20 L140,6 L160,12"
        fill="none"
        stroke="url(#hero-spark-stroke)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="160" cy="12" r="3.2" className="fill-accent" />
    </svg>
  );
}

function HeroDashboardStatBars({ index }: { index: number }) {
  const heightClasses = [
    "h-2",
    "h-3",
    "h-1.5",
    "h-3.5",
    "h-2.5",
    "h-4",
  ] as const;

  return (
    <div className="ml-auto flex items-end gap-px" aria-hidden="true">
      {heightClasses.map((heightClass, barIndex) => (
        <span
          key={`${index}-${barIndex}`}
          className={cn(
            "w-[3px] origin-bottom rounded-sm hero-brand-gradient opacity-80",
            heightClass,
          )}
        />
      ))}
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className="space-y-[var(--space-3)]">
      <div
        className={cn(
          "relative rounded-xl border border-border-strong bg-background",
          "p-[var(--space-4)] shadow-lg",
        )}
        aria-hidden="true"
      >
        <div className="mb-[var(--space-3)] flex items-center gap-[var(--space-1)]">
          <span className="size-[var(--space-1)] rounded-full bg-error/60" />
          <span className="size-[var(--space-1)] rounded-full bg-warning/70" />
          <span className="size-[var(--space-1)] rounded-full bg-success/70" />
          <div className="ml-[var(--space-2)] flex-1 rounded-md border border-border bg-surface px-[var(--space-2)] py-[var(--space-0-5)]">
            <Text as="span" size="sm" muted className="text-[0.625rem] font-medium">
              {HERO_DASHBOARD.url}
            </Text>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[var(--space-2)]">
          <div className="flex items-center gap-[var(--space-2)]">
            <IconBox icon="trending-up" variant="primary" size="md" />
            <div>
              <Text as="span" size="sm" className="block font-bold">
                {HERO_DASHBOARD.title}
              </Text>
              <Text as="span" size="sm" muted className="text-[0.625rem]">
                {HERO_DASHBOARD.subtitle}
              </Text>
            </div>
          </div>
          <Badge
            variant="success"
            size="sm"
            className="gap-[var(--space-0-5)] text-[0.625rem]"
          >
            <Icon name="trending-up" size="sm" aria-hidden className="size-2.5" />
            {HERO_DASHBOARD.growth}
          </Badge>
        </div>

        <div className="mt-[var(--space-3)] flex items-end justify-between gap-[var(--space-3)]">
          <div>
            <Text as="span" size="sm" muted className="text-[0.6875rem] font-medium">
              {HERO_DASHBOARD.revenueLabel}
            </Text>
            <p className="hero-revenue-value mt-[var(--space-1)] text-[2.125rem] font-extrabold leading-none tracking-tight">
              {HERO_DASHBOARD.revenueValue}
            </p>
            <Text as="span" size="sm" muted className="mt-[var(--space-1)] text-[0.625rem] font-semibold">
              vs{" "}
              <span className="text-foreground">{HERO_DASHBOARD.previousValue}</span>{" "}
              prev.
            </Text>
          </div>
          <HeroSparkline />
        </div>

        <div className="mt-[var(--space-4)] grid grid-cols-3 gap-[var(--space-2)]">
          {HERO_DASHBOARD_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-xl border border-border hero-brand-gradient-soft p-[var(--space-2)] shadow-sm"
            >
              <Text
                as="span"
                size="sm"
                muted
                className="text-[0.625rem] font-semibold uppercase tracking-wider"
              >
                {stat.label}
              </Text>
              <p className="mt-[var(--space-1)] text-[1.1875rem] font-extrabold tracking-tight text-foreground">
                {stat.value}
              </p>
              <div className="mt-[var(--space-1)] flex items-center gap-[var(--space-0-5)]">
                <Text as="span" size="sm" className="text-[0.625rem] font-bold text-success">
                  {stat.change}
                </Text>
                <HeroDashboardStatBars index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative rounded-xl border border-border-strong bg-background p-[var(--space-3)] shadow-md"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[var(--space-2)]">
            <IconBox
              icon="workflow"
              variant="default"
              size="sm"
              className="[&>div]:hero-brand-gradient-soft [&>div]:border-border"
            />
            <div className="leading-tight">
              <Text as="span" size="sm" className="block font-bold">
                {HERO_AUTOMATION.title}
              </Text>
              <Text as="span" size="sm" muted className="text-[0.5625rem] font-medium">
                {HERO_AUTOMATION.subtitle}
              </Text>
            </div>
          </div>
          <Badge
            variant="primary"
            size="sm"
            className="gap-[var(--space-0-5)] text-[0.5625rem] uppercase tracking-wider"
          >
            <span className="size-[var(--space-1)] animate-pulse rounded-full bg-primary" />
            {HERO_AUTOMATION.status}
          </Badge>
        </div>

        <div className="mt-[var(--space-3)] flex items-center justify-between gap-[var(--space-1)]">
          {HERO_AUTOMATION_STEPS.map((step, index) => {
            const iconName = automationIcons[index] ?? "check";
            const isLast = index === HERO_AUTOMATION_STEPS.length - 1;

            return (
              <div key={step.label} className="flex flex-1 items-center gap-[var(--space-1)]">
                <div className="flex flex-col items-center gap-[var(--space-1)]">
                  <div className="relative">
                    <IconBox icon={iconName} variant="primary" size="md" />
                    {step.completed ? (
                      <span className="absolute -right-1 -top-1 grid size-[var(--space-2)] place-items-center rounded-full border-2 border-background bg-success text-success-foreground">
                        <Icon name="check" size="sm" className="size-2" aria-hidden />
                      </span>
                    ) : null}
                  </div>
                  <Text as="span" size="sm" muted className="text-[0.5625rem] font-semibold">
                    {step.label}
                  </Text>
                </div>
                {!isLast ? (
                  <div className="relative h-px flex-1 hero-automation-connector" aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
