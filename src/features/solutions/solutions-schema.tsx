import { ROUTES } from "@/constants/navigation";
import type { SolutionPageContent } from "./solutions.types";

export function buildSolutionsListingJsonLd() {
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
            name: "Solutions",
            item: "https://bitcraftly.com/solutions",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://bitcraftly.com/solutions#webpage",
        url: "https://bitcraftly.com/solutions",
        name: "Bitcraftly Solutions",
        description:
          "Business and AI solutions — CRM, ERP, SaaS platforms, automation, and knowledge systems.",
        isPartOf: { "@id": "https://bitcraftly.com/#website" },
      },
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Business Solutions",
            url: "https://bitcraftly.com/solutions#business-solutions",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI Solutions",
            url: "https://bitcraftly.com/solutions#ai-solutions",
          },
        ],
      },
    ],
  };
}

export function buildSolutionDetailJsonLd(content: SolutionPageContent) {
  const url = `https://bitcraftly.com${ROUTES.solutions}/${content.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#solution`,
        name: content.label,
        description: content.metaDescription,
        url,
        provider: {
          "@type": "Organization",
          "@id": "https://bitcraftly.com/#organization",
          name: "Bitcraftly",
          url: "https://bitcraftly.com",
        },
        areaServed: { "@type": "Country", name: "India" },
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
            name: "Solutions",
            item: "https://bitcraftly.com/solutions",
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
