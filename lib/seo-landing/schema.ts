import { SITE_NAME, SITE_URL } from "@/lib/seo";

import { seoLandingCanonical } from "./metadata";
import type { SeoLandingConfig } from "./types";

export function buildSeoLandingBreadcrumbSchema(config: SeoLandingConfig) {
  const pageUrl = seoLandingCanonical(config.slug);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: config.breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}` } : { item: pageUrl }),
    })),
  };
}

export function buildSeoLandingServiceSchema(config: SeoLandingConfig) {
  const pageUrl = seoLandingCanonical(config.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: config.serviceSchema.name,
    description: config.serviceSchema.description,
    url: pageUrl,
    serviceType: config.serviceSchema.serviceType,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: config.serviceSchema.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

export function buildSeoLandingFaqSchema(config: SeoLandingConfig) {
  const pageUrl = seoLandingCanonical(config.slug);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: pageUrl,
    name: `${SITE_NAME} — ${config.hero.title}`,
  };
}

export function buildSeoLandingJsonLdGraph(config: SeoLandingConfig) {
  return [
    buildSeoLandingBreadcrumbSchema(config),
    buildSeoLandingServiceSchema(config),
    buildSeoLandingFaqSchema(config),
  ];
}
