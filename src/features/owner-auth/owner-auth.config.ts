import { timingSafeEqual } from "node:crypto";

export interface OwnerAuthConfig {
  readonly email: string;
  readonly password: string;
  readonly sessionSecret: string;
}

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function readOwnerAuthConfig(): OwnerAuthConfig {
  return {
    email: readRequiredEnv("OWNER_AUTH_EMAIL"),
    password: readRequiredEnv("OWNER_AUTH_PASSWORD"),
    sessionSecret: readRequiredEnv("OWNER_SESSION_SECRET"),
  };
}

export function verifyOwnerCredentials(
  email: string,
  password: string,
  config: OwnerAuthConfig,
): boolean {
  const normalizedEmail = email.trim().toLowerCase();
  const expectedEmail = config.email.trim().toLowerCase();

  if (normalizedEmail !== expectedEmail) {
    return false;
  }

  const provided = Buffer.from(password);
  const expected = Buffer.from(config.password);

  if (provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}
