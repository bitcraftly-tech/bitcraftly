import { Section } from '@/components/ui/section';
import { hasApprovedCaseStudyResults, type CaseStudy } from '@/content/case-studies';

interface CaseStudyResultsProps {
  study: CaseStudy;
}

export function CaseStudyResults({ study }: CaseStudyResultsProps) {
  if (!hasApprovedCaseStudyResults(study) || !study.results) {
    return null;
  }

  const { results } = study;

  return (
    <Section
      id="results"
      spacing="lg"
      background="default"
      aria-labelledby="case-results-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Results
      </p>
      <h2
        id="case-results-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Measurable outcomes
      </h2>
      <p className="mt-[12px] m-0 max-w-3xl font-sans text-[16px] leading-[1.75] text-foreground/90">
        {results.summary}
      </p>

      <ul className="mt-[20px] m-0 grid list-none grid-cols-1 gap-[12px] p-0 sm:grid-cols-3">
        {results.metrics.map((metric) => (
          <li
            key={metric.id}
            className="rounded-[16px] border border-border bg-surface/50 px-[16px] py-[18px]"
          >
            <p className="m-0 font-sans text-[32px] font-semibold tracking-[-0.03em] text-primary">
              {metric.value}
            </p>
            <p className="mt-[6px] m-0 font-sans text-[14px] text-muted-foreground">
              {metric.label}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
