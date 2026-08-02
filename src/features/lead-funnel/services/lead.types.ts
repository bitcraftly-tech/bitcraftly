import type { LeadIntent } from '../types';

/** Lead channel — maps to CRM entity types in a future FastAPI module. */
export type LeadType = 'contact' | 'newsletter';

/** Lifecycle state for future CRM/admin workflows. */
export type LeadStatus = 'new';

/**
 * Server-captured request metadata — populated in Server Actions from headers.
 * Mirrors fields a future FastAPI `POST /leads` body will accept.
 */
export interface LeadServerMetadata {
  readonly submittedAt: string;
  readonly pagePath: string;
  readonly source: string;
  readonly referer?: string;
  readonly userAgent?: string;
}

/**
 * Canonical lead record — stable contract for email delivery today and
 * FastAPI `POST /leads` persistence tomorrow.
 */
export interface LeadRecord {
  readonly id: string;
  readonly leadType: LeadType;
  readonly status: LeadStatus;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly company?: string;
  readonly intent: LeadIntent;
  readonly message: string;
  readonly website?: string;
  readonly source: string;
  readonly pagePath: string;
  readonly submittedAt: string;
  readonly referer?: string;
  readonly userAgent?: string;
}

export type SubmitLeadErrorCode =
  'VALIDATION' | 'HONEYPOT' | 'RATE_LIMIT' | 'PERSISTENCE' | 'DELIVERY' | 'UNKNOWN';

export interface SubmitLeadSuccess {
  readonly ok: true;
  readonly leadId: string;
  readonly confirmationSent: boolean;
}

export interface SubmitLeadFailure {
  readonly ok: false;
  readonly code: SubmitLeadErrorCode;
  readonly message: string;
}

export type SubmitLeadResult = SubmitLeadSuccess | SubmitLeadFailure;
