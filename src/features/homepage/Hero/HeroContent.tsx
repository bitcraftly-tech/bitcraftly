import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import {
  HERO_DESCRIPTION,
  HERO_DESCRIPTION_MOBILE,
  HERO_EYEBROW_LABEL,
  HERO_HEADING,
  HERO_HEADING_ID,
} from "./hero.constants";
import { HeroActions } from "./HeroActions";
import { HeroTags } from "./HeroTags";

interface HeroContentProps {
  compactMobile?: boolean;
}

export function HeroContent({ compactMobile = false }: HeroContentProps) {
  return (
    <div
      className={cn(
        "hero-content flex w-full flex-col",
        "items-center text-center",
        "gap-[var(--space-2)] sm:gap-[var(--space-2-5)]",
        "md:items-stretch md:text-left",
      )}
    >
      <p
        role="doc-subtitle"
        className={cn(
          "hero-eyebrow m-0 inline-flex items-center gap-[6px] sm:gap-[8px]",
          "rounded-full px-[10px] py-[6px] sm:px-[14px] sm:py-[8px]",
          "font-sans text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em]",
          "md:self-start",
        )}
      >
        <Icon
          name="sparkles"
          size="sm"
          aria-hidden
          className="h-[12px] w-[12px] shrink-0 sm:h-[14px] sm:w-[14px]"
        />
        <span>{HERO_EYEBROW_LABEL}</span>
      </p>

      <h1
        id={HERO_HEADING_ID}
        className={cn(
          "hero-heading m-0 w-full max-w-[640px] font-sans font-semibold text-foreground text-balance",
          "leading-[1.1] tracking-[-0.04em]",
        )}
      >
        {HERO_HEADING.prefix}{" "}
        <span className="hero-gradient-text">{HERO_HEADING.highlight}</span>
      </h1>

      <p
        className={cn(
          "hero-description m-0 w-full max-w-[560px] font-sans text-muted-foreground",
        )}
      >
        {compactMobile ? HERO_DESCRIPTION_MOBILE : HERO_DESCRIPTION}
      </p>

      <div className="flex w-full flex-col gap-[var(--space-3)]">
        <HeroActions />
        {!compactMobile ? <HeroTags /> : null}
      </div>
    </div>
  );
}
