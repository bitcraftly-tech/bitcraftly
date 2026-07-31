import Link from 'next/link';
import { MarketingIllustratedHero } from '@/components/patterns/hero-compositions';
import { PageShell } from '@/components/patterns/marketing-layout';
import { Section } from '@/components/ui/section';
import { CASE_STUDIES, getCaseStudyHref } from '@/content/case-studies';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { buildCaseStudiesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { CaseStudiesHeroVisual } from './CaseStudiesHeroVisual';

export function CaseStudiesLandingPage() {
  const breadcrumbs = buildCaseStudiesBreadcrumbs();

  return (
    <PageShell className="case-studies-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="case-studies-page-heading"
        eyebrow="Case studies"
        title="Outcomes measured in conversion, ROI, and growth"
        titleHighlight="ROI"
        description="Before-and-after stories from Bitcraftly engagements — timelines, scope, and business metrics that matter to founders and operators."
        supporting="See how we turn discovery into shipped systems with clear payback."
        primaryCta={{
          label: 'View portfolio',
          href: ROUTES.work,
        }}
        secondaryCta={{
          label: NAV_ACTIONS.bookCall.label,
          href: NAV_ACTIONS.bookCall.href,
        }}
        trustItems={['Before / after metrics', 'Written delivery notes', 'Measurable ROI']}
        renderVisual={() => <CaseStudiesHeroVisual />}
      />

      <Section spacing="lg" background="default" aria-labelledby="case-studies-list-heading">
        <h2
          id="case-studies-list-heading"
          className="m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
        >
          Featured case studies
        </h2>
        <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-2 xl:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug}>
              <Link
                href={getCaseStudyHref(study.slug)}
                className="block h-full rounded-[16px] border border-border bg-background p-[16px] no-underline transition-colors hover:border-primary/30"
              >
                <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
                  {study.client.industry}
                </p>
                <h3 className="mt-[8px] m-0 font-sans text-[18px] font-semibold text-foreground">
                  {study.title}
                </h3>
                <p className="mt-[8px] m-0 font-sans text-[14px] leading-[1.6] text-muted-foreground">
                  {study.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
