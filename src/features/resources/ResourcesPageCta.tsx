import { MarketingFinalCtaBand } from "@/components/patterns/marketing-final-cta-band";
import { RESOURCES_CTA_COPY } from "./resources.content";

/**
 * Final CTA — same MarketingFinalCtaBand shell as Resources landing.
 */
export function ResourcesPageCta({ source }: { source?: string }) {
  const primaryHref = source
    ? `${RESOURCES_CTA_COPY.primaryCta.href}&intent=${encodeURIComponent(source)}`
    : RESOURCES_CTA_COPY.primaryCta.href;

  return (
    <MarketingFinalCtaBand
      headingId="resources-cta-heading"
      heading={RESOURCES_CTA_COPY.heading}
      description={RESOURCES_CTA_COPY.description}
      primaryCta={{
        label: RESOURCES_CTA_COPY.primaryCta.label,
        href: primaryHref,
      }}
      tertiaryCta={RESOURCES_CTA_COPY.tertiaryCta}
      trust={[...RESOURCES_CTA_COPY.trust]}
    />
  );
}
