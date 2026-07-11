import { Text } from "@/components/ui/typography";

export function HeroIllustration() {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface to-accent/10" />
        <div className="absolute -right-[var(--space-6)] top-[var(--space-2)] size-[var(--space-16)] rounded-full bg-primary/15 blur-[var(--space-2)]" />
        <div className="absolute bottom-[var(--space-2)] left-[var(--space-1)] size-[var(--space-12)] rounded-full bg-accent/15 blur-[var(--space-2)]" />
      </div>

      <div
        className="relative z-10 flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-border bg-surface/80"
        aria-hidden="true"
      >
        <Text as="span" size="sm" muted>
          Illustration placeholder
        </Text>
      </div>
    </div>
  );
}
