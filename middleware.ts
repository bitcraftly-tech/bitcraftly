import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = new Set(["www", "api", "admin"]);

function extractSubdomain(host: string | null): string | null {
  if (!host) return null;
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname.endsWith(".localhost")) {
    const candidate = hostname.replace(".localhost", "");
    return candidate || null;
  }

  const parts = hostname.split(".");
  if (parts.length < 3) return null;

  const candidate = parts[0];
  if (RESERVED_SUBDOMAINS.has(candidate)) return null;
  return candidate;
}

export function middleware(request: NextRequest) {
  const subdomain = extractSubdomain(request.headers.get("host"));
  const headers = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  if (subdomain) {
    headers.set("x-tenant-subdomain", subdomain);
    response.cookies.set("tenant_slug", subdomain, { path: "/" });
  } else {
    headers.delete("x-tenant-subdomain");
    response.cookies.delete("tenant_slug");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
