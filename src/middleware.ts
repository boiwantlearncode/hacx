import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = checkAuth(request);

  const url = request.nextUrl.clone();

  // If the user is logged in and tries to access the root `/`, redirect to `/hub`
  // Currently, '/' path is the login page.
  if (url.pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }

  // If the user is logged out and tries to access `/hub`, redirect to `/login`
  if (url.pathname === '/hub' && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Type-safe function to check authentication (mock implementation)
function checkAuth(request: NextRequest): boolean {
  // By default, should return false
  // const token = request.cookies.get('token')?.value;
  // console.log('Token boolean:', !!token);
  // return !!token;

  // For Ming Wei, can set this to false or true whether you want to set logged in state or not
  return true;
}

export const config = {
  matcher: ['/', '/hub'], // Apply middleware only to these paths
};
