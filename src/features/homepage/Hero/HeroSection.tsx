import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { HeroContent } from "./HeroContent";
import { HeroIllustration } from "./HeroIllustration";

export function HeroSection() {
  return (
    <Section id="hero" spacing="xl" aria-labelledby="hero-heading">
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-8",
          "lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:gap-[var(--space-8)]",
        )}
      >
        <HeroContent />
        <HeroIllustration />
      </div>
    </Section>
  );
}
