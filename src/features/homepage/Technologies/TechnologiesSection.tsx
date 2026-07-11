import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function TechnologiesSection() {
  return (
    <Section
      id="technologies"
      spacing="lg"
      aria-labelledby="technologies-heading"
    >
      <Heading id="technologies-heading" level={2}>
        Technologies
      </Heading>
      {/* TODO: HP-006 Homepage technologies */}
    </Section>
  );
}
