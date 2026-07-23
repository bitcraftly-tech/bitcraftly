import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { TestimonialsCarouselLazy } from "./TestimonialsCarouselLazy";
import {
  TESTIMONIALS_CTA,
  TESTIMONIALS_DESCRIPTION_LINE_1,
  TESTIMONIALS_DESCRIPTION_LINE_2,
  TESTIMONIALS_HEADING,
  TESTIMONIALS_HEADING_ID,
  TESTIMONIALS_LABEL,
  TESTIMONIALS_SECTION_ID,
} from "./testimonials.constants";
import "./testimonials.css";

/**
 * Testimonials — left intro + right CTA (Decision Guide / Process pattern)
 * so the right side isn’t empty dead space.
 */
export function TestimonialsSection() {
  return (
    <section
      id={TESTIMONIALS_SECTION_ID}
      aria-labelledby={TESTIMONIALS_HEADING_ID}
      className="bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <HomepageReveal
            name="testimonials"
            className="min-w-0 max-w-2xl"
          >
            <div className="homepage-section-intro text-left">
              <p
                className={cn(
                  "section-intro-eyebrow testimonials-label",
                  "font-sans text-[12px] font-[var(--font-weight-semibold)]",
                  "uppercase tracking-[0.16em]",
                )}
              >
                {TESTIMONIALS_LABEL}
              </p>

              <h2
                id={TESTIMONIALS_HEADING_ID}
                className={cn(
                  "section-intro-heading font-sans font-bold text-foreground",
                  "text-[28px] leading-[1.2] tracking-[-0.02em]",
                  "sm:text-[32px] lg:text-[34px]",
                )}
              >
                {TESTIMONIALS_HEADING}
              </h2>

              <p
                className={cn(
                  "section-intro-description max-w-2xl",
                  "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
                  "sm:text-[16px]",
                )}
              >
                <span className="sm:block">
                  {TESTIMONIALS_DESCRIPTION_LINE_1}
                </span>{" "}
                <span className="sm:block">
                  {TESTIMONIALS_DESCRIPTION_LINE_2}
                </span>
              </p>
            </div>
          </HomepageReveal>

          <Link
            href={TESTIMONIALS_CTA.href}
            className={cn(
              "group inline-flex shrink-0 items-center gap-[4px] self-end no-underline",
              "font-sans text-[13px] font-semibold text-primary",
              "transition-opacity duration-200 hover:opacity-80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
          >
            {TESTIMONIALS_CTA.label}
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className={cn(
                "h-[13px] w-[13px]",
                "transition-transform duration-[var(--duration-normal)]",
                "group-hover:translate-x-[3px]",
              )}
            />
          </Link>
        </div>

        <div className="section-content-grid">
          <HomepageReveal name="testimonials" delayMs={80}>
            <TestimonialsCarouselLazy />
          </HomepageReveal>
        </div>
      </Container>
    </section>
  );
}
