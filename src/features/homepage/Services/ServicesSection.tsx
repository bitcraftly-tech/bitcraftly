import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function ServicesSection() {
  return (
    <Section id="services" spacing="lg" aria-labelledby="services-heading">
      <Heading id="services-heading" level={2}>
        Services
      </Heading>
      {/* TODO: HP-004 Homepage services */}
    </Section>
  );
}
