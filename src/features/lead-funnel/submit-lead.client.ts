import { submitLeadAction } from './actions/submit-lead.action';
import type { SubmitLeadActionInput } from './services/lead-action.input';
import type {
  SubmitLeadErrorCode,
  SubmitLeadFailure,
  SubmitLeadResult,
} from './services/lead.types';

const SUBMIT_LEAD_USER_MESSAGES: Record<SubmitLeadErrorCode, string> = {
  VALIDATION: 'Please check your details and try again.',
  HONEYPOT: 'Unable to submit your request. Please try again.',
  RATE_LIMIT: 'Too many submissions in a short time. Please wait a few minutes and try again.',
  PERSISTENCE:
    'We could not save your request right now. Please try again or contact us on WhatsApp.',
  DELIVERY:
    'We could not deliver your message right now. Please try again or contact us on WhatsApp.',
  UNKNOWN: 'Something went wrong. Please try again.',
};

/**
 * Maps server submission failures to user-safe copy.
 * Never surfaces internal delivery or configuration errors.
 */
export function mapSubmitLeadFailureToUserMessage(failure: SubmitLeadFailure): string {
  if (failure.code === 'VALIDATION') {
    const message = failure.message.trim();
    if (message) {
      return message;
    }
  }

  return SUBMIT_LEAD_USER_MESSAGES[failure.code];
}

export async function submitLeadFromClient(
  input: SubmitLeadActionInput,
): Promise<SubmitLeadResult> {
  try {
    return await submitLeadAction(input);
  } catch {
    return {
      ok: false,
      code: 'UNKNOWN',
      message: '',
    };
  }
}
