import { Icon } from "@/components/ui/icon";
import {
  WORK_TRUST_COPY,
  WORK_TRUST_FALLBACK_TOPICS,
} from "./work.content";
import type { WorkTestimonial } from "./work.types";
import { WorkTestimonialCard } from "./WorkTestimonialCard";

interface WorkTestimonialsPanelProps {
  testimonials: readonly WorkTestimonial[];
}

/**
 * Testimonials panel — never invents quotes.
 * Empty approved list → honest empty state + engagement fallbacks.
 */
export function WorkTestimonialsPanel({
  testimonials,
}: WorkTestimonialsPanelProps) {
  if (testimonials.length > 0) {
    return (
      <ul
        className="work-trust__quotes"
        aria-label={WORK_TRUST_COPY.testimonialsLabel}
      >
        {testimonials.map((item) => (
          <li key={item.id}>
            <WorkTestimonialCard testimonial={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className="work-trust__empty"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="work-trust__empty-title">{WORK_TRUST_COPY.emptyTitle}</p>
      <p className="work-trust__empty-description">
        {WORK_TRUST_COPY.emptyDescription}
      </p>

      <ul
        className="work-trust__fallback"
        aria-label="Engagement model highlights"
      >
        {WORK_TRUST_FALLBACK_TOPICS.map((topic) => (
          <li
            key={topic.id}
            className="work-trust__fallback-card work-trust__glass"
          >
            <span className="work-trust__fallback-icon" aria-hidden>
              <Icon
                name={topic.icon}
                size="sm"
                className="h-[20px] w-[20px]"
              />
            </span>
            <div>
              <p className="work-trust__fallback-title">{topic.title}</p>
              <p className="work-trust__fallback-copy">{topic.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
