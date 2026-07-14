import { MarketingOfferDetailPage } from "@/components/patterns/marketing-offer-detail";
import { ROUTES } from "@/constants/navigation";
import { ServiceCard } from "@/features/services/ServiceCard";
import { buildSolutionsBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";
import {
  getRelatedServiceLinks,
  getRelatedSolutions,
} from "./solutions.content";
import { buildSolutionDetailJsonLd } from "./solutions-schema";
import type { SolutionPageContent } from "./solutions.types";

interface SolutionDetailPageProps {
  content: SolutionPageContent;
}

export function SolutionDetailPage({ content }: SolutionDetailPageProps) {
  const breadcrumbs = buildSolutionsBreadcrumbs([{ label: content.label }]);
  const relatedSolutions = getRelatedSolutions(content.slug);
  const relatedServices = getRelatedServiceLinks(content.relatedServiceHrefs);
  const contactHref = `${ROUTES.contact}?intent=${encodeURIComponent(`solution-${content.slug}`)}&source=solution-page`;

  return (
    <MarketingOfferDetailPage
      pageClassName="solutions-page"
      jsonLd={buildSolutionDetailJsonLd(content)}
      breadcrumbs={breadcrumbs}
      slug={content.slug}
      eyebrow={content.eyebrow}
      icon={content.icon}
      groupTitle={content.groupTitle}
      headline={content.headline}
      intro={content.intro}
      contactHref={contactHref}
      primaryCtaLabel={content.ctaPrimaryLabel}
      secondaryCtaHref={ROUTES.solutions}
      secondaryCtaLabel={content.ctaSecondaryLabel}
      outcomes={content.outcomes}
      outcomesAriaLabel="Solution snapshot"
      highlights={content.highlights}
      process={content.process}
      faqs={content.faqs}
      relatedHeading="Related solutions"
      relatedAllHref={ROUTES.solutions}
      relatedAllLabel="View all solutions →"
      relatedCards={
        <ul
          className={cn(
            "m-0 grid list-none gap-[24px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {relatedSolutions.map((solution) => (
            <li key={solution.slug} className="min-w-0">
              <ServiceCard service={solution} />
            </li>
          ))}
        </ul>
      }
      relatedLinksHeading="Related services"
      relatedLinks={relatedServices}
    />
  );
}
