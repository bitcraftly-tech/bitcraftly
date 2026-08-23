import Link from 'next/link';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { MarketingIllustratedHero } from '@/components/patterns/hero-compositions';
import { PageShell } from '@/components/patterns/marketing-layout';
import { Section } from '@/components/ui/section';
import { CASE_STUDIES, getCaseStudyHref, isCaseStudyIndexable } from '@/content/case-studies';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { buildCaseStudiesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { CaseStudiesHeroVisual } from './CaseStudiesHeroVisual';
import { buildCaseStudiesListingJsonLd } from './case-study-schema';

export function CaseStudiesLandingPage() {
  const breadcrumbs = buildCaseStudiesBreadcrumbs();
  const indexableStudies = CASE_STUDIES.filter(isCaseStudyIndexable);
  const hasPublishedStudies = indexableStudies.length > 0;

  return (
    <PageShell className="case-studies-page">
      <JsonLdScript data={buildCaseStudiesListingJsonLd()} />
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="case-studies-page-heading"
        eyebrow="Case studies"
        title="Case studies"
        description={
          hasPublishedStudies
            ? 'Published Bitcraftly case studies. Each story listed here has been approved for public release.'
            : 'Published Bitcraftly case studies will appear here after they are approved for public release.'
        }
        supporting={
          hasPublishedStudies
            ? 'Explore the stories below, or visit the work portfolio for live projects and product showcases.'
            : 'The work portfolio remains available for live projects and product showcases.'
        }
        primaryCta={{
          label: 'View portfolio',
          href: ROUTES.work,
        }}
        secondaryCta={{
          label: NAV_ACTIONS.bookCall.label,
          href: NAV_ACTIONS.bookCall.href,
        }}
        trustItems={[
          'Approved publications only',
          'Live work in the portfolio',
          'Reviewed before listing',
        ]}
        renderVisual={() => <CaseStudiesHeroVisual />}
      />

      <Section spacing="lg" background="default" aria-labelledby="case-studies-list-heading">
        <h2
          id="case-studies-list-heading"
          className="m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
        >
          Published case studies
        </h2>
        {hasPublishedStudies ? (
          <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[14px] p-0 md:grid-cols-2 xl:grid-cols-3">
            {indexableStudies.map((study) => (
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
        ) : (
          <p className="mt-[18px] m-0 max-w-3xl font-sans text-[16px] leading-[1.7] text-muted-foreground">
            No case studies are currently approved for public publication. Visit the{' '}
            <Link href={ROUTES.work} className="text-primary underline-offset-2 hover:underline">
              work portfolio
            </Link>{' '}
            for live projects and product showcases.
          </p>
        )}
      </Section>
    </PageShell>
  );
}
