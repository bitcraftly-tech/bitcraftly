import type { ZodError } from 'zod';
import type { SubmitLeadActionInput } from './lead-action.input';
import { guardLeadSubmission } from './lead-guard.service';
import { sendLeadNotification } from './lead-notification.service';
import { saveLead, markNotificationFailed, markNotificationSent } from './lead.repository';
import {
  createLeadRecordFromContactInput,
  createLeadRecordFromNewsletterInput,
  submitContactLeadInputSchema,
  submitNewsletterLeadInputSchema,
} from './lead-payload.schema';
import {
  buildLeadServerMetadata,
  readLeadRequestHeaders,
  type LeadRequestHeaders,
} from './lead-server-context';
import type { LeadRecord, SubmitLeadFailure, SubmitLeadResult } from './lead.types';

function validationFailure(error: ZodError): SubmitLeadFailure {
  const firstIssue = error.issues[0];
  return {
    ok: false,
    code: 'VALIDATION',
    message: firstIssue?.message ?? 'Invalid submission.',
  };
}

function resolveEmailForGuard(input: SubmitLeadActionInput): string {
  return input.email.trim();
}

const DELIVERY_FAILURE_MESSAGE =
  'We could not deliver your message right now. Please try again or contact us on WhatsApp.';

const PERSISTENCE_FAILURE_MESSAGE =
  'We could not save your request right now. Please try again or contact us on WhatsApp.';

function persistenceFailure(): SubmitLeadFailure {
  return {
    ok: false,
    code: 'PERSISTENCE',
    message: PERSISTENCE_FAILURE_MESSAGE,
  };
}

function deliveryFailure(message: string = DELIVERY_FAILURE_MESSAGE): SubmitLeadFailure {
  return {
    ok: false,
    code: 'DELIVERY',
    message,
  };
}

async function deliverLeadRecord(record: LeadRecord): Promise<SubmitLeadResult> {
  const notification = await sendLeadNotification(record);

  if (!notification.ok) {
    const deliveryMessage = notification.message.trim() || DELIVERY_FAILURE_MESSAGE;

    await markNotificationFailed(record.id, deliveryMessage);

    return deliveryFailure(deliveryMessage);
  }

  await markNotificationSent(record.id, new Date());

  return {
    ok: true,
    leadId: record.id,
    confirmationSent: notification.confirmationSent,
  };
}

async function persistAndDeliverLeadRecord(record: LeadRecord): Promise<SubmitLeadResult> {
  const persisted = await saveLead(record);

  if (!persisted.ok) {
    return persistenceFailure();
  }

  return deliverLeadRecord(record);
}

/**
 * Lead submission orchestration — guards, validation, LeadRecord assembly,
 * persistence, and notification delivery.
 */
export async function processLeadSubmission(
  input: SubmitLeadActionInput,
  requestHeaders: LeadRequestHeaders,
  submittedAt: string = new Date().toISOString(),
): Promise<SubmitLeadResult> {
  const serverMeta = buildLeadServerMetadata(
    {
      source: input.source,
      pagePath: input.pagePath,
    },
    requestHeaders,
    submittedAt,
  );

  const guardFailure = guardLeadSubmission({
    honeypot: input._honeypot,
    email: resolveEmailForGuard(input),
    clientIp: requestHeaders.clientIp,
  });

  if (guardFailure) {
    return guardFailure;
  }

  if (input.leadType === 'contact') {
    const parsed = submitContactLeadInputSchema.safeParse(input);

    if (!parsed.success) {
      return validationFailure(parsed.error);
    }

    const recordMeta = {
      ...serverMeta,
      source: parsed.data.source,
      pagePath: parsed.data.pagePath,
    };
    const record = createLeadRecordFromContactInput(parsed.data, recordMeta);

    return persistAndDeliverLeadRecord(record);
  }

  const parsed = submitNewsletterLeadInputSchema.safeParse(input);

  if (!parsed.success) {
    return validationFailure(parsed.error);
  }

  const recordMeta = {
    ...serverMeta,
    source: parsed.data.source,
    pagePath: parsed.data.pagePath,
  };
  const record = createLeadRecordFromNewsletterInput(parsed.data, recordMeta);

  return persistAndDeliverLeadRecord(record);
}

export async function submitLead(input: SubmitLeadActionInput): Promise<SubmitLeadResult> {
  const requestHeaders = await readLeadRequestHeaders();
  return processLeadSubmission(input, requestHeaders);
}
