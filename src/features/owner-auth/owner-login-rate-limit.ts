import {
  checkInMemoryRateLimit,
  resetInMemoryRateLimitStore,
  type RateLimitResult,
} from '@/lib/security/in-memory-rate-limit';

const NAMESPACE = 'owner-login';

const DEFAULT_IP_CONFIG = {
  maxAttempts: Number(process.env.OWNER_LOGIN_RATE_LIMIT_MAX ?? 10),
  windowMs: Number(process.env.OWNER_LOGIN_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
};

const DEFAULT_ACCOUNT_CONFIG = {
  maxAttempts: Number(process.env.OWNER_LOGIN_ACCOUNT_RATE_LIMIT_MAX ?? 5),
  windowMs: Number(process.env.OWNER_LOGIN_ACCOUNT_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
};

function buildIpKey(clientIp?: string): string {
  return `ip:${clientIp?.trim() || 'unknown-ip'}`;
}

function buildAccountKey(email: string): string {
  return `account:${email.trim().toLowerCase() || 'unknown-account'}`;
}

export function checkOwnerLoginRateLimit(params: {
  clientIp?: string;
  email: string;
}): RateLimitResult {
  const ipResult = checkInMemoryRateLimit(
    NAMESPACE,
    buildIpKey(params.clientIp),
    DEFAULT_IP_CONFIG,
  );

  if (!ipResult.allowed) {
    return ipResult;
  }

  return checkInMemoryRateLimit(NAMESPACE, buildAccountKey(params.email), DEFAULT_ACCOUNT_CONFIG);
}

/** Test-only reset — do not call from production code paths. */
export function resetOwnerLoginRateLimitStoreForTests(): void {
  resetInMemoryRateLimitStore(NAMESPACE);
}
