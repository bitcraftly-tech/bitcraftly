function firstHeaderValue(value: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Resolve client IP from common proxy headers (Vercel, nginx, Cloudflare, etc.).
 */
export function resolveClientIp(headerStore: Headers): string | undefined {
  const forwarded = firstHeaderValue(headerStore.get('x-forwarded-for'));
  if (forwarded) {
    return forwarded.split(',')[0]?.trim();
  }

  return (
    firstHeaderValue(headerStore.get('x-real-ip')) ??
    firstHeaderValue(headerStore.get('cf-connecting-ip'))
  );
}
