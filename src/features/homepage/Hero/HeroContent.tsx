import { Button } from "@/components/ui/button";
import { Caption, Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import { HeroTrustIndicators } from "./HeroTrustIndicators";

export function HeroContent() {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        "items-center text-center",
        "md:items-center md:text-center",
        "lg:items-start lg:text-left",
      )}
    >
      <Caption>AI & Digital Engineering</Caption>

      <Heading id="hero-heading" level={1}>
        Build Better Digital Products
      </Heading>

      <Text size="lg" muted className="max-w-xl">
        A platform for scalable websites, AI solutions, SaaS products, and
        enterprise software.
      </Text>

      <div
        className={cn(
          "flex w-full max-w-md flex-col gap-3",
          "lg:max-w-none lg:flex-row lg:justify-start",
        )}
      >
        <Button
          variant="primary"
          type="button"
          fullWidth
          className="lg:w-auto"
        >
          Primary Action
        </Button>
        <Button
          variant="outline"
          type="button"
          fullWidth
          className="lg:w-auto"
        >
          Secondary Action
        </Button>
      </div>

      <HeroTrustIndicators />
    </div>
  );
}
