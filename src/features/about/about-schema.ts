import { ROUTES } from "@/constants/navigation";
import { ABOUT_FAQS, ABOUT_LANDING_META, ABOUT_LEADERSHIP } from "./about.content";

const SITE_URL = "https://bitcraftly.com";

export function buildAboutJsonLd() {
  const founder = ABOUT_LEADERSHIP[0];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}${ROUTES.about}#webpage`,
        url: `${SITE_URL}${ROUTES.about}`,
        name: ABOUT_LANDING_META.title,
        description: ABOUT_LANDING_META.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/icon.png`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Bitcraftly",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/icon.png`,
        description: ABOUT_LANDING_META.description,
        foundingLocation: {
          "@type": "Place",
          name: "Delhi NCR, India",
        },
        sameAs: [],
        ...(founder
          ? {
              founder: {
                "@type": "Person",
                name: founder.name,
                jobTitle: founder.role,
                description: founder.bio,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}${ROUTES.about}#about-faq`,
        mainEntity: ABOUT_FAQS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}${ROUTES.about}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${SITE_URL}${ROUTES.about}`,
          },
        ],
      },
    ],
  };
}
