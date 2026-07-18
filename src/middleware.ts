import { NextResponse, type NextRequest } from "next/server";
import {
  OWNER_AUTH_ROUTES,
  OWNER_SESSION_COOKIE,
} from "@/features/owner-auth/owner-auth.constants";
import { readOwnerSessionSecret } from "@/features/owner-auth/owner-auth.env";
import { verifyOwnerSessionToken } from "@/features/owner-auth/owner-session";
import {
  isOwnerLoginPath,
  isOwnerProtectedPath,
} from "@/features/owner-auth/owner-auth.utils";

async function hasValidOwnerSession(request: NextRequest): Promise<boolean> {
  const secret = readOwnerSessionSecret();
  const token = request.cookies.get(OWNER_SESSION_COOKIE)?.value;

  if (!secret || !token) {
    return false;
  }

  return verifyOwnerSessionToken(token, secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/owner")) {
    return NextResponse.next();
  }

  const authenticated = await hasValidOwnerSession(request);

  if (isOwnerLoginPath(pathname)) {
    if (authenticated) {
      return NextResponse.redirect(new URL(OWNER_AUTH_ROUTES.leads, request.url));
    }

    return NextResponse.next();
  }

  if (isOwnerProtectedPath(pathname) && !authenticated) {
    const loginUrl = new URL(OWNER_AUTH_ROUTES.login, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*"],
};
