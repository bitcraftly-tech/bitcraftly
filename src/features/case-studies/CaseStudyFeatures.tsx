import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyFeaturesProps {
  study: CaseStudy;
}

export function CaseStudyFeatures({ study }: CaseStudyFeaturesProps) {
  return (
    <Section
      id="features"
      spacing="lg"
      background="default"
      aria-labelledby="case-features-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Features
      </p>
      <h2
        id="case-features-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        What we shipped
      </h2>
      <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[10px] p-0 sm:grid-cols-2">
        {study.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-[10px] rounded-[14px] border border-border bg-background px-[14px] py-[12px]"
          >
            <span className="mt-[2px] inline-flex text-primary" aria-hidden>
              <Icon name="check" size="sm" className="h-[16px] w-[16px]" />
            </span>
            <span className="font-sans text-[15px] leading-[1.55] text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
