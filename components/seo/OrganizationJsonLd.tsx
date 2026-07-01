import JsonLdScript from "@/components/seo/JsonLdScript";
import { FOUNDER_LINKEDIN_URL, SUPPORT_EMAIL } from "@/lib/constants";
import { HOME_SEO, LOCAL_BUSINESS, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { bitcraftlySocialSameAs } from "@/lib/socialLinks";

/** Structured data for homepage — Organization, LocalBusiness, WebSite */
export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_OG_IMAGE,
        image: DEFAULT_OG_IMAGE,
        email: SUPPORT_EMAIL,
        description: HOME_SEO.description,
        founder: {
          "@type": "Person",
          name: LOCAL_BUSINESS.founder,
          jobTitle: "Tech Lead & Frontend Architect",
          url: FOUNDER_LINKEDIN_URL ?? undefined,
        },
        areaServed: LOCAL_BUSINESS.areaServed.map((city) => ({
          "@type": "City",
          name: city,
        })),
        knowsAbout: [
          "React.js development",
          "Next.js website development",
          "Frontend architecture",
          "AI-powered web development",
          "Business website development",
          "Website redesign",
          "Website performance optimization",
        ],
        sameAs: bitcraftlySocialSameAs(),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        description: HOME_SEO.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: LOCAL_BUSINESS.addressLocality,
          addressRegion: LOCAL_BUSINESS.addressRegion,
          addressCountry: LOCAL_BUSINESS.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: LOCAL_BUSINESS.geo.latitude,
          longitude: LOCAL_BUSINESS.geo.longitude,
        },
        telephone: LOCAL_BUSINESS.telephone,
        email: SUPPORT_EMAIL,
        priceRange: "₹₹",
        areaServed: LOCAL_BUSINESS.areaServed,
        serviceType: [
          "React.js Development",
          "Next.js Development",
          "Website Development",
          "AI-Powered Web Solutions",
          "Frontend Architecture",
          "Website Redesign",
          "Business Website Development",
          "Landing Page Development",
          "Website Performance Optimization",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website development packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fast-launch business website",
              },
              priceCurrency: "INR",
              price: "8999",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "React.js & Next.js custom website",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_SEO.description,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return <JsonLdScript data={schema} />;
}
