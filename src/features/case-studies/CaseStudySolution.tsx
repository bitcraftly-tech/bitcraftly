import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudySolutionProps {
  study: CaseStudy;
}

export function CaseStudySolution({ study }: CaseStudySolutionProps) {
  return (
    <Section
      id="solution"
      spacing="lg"
      background="surface"
      aria-labelledby="case-solution-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Solution
      </p>
      <h2
        id="case-solution-heading"
        className="mt-[8px] m-0 max-w-3xl font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        How we solved it
      </h2>
      <p className="mt-[12px] m-0 max-w-3xl font-sans text-[16px] leading-[1.75] text-foreground/90">
        {study.solution}
      </p>

      <ol className="mt-[20px] m-0 grid list-decimal grid-cols-1 gap-[12px] pl-[20px] md:grid-cols-2 md:pl-0 md:list-none">
        {study.approach.map((step, index) => (
          <li
            key={step}
            className="rounded-[14px] border border-border bg-background px-[14px] py-[14px] font-sans text-[14px] leading-[1.65] text-muted-foreground md:list-none"
          >
            <span className="mb-[6px] block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
              Step {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </Section>
  );
}
