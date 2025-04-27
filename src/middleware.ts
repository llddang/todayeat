import { getAuth } from '@/apis/auth-server.api';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import SITE_MAP from './constants/site-map.constant';
import PUBLIC_ERROR_MESSAGE from './constants/public-error-message.constant';

const PUBLIC_AUTH_PATHS = [SITE_MAP.SIGN_IN, SITE_MAP.SIGN_UP];
const PROTECTED_PATHS = [SITE_MAP.MY_PAGE, SITE_MAP.SET_GOAL, SITE_MAP.CHANGE_PASSWORD];

const ALL_MANAGED_PATHS = [...PUBLIC_AUTH_PATHS, ...PROTECTED_PATHS];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const url = new URL(request.url);

  if (pathname.startsWith(SITE_MAP.SIGN_UP) && url.searchParams.get('step') === 'complete') {
    return NextResponse.next();
  }

  const { isAuthenticated } = await getAuth();

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
  matcher: ALL_MANAGED_PATHS.map((path) => `${path}/:path*`)
};
