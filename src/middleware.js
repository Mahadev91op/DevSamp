import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
  // 1. Current Session Pata Karein
  const cookie = request.cookies.get('session')?.value;
  const session = await decrypt(cookie);

  // 2. Protected Routes Define Karein
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');

  // 3. Logic: Agar user '/dashboard' par ja raha hai aur login nahi hai
  if (isDashboardRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Logic: Agar user login hai aur wapas '/login' par ja raha hai
  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Sirf in routes par middleware chalega (Performance ke liye)
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};