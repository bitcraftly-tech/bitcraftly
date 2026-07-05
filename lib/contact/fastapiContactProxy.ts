const FASTAPI_BASE =
  process.env.AUTH_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

function fastApiUrl(path: string): string {
  return `${FASTAPI_BASE.replace(/\/$/, "")}${path}`;
}

export async function proxyContactPost(body: unknown, authorization?: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authorization) headers.Authorization = authorization;

  const response = await fetch(fastApiUrl("/api/contact/"), {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
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
