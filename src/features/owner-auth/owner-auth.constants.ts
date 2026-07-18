export const OWNER_SESSION_COOKIE = "bitcraftly_owner_session";

export const OWNER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const OWNER_AUTH_ROUTES = {
  login: "/owner/login",
  leads: "/owner/leads",
} as const;

export const OWNER_PROTECTED_PREFIX = "/owner";
