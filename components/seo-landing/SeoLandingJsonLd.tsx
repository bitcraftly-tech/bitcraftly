import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildSeoLandingJsonLdGraph } from "@/lib/seo-landing/schema";
import type { SeoLandingConfig } from "@/lib/seo-landing/types";

type SeoLandingJsonLdProps = {
  config: SeoLandingConfig;
};

export default function SeoLandingJsonLd({ config }: SeoLandingJsonLdProps) {
  return (
    <span data-skip-scroll-reveal hidden>
      <JsonLdScript data={buildSeoLandingJsonLdGraph(config)} />
    </span>
  );
}
