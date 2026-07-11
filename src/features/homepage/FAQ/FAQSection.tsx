import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function FAQSection() {
  return (
    <Section id="faq" spacing="lg" aria-labelledby="faq-heading">
      <Heading id="faq-heading" level={2}>
        FAQ
      </Heading>
      {/* TODO: HP-010 Homepage FAQ */}
    </Section>
  );
}
