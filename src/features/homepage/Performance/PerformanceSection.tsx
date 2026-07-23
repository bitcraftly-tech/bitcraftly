import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { PerformanceCard } from "./PerformanceCard";
import {
  PERFORMANCE_CARDS,
  PERFORMANCE_DESCRIPTION_LINE_1,
  PERFORMANCE_DESCRIPTION_LINE_2,
  PERFORMANCE_HEADING,
  PERFORMANCE_HEADING_ID,
  PERFORMANCE_LABEL,
  PERFORMANCE_SECTION_ID,
} from "./performance.constants";
import "./performance.css";

export function PerformanceSection() {
  return (
    <section
      id={PERFORMANCE_SECTION_ID}
      aria-labelledby={PERFORMANCE_HEADING_ID}
      className="bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal
          name="performance"
          className="homepage-section-intro w-full max-w-2xl text-left"
        >
          <p
            className={cn(
              "section-intro-eyebrow performance-label",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {PERFORMANCE_LABEL}
          </p>
          <h2
            id={PERFORMANCE_HEADING_ID}
            className={cn(
              "section-intro-heading font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {PERFORMANCE_HEADING}
          </h2>
          <p
            className={cn(
              "section-intro-description w-full max-w-2xl",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {PERFORMANCE_DESCRIPTION_LINE_1} {PERFORMANCE_DESCRIPTION_LINE_2}
          </p>
        </HomepageReveal>

        <ul
          className={cn(
            "section-content-grid m-0 grid list-none p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {PERFORMANCE_CARDS.map((card, index) => (
            <li key={card.id} className="min-w-0">
              <HomepageReveal
                name="performance"
                delayMs={index * 70}
                className="h-full"
              >
                <PerformanceCard card={card} />
              </HomepageReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
