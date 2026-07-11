import { Text } from "@/components/ui/typography";
import { HERO_METRICS } from "./hero.constants";

export function HeroMetrics() {
  return (
    <div className="border-t border-border/70 pt-[var(--space-4)]">
      <dl className="grid grid-cols-2 gap-x-[var(--space-3)] gap-y-[var(--space-3)] sm:grid-cols-4">
        {HERO_METRICS.map((metric) => (
          <div key={metric.label}>
            <dt className="hero-metric-value text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2rem]">
              {metric.value}
            </dt>
            <dd className="mt-[var(--space-1)]">
              <Text as="span" size="sm" muted>
                {metric.label}
              </Text>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
