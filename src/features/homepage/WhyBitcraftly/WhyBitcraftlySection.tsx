import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";

export function WhyBitcraftlySection() {
  return (
    <Section
      id="why-bitcraftly"
      spacing="lg"
      aria-labelledby="why-bitcraftly-heading"
    >
      <Heading id="why-bitcraftly-heading" level={2}>
        Why Bitcraftly
      </Heading>
      {/* TODO: HP-008 Homepage why Bitcraftly */}
    </Section>
  );
}
