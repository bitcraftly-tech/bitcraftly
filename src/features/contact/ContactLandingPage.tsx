import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { ROUTES } from "@/constants/navigation";
import { WHATSAPP_CONSULTATION_HREF } from "@/features/homepage/shared/contact-links";
import {
  ContactLeadSection,
  type LeadFunnelDefaults,
  type LeadIntent,
} from "@/features/lead-funnel";
import { buildContactBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { ContactHeroVisual } from "./ContactHeroVisual";

const VALID_INTENTS = new Set<LeadIntent>([
  "consultation",
  "audit",
  "discovery",
  "quote",
  "general",
]);

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function parseDefaults(
  searchParams?: Record<string, string | string[] | undefined>,
): LeadFunnelDefaults | undefined {
  if (!searchParams) {
    return undefined;
  }

  const intentRaw = firstParam(searchParams.intent);
  const intent =
    intentRaw && VALID_INTENTS.has(intentRaw as LeadIntent)
      ? (intentRaw as LeadIntent)
      : undefined;

  return {
    intent,
    source: firstParam(searchParams.source),
    email: firstParam(searchParams.email),
    service: firstParam(searchParams.service),
    budget: firstParam(searchParams.budget),
  };
}

interface ContactLandingPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export function ContactLandingPage({
  searchParams,
}: ContactLandingPageProps) {
  const breadcrumbs = buildContactBreadcrumbs();
  const defaults = parseDefaults(searchParams);

  return (
    <PageShell className="contact-page">
      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId="contact-page-heading"
        eyebrow="Contact"
        title="Talk to the Bitcraftly team about your next build"
        titleHighlight="Bitcraftly team"
        description="Book a call, message us on WhatsApp, or request a free consultation — founder-led responses within one business day."
        supporting="Share your roadmap, constraints, and timeline. We’ll reply with clear next steps."
        primaryCta={{
          label: "Jump to form",
          href: "#contact-lead",
        }}
        secondaryCta={{
          label: "WhatsApp",
          href: WHATSAPP_CONSULTATION_HREF,
        }}
        trustItems={[
          "Response within 24 hours",
          "Free consultation",
          "No obligation",
        ]}
        renderVisual={() => <ContactHeroVisual />}
      />

      <ContactLeadSection defaults={defaults} />
    </PageShell>
  );
}

export const CONTACT_LANDING_META = {
  title: "Contact",
  description:
    "Book a call, request a free consultation or website audit, or message Bitcraftly on WhatsApp — founder-led replies within one business day.",
  path: ROUTES.contact,
} as const;
