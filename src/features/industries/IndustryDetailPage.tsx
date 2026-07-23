import Link from "next/link";
import { PageShell } from "@/components/patterns/marketing-layout";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { buildIndustriesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { IndustryDetailHero } from "./IndustryDetailHero";
import { IndustriesPageCta } from "./IndustriesPageCta";
import { IndustryCard } from "./IndustryCard";
import {
  getIndustryModelBySlug,
  INDUSTRIES_CATALOG,
} from "./industries.content";
import type { IndustryModel } from "./industries.types";
import "./industries.css";

interface IndustryDetailPageProps {
  industry: IndustryModel;
}

function getRelatedIndustries(slug: string): readonly IndustryModel[] {
  return INDUSTRIES_CATALOG.filter((item) => item.slug !== slug).slice(0, 4);
}

/**
 * Industry detail — Industries landing design language (hero shell + section rhythm).
 */
export function IndustryDetailPage({ industry }: IndustryDetailPageProps) {
  const breadcrumbs = buildIndustriesBreadcrumbs([{ label: industry.label }]);
  const related = getRelatedIndustries(industry.slug);

  return (
    <PageShell
      className={`industries-page industry-detail-page industries-accent--${industry.accent}`}
    >
      <IndustryDetailHero industry={industry} breadcrumbs={breadcrumbs} />

      <Section
        spacing="lg"
        aria-labelledby={`${industry.slug}-pains-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Challenges"
          headingId={`${industry.slug}-pains-heading`}
          title="Pain points we hear most"
          description={`Common operational friction in ${industry.label} — and why generic tools fall short.`}
        />
        <ul className="industry-detail-list">
          {industry.painPoints.map((item) => (
            <li key={item} className="industry-detail-list__item">
              <span className="industry-detail-list__icon" aria-hidden>
                <Icon name="zap" size="sm" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${industry.slug}-solutions-heading`}
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Approach"
          headingId={`${industry.slug}-solutions-heading`}
          title="How we solve it"
          description="Domain-shaped product surfaces and workflows engineered for this vertical."
        />
        <ul className="industry-detail-list">
          {industry.solutions.map((item) => (
            <li key={item} className="industry-detail-list__item">
              <span className="industry-detail-list__icon industry-detail-list__icon--check" aria-hidden>
                <Icon name="check" size="sm" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        aria-labelledby={`${industry.slug}-stack-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Stack"
          headingId={`${industry.slug}-stack-heading`}
          title="Technology we typically use"
          description="Modern, maintainable stack choices matched to compliance, scale, and delivery speed."
        />
        <ul className="industry-detail-chips" aria-label="Technology tags">
          {industry.technologyTags.map((tag) => (
            <li key={tag}>
              <span className="industry-detail-chip">{tag}</span>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section
          spacing="lg"
          background="surface"
          aria-labelledby={`${industry.slug}-related-heading`}
          className="border-b border-border/40"
        >
          <div className="industry-detail-related__head">
            <MarketingSectionIntro
              headingId={`${industry.slug}-related-heading`}
              title="Related industries"
              description="Explore adjacent verticals where the same delivery model applies."
            />
            <Link
              href={ROUTES.industries}
              className="industry-detail-related__all"
            >
              View all industries
              <Icon name="arrow-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="industry-detail-related__grid">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <IndustryCard industry={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <IndustriesPageCta />
    </PageShell>
  );
}

export function resolveIndustryDetail(slug: string): IndustryModel | undefined {
  return getIndustryModelBySlug(slug);
}
