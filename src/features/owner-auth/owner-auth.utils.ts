import { OWNER_AUTH_ROUTES, OWNER_PROTECTED_PREFIX } from "./owner-auth.constants";

export function resolveOwnerNextPath(next: string | null | undefined): string {
  if (!next) {
    return OWNER_AUTH_ROUTES.leads;
  }

  if (!next.startsWith(OWNER_PROTECTED_PREFIX)) {
    return OWNER_AUTH_ROUTES.leads;
  }

  if (next === OWNER_AUTH_ROUTES.login || next.startsWith(`${OWNER_AUTH_ROUTES.login}?`)) {
    return OWNER_AUTH_ROUTES.leads;
  }

  return next;
}

export function isOwnerLoginPath(pathname: string): boolean {
  return pathname === OWNER_AUTH_ROUTES.login;
}

export function isOwnerProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith(OWNER_PROTECTED_PREFIX) &&
    !isOwnerLoginPath(pathname)
  );
}
