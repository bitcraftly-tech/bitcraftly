import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { IndustriesFeaturedCard } from "./IndustriesFeaturedCard";
import { IndustriesIntroCta } from "./IndustriesIntroCta";
import { IndustriesReveal } from "./IndustriesReveal";
import { IndustryCard } from "./IndustryCard";
import {
  HOMEPAGE_INDUSTRIES,
  INDUSTRIES_DESCRIPTION,
  INDUSTRIES_FEATURED_CARD,
  INDUSTRIES_HEADING,
  INDUSTRIES_HEADING_ID,
  INDUSTRIES_LABEL,
  INDUSTRIES_SECTION_ID,
} from "./industries.constants";
import "./industries.css";

export function IndustriesSection() {
  return (
    <section
      id={INDUSTRIES_SECTION_ID}
      aria-labelledby={INDUSTRIES_HEADING_ID}
      className="bg-surface text-surface-foreground homepage-section"
    >
      <Container size="xl" className="max-w-[1280px] px-[var(--space-4)]">
        <div
          className={cn(
            "flex flex-col gap-[var(--space-6)]",
            "lg:flex-row lg:items-start lg:gap-[var(--space-5)]",
          )}
        >
          <IndustriesReveal className="w-full max-w-[380px] shrink-0 lg:sticky lg:top-[120px]">
            <p
              className={cn(
                "industries-label m-0 mb-[var(--space-2)]",
                "font-sans text-[12px] font-[var(--font-weight-semibold)]",
                "uppercase tracking-[0.16em]",
              )}
            >
              {INDUSTRIES_LABEL}
            </p>

            <h2
              id={INDUSTRIES_HEADING_ID}
              className={cn(
                "m-0 font-sans font-bold text-foreground",
                "text-[28px] leading-[1.2] tracking-[-0.02em]",
                "sm:text-[36px] md:text-[42px]",
              )}
            >
              {INDUSTRIES_HEADING}
            </h2>

            <p
              className={cn(
                "m-0 mt-[var(--space-2)] max-w-[360px]",
                "font-sans text-[16px] font-normal leading-[1.6] text-muted-foreground",
                "sm:text-[18px]",
              )}
            >
              {INDUSTRIES_DESCRIPTION}
            </p>

            <div className="mt-[var(--space-4)]">
              <IndustriesIntroCta />
            </div>
          </IndustriesReveal>

          <div
            className={cn(
              "flex min-w-0 flex-1 flex-col gap-[var(--space-3)]",
              "xl:flex-row xl:items-stretch",
            )}
          >
            <ul
              className={cn(
                "m-0 grid min-w-0 flex-1 list-none grid-cols-1 gap-[var(--space-3)] p-0",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
              )}
            >
              {HOMEPAGE_INDUSTRIES.map((industry, index) => (
                <li key={industry.id} className="min-w-0">
                  <IndustriesReveal delayMs={index * 60} className="h-full">
                    <IndustryCard industry={industry} />
                  </IndustriesReveal>
                </li>
              ))}
            </ul>

            <IndustriesReveal
              delayMs={220}
              className="w-full shrink-0 xl:w-[280px]"
            >
              <IndustriesFeaturedCard content={INDUSTRIES_FEATURED_CARD} />
            </IndustriesReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
