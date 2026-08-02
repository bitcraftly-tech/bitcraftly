import { Section } from '@/components/ui/section';
import type { CaseStudy } from '@/content/case-studies';

interface CaseStudyOverviewProps {
  study: CaseStudy;
}

export function CaseStudyOverview({ study }: CaseStudyOverviewProps) {
  const items = [
    { label: 'Client', value: study.client.name },
    { label: 'Industry', value: study.client.industry },
    { label: 'Company size', value: study.client.size },
    { label: 'Location', value: study.client.location },
    { label: 'Engagement', value: study.engagement.role },
    { label: 'Duration', value: study.engagement.duration },
    { label: 'Year', value: String(study.engagement.year) },
  ] as const;

  return (
    <Section
      id="overview"
      spacing="lg"
      background="surface"
      aria-labelledby="case-overview-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Client overview
      </p>
      <h2
        id="case-overview-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Who we partnered with
      </h2>
      <p className="mt-[10px] m-0 max-w-2xl font-sans text-[15px] leading-[1.7] text-muted-foreground">
        {study.description}
      </p>

      <dl className="mt-[22px] grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-[14px] border border-border bg-background px-[14px] py-[12px]"
          >
            <dt className="font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-[6px] m-0 font-sans text-[15px] font-semibold text-foreground">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
