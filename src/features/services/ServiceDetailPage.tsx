import Link from "next/link";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import { MarketingSectionIntro } from "@/components/patterns/marketing-section-intro";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { getRelatedWorkForService, ROUTES } from "@/constants/navigation";
import { buildServicesBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";
import "@/features/homepage/FAQ/faq.css";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailHero } from "./ServiceDetailHero";
import { ServiceFaqAccordion } from "./ServiceFaqAccordion";
import { ServicesPageCta } from "./ServicesPageCta";
import {
  getRelatedServices,
  getRelatedWorkLinks,
} from "./services.content";
import { buildServiceDetailJsonLd } from "./services-schema";
import type { ServicePageContent } from "./services.types";
import "./services.css";

interface ServiceDetailPageProps {
  content: ServicePageContent;
}

/**
 * Service detail — Services landing design language (hero shell + section rhythm).
 */
export function ServiceDetailPage({ content }: ServiceDetailPageProps) {
  const breadcrumbs = buildServicesBreadcrumbs([{ label: content.label }]);
  const relatedServices = getRelatedServices(content.slug);
  const relatedWork = getRelatedWorkLinks(
    getRelatedWorkForService(content.slug),
  );
  const contactHref = `${ROUTES.contact}?intent=${encodeURIComponent(content.slug)}&source=service-page`;

  return (
    <PageShell className="services-page service-detail-page">
      <JsonLdScript data={buildServiceDetailJsonLd(content)} />

      <ServiceDetailHero
        content={content}
        breadcrumbs={breadcrumbs}
        contactHref={contactHref}
      />

      <Section
        spacing="lg"
        aria-labelledby={`${content.slug}-highlights-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Capabilities"
          headingId={`${content.slug}-highlights-heading`}
          title="What this engagement covers"
          description="Concrete capabilities we deliver for this service line — scoped to your timeline and stack."
        />
        <ul className="service-detail-capabilities">
          {content.highlights.map((item) => (
            <li key={item} className="service-detail-capabilities__item">
              <span className="services-page-check" aria-hidden>
                <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${content.slug}-process-heading`}
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Delivery"
          headingId={`${content.slug}-process-heading`}
          title="How we deliver"
          description="A clear path from discovery to launch — with ownership, reviews, and handoff built in."
        />
        <ol className="service-detail-process">
          {content.process.map((step, index) => (
            <li key={step.title} className="service-detail-process__item">
              <p className="service-detail-process__index">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="service-detail-process__title">{step.title}</h3>
              <p className="service-detail-process__body">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {content.faqs.length > 0 ? (
        <Section
          spacing="lg"
          aria-labelledby={`${content.slug}-faq-heading`}
          className="border-b border-border/40 bg-background"
        >
          <MarketingSectionIntro
            eyebrow="FAQ"
            headingId={`${content.slug}-faq-heading`}
            title="Frequently asked questions"
            description={`Common questions about ${content.label} engagements with Bitcraftly.`}
          />
          <div className="service-detail-faq">
            <ServiceFaqAccordion items={[...content.faqs]} />
          </div>
        </Section>
      ) : null}

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${content.slug}-related-heading`}
        className="border-b border-border/40"
      >
        <div className="service-detail-related__head">
          <MarketingSectionIntro
            headingId={`${content.slug}-related-heading`}
            title="Related services"
            description="Explore adjacent service lines that often pair with this engagement."
          />
          <Link
            href={ROUTES.services}
            className="service-detail-related__all"
          >
            View all services
            <Icon name="arrow-right" size="sm" aria-hidden />
          </Link>
        </div>

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

        {relatedWork.length > 0 ? (
          <div className="service-detail-related-work">
            <h3 className="service-detail-related-work__title">Related work</h3>
            <ul className="service-detail-related-work__list">
              {relatedWork.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="service-detail-related-work__chip">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <ServicesPageCta />
    </PageShell>
  );
}
