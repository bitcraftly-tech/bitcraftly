import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import { PortfolioGrid } from "./PortfolioGrid";
import {
  PORTFOLIO_DESCRIPTION,
  PORTFOLIO_HEADING,
  PORTFOLIO_HEADING_ID,
  PORTFOLIO_LABEL,
  PORTFOLIO_SECTION_ID,
} from "./portfolio.constants";
import "./portfolio.css";

export function PortfolioSection() {
  return (
    <section
      id={PORTFOLIO_SECTION_ID}
      aria-labelledby={PORTFOLIO_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal
          name="portfolio"
          className="homepage-section-intro max-w-2xl text-left"
        >
          <p
            className={cn(
              "section-intro-eyebrow portfolio-label",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {PORTFOLIO_LABEL}
          </p>

          <h2
            id={PORTFOLIO_HEADING_ID}
            className={cn(
              "section-intro-heading font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {PORTFOLIO_HEADING}
          </h2>

          <p
            className={cn(
              "section-intro-description max-w-2xl",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {PORTFOLIO_DESCRIPTION}
          </p>
        </HomepageReveal>

        <div className="section-content-grid section-content-grid--portfolio w-full min-w-0">
          <PortfolioGrid />
        </div>
      </Container>
    </section>
  );
}
