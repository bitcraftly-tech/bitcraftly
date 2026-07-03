import JsonLdScript from "@/components/seo/JsonLdScript";
import { FAQ_ITEMS } from "@/lib/siteContent";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

/** FAQPage structured data for /faq — helps Google rich results */
export default function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: `${SITE_URL}/faq`,
    name: `${SITE_NAME} — Website Development FAQ`,
  };

  return (
    <span data-skip-scroll-reveal hidden>
      <JsonLdScript data={schema} />
    </span>
  );
}
