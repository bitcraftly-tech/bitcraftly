import { MarketingOfferDetailPage } from "@/components/patterns/marketing-offer-detail";
import { getRelatedWorkForService, ROUTES } from "@/constants/navigation";
import { buildServicesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";
import { ServiceCard } from "./ServiceCard";
import {
  getRelatedServices,
  getRelatedWorkLinks,
} from "./services.content";
import { buildServiceDetailJsonLd } from "./services-schema";
import type { ServicePageContent } from "./services.types";

interface ServiceDetailPageProps {
  content: ServicePageContent;
}

export function ServiceDetailPage({ content }: ServiceDetailPageProps) {
  const breadcrumbs = buildServicesBreadcrumbs([{ label: content.label }]);
  const relatedServices = getRelatedServices(content.slug);
  const relatedWork = getRelatedWorkLinks(
    getRelatedWorkForService(content.slug),
  );
  const contactHref = `${ROUTES.contact}?intent=${encodeURIComponent(content.slug)}&source=service-page`;

  return (
    <MarketingOfferDetailPage
      pageClassName="services-page"
      jsonLd={buildServiceDetailJsonLd(content)}
      breadcrumbs={breadcrumbs}
      slug={content.slug}
      eyebrow={content.eyebrow}
      icon={content.icon}
      groupTitle={content.groupTitle}
      headline={content.headline}
      intro={content.intro}
      contactHref={contactHref}
      primaryCtaLabel={content.ctaPrimaryLabel}
      secondaryCtaHref={ROUTES.services}
      secondaryCtaLabel={content.ctaSecondaryLabel}
      outcomes={content.outcomes}
      outcomesAriaLabel="Service snapshot"
      highlights={content.highlights}
      process={content.process}
      faqs={content.faqs}
      relatedHeading="Related services"
      relatedAllHref={ROUTES.services}
      relatedAllLabel="View all services →"
      relatedCards={
        <ul
          className={cn(
            "m-0 grid list-none gap-[24px] p-0",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {relatedServices.map((service) => (
            <li key={service.slug} className="min-w-0">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      }
      relatedLinksHeading="Related work"
      relatedLinks={relatedWork}
    />
  );
}
