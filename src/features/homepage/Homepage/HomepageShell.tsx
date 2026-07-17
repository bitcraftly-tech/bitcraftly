import { HeroSection } from "../Hero";
import { FAQ_ITEMS } from "../FAQ/faq.constants";
import { HomepageBelowFoldClient } from "./HomepageBelowFoldClient";
import { HomepageDeferredCss } from "./HomepageDeferredCss";
import "./homepage-critical.css";

function HomepageFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Homepage ATF architecture:
 * - Critical path: Hero + critical CSS + FAQ JSON-LD (SEO)
 * - Below-ATF: idle-mounted client stack (cuts initial HTML / main-thread)
 */
export function HomepageShell() {
  return (
    <div className="homepage-sections">
      <HomepageDeferredCss />
      <HomepageFaqJsonLd />
      <HeroSection />
      <HomepageBelowFoldClient />
    </div>
  );
}
