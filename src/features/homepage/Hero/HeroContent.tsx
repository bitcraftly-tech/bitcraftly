import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import {
  HERO_DESCRIPTION,
  HERO_EYEBROW,
  HERO_HEADING,
  HERO_HEADING_ID,
} from "./hero.constants";
import { HeroActions } from "./HeroActions";
import { HeroMetrics } from "./HeroMetrics";

export function HeroContent() {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--space-6)]",
        "items-center text-center",
        "md:items-start md:text-left",
      )}
    >
      <Badge
        as="div"
        variant="outline"
        size="sm"
        role="doc-subtitle"
        className={cn(
          "inline-flex w-auto flex-wrap items-center justify-center gap-[var(--space-1)]",
          "border-border/80 bg-background/70 px-[var(--space-2)] py-[var(--space-1)]",
          "text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground",
          "shadow-sm backdrop-blur-md",
          "md:justify-start",
        )}
      >
        {HERO_EYEBROW.map((segment, index) => (
          <span key={segment.text} className="inline-flex items-center gap-[var(--space-1)]">
            {index > 0 ? (
              <span
                className="mx-[var(--space-0-5)] hidden h-3 w-px bg-border sm:inline-block"
                aria-hidden="true"
              />
            ) : null}
            {segment.highlight ? (
              <span className="inline-flex items-center gap-[var(--space-1)] text-primary">
                <span className="relative flex size-[var(--space-1)]">
                  <span
                    className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60"
                    aria-hidden="true"
                  />
                  <span
                    className="relative inline-flex size-[var(--space-1)] rounded-full hero-brand-gradient"
                    aria-hidden="true"
                  />
                </span>
                {segment.text}
              </span>
            ) : (
              <span>{segment.text}</span>
            )}
          </span>
        ))}
      </Badge>

      <Heading
        id={HERO_HEADING_ID}
        level={1}
        className={cn(
          "max-w-3xl text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.04em]",
          "sm:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]",
        )}
      >
        {HERO_HEADING.prefix}{" "}
        <span className="relative inline-block">
          <span className="hero-gradient-text">{HERO_HEADING.highlight}</span>
          <span
            className="absolute inset-x-0 bottom-1 -z-10 h-[var(--space-2)] rounded-md hero-brand-gradient opacity-30 blur-md"
            aria-hidden="true"
          />
        </span>{" "}
        {HERO_HEADING.suffix}
      </Heading>

      <Text size="lg" muted className="max-w-xl text-[0.9375rem] leading-[1.7] sm:text-[1.0625rem]">
        {HERO_DESCRIPTION}
      </Text>

      <HeroActions />

      <HeroMetrics />
    </div>
  );
}
