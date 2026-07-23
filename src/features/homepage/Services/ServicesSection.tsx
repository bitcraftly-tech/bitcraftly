import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { ServiceCard } from "./ServiceCard";
import { ServicesIntroCta } from "./ServicesIntroCta";
import { ServicesReveal } from "./ServicesReveal";
import {
  HOMEPAGE_SERVICES,
  SERVICES_DESCRIPTION,
  SERVICES_HEADING,
  SERVICES_HEADING_ID,
  SERVICES_LABEL,
  SERVICES_SECTION_ID,
} from "./services.constants";

/**
 * Services — split intro like Process / Tech Stack:
 * left title block, right “Explore All Services” link.
 */
export function ServicesSection() {
  return (
    <section
      id={SERVICES_SECTION_ID}
      aria-labelledby={SERVICES_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
          <ServicesReveal className="min-w-0 max-w-2xl">
            <div className="homepage-section-intro text-left">
              <p
                className={cn(
                  "section-intro-eyebrow services-label",
                  "font-sans text-[12px] font-[var(--font-weight-semibold)]",
                  "uppercase tracking-[0.16em]",
                )}
              >
                {SERVICES_LABEL}
              </p>

              <h2
                id={SERVICES_HEADING_ID}
                className={cn(
                  "section-intro-heading font-sans font-bold text-foreground",
                  "text-[28px] leading-[1.2] tracking-[-0.02em]",
                  "sm:text-[32px] lg:text-[34px]",
                )}
              >
                {SERVICES_HEADING}
              </h2>

              <p
                className={cn(
                  "section-intro-description max-w-2xl",
                  "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
                  "sm:text-[16px]",
                )}
              >
                {SERVICES_DESCRIPTION}
              </p>
            </div>
          </ServicesReveal>

          <ServicesIntroCta className="shrink-0 self-end text-[13px] gap-[4px] hover:opacity-80 hover:text-primary" />
        </div>

        <ul
          className={cn(
            "section-content-grid m-0 grid list-none p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {HOMEPAGE_SERVICES.map((service, index) => (
            <li key={service.id} className="min-w-0">
              <ServicesReveal delayMs={index * 70} className="h-full">
                <ServiceCard service={service} variant="homepage" />
              </ServicesReveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
