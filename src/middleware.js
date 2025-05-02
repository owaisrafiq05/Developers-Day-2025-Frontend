import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Allow the homepage and static assets
  if (url.pathname === '/' || 
      url.pathname.startsWith('/_next/') || 
      url.pathname.startsWith('/favicon.ico') ||
      url.pathname.startsWith('/logo.png')) {
    return NextResponse.next();
  }
  
  // Redirect all other routes to the homepage
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all routes except static files, api routes, and _next
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
}; 