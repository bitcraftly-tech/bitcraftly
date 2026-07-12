import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { TechnologiesCtaLink } from "./TechnologiesCtaLink";
import { TechnologiesMarquee } from "./TechnologiesMarquee";
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

export function TechnologiesSection() {
  return (
    <section
      id={TECHNOLOGIES_SECTION_ID}
      aria-labelledby={TECHNOLOGIES_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl" className="max-w-[1280px] px-[var(--space-4)]">
        <TechnologiesReveal className="mx-auto max-w-[640px] text-center">
          <p
            className={cn(
              "technologies-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {TECHNOLOGIES_LABEL}
          </p>

          <h2
            id={TECHNOLOGIES_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {TECHNOLOGIES_HEADING_LINE_1} {TECHNOLOGIES_HEADING_LINE_2}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[520px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {TECHNOLOGIES_DESCRIPTION}
          </p>

          <div className="mt-[var(--space-4)] flex justify-center">
            <TechnologiesCtaLink cta={TECHNOLOGIES_INTRO_CTA} />
          </div>
        </TechnologiesReveal>

        <TechnologiesReveal
          delayMs={80}
          className="mt-[var(--space-6)] w-full"
        >
          <TechnologiesMarquee />
        </TechnologiesReveal>
      </Container>
    </section>
  );
}
