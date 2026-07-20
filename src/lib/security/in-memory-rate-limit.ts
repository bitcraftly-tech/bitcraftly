interface RateLimitBucket {
  count: number;
  windowStartMs: number;
}

export interface RateLimitConfig {
  readonly maxAttempts: number;
  readonly windowMs: number;
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly retryAfterMs?: number;
}

const stores = new Map<string, Map<string, RateLimitBucket>>();

function getStore(namespace: string): Map<string, RateLimitBucket> {
  let store = stores.get(namespace);

  if (!store) {
    store = new Map();
    stores.set(namespace, store);
  }

  return store;
}

function resolveConfig(
  overrides: Partial<RateLimitConfig> | undefined,
  defaults: RateLimitConfig,
): RateLimitConfig {
  return {
    maxAttempts: overrides?.maxAttempts ?? defaults.maxAttempts,
    windowMs: overrides?.windowMs ?? defaults.windowMs,
  };
}

function pruneExpiredBuckets(
  store: Map<string, RateLimitBucket>,
  nowMs: number,
  windowMs: number,
): void {
  for (const [key, bucket] of store.entries()) {
    if (nowMs - bucket.windowStartMs >= windowMs) {
      store.delete(key);
    }
  }
}

/**
 * Process-local sliding-window rate limiter.
 * Suitable for single-instance deployments; replace with Redis for multi-instance scale.
 */
export function checkInMemoryRateLimit(
  namespace: string,
  key: string,
  defaults: RateLimitConfig,
  overrides?: Partial<RateLimitConfig>,
): RateLimitResult {
  const config = resolveConfig(overrides, defaults);
  const store = getStore(namespace);
  const nowMs = Date.now();

  if (store.size > 500) {
    pruneExpiredBuckets(store, nowMs, config.windowMs);
  }

  const existing = store.get(key);

  if (!existing || nowMs - existing.windowStartMs >= config.windowMs) {
    store.set(key, { count: 1, windowStartMs: nowMs });
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
  store.set(key, existing);
  return { allowed: true };
}

/** Test-only reset — do not call from production code paths. */
export function resetInMemoryRateLimitStore(namespace: string): void {
  stores.get(namespace)?.clear();
}

/** Test-only reset — do not call from production code paths. */
export function resetAllInMemoryRateLimitStoresForTests(): void {
  stores.clear();
}
