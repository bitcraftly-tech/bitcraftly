import Link from "next/link";
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
          <Link
            key={cta.label}
            href={cta.href}
            className={cn(
              "hero-cta",
              isPrimary ? "hero-cta-primary" : "hero-cta-outline",
            )}
          >
            {cta.label}
            <Icon name="arrow-right" size="sm" aria-hidden />
          </Link>
        );
      })}
    </div>
  );
}
