import { validateProductionServerEnv } from "@/lib/env/validate-server-env";

/**
 * Runs once when the Next.js server starts (not during `next build`).
 * Validates production env vars before serving traffic.
 */
export async function register(): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return;
  }

  if (process.env.NEXT_PHASE === "phase-production-build") {
    return;
  }

  validateProductionServerEnv();
}

type RequestErrorContext = {
  routerKind: string;
  routePath: string;
  routeType: string;
  renderSource?: string;
  revalidateReason?: string;
  renderType?: string;
};

/**
 * Next.js 15+ server error hook — structured logging for SSR/RSC/server actions.
 * Wire to Sentry via reportRequestError when @sentry/nextjs is added.
 */
export async function onRequestError(
  error: unknown,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string | string[] | undefined };
  },
  context: RequestErrorContext,
): Promise<void> {
  const { reportRequestError } = await import("@/lib/observability/report-error");

  reportRequestError(error, {
    routePath: context.routePath,
    routerKind: context.routerKind,
    method: request.method,
    requestPath: request.path,
  });
}
