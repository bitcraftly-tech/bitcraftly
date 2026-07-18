import { FaqAccordion } from "@/components/patterns/faq-accordion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import {
  ABOUT_FAQ_DESCRIPTION,
  ABOUT_FAQ_HEADING,
  ABOUT_FAQ_HEADING_ID,
  ABOUT_FAQ_LABEL,
  ABOUT_FAQ_SECTION_ID,
  ABOUT_FAQS,
} from "./about.content";
import "@/features/homepage/FAQ/faq.css";

/**
 * About FAQ — same markup, typography, and accordion treatment as homepage FAQ.
 */
export function AboutFaqSection() {
  return (
    <section
      id={ABOUT_FAQ_SECTION_ID}
      aria-labelledby={ABOUT_FAQ_HEADING_ID}
      className="about-faq-section bg-background text-foreground border-t border-border/50"
    >
      <Container size="xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p
            className={cn(
              "faq-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {ABOUT_FAQ_LABEL}
          </p>

          <h2
            id={ABOUT_FAQ_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {ABOUT_FAQ_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[520px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {ABOUT_FAQ_DESCRIPTION}
          </p>
        </div>

        <div className="mt-[var(--space-8)]">
          <FaqAccordion items={[...ABOUT_FAQS]} />
        </div>
      </Container>
    </section>
  );
}
