import { Section } from "@/components/ui/section";
import { WORK_FAQ_COPY, WORK_FAQS } from "./work.content";
import { WorkFaqAccordion } from "./WorkFaqAccordion";
import "./work.css";

/**
 * Work FAQ — conversion-layer accordion (Sprint 5J).
 */
export function WorkFaqSection() {
  return (
    <Section
      id="work-faq"
      spacing="lg"
      aria-labelledby="work-faq-heading"
      className="work-faq border-b border-border/40"
    >
      <header className="work-faq__intro">
        <p className="work-faq__eyebrow">{WORK_FAQ_COPY.eyebrow}</p>
        <h2 id="work-faq-heading" className="work-faq__title">
          {WORK_FAQ_COPY.heading}
        </h2>
        <p className="work-faq__description">{WORK_FAQ_COPY.description}</p>
      </header>

      <WorkFaqAccordion items={WORK_FAQS} />
    </Section>
  );
}
