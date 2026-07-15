import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import {
  getApprovedTestimonials,
  WORK_TRUST_BAND,
  WORK_TRUST_COPY,
  WORK_TRUST_PILLARS,
} from "./work.content";
import { WorkTestimonialsPanel } from "./WorkTestimonialsPanel";
import "./work.css";

/**
 * Trust & Credibility — principles + approved testimonials only (Sprint 5I).
 */
export function WorkTrustSection() {
  const approved = getApprovedTestimonials();

  return (
    <Section
      id="work-trust"
      spacing="lg"
      background="surface"
      aria-labelledby="work-trust-heading"
      className="work-trust border-b border-border/40"
    >
      <header className="work-trust__intro">
        <p className="work-trust__eyebrow">{WORK_TRUST_COPY.eyebrow}</p>
        <h2 id="work-trust-heading" className="work-trust__title">
          {WORK_TRUST_COPY.heading}
        </h2>
        <p className="work-trust__description">{WORK_TRUST_COPY.description}</p>
      </header>

      <ul className="work-trust__pillars" aria-label={WORK_TRUST_COPY.pillarsLabel}>
        {WORK_TRUST_PILLARS.map((pillar) => (
          <li key={pillar.id}>
            <article
              className={cn(
                "work-trust__card",
                "work-trust__glass",
                `work-trust__card--${pillar.tone}`,
              )}
            >
              <div className="work-trust__card-head">
                <span className="work-trust__icon" aria-hidden>
                  <Icon
                    name={pillar.icon}
                    size="sm"
                    className="h-[20px] w-[20px]"
                  />
                </span>
                <h3 className="work-trust__card-title">{pillar.title}</h3>
              </div>
              <ul className="work-trust__items">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>

      <WorkTestimonialsPanel testimonials={approved} />

      <ul className="work-trust__band" aria-label={WORK_TRUST_COPY.bandLabel}>
        {WORK_TRUST_BAND.map((item) => (
          <li key={item.id} className="work-trust__band-item work-trust__glass">
            <span className="work-trust__band-dot" aria-hidden />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** Alias used by scaffold / hub exports. */
export function WorkTestimonialsSection() {
  return <WorkTrustSection />;
}
