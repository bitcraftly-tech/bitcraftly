import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function IndustriesSection() {
  return (
    <Section
      id="industries"
      spacing="lg"
      background="surface"
      aria-labelledby="industries-heading"
    >
      <Heading id="industries-heading" level={2}>
        Industries
      </Heading>
      {/* TODO: HP-005 Homepage industries */}
    </Section>
  );
}
