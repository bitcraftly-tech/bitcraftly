import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { isMobileUserAgent } from "@/lib/device/is-mobile-user-agent";
import { HERO_HEADING_ID, HERO_ID } from "./hero.constants";
import { HeroContent } from "./HeroContent";
import { HeroIllustration } from "./HeroIllustration";
import "./hero.css";

export async function HeroSection() {
  const isMobile = await isMobileUserAgent();

  return (
    <Section
      id={HERO_ID}
      spacing="none"
      aria-labelledby={HERO_HEADING_ID}
      className={cn(
        "relative overflow-hidden hero-surface",
        isMobile ? "hero-section hero-section--compact" : "hero-section",
      )}
    >
      {!isMobile ? (
        <>
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
        </>
      ) : null}

      {/*
        Use Tailwind lg:/xl: grid-cols so they override grid-cols-1 in the
        same utilities layer. Custom CSS alone loses to .grid-cols-1.
        Left track min must stay >= 560px — never minmax(0, …).
      */}
      <div
        className={cn(
          "hero-section-grid relative grid w-full grid-cols-1 items-center",
          "gap-[var(--space-8)] md:gap-[var(--space-10)]",
          !isMobile &&
            [
              "lg:grid-cols-[minmax(560px,1.15fr)_minmax(0,1fr)]",
              "lg:items-stretch",
              "lg:gap-[calc(var(--space-3)/2)]",
              "xl:grid-cols-[minmax(560px,640px)_minmax(480px,1fr)]",
            ].join(" "),
        )}
      >
        <div className="hero-section-copy w-full min-w-0 lg:min-w-[560px] lg:max-w-[640px]">
          <HeroContent compactMobile={isMobile} />
        </div>
        {!isMobile ? (
          <div className="hero-section-media min-w-0 w-full h-full min-h-full">
            <HeroIllustration />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
