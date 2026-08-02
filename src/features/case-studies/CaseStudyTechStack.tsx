import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyTechStackProps {
  study: CaseStudy;
}

export function CaseStudyTechStack({ study }: CaseStudyTechStackProps) {
  return (
    <Section
      id="tech-stack"
      spacing="lg"
      background="default"
      aria-labelledby="case-tech-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Tech stack
      </p>
      <h2
        id="case-tech-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Technologies used
      </h2>
      <ul className="mt-[18px] m-0 flex list-none flex-wrap gap-[8px] p-0">
        {study.techStack.map((tech) => (
          <li key={tech}>
            <Badge variant="primary" size="md">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
