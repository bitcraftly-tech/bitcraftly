/** Client-to-server payload for contact lead submissions. */
export interface SubmitContactLeadActionInput {
  readonly leadType: "contact";
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly company?: string;
  readonly intent: string;
  readonly message: string;
  readonly website?: string;
  readonly _honeypot?: string;
  readonly source: string;
  readonly pagePath: string;
}

/** Client-to-server payload for newsletter continue-with-email flow. */
export interface SubmitNewsletterLeadActionInput {
  readonly leadType: "newsletter";
  readonly email: string;
  readonly _honeypot?: string;
  readonly source: string;
  readonly pagePath: string;
}

export type SubmitLeadActionInput =
  | SubmitContactLeadActionInput
  | SubmitNewsletterLeadActionInput;
