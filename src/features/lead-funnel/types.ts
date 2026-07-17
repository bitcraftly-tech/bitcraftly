export type LeadIntent =
  | "consultation"
  | "audit"
  | "discovery"
  | "quote"
  | "general";

export type LeadSource =
  | "contact-form"
  | "whatsapp-cta"
  | "calendly-cta"
  | "free-audit-cta"
  | "exit-intent"
  | "sticky-cta"
  | "contact-page"
  | string;

export interface LeadFunnelDefaults {
  readonly intent?: LeadIntent;
  readonly source?: string;
  readonly email?: string;
  readonly service?: string;
  readonly budget?: string;
}
