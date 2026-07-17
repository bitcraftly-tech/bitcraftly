import { Section } from "@/components/ui/section";
import type { CaseStudy } from "@/content/case-studies";

interface CaseStudyArchitectureProps {
  study: CaseStudy;
}

export function CaseStudyArchitecture({ study }: CaseStudyArchitectureProps) {
  return (
    <Section
      id="architecture"
      spacing="lg"
      background="surface"
      aria-labelledby="case-architecture-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Architecture
      </p>
      <h2
        id="case-architecture-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        System shape
      </h2>
      <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[12px] p-0 md:grid-cols-3">
        {study.architecture.map((layer) => (
          <li
            key={layer.id}
            className="rounded-[16px] border border-border bg-background p-[16px]"
          >
            <h3 className="m-0 font-sans text-[17px] font-semibold text-foreground">
              {layer.title}
            </h3>
            <p className="mt-[8px] m-0 font-sans text-[14px] leading-[1.65] text-muted-foreground">
              {layer.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
