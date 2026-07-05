import type { NextRequest } from "next/server";

const MAX_BODY_BYTES = 32_768;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rejectOversizedContactRequest(req: NextRequest): boolean {
  const len = Number(req.headers.get("content-length") || 0);
  return len > MAX_BODY_BYTES;
}

export function isContactRateLimited(req: NextRequest): boolean {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
