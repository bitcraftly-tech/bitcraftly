/**
 * TECHNICAL DEBT — Sprint 002 temporary rate limiter
 * ---------------------------------------------------
 * This in-memory Map is per Node.js process only. Limits reset on cold starts,
 * do not propagate across horizontal replicas, and can be bypassed by rotating
 * IPs at scale.
 *
 * Replace with a distributed store (recommended: Upstash Redis) before
 * high-traffic production or multi-instance deployment.
 *
 * Future FastAPI CRM path: enforce the same limits in the API gateway or
 * FastAPI middleware using a shared Redis key namespace (`lead:rate:*`).
 */

export interface LeadRateLimitConfig {
  readonly maxAttempts: number;
  readonly windowMs: number;
}

export interface LeadRateLimitResult {
  readonly allowed: boolean;
  readonly retryAfterMs?: number;
}

interface RateLimitBucket {
  count: number;
  windowStartMs: number;
}

const DEFAULT_CONFIG: LeadRateLimitConfig = {
  maxAttempts: Number(process.env.LEAD_RATE_LIMIT_MAX ?? 5),
  windowMs: Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
};

/** Process-local store — see TECHNICAL DEBT note above. */
const buckets = new Map<string, RateLimitBucket>();

function resolveConfig(
  overrides?: Partial<LeadRateLimitConfig>,
): LeadRateLimitConfig {
  return {
    maxAttempts: overrides?.maxAttempts ?? DEFAULT_CONFIG.maxAttempts,
    windowMs: overrides?.windowMs ?? DEFAULT_CONFIG.windowMs,
  };
}

function pruneExpiredBuckets(nowMs: number, windowMs: number): void {
  for (const [key, bucket] of buckets.entries()) {
    if (nowMs - bucket.windowStartMs >= windowMs) {
      buckets.delete(key);
    }
  }
}

export function buildLeadRateLimitKey(params: {
  clientIp?: string;
  email: string;
}): string {
  const ip = params.clientIp?.trim() || "unknown-ip";
  const email = params.email.trim().toLowerCase();
  return `lead:${ip}:${email}`;
}

export function checkLeadRateLimit(
  key: string,
  overrides?: Partial<LeadRateLimitConfig>,
): LeadRateLimitResult {
  const config = resolveConfig(overrides);
  const nowMs = Date.now();

  if (buckets.size > 500) {
    pruneExpiredBuckets(nowMs, config.windowMs);
  }

  const existing = buckets.get(key);

  if (!existing || nowMs - existing.windowStartMs >= config.windowMs) {
    buckets.set(key, { count: 1, windowStartMs: nowMs });
    return { allowed: true };
  }

  if (existing.count >= config.maxAttempts) {
    const retryAfterMs = config.windowMs - (nowMs - existing.windowStartMs);
    return {
      allowed: false,
      retryAfterMs: Math.max(retryAfterMs, 0),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { allowed: true };
}

/** Test-only reset — do not call from production code paths. */
export function resetLeadRateLimitStoreForTests(): void {
  buckets.clear();
}
