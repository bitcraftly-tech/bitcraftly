interface ErrorContext {
  readonly digest?: string;
  readonly source?: 'server' | 'client' | 'request';
  readonly routePath?: string;
  readonly routerKind?: string;
  readonly method?: string;
  readonly [key: string]: unknown;
}

function normalizeError(error: unknown): {
  readonly message: string;
  readonly stack?: string;
  readonly name?: string;
} {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: typeof error === 'string' ? error : 'Unknown error',
  };
}

function serializeError(error: unknown, context: ErrorContext = {}): string {
  return JSON.stringify({
    level: 'error',
    timestamp: new Date().toISOString(),
    sentryReady: Boolean(process.env.SENTRY_DSN),
    ...normalizeError(error),
    context,
  });
}

/**
 * Server-side error reporter. Structured for log drains and future Sentry wiring.
 * Set SENTRY_DSN and connect @sentry/nextjs in a follow-up to forward events.
 */
export function reportError(error: unknown, context: ErrorContext = {}): void {
  console.error(serializeError(error, { ...context, source: context.source ?? 'server' }));
}

export function reportRequestError(error: unknown, context: ErrorContext = {}): void {
  reportError(error, { ...context, source: 'request' });
}
