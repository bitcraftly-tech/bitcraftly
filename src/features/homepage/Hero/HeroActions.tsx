import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HERO_CTAS } from "./hero.constants";

export function HeroActions() {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-[var(--space-2)]",
        "sm:flex-row sm:flex-wrap sm:items-center",
      )}
    >
      {HERO_CTAS.map((cta) => {
        const isPrimary = cta.variant === "primary";

        return (
          <Button
            key={cta.label}
            href={cta.href}
            variant={isPrimary ? "primary" : "outline"}
            size="lg"
            fullWidth
            className={cn(
              "rounded-xl sm:w-auto",
              isPrimary &&
                "hero-brand-gradient border-0 text-primary-foreground shadow-lg hover:opacity-95",
              !isPrimary &&
                "border-border-strong bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:text-primary",
            )}
            iconRight={
              isPrimary ? (
                <Icon name="arrow-right" size="md" aria-hidden />
              ) : (
                <Icon name="arrow-up-right" size="md" aria-hidden />
              )
            }
          >
            {cta.label}
          </Button>
        );
      })}
    </div>
  );
}
