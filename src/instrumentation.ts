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
