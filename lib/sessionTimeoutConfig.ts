export type SessionExpiryWarningConfig = {
  /** Show modal when JWT/session expires within this many milliseconds */
  warningLeadMs: number;
};

function parseEnvMs(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Warning window **before NextAuth session/JWT expiry** (from `session.expires`).
 * Uses `NEXT_PUBLIC_SESSION_EXPIRY_WARNING_MS`, or falls back to `NEXT_PUBLIC_SESSION_WARNING_MS`.
 * Default: 60 seconds (popup only when the token is actually about to expire).
 */
export function getSessionExpiryWarningConfig(): SessionExpiryWarningConfig {
  const defaultLead = 60_000;
  const raw =
    process.env.NEXT_PUBLIC_SESSION_EXPIRY_WARNING_MS ?? process.env.NEXT_PUBLIC_SESSION_WARNING_MS;
  const lead = parseEnvMs(raw, defaultLead);

  return {
    warningLeadMs: Math.max(10_000, lead),
  };
}

/** @deprecated Use `getSessionExpiryWarningConfig` — idle-based timeouts removed */
export function getSessionTimeoutConfig(): SessionExpiryWarningConfig {
  return getSessionExpiryWarningConfig();
}

export type SessionTimeoutConfig = SessionExpiryWarningConfig;

export function throttleLeading<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
  let last = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn(...args);
    }
  }) as T;
}
