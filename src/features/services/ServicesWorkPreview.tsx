import Link from "next/link";
import type { CSSProperties } from "react";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { MarketingStagger } from "@/components/patterns/marketing-stagger";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { PortfolioCard } from "@/features/homepage/Portfolio/PortfolioCard";
import { PORTFOLIO_PROJECTS } from "@/features/homepage/Portfolio/portfolio.constants";
import "@/features/homepage/Portfolio/portfolio.css";
import { Icon } from "@/components/ui/icon";
import { PAGE_GRID_CLASS } from "@/lib/layout/page-shell";
import { cn } from "@/lib/cn";

export function ServicesWorkPreview() {
  const projects = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <Section
      spacing="lg"
      aria-labelledby="services-work-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="mb-[40px] flex flex-wrap items-end justify-between gap-[16px]">
        <MarketingSectionIntro
          eyebrow="Featured work"
          headingId="services-work-heading"
          title="Portfolio & case study highlights"
          description="Selected builds that show how our services ship in the real world."
        />
        <Link
          href={ROUTES.workPortfolio}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View portfolio
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px]"
          />
        </Link>
      </div>

      <MarketingStagger as="ul" className={cn("m-0 list-none p-0", PAGE_GRID_CLASS)}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="mkt-stagger__item min-w-0"
            style={{ "--stagger": Math.min(index, 5) } as CSSProperties}
          >
            <PortfolioCard project={project} />
          </li>
        ))}
      </MarketingStagger>
    </Section>
  );
}
