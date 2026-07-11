import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function TrustedBySection() {
  return (
    <Section
      id="trusted-by"
      spacing="lg"
      background="surface"
      aria-labelledby="trusted-by-heading"
    >
      <Heading id="trusted-by-heading" level={2}>
        Trusted By
      </Heading>
      {/* TODO: HP-003 Homepage trusted by */}
    </Section>
  );
}
