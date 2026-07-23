import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import {
  TRUSTED_BY_HEADING_ID,
  TRUSTED_BY_HEADING_LINE_1,
  TRUSTED_BY_HEADING_LINE_2,
  TRUSTED_BY_ID,
  TRUSTED_BY_VALUES,
} from "./trusted-by.constants";
import { TrustedByReveal } from "./TrustedByReveal";
import { TrustedByValueItem } from "./TrustedByValueItem";
export function TrustedBySection() {
  return (
    <section
      id={TRUSTED_BY_ID}
      aria-labelledby={TRUSTED_BY_HEADING_ID}
      className="trusted-by-section text-foreground"
    >
      <Container size="xl">
        <TrustedByReveal>
          <div
            className={cn(
              "trusted-by-section-inner flex flex-col",
              "lg:flex-row lg:items-center lg:gap-0",
            )}
          >
            <h2
              id={TRUSTED_BY_HEADING_ID}
              className={cn(
                "trusted-by-heading m-0 shrink-0 font-sans font-bold",
                "text-[18px] leading-[1.25] tracking-[-0.02em] text-foreground",
                "sm:text-[20px]",
                "lg:pr-[var(--space-4)]",
              )}
            >
              <span className="block">{TRUSTED_BY_HEADING_LINE_1}</span>
              <span className="block">{TRUSTED_BY_HEADING_LINE_2}</span>
            </h2>

            <ul
              className={cn(
                "trusted-by-list m-0 flex min-w-0 flex-1 list-none flex-col p-0",
                "sm:flex-row sm:flex-wrap",
                "lg:flex-nowrap lg:items-stretch",
              )}
            >
              {TRUSTED_BY_VALUES.map((value) => (
                <li
                  key={value.id}
                  className={cn(
                    "trusted-by-list-item min-w-0",
                    "sm:w-1/2 sm:py-[var(--space-1)]",
                    "lg:w-auto lg:flex-1 lg:py-0",
                  )}
                >
                  <TrustedByValueItem
                    value={value}
                    className="h-full py-[var(--space-2)] lg:justify-center lg:px-[var(--space-2)] xl:px-[var(--space-3)]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </TrustedByReveal>
      </Container>
    </section>
  );
}
