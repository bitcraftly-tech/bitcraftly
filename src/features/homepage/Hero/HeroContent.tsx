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
        "flex flex-col gap-[14px]",
        "items-center text-center",
        "md:items-start md:text-left",
        "md:gap-[16px]",
      )}
    >
      {!compactMobile ? (
        <p
          role="doc-subtitle"
          className={cn(
            "hero-eyebrow m-0 inline-flex items-center gap-[8px]",
            "rounded-full px-[14px] py-[8px]",
            "font-sans text-[11px] font-semibold uppercase tracking-[0.14em]",
          )}
        >
          <Icon
            name="sparkles"
            size="sm"
            aria-hidden
            className="h-[14px] w-[14px] shrink-0"
          />
          <span>{HERO_EYEBROW_LABEL}</span>
        </p>
      ) : null}

      <h1
        id={HERO_HEADING_ID}
        className={cn(
          "hero-heading m-0 max-w-3xl font-sans font-semibold text-foreground text-balance",
          "leading-[1.1] tracking-[-0.04em]",
        )}
      >
        {HERO_HEADING.prefix}{" "}
        <span className="hero-gradient-text">{HERO_HEADING.highlight}</span>
      </h1>

      <p
        className={cn(
          "hero-description m-0 max-w-xl font-sans text-muted-foreground",
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
