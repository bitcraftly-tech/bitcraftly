import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { SERVICES_LANDING } from "./services.content";
import "@/features/homepage/FAQ/faq.css";

/**
 * Services listing FAQ — aligned with Solutions FAQ intro rhythm.
 */
export function ServicesFaqSection() {
  return (
    <Section
      spacing="lg"
      background="default"
      contained={false}
      aria-labelledby="services-faq-heading"
      className="services-faq-section border-b border-border/40 bg-background text-foreground"
    >
      <Container size="xl">
        <div className="services-section-intro mb-[40px] max-w-2xl">
          <p
            className={cn(
              "faq-label services-section-intro__eyebrow services-page-label",
              "font-sans text-[12px] font-semibold uppercase tracking-[0.16em]",
            )}
          >
            FAQ
          </p>

          <h2
            id="services-faq-heading"
            className="services-page-section-heading services-section-intro__heading"
          >
            Services frequently asked questions
          </h2>

          <p
            className={cn(
              "services-section-intro__description",
              "font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]",
            )}
          >
            Choosing a service line, timelines, stack, ownership, and how
            engagements work at Bitcraftly.
          </p>
        </div>

        <ServiceFaqAccordion items={[...SERVICES_LANDING.listingFaqs]} />
      </Container>
    </Section>
  );
}
