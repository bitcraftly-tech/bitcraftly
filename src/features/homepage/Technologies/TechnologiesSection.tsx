import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { TechnologiesCtaLink } from "./TechnologiesCtaLink";
import { TechnologiesMarqueeLazy } from "./TechnologiesMarqueeLazy";
import { TechnologiesReveal } from "./TechnologiesReveal";
import {
  TECHNOLOGIES_DESCRIPTION,
  TECHNOLOGIES_HEADING_ID,
  TECHNOLOGIES_HEADING_LINE_1,
  TECHNOLOGIES_HEADING_LINE_2,
  TECHNOLOGIES_INTRO_CTA,
  TECHNOLOGIES_LABEL,
  TECHNOLOGIES_SECTION_ID,
} from "./technologies.constants";
import "./technologies.css";

/**
 * Tech Stack — split intro like Process / Decision Guide:
 * left title block, right “View Full Tech Stack” link.
 */
export function TechnologiesSection() {
  return (
    <section
      id={TECHNOLOGIES_SECTION_ID}
      aria-labelledby={TECHNOLOGIES_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <TechnologiesReveal className="min-w-0 max-w-2xl">
            <div className="homepage-section-intro text-left">
              <p
                className={cn(
                  "section-intro-eyebrow technologies-label",
                  "font-sans text-[12px] font-[var(--font-weight-semibold)]",
                  "uppercase tracking-[0.16em]",
                )}
              >
                {TECHNOLOGIES_LABEL}
              </p>

              <h2
                id={TECHNOLOGIES_HEADING_ID}
                className={cn(
                  "section-intro-heading font-sans font-bold text-foreground",
                  "text-[28px] leading-[1.2] tracking-[-0.02em]",
                  "sm:text-[32px] lg:text-[34px]",
                )}
              >
                {TECHNOLOGIES_HEADING_LINE_1} {TECHNOLOGIES_HEADING_LINE_2}
              </h2>

              <p
                className={cn(
                  "section-intro-description max-w-2xl",
                  "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
                  "sm:text-[16px]",
                )}
              >
                {TECHNOLOGIES_DESCRIPTION}
              </p>
            </div>
          </TechnologiesReveal>

          <TechnologiesCtaLink
            cta={TECHNOLOGIES_INTRO_CTA}
            className="shrink-0 self-end text-[13px] gap-[4px] hover:opacity-80 hover:text-primary"
          />
        </div>

        <TechnologiesReveal delayMs={80} className="section-content-grid w-full">
          <TechnologiesMarqueeLazy />
        </TechnologiesReveal>
      </Container>
    </section>
  );
}
