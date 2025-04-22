import { getAuth } from '@/apis/auth-server.api';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_AUTH_PATHS = ['/sign-in', '/sign-up'];
const PROTECTED_PATHS = ['/my-page', '/set-goal'];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const url = new URL(request.url);

  if (pathname.startsWith('/sign-up') && url.searchParams.get('step') === 'complete') {
    return NextResponse.next();
  }

  const { isAuthenticated } = await getAuth();

  if (isAuthenticated && PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthenticated && PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const url = new URL('/sign-in', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/sign-in/:path*', '/sign-up/:path*', '/my-page/:path*', '/set-goal/:path*']
};
