import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { HERO_HEADING_ID, HERO_ID } from "./hero.constants";
import "./hero.css";
import { HeroContent } from "./HeroContent";
import { HeroIllustration } from "./HeroIllustration";

export function HeroSection() {
  return (
    <Section
      id={HERO_ID}
      spacing="none"
      aria-labelledby={HERO_HEADING_ID}
      className={cn(
        "relative overflow-hidden hero-surface",
        "pt-[20px] pb-[24px]",
        "md:pt-[28px] md:pb-[32px]",
        "lg:pt-[32px] lg:pb-[40px]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-55 hero-dot-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25 hero-line-grid"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[var(--space-16)] -right-[12%] size-[680px] rounded-full blur-3xl hero-aurora-accent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[14%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl hero-aurora-blend"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative grid grid-cols-1 items-center gap-[var(--space-8)]",
          "md:gap-[var(--space-10)]",
          "lg:grid-cols-[minmax(0,60%)_minmax(0,1fr)] lg:items-stretch lg:gap-[calc(var(--space-3)/2)]",
        )}
      >
        <div className="min-w-0">
          <HeroContent />
        </div>
        <div className="min-w-0 h-full min-h-full">
          <HeroIllustration />
        </div>
      </div>
    </Section>
  );
}
