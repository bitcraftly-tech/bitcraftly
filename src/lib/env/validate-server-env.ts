import { z } from 'zod';

import { productionServerEnvSchema, type ProductionServerEnv } from './server-env.schema';

function formatValidationError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'env';
      return `${path}: ${issue.message}`;
    })
    .join('\n');
}

/**
 * Validates required production environment variables at server startup.
 * Throws with a consolidated error message when validation fails.
 */
export function validateProductionServerEnv(
  env: Record<string, string | undefined> = process.env,
): ProductionServerEnv {
  const result = productionServerEnvSchema.safeParse(env);

  if (!result.success) {
    throw new Error(
      `Production environment validation failed:\n${formatValidationError(result.error)}`,
    );
  }

  return result.data;
}
