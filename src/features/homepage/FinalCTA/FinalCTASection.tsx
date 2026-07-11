import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function FinalCTASection() {
  return (
    <Section
      id="final-cta"
      spacing="xl"
      background="primary"
      aria-labelledby="final-cta-heading"
    >
      <Heading id="final-cta-heading" level={2}>
        Final CTA
      </Heading>
      {/* TODO: HP-011 Homepage final CTA */}
    </Section>
  );
}
