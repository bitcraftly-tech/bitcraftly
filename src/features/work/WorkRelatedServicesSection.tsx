import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import {
  WORK_RELATED_COPY,
  WORK_RELATED_SERVICES,
} from "./work.content";
import "./work.css";

/**
 * Related Services — premium capability cards (Sprint 5J).
 */
export function WorkRelatedServicesSection() {
  return (
    <Section
      id="work-related-services"
      spacing="lg"
      background="surface"
      aria-labelledby="work-related-heading"
      className="work-related border-b border-border/40"
    >
      <header className="work-related__intro">
        <p className="work-related__eyebrow">{WORK_RELATED_COPY.eyebrow}</p>
        <h2 id="work-related-heading" className="work-related__title">
          {WORK_RELATED_COPY.heading}
        </h2>
        <p className="work-related__description">
          {WORK_RELATED_COPY.description}
        </p>
      </header>

      <ul className="work-related__rail" aria-label="Related services">
        {WORK_RELATED_SERVICES.map((service) => (
          <li key={service.id}>
            <article className="work-related__card work-convert__glass">
              <span className="work-related__icon" aria-hidden>
                <Icon
                  name={service.icon}
                  size="sm"
                  className="h-[20px] w-[20px]"
                />
              </span>
              <h3 className="work-related__card-title">{service.title}</h3>
              <p className="work-related__card-description">
                {service.description}
              </p>
              <Link href={service.href} className="work-related__cta">
                {service.ctaLabel}
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="work-related__cta-icon h-[13px] w-[13px]"
                />
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
