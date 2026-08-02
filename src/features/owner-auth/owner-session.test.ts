import { describe, expect, it } from 'vitest';
import {
  createOwnerSessionToken,
  verifyOwnerSessionToken,
} from '@/features/owner-auth/owner-session';

const SECRET = 'test-owner-session-secret-at-least-32-characters';

describe('owner session', () => {
  it('creates and verifies a valid session token', async () => {
    const token = await createOwnerSessionToken(SECRET, Date.now() + 60_000);

    expect(await verifyOwnerSessionToken(token, SECRET)).toBe(true);
  });

  it('rejects tampered tokens', async () => {
    const token = await createOwnerSessionToken(SECRET, Date.now() + 60_000);
    const tampered = `${token}x`;

    expect(await verifyOwnerSessionToken(tampered, SECRET)).toBe(false);
  });

  it('rejects expired tokens', async () => {
    const token = await createOwnerSessionToken(SECRET, Date.now() - 1_000);

    expect(await verifyOwnerSessionToken(token, SECRET)).toBe(false);
  });

  it('rejects tokens signed with a different secret', async () => {
    const token = await createOwnerSessionToken(SECRET, Date.now() + 60_000);

    expect(await verifyOwnerSessionToken(token, 'another-secret-that-is-long-enough')).toBe(false);
  });
});
