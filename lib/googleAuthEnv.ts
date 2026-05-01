/**
 * NextAuth/Google env checks (server-only). Vercel often uses NEXTAUTH_SECRET; code also supports AUTH_SECRET.
 */
export function isGoogleLoginConfigured(): boolean {
  const secret = `${process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? ""}`.trim();
  const clientId = `${process.env.AUTH_GOOGLE_ID ?? ""}`.trim();
  const clientSecret = `${process.env.AUTH_GOOGLE_SECRET ?? ""}`.trim();
  const authUrl = `${process.env.NEXTAUTH_URL ?? ""}`.trim();
  return Boolean(clientId && clientSecret && secret && authUrl);
}

export function resolvedNextAuthSecret(): string | undefined {
  const v = `${process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? ""}`.trim();
  return v.length > 0 ? v : undefined;
}
