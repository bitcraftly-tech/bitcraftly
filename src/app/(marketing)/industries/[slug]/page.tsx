import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { PageShell } from "@/components/patterns/marketing-layout";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { NAV_ACTIONS } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";
import { buildIndustriesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import {
  getIndustryModelBySlug,
  INDUSTRIES_CATALOG,
  industryDetailHref,
} from "@/features/industries/industries.content";
import { IndustryIllustration } from "@/features/industries/IndustryIllustration";
import "@/features/industries/industries.css";

interface IndustrySlugPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES_CATALOG.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustrySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryModelBySlug(slug);

  if (!industry) {
    return createPageMetadata({
      title: "Industry",
      description: "Bitcraftly industry solutions.",
      path: industryDetailHref(slug),
    });
  }

  return createPageMetadata({
    title: `${industry.label} Industry Solutions`,
    description: industry.description,
    path: industryDetailHref(industry.slug),
    keywords: [
      industry.label,
      "Bitcraftly",
      "industry software",
      "digital engineering",
    ],
  });
}

export default async function IndustrySlugPage({
  params,
}: IndustrySlugPageProps) {
  const { slug } = await params;
  const industry = getIndustryModelBySlug(slug);

  if (!industry) {
    notFound();
  }

  const breadcrumbs = buildIndustriesBreadcrumbs([
    { label: industry.label },
  ]);

  return (
    <PageShell className={`industries-page industries-accent--${industry.accent}`}>
      <Section
        spacing="lg"
        aria-labelledby={`${industry.slug}-page-heading`}
        className="border-b border-border/40"
      >
        <MarketingBreadcrumbs items={breadcrumbs} className="mb-[var(--space-4)]" />
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)] lg:items-start">
          <div className="min-w-0">
            <p className="industries-intro__eyebrow">Industry</p>
            <h1
              id={`${industry.slug}-page-heading`}
              className="industries-intro__heading"
            >
              {industry.label}
            </h1>
            <p className="industries-intro__description">{industry.description}</p>

            <div className="mt-[var(--space-5)] grid gap-[16px] sm:grid-cols-2">
              <div>
                <p className="industries-card__col-label">Pain points</p>
                <ul className="industries-card__list">
                  {industry.painPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="industries-card__col-label">Solutions</p>
                <ul className="industries-card__list">
                  {industry.solutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-[var(--space-5)] flex flex-col gap-[12px] sm:flex-row">
              <Link
                href={NAV_ACTIONS.freeConsultation.href}
                className="industries-hero__btn industries-hero__btn--primary"
              >
                {NAV_ACTIONS.freeConsultation.label}
                <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
              </Link>
              <Link
                href="/industries#industries-grid"
                className="industries-hero__btn industries-hero__btn--ghost"
              >
                All industries
              </Link>
            </div>
          </div>

          <IndustryIllustration
            illustration={industry.illustration}
            className="min-h-[200px] lg:min-h-[260px]"
          />
        </div>
      </Section>
    </PageShell>
  );
}
