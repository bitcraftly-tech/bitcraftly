export function readOwnerSessionSecret(): string | null {
  return process.env.OWNER_SESSION_SECRET?.trim() ?? null;
}
