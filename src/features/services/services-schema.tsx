import { ROUTES } from "@/constants/navigation";
import { SERVICES_LANDING } from "./services.content";
import type { ServicePageContent } from "./services.types";

export function buildServicesListingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bitcraftly.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://bitcraftly.com/services",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://bitcraftly.com/services#webpage",
        url: "https://bitcraftly.com/services",
        name: "Bitcraftly Services",
        description:
          "End-to-end digital engineering services including AI, websites, apps, custom software, and cloud DevOps.",
        isPartOf: { "@id": "https://bitcraftly.com/#website" },
      },
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "AI & Automation",
            url: "https://bitcraftly.com/services#ai-automation",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Development",
            url: "https://bitcraftly.com/services#development",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Digital Growth",
            url: "https://bitcraftly.com/services#digital-growth",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: SERVICES_LANDING.listingFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildServiceDetailJsonLd(content: ServicePageContent) {
  const url = `https://bitcraftly.com${ROUTES.services}/${content.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: content.label,
        description: content.metaDescription,
        url,
        provider: {
          "@type": "Organization",
          "@id": "https://bitcraftly.com/#organization",
          name: "Bitcraftly",
          url: "https://bitcraftly.com",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        serviceType: content.groupTitle,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bitcraftly.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://bitcraftly.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.label,
            item: url,
          },
        ],
      },
      ...(content.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: content.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
