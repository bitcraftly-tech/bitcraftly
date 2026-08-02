import { cn } from '@/lib/cn';
import type { AboutTestimonialPlaceholder } from './about.types';

interface AboutTestimonialCardProps {
  testimonial: AboutTestimonialPlaceholder;
  className?: string;
}

/**
 * Reusable testimonial card — use only approved quotes in production content.
 */
export function AboutTestimonialCard({ testimonial, className }: AboutTestimonialCardProps) {
  return (
    <figure className={cn('about-testimonial', className)}>
      <blockquote className="about-testimonial__quote">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="about-testimonial__meta">
        <span className="about-testimonial__name">{testimonial.attribution}</span>
        <span className="about-testimonial__role">{testimonial.role}</span>
      </figcaption>
    </figure>
  );
}
