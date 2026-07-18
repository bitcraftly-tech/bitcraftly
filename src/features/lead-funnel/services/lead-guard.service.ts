import { isHoneypotTripped } from "./lead-payload.schema";
import {
  buildLeadRateLimitKey,
  checkLeadRateLimit,
} from "./lead-rate-limit";
import type { SubmitLeadFailure } from "./lead.types";

export interface LeadGuardInput {
  readonly honeypot?: string;
  readonly email: string;
  readonly clientIp?: string;
}

const HONEYPOT_FAILURE: SubmitLeadFailure = {
  ok: false,
  code: "HONEYPOT",
  message: "Unable to submit your request. Please try again.",
};

const RATE_LIMIT_FAILURE: SubmitLeadFailure = {
  ok: false,
  code: "RATE_LIMIT",
  message:
    "Too many submissions in a short time. Please wait a few minutes and try again.",
};

/**
 * Pre-submission guards — honeypot and rate limit.
 * Returns `null` when submission may proceed to validation/delivery.
 */
export function guardLeadSubmission(input: LeadGuardInput): SubmitLeadFailure | null {
  if (isHoneypotTripped(input.honeypot)) {
    return HONEYPOT_FAILURE;
  }

  const rateLimitKey = buildLeadRateLimitKey({
    clientIp: input.clientIp,
    email: input.email,
  });
  const rateLimit = checkLeadRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    return RATE_LIMIT_FAILURE;
  }

  return null;
}
