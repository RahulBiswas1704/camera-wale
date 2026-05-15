import { NextResponse } from 'next/server';

export function proxy(request) {
  const path = request.nextUrl.pathname;
  
  // Only run on /admin routes, but ignore /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const session = request.cookies.get('admin_session')?.value;
    
    if (session !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If hitting /admin/login while already authenticated, redirect to /admin
  if (path === '/admin/login') {
    const session = request.cookies.get('admin_session')?.value;
    if (session === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
