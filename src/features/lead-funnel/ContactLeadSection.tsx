import { Section } from "@/components/ui/section";
import { ContactLeadFormLazy } from "./components/ContactLeadFormLazy";
import { LeadChannelGrid } from "./components/LeadChannelGrid";
import type { LeadFunnelDefaults } from "./types";
import "./lead-funnel.css";

interface ContactLeadSectionProps {
  defaults?: LeadFunnelDefaults;
}

/**
 * Contact-page conversion section — form + multi-channel CTAs.
 */
export function ContactLeadSection({ defaults }: ContactLeadSectionProps) {
  return (
    <Section
      id="contact-lead"
      spacing="lg"
      background="surface"
      aria-labelledby="contact-lead-form-heading"
      className="border-t border-border/60"
    >
      <div className="lead-funnel__section">
        <div className="lead-funnel__panel">
          <header className="lead-funnel__panel-intro">
            <p className="lead-funnel__eyebrow">Lead funnel</p>
            <h2 id="contact-lead-form-heading" className="lead-funnel__heading">
              Tell us about your project
            </h2>
            <p className="lead-funnel__lede">
              Share goals, timeline, and constraints. We reply with clear next
              steps — consultation, audit, or a written estimate.
            </p>
          </header>
          <ContactLeadFormLazy defaults={defaults} />
        </div>
        <LeadChannelGrid source={defaults?.source ?? "contact-page"} />
      </div>
    </Section>
  );
}
