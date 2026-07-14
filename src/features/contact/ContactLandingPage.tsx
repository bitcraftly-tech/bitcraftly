import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { PageShell } from "@/components/patterns/marketing-layout";
import { NAV_ACTIONS, ROUTES } from "@/constants/navigation";
import { WHATSAPP_CONSULTATION_HREF } from "@/features/homepage/shared/contact-links";
import { buildContactBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { ContactHeroVisual } from "./ContactHeroVisual";

export function ContactLandingPage() {
  const breadcrumbs = buildContactBreadcrumbs();

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
          label: NAV_ACTIONS.freeConsultation.label,
          href: NAV_ACTIONS.freeConsultation.href,
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
        visual={<ContactHeroVisual />}
      />
    </PageShell>
  );
}

export const CONTACT_LANDING_META = {
  title: "Contact",
  description:
    "Book a call or request a free consultation with the Bitcraftly team.",
  path: ROUTES.contact,
} as const;
