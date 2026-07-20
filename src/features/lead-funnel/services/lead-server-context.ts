import { headers } from "next/headers";

import { resolveClientIp } from "@/lib/security/client-ip";

import type { LeadServerMetadata } from "./lead.types";

export interface LeadRequestHeaders {
  readonly referer?: string;
  readonly userAgent?: string;
  readonly clientIp?: string;
}

function firstHeaderValue(value: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Extract server-side request metadata for lead submissions.
 * Call only from Server Actions / Route Handlers.
 */
export async function readLeadRequestHeaders(): Promise<LeadRequestHeaders> {
  const headerStore = await headers();

  return {
    referer: firstHeaderValue(headerStore.get("referer")),
    userAgent: firstHeaderValue(headerStore.get("user-agent")),
    clientIp: resolveClientIp(headerStore),
  };
}

export function buildLeadServerMetadata(
  input: {
    source: string;
    pagePath: string;
  },
  requestHeaders: LeadRequestHeaders,
  submittedAt: string = new Date().toISOString(),
): LeadServerMetadata {
  return {
    submittedAt,
    source: input.source.trim(),
    pagePath: input.pagePath.trim(),
    referer: requestHeaders.referer,
    userAgent: requestHeaders.userAgent,
  };
}

export { resolveClientIp };
