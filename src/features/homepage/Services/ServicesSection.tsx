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
export function ServicesSection() {
  return (
    <section
      id={SERVICES_SECTION_ID}
      aria-labelledby={SERVICES_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <ServicesReveal className="mx-auto max-w-[640px] text-center">
          <p
            className={cn(
              "services-label m-0 mb-[var(--space-2)]",
              "font-sans text-[12px] font-[var(--font-weight-semibold)]",
              "uppercase tracking-[0.16em]",
            )}
          >
            {SERVICES_LABEL}
          </p>

          <h2
            id={SERVICES_HEADING_ID}
            className={cn(
              "m-0 font-sans font-bold text-foreground",
              "text-[28px] leading-[1.2] tracking-[-0.02em]",
              "sm:text-[32px] lg:text-[34px]",
            )}
          >
            {SERVICES_HEADING}
          </h2>

          <p
            className={cn(
              "m-0 mx-auto mt-[var(--space-2)] max-w-[520px]",
              "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
              "sm:text-[16px]",
            )}
          >
            {SERVICES_DESCRIPTION}
          </p>

          <div className="mt-[var(--space-4)] flex justify-center">
            <ServicesIntroCta />
          </div>
        </ServicesReveal>

        <ul
          className={cn(
            "m-0 mt-[var(--space-6)] grid list-none gap-[24px] p-0",
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
