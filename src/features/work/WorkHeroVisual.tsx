import {
  BrowserWindow,
  FloatMetricCard,
  HeroStage,
} from "@/components/patterns/hero-compositions";
import { cn } from "@/lib/cn";

const PROJECTS = [
  {
    url: "northstar.health",
    title: "Patient portal",
    tag: "Healthcare",
    className: "left-[2%] top-[4%] w-[58%] z-[1]",
  },
  {
    url: "retailflow.app",
    title: "Commerce ops",
    tag: "Retail",
    className: "right-[2%] top-[18%] w-[48%] z-[2] mh-hide-sm",
  },
  {
    url: "ops.enterprise.io",
    title: "Ops dashboard",
    tag: "Enterprise",
    className: "left-[8%] bottom-[8%] w-[52%] z-[3]",
  },
] as const;

/**
 * Work-only: portfolio gallery of browser windows and featured project cards.
 */
export function WorkHeroVisual() {
  return (
    <HeroStage>
      {PROJECTS.map((project, index) => (
        <div
          key={project.url}
          className={cn(
            "absolute mh-bob",
            project.className,
            index === 1 ? "mh-bob-delay-1" : "",
            index === 2 ? "mh-bob-delay-2" : "",
          )}
        >
          <BrowserWindow url={project.url}>
            <div className="space-y-[8px]">
              <div className="flex items-center justify-between gap-[8px]">
                <p className="m-0 font-sans text-[13px] font-bold tracking-[-0.015em] text-foreground">
                  {project.title}
                </p>
                <span className="rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] px-[8px] py-[2px] font-sans text-[10px] font-semibold text-primary">
                  {project.tag}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-[6px]">
                <div className="col-span-2 aspect-[16/9] rounded-[var(--token-radius-md)] bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] to-[color-mix(in_srgb,var(--primary)_8%,var(--border))]" />
                <div className="flex flex-col gap-[6px]">
                  <div className="flex-1 rounded-[var(--token-radius-md)] bg-[color-mix(in_srgb,var(--primary)_8%,var(--border))]" />
                  <div className="flex-1 rounded-[var(--token-radius-md)] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))]" />
                </div>
              </div>
            </div>
          </BrowserWindow>
        </div>
      ))}

      <FloatMetricCard
        title="Featured"
        value="24+"
        hint="shipped projects"
        icon="layout-grid"
        className="right-[4%] bottom-[22%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
