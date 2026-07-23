import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { WORK_FAQ_COPY, WORK_FAQS } from "./work.content";
import { WorkFaqAccordion } from "./WorkFaqAccordion";
import "@/features/homepage/FAQ/faq.css";

/**
 * Work FAQ — same accordion + intro rhythm as /services.
 */
export function WorkFaqSection() {
  return (
    <Section
      id="work-faq"
      spacing="lg"
      background="default"
      contained={false}
      aria-labelledby="work-faq-heading"
      className="work-faq-section border-b border-border/40 bg-background text-foreground"
    >
      <Container size="xl">
        <div className="services-section-intro section-intro-row max-w-2xl">
          <p
            className={cn(
              "faq-label services-section-intro__eyebrow services-page-label",
              "font-sans text-[12px] font-semibold uppercase tracking-[0.16em]",
            )}
          >
            {WORK_FAQ_COPY.eyebrow}
          </p>

          <h2
            id="work-faq-heading"
            className="services-page-section-heading services-section-intro__heading"
          >
            {WORK_FAQ_COPY.heading}
          </h2>

          <p
            className={cn(
              "services-section-intro__description",
              "font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]",
            )}
          >
            {WORK_FAQ_COPY.description}
          </p>
        </div>

        <div className="section-content-grid">
          <WorkFaqAccordion items={[...WORK_FAQS]} />
        </div>
      </Container>
    </Section>
  );
}
