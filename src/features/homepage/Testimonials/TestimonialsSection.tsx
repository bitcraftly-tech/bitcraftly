import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function TestimonialsSection() {
  return (
    <Section
      id="testimonials"
      spacing="lg"
      background="surface"
      aria-labelledby="testimonials-heading"
    >
      <Heading id="testimonials-heading" level={2}>
        Testimonials
      </Heading>
      {/* TODO: HP-009 Homepage testimonials */}
    </Section>
  );
}
