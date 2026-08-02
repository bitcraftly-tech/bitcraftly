import { z } from 'zod';

const trimmedNonEmpty = z.string().trim().min(1, 'must not be empty');

const siteUrlSchema = trimmedNonEmpty.refine(
  (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  },
  { message: 'must be a valid URL' },
);

/** Production server environment contract (runtime). */
export const productionServerEnvSchema = z.object({
  DATABASE_URL: trimmedNonEmpty,
  RESEND_API_KEY: trimmedNonEmpty,
  LEAD_NOTIFICATION_TO: z.string().trim().email(),
  LEAD_FROM_EMAIL: trimmedNonEmpty,
  NEXT_PUBLIC_SITE_URL: siteUrlSchema,
  OWNER_AUTH_EMAIL: z.string().trim().email(),
  OWNER_AUTH_PASSWORD: trimmedNonEmpty.min(12, 'must be at least 12 characters'),
  OWNER_SESSION_SECRET: trimmedNonEmpty.min(32, 'must be at least 32 characters'),
});

export type ProductionServerEnv = z.infer<typeof productionServerEnvSchema>;
