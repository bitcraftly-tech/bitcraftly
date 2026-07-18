import { randomUUID } from "node:crypto";
import { z } from "zod";
import { contactLeadFormSchema } from "../contact-form.schema";
import type { LeadIntent } from "../types";
import type { LeadRecord, LeadServerMetadata } from "./lead.types";

/** Hidden bot field — must remain empty on legitimate submissions. */
export const leadHoneypotSchema = z.object({
  _honeypot: z
    .string()
    .max(0, "Invalid submission.")
    .optional()
    .or(z.literal("")),
});

export const leadSubmissionMetaSchema = z.object({
  source: z.string().trim().min(1).max(120).default("contact-form"),
  pagePath: z.string().trim().min(1).max(500),
  leadType: z.enum(["contact", "newsletter"]),
});

export const submitContactLeadInputSchema = contactLeadFormSchema
  .merge(leadHoneypotSchema)
  .merge(leadSubmissionMetaSchema)
  .extend({
    leadType: z.literal("contact"),
  });

export const submitNewsletterLeadInputSchema = leadHoneypotSchema
  .merge(leadSubmissionMetaSchema)
  .extend({
    leadType: z.literal("newsletter"),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(120, "Email is too long."),
  });

export type SubmitContactLeadInput = z.infer<typeof submitContactLeadInputSchema>;
export type SubmitNewsletterLeadInput = z.infer<
  typeof submitNewsletterLeadInputSchema
>;

const NEWSLETTER_DEFAULT_INTENT: LeadIntent = "general";
const NEWSLETTER_DEFAULT_MESSAGE =
  "Continued from footer email capture — requested follow-up via contact flow.";

function optionalText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function createLeadRecordFromContactInput(
  input: SubmitContactLeadInput,
  serverMeta: LeadServerMetadata,
): LeadRecord {
  return {
    id: randomUUID(),
    leadType: "contact",
    status: "new",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: optionalText(input.phone),
    company: optionalText(input.company),
    intent: input.intent,
    message: input.message.trim(),
    website: optionalText(input.website),
    source: serverMeta.source,
    pagePath: serverMeta.pagePath,
    submittedAt: serverMeta.submittedAt,
    referer: serverMeta.referer,
    userAgent: serverMeta.userAgent,
  };
}

export function createLeadRecordFromNewsletterInput(
  input: SubmitNewsletterLeadInput,
  serverMeta: LeadServerMetadata,
): LeadRecord {
  return {
    id: randomUUID(),
    leadType: "newsletter",
    status: "new",
    name: "Newsletter visitor",
    email: input.email.trim(),
    intent: NEWSLETTER_DEFAULT_INTENT,
    message: NEWSLETTER_DEFAULT_MESSAGE,
    source: serverMeta.source,
    pagePath: serverMeta.pagePath,
    submittedAt: serverMeta.submittedAt,
    referer: serverMeta.referer,
    userAgent: serverMeta.userAgent,
  };
}

export function isHoneypotTripped(honeypot: string | undefined): boolean {
  return Boolean(honeypot?.trim());
}
