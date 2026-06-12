import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const RESERVED_SUBDOMAINS = new Set(["www", "api", "admin", "staging", "dev", "test"]);

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

const ALLOWED_DASHBOARD_ROLES = new Set(["admin", "staff", "manager"]);

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    });
    const role = `${token?.role ?? ""}`.toLowerCase();
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      const returnPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
      loginUrl.searchParams.set("callbackUrl", returnPath);
      return NextResponse.redirect(loginUrl);
    }
    if (!ALLOWED_DASHBOARD_ROLES.has(role)) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }
  }

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
