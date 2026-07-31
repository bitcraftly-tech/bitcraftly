import {
  checkInMemoryRateLimit,
  resetInMemoryRateLimitStore,
  type RateLimitConfig,
  type RateLimitResult,
} from '@/lib/security/in-memory-rate-limit';

/**
 * TECHNICAL DEBT — in-memory rate limiter
 * ----------------------------------------
 * Process-local only. Replace with Redis/Upstash before multi-instance production.
 */

const LEAD_NAMESPACE = 'lead';
const LEAD_IP_NAMESPACE = 'lead-ip';

export type LeadRateLimitConfig = RateLimitConfig;
export type LeadRateLimitResult = RateLimitResult;

const DEFAULT_CONFIG: LeadRateLimitConfig = {
  maxAttempts: Number(process.env.LEAD_RATE_LIMIT_MAX ?? 5),
  windowMs: Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
};

const DEFAULT_IP_CONFIG: LeadRateLimitConfig = {
  maxAttempts: Number(process.env.LEAD_RATE_LIMIT_IP_MAX ?? 30),
  windowMs: Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
};

export function buildLeadRateLimitKey(params: { clientIp?: string; email: string }): string {
  const ip = params.clientIp?.trim() || 'unknown-ip';
  const email = params.email.trim().toLowerCase();
  return `lead:${ip}:${email}`;
}

export function buildLeadIpRateLimitKey(clientIp?: string): string {
  return `ip:${clientIp?.trim() || 'unknown-ip'}`;
}

export function checkLeadRateLimit(
  key: string,
  overrides?: Partial<LeadRateLimitConfig>,
): LeadRateLimitResult {
  return checkInMemoryRateLimit(LEAD_NAMESPACE, key, DEFAULT_CONFIG, overrides);
}

export function checkLeadIpRateLimit(
  key: string,
  overrides?: Partial<LeadRateLimitConfig>,
): LeadRateLimitResult {
  return checkInMemoryRateLimit(LEAD_IP_NAMESPACE, key, DEFAULT_IP_CONFIG, overrides);
}

/** Test-only reset — do not call from production code paths. */
export function resetLeadRateLimitStoreForTests(): void {
  resetInMemoryRateLimitStore(LEAD_NAMESPACE);
  resetInMemoryRateLimitStore(LEAD_IP_NAMESPACE);
}
