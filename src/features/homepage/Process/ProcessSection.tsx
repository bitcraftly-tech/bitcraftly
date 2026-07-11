import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function ProcessSection() {
  return (
    <Section
      id="development-process"
      spacing="lg"
      background="surface"
      aria-labelledby="development-process-heading"
    >
      <Heading id="development-process-heading" level={2}>
        Development Process
      </Heading>
      {/* TODO: HP-007 Homepage development process */}
    </Section>
  );
}
