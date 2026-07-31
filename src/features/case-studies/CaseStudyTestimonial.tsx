import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyTestimonialProps {
  study: CaseStudy;
}

export function CaseStudyTestimonial({ study }: CaseStudyTestimonialProps) {
  const { testimonial } = study;

  return (
    <Section
      id="testimonial"
      spacing="lg"
      background="surface"
      aria-labelledby="case-testimonial-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Testimonial
      </p>
      <h2 id="case-testimonial-heading" className="sr-only">
        Client testimonial
      </h2>
      <blockquote className="mt-[12px] m-0 max-w-3xl">
        <p className="m-0 font-sans text-[22px] font-medium leading-[1.45] tracking-[-0.02em] text-foreground sm:text-[26px]">
          “{testimonial.quote}”
        </p>
        <footer className="mt-[16px] font-sans text-[14px] text-muted-foreground">
          <cite className="not-italic font-semibold text-foreground">{testimonial.name}</cite>
          {' — '}
          {testimonial.role}, {testimonial.company}
        </footer>
      </blockquote>
    </Section>
  );
}
