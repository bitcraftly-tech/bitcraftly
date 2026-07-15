import { cn } from "@/lib/cn";
import type { WorkTestimonial } from "./work.types";

interface WorkTestimonialCardProps {
  testimonial: WorkTestimonial;
  className?: string;
}

/**
 * Reusable testimonial card — only render approved quotes from content.
 */
export function WorkTestimonialCard({
  testimonial,
  className,
}: WorkTestimonialCardProps) {
  return (
    <figure
      className={cn("work-testimonial-card", "work-trust__glass", className)}
    >
      <blockquote className="work-testimonial-card__quote">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="work-testimonial-card__meta">
        <span className="work-testimonial-card__name">
          {testimonial.attribution}
        </span>
        <span className="work-testimonial-card__role">{testimonial.role}</span>
        {testimonial.industry ? (
          <span className="work-testimonial-card__industry">
            {testimonial.industry}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
