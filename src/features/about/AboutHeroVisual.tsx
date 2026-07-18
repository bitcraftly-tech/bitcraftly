import {
  FloatMetricCard,
  HeroStage,
} from "@/components/patterns/hero-compositions";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

/**
 * About hero visual — company operating system metaphor (no photos required).
 */
export function AboutHeroVisual() {
  return (
    <HeroStage>
      <div
        className={cn(
          "mh-panel absolute inset-x-[5%] top-[6%] z-[1] p-[16px]",
          "mh-bob",
        )}
      >
        <div className="mb-[14px] flex items-center justify-between gap-[8px]">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Company profile
            </p>
            <p className="m-0 mt-[2px] font-sans text-[16px] font-bold tracking-[-0.02em] text-foreground">
              Bitcraftly
            </p>
          </div>
          <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] px-[8px] py-[4px] font-sans text-[10px] font-semibold text-primary">
            Founder-led
          </span>
        </div>

        <ul className="m-0 grid list-none gap-[8px] p-0 sm:grid-cols-2">
          {[
            { label: "Focus", value: "AI + product engineering" },
            { label: "Model", value: "Written scope · milestones" },
            { label: "Stack", value: "Next.js · React · TypeScript" },
            { label: "Bar", value: "Performance · a11y · SEO" },
          ].map((row) => (
            <li
              key={row.label}
              className="rounded-[12px] border border-[color:var(--hp-card-border,var(--border))] bg-background p-[10px]"
            >
              <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {row.label}
              </p>
              <p className="m-0 mt-[4px] font-sans text-[12px] font-semibold text-foreground">
                {row.value}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "mh-panel absolute bottom-[8%] left-[5%] z-[2] w-[52%] p-[12px]",
          "mh-bob mh-bob-delay-1",
        )}
        aria-hidden
      >
        <div className="mb-[8px] flex items-center gap-[6px]">
          <Icon
            name="shield"
            size="sm"
            className="h-[14px] w-[14px] text-primary"
          />
          <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Delivery bar
          </p>
        </div>
        <div className="space-y-[6px]">
          {["Core Web Vitals", "WCAG AA checks", "Clear handoff docs"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-[8px] rounded-[var(--token-radius-md)] border border-[color:var(--hp-card-border,var(--border))] bg-surface px-[10px] py-[6px]"
              >
                <span className="size-[6px] rounded-full bg-primary" />
                <span className="font-sans text-[11px] font-semibold text-foreground">
                  {item}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      <FloatMetricCard
        title="Experience"
        value="20+"
        hint="years shipping UI"
        icon="rocket"
        className="right-[6%] top-[48%] mh-hide-sm mh-bob-delay-2"
      />
    </HeroStage>
  );
}
