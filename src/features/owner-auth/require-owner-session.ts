import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { OWNER_AUTH_ROUTES, OWNER_SESSION_COOKIE } from './owner-auth.constants';
import { readOwnerSessionSecret } from './owner-auth.env';
import { verifyOwnerSessionToken } from './owner-session';

/**
 * Defense-in-depth owner session gate for server components, loaders, and actions.
 * Middleware remains the primary gate; this prevents unauthenticated data access
 * if middleware is misconfigured or bypassed.
 */
export async function requireOwnerSession(): Promise<void> {
  const secret = readOwnerSessionSecret();
  const cookieStore = await cookies();
  const token = cookieStore.get(OWNER_SESSION_COOKIE)?.value;

  if (!secret || !token) {
    redirect(OWNER_AUTH_ROUTES.login);
  }

  const valid = await verifyOwnerSessionToken(token, secret);

  if (!valid) {
    redirect(OWNER_AUTH_ROUTES.login);
  }
}
