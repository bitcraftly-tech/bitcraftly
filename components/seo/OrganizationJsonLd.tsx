import { HOME_SEO, LOCAL_BUSINESS, SITE_NAME, SITE_URL } from "@/lib/seo";

/** Structured data for homepage — no visual UI impact */
export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: HOME_SEO.description,
        founder: {
          "@type": "Person",
          name: LOCAL_BUSINESS.founder,
          jobTitle: "Tech Lead & Frontend Architect",
        },
        areaServed: LOCAL_BUSINESS.areaServed,
        knowsAbout: ["React.js", "Next.js", "Frontend Architecture", "AI-powered web development"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        url: SITE_URL,
        description: HOME_SEO.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: LOCAL_BUSINESS.addressLocality,
          addressRegion: LOCAL_BUSINESS.addressRegion,
          addressCountry: LOCAL_BUSINESS.addressCountry,
        },
        telephone: LOCAL_BUSINESS.telephone,
        priceRange: "₹₹",
        serviceType: [
          "React.js Development",
          "Next.js Development",
          "AI-Powered Website Solutions",
          "Website Redesign",
          "Business Website Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
