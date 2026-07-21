import {
  FloatMetricCard,
  HeroStage,
} from "@/components/patterns/hero-compositions";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

const PLANS = [
  { name: "Starter", price: "₹9.9k", hint: "landing / brochure" },
  { name: "Growth", price: "₹49k+", hint: "product MVP" },
  { name: "Enterprise", price: "Custom", hint: "systems & AI" },
] as const;

/**
 * Pricing-only: estimate interface, pricing cards, billing illustration.
 */
export function PricingHeroVisual() {
  return (
    <HeroStage>
      <div
        className={cn(
          "mh-panel absolute inset-x-[4%] top-[4%] z-[1] p-[14px]",
          "mh-bob",
        )}
      >
        <div className="mb-[12px] flex items-center justify-between gap-[8px]">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Cost calculator
            </p>
            <p className="m-0 mt-[2px] font-sans text-[15px] font-bold tracking-[-0.02em] text-foreground">
              Project estimate
            </p>
          </div>
          <span className="mh-status-badge">Live preview</span>
        </div>

        <div className="grid grid-cols-3 gap-[8px]">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-[12px] border p-[10px]",
                plan.name === "Growth"
                  ? "border-primary/30 bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_8%,var(--border))]"
                  : "border-[color:var(--hp-card-border,var(--border))] bg-background",
              )}
            >
              <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {plan.name}
              </p>
              <p className="m-0 mt-[6px] font-sans text-[16px] font-extrabold tracking-[-0.02em] text-foreground">
                {plan.price}
              </p>
              <p className="m-0 mt-[4px] font-sans text-[10px] text-muted-foreground">
                {plan.hint}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mh-panel absolute bottom-[8%] left-[4%] z-[2] w-[55%] p-[12px]",
          "mh-bob mh-bob-delay-1",
        )}
        aria-hidden
      >
        <p className="m-0 mb-[8px] font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Estimate interface
        </p>
        <div className="space-y-[6px]">
          {["Website", "AI automation", "Integrations"].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between gap-[8px] rounded-[var(--token-radius-md)] border border-[color:var(--hp-card-border,var(--border))] bg-surface px-[10px] py-[6px]"
            >
              <span className="font-sans text-[11px] font-semibold text-foreground">
                {row}
              </span>
              <span className="size-[14px] rounded-[var(--token-radius-sm)] border border-primary/40 bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]" />
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mh-panel absolute bottom-[8%] right-[4%] z-[2] w-[36%] p-[12px] mh-hide-sm",
          "mh-bob mh-bob-delay-2",
        )}
        aria-hidden
      >
        <div className="flex items-center gap-[6px]">
          <Icon name="calendar" size="sm" className="h-[14px] w-[14px] text-primary" />
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Billing
          </p>
        </div>
        <p className="m-0 mt-[8px] font-sans text-[18px] font-extrabold tracking-[-0.02em] text-foreground">
          Milestone
        </p>
        <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">
          Clear phases, written quotes
        </p>
      </div>

      <FloatMetricCard
        title="From"
        value="₹8,999"
        hint="starting builds"
        icon="zap"
        className="right-[6%] top-[38%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
