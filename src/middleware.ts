import { NextResponse, type NextRequest } from 'next/server';
import { isInteractiveDemoPath } from '@/components/patterns/app-boot-splash/boot-path';
import {
  OWNER_AUTH_ROUTES,
  OWNER_SESSION_COOKIE,
} from '@/features/owner-auth/owner-auth.constants';
import { readOwnerSessionSecret } from '@/features/owner-auth/owner-auth.env';
import { verifyOwnerSessionToken } from '@/features/owner-auth/owner-session';
import { isOwnerLoginPath, isOwnerProtectedPath } from '@/features/owner-auth/owner-auth.utils';

async function hasValidOwnerSession(request: NextRequest): Promise<boolean> {
  const secret = readOwnerSessionSecret();
  const token = request.cookies.get(OWNER_SESSION_COOKIE)?.value;

  if (!secret || !token) {
    return false;
  }

  return verifyOwnerSessionToken(token, secret);
}

function nextWithBootMode(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  requestHeaders.set('x-bc-boot-mode', isInteractiveDemoPath(pathname) ? 'demo' : 'brand');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/owner')) {
    return nextWithBootMode(request);
  }

  const authenticated = await hasValidOwnerSession(request);

  if (isOwnerLoginPath(pathname)) {
    if (authenticated) {
      return NextResponse.redirect(new URL(OWNER_AUTH_ROUTES.leads, request.url));
    }

    return nextWithBootMode(request);
  }

  if (isOwnerProtectedPath(pathname) && !authenticated) {
    const loginUrl = new URL(OWNER_AUTH_ROUTES.login, request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return nextWithBootMode(request);
}

export const config = {
  matcher: [
    /*
     * Run on app routes so root layout can pick Bitcraftly vs demo boot splash.
     * Skip Next internals and common static assets.
     */
    '/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?)$).*)',
  ],
};
