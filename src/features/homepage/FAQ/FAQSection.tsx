import { FaqAccordion } from "@/components/patterns/faq-accordion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import {
  FAQ_DESCRIPTION,
  FAQ_HEADING,
  FAQ_HEADING_ID,
  FAQ_ITEMS,
  FAQ_LABEL,
  FAQ_SECTION_ID,
} from "./faq.constants";
import "./faq.css";

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSection() {
  return (
    <section
      id={FAQ_SECTION_ID}
      aria-labelledby={FAQ_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <FaqJsonLd />
      <Container size="xl">
        <HomepageReveal name="faq" className="mx-auto max-w-[640px] text-center">
          <p
            className={cn(
              "faq-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {FAQ_LABEL}
          </p>

          <h2
            id={FAQ_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {FAQ_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[520px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {FAQ_DESCRIPTION}
          </p>
        </HomepageReveal>

        <div className="mt-[var(--space-6)]">
          <HomepageReveal name="faq" delayMs={80}>
            <FaqAccordion items={FAQ_ITEMS} />
          </HomepageReveal>
        </div>
      </Container>
    </section>
  );
}
