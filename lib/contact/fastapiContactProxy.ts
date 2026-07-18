function getFastApiBaseUrl(): string {
  const base =
    process.env.AUTH_API_BASE_URL ||
    process.env.FASTAPI_BASE_URL ||
    process.env.API_SERVER_URL ||
    "";

  return base.replace(/\/$/, "");
}

function fastApiUrl(path: string): string {
  const base = getFastApiBaseUrl();
  if (!base) {
    throw new Error("fastapi_base_url_not_configured");
  }
  return `${base}${path}`;
}

const FASTAPI_TIMEOUT_MS = 8_000;

export async function proxyContactPost(body: unknown, authorization?: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authorization) headers.Authorization = authorization;

  const response = await fetch(fastApiUrl("/api/contact/"), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(FASTAPI_TIMEOUT_MS),
  });

  const payload = await response.json().catch(() => null);
  return { response, payload };
}

export async function proxyContactGet(
  path: string,
  authorization?: string | null,
  searchParams?: URLSearchParams,
) {
  const query = searchParams?.toString();
  const url = fastApiUrl(`/api/contact${path}${query ? `?${query}` : ""}`);
  const headers: Record<string, string> = {};
  if (authorization) headers.Authorization = authorization;

  const response = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const payload = await response.json().catch(() => null);
  return { response, payload };
}

export async function proxyContactPatch(
  path: string,
  body: unknown,
  authorization?: string | null,
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authorization) headers.Authorization = authorization;

  const response = await fetch(fastApiUrl(`/api/contact${path}`), {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const payload = await response.json().catch(() => null);
  return { response, payload };
}
