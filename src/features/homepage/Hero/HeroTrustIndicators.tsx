import { Text } from "@/components/ui/typography";

const trustIndicators = [
  "Trust indicator 1",
  "Trust indicator 2",
  "Trust indicator 3",
] as const;

export function HeroTrustIndicators() {
  return (
    <ul
      className="flex flex-wrap justify-center gap-2 lg:justify-start"
      aria-label="Trust indicators"
    >
      {trustIndicators.map((indicator) => (
        <li key={indicator}>
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-[var(--space-3)] py-[var(--space-1)]">
            <Text as="span" size="sm" muted>
              {indicator}
            </Text>
          </span>
        </li>
      ))}
    </ul>
  );
}
