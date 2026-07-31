import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyProblemProps {
  study: CaseStudy;
}

export function CaseStudyProblem({ study }: CaseStudyProblemProps) {
  return (
    <Section
      id="problem"
      spacing="lg"
      background="default"
      aria-labelledby="case-problem-heading"
      className="border-b border-border/50"
    >
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        <div>
          <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
            Problem
          </p>
          <h2
            id="case-problem-heading"
            className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
          >
            The business problem
          </h2>
          <p className="mt-[12px] m-0 font-sans text-[16px] leading-[1.75] text-foreground/90">
            {study.problem}
          </p>
        </div>

        <div>
          <h3
            id="case-challenges-heading"
            className="m-0 font-sans text-[20px] font-semibold text-foreground"
          >
            Challenges
          </h3>
          <ul className="mt-[12px] m-0 list-disc space-y-[10px] pl-[20px] font-sans text-[15px] leading-[1.65] text-muted-foreground">
            {study.challenges.map((challenge) => (
              <li key={challenge}>{challenge}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
