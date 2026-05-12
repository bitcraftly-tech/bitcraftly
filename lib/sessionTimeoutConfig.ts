export type SessionTimeoutConfig = {
  /** Time with no activity before the warning appears */
  idleMs: number;
  /** Countdown duration after warning before automatic sign-out */
  warningMs: number;
};

function parseEnvMs(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/**
 * Client-side session idle timeouts (NEXT_PUBLIC_* — baked at build time).
 * Defaults: 10 min idle, 60 s warning countdown.
 */
export function getSessionTimeoutConfig(): SessionTimeoutConfig {
  const idle = parseEnvMs(process.env.NEXT_PUBLIC_SESSION_IDLE_MS, 10 * 60 * 1000);
  const warning = parseEnvMs(process.env.NEXT_PUBLIC_SESSION_WARNING_MS, 60 * 1000);
  return {
    idleMs: Math.max(30_000, idle),
    warningMs: Math.max(10_000, warning),
  };
}

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
