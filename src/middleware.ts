import { getAuth } from '@/apis/auth-server.api';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SITE_MAP from './constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from './constants/public-error-message.constant';

const PUBLIC_AUTH_PATHS = [SITE_MAP.SIGN_IN, SITE_MAP.SIGN_UP];
const PROTECTED_PATHS = [SITE_MAP.MY_PAGE, SITE_MAP.SET_GOAL, SITE_MAP.CHANGE_PASSWORD, SITE_MAP.REPORT];
const EXCLUDED_PATHS = [SITE_MAP.ONBOARDING];
const ALL_MANAGED_PATHS = [...PUBLIC_AUTH_PATHS, ...PROTECTED_PATHS];
const ONBOARDING_COOKIE_NAME = 'isOnboarded';
const EXPIRED_COOKIE_ONE_YEAR = 60 * 60 * 24 * 365;

const shouldRedirectToOnboarding = (pathname: string, isOnboarded: boolean): boolean => {
  if (isOnboarded) return false;

  const needsOnboarding =
    pathname === SITE_MAP.HOME || PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return needsOnboarding && !pathname.startsWith(SITE_MAP.ONBOARDING);
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const url = new URL(request.url);

  if (
    pathname.includes('/_next/') ||
    pathname.includes('/static/') ||
    pathname.includes('/api/') ||
    pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  if (EXCLUDED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    if (pathname.startsWith(SITE_MAP.ONBOARDING)) {
      const isOnboarded = request.cookies.get(ONBOARDING_COOKIE_NAME)?.value === 'true';

      if (!isOnboarded) {
        const response = NextResponse.next();
        response.cookies.set({
          name: ONBOARDING_COOKIE_NAME,
          value: 'true',
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: EXPIRED_COOKIE_ONE_YEAR
        });

        response.headers.set('x-middleware-cache', 'no-cache');
        return response;
      }
    }

    return NextResponse.next();
  }

  if (pathname.startsWith(SITE_MAP.SIGN_UP) && url.searchParams.get('step') === 'complete') {
    return NextResponse.next();
  }

  const { isAuthenticated } = await getAuth();
  const isOnboarded = request.cookies.get(ONBOARDING_COOKIE_NAME)?.value === 'true';

  if (shouldRedirectToOnboarding(pathname, isOnboarded)) {
    const response = NextResponse.redirect(new URL(SITE_MAP.ONBOARDING, request.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }

  if (isAuthenticated && PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.redirect(new URL(SITE_MAP.HOME, request.url));
  }

  if (!isAuthenticated && PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const url = new URL(SITE_MAP.SIGN_IN, request.url);
    url.searchParams.set('redirect', pathname);
    url.searchParams.set('error_code', PUBLIC_ERROR_MESSAGE.UNAUTHENTICATED.code);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    ...ALL_MANAGED_PATHS.map((path) => `${path}/:path*`),
    SITE_MAP.HOME,
    SITE_MAP.ONBOARDING,
    '/((?!_next/|static/|api/|favicon.ico).*)'
  ]
};
