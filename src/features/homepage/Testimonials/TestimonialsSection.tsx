import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { TestimonialsCarouselLazy } from "./TestimonialsCarouselLazy";
import {
  TESTIMONIALS_DESCRIPTION_LINE_1,
  TESTIMONIALS_DESCRIPTION_LINE_2,
  TESTIMONIALS_HEADING,
  TESTIMONIALS_HEADING_ID,
  TESTIMONIALS_LABEL,
  TESTIMONIALS_SECTION_ID,
} from "./testimonials.constants";
export function TestimonialsSection() {
  return (
    <section
      id={TESTIMONIALS_SECTION_ID}
      aria-labelledby={TESTIMONIALS_HEADING_ID}
      className="bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal
          name="testimonials"
          className="mx-auto w-full max-w-[760px] text-center"
        >
          <p
            className={cn(
              "testimonials-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {TESTIMONIALS_LABEL}
          </p>

          <h2
            id={TESTIMONIALS_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {TESTIMONIALS_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[720px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            <span className="sm:block">{TESTIMONIALS_DESCRIPTION_LINE_1}</span>{" "}
            <span className="sm:block">{TESTIMONIALS_DESCRIPTION_LINE_2}</span>
          </p>
        </HomepageReveal>

        <div className="mt-[var(--space-6)]">
          <HomepageReveal name="testimonials" delayMs={80}>
            <TestimonialsCarouselLazy />
          </HomepageReveal>
        </div>
      </Container>
    </section>
  );
}
