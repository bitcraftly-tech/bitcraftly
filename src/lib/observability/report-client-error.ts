"use client";

interface ClientErrorContext {
  readonly digest?: string;
  readonly boundary?: "route" | "global";
}

function normalizeError(error: Error & { digest?: string }) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack,
    digest: error.digest,
  };
}

/**
 * Client-side error reporter for error boundaries.
 * Emits structured console output; wire to Sentry via SENTRY_DSN when enabled.
 */
export function reportClientError(
  error: Error & { digest?: string },
  context: ClientErrorContext = {},
): void {
  console.error(
    JSON.stringify({
      level: "error",
      timestamp: new Date().toISOString(),
      source: "client",
      sentryReady: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN),
      ...normalizeError(error),
      context,
    }),
  );
}
