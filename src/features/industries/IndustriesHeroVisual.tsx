import {
  FloatMetricCard,
  HeroStage,
} from "@/components/patterns/hero-compositions";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

const INDUSTRIES: readonly {
  label: string;
  icon: IconName;
  position: string;
}[] = [
  { label: "Healthcare", icon: "shield", position: "left-[2%] top-[8%]" },
  { label: "Retail", icon: "sparkles", position: "right-[4%] top-[6%]" },
  {
    label: "Manufacturing",
    icon: "database",
    position: "left-[0%] top-[42%]",
  },
  { label: "Education", icon: "message", position: "right-[2%] top-[40%]" },
  { label: "Logistics", icon: "workflow", position: "left-[18%] bottom-[6%]" },
  { label: "Finance", icon: "trending-up", position: "right-[16%] bottom-[8%]" },
];

/**
 * Industries-only: ecosystem of sector nodes around an enterprise hub.
 */
export function IndustriesHeroVisual() {
  return (
    <HeroStage>
      {/* Central enterprise hub */}
      <div
        className={cn(
          "mh-panel absolute left-1/2 top-1/2 z-[2] w-[46%] -translate-x-1/2 -translate-y-1/2 p-[16px] text-center",
          "mh-bob",
        )}
      >
        <span className="mx-auto mb-[10px] grid size-[40px] place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary">
          <Icon name="globe" size="sm" className="h-[20px] w-[20px]" />
        </span>
        <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Enterprise ecosystem
        </p>
        <p className="m-0 mt-[4px] font-sans text-[16px] font-extrabold tracking-[-0.02em] text-foreground">
          Bitcraftly Hub
        </p>
        <div className="mx-auto mt-[12px] h-[48px] w-full max-w-[160px] rounded-[10px] border border-[color:var(--hp-card-border,var(--border))] bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_8%,var(--border))] p-[8px]">
          <div className="flex h-full items-end gap-[3px]">
            {[40, 55, 48, 70, 62, 80].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary to-accent opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {INDUSTRIES.map((industry, index) => (
        <div
          key={industry.label}
          className={cn(
            "mh-panel absolute z-[3] flex items-center gap-[8px] px-[10px] py-[8px]",
            industry.position,
            index % 2 === 0 ? "mh-bob-delay-1" : "mh-bob-delay-2",
            index > 3 ? "mh-hide-sm" : "",
          )}
          aria-hidden
        >
          <span className="grid size-[28px] place-items-center rounded-[8px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary">
            <Icon
              name={industry.icon}
              size="sm"
              className="h-[14px] w-[14px]"
            />
          </span>
          <span className="font-sans text-[12px] font-bold text-foreground">
            {industry.label}
          </span>
        </div>
      ))}

      <FloatMetricCard
        title="Coverage"
        value="10+"
        hint="verticals"
        icon="globe"
        className="bottom-[28%] right-[28%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
