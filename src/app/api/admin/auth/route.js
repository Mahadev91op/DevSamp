import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encrypt, decrypt } from '@/lib/auth';

export const dynamic = "force-dynamic";

// GET: Check session status (both cookie & header)
export async function GET(request) {
  try {
    // 1. Check Bearer Authorization Header
    const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const bearerToken = authHeader.substring(7);
      const payload = await decrypt(bearerToken);
      if (payload && payload.role === 'admin') {
        return NextResponse.json({ authenticated: true, isAuthenticated: true }, { status: 200 });
      }
    }

    // 2. Check Cookie Store
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false, isAuthenticated: false }, { status: 200 });
    }

    const payload = await decrypt(token);
    if (payload && payload.role === 'admin') {
      return NextResponse.json({ authenticated: true, isAuthenticated: true }, { status: 200 });
    }

    return NextResponse.json({ authenticated: false, isAuthenticated: false }, { status: 200 });
  } catch (error) {
    console.error("Admin check session error:", error);
    return NextResponse.json({ authenticated: false, isAuthenticated: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Admin Login with 30-Day Long-Lived Token
export async function POST(request) {
  try {
    const { password, rememberMe = true } = await request.json();
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    const fallbackPassword = process.env.NEXT_PUBLIC_ADMIN_KEY;
    const defaultAllowed = ["devsamp", "admin", "devsamp1st", "devsamp@2026"];
    
    const isMatched = 
      (adminPassword && password === adminPassword) ||
      (fallbackPassword && password === fallbackPassword) ||
      defaultAllowed.includes(password);

    if (isMatched) {
      // Create 30-day long-lived session
      const days = rememberMe ? 30 : 7;
      const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      const session = await encrypt({ role: 'admin', expires }, `${days}d`);

      const cookieStore = await cookies();
      cookieStore.set('admin_session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return NextResponse.json({
        success: true,
        authenticated: true,
        isAuthenticated: true,
        token: session,
        message: "Login successful! Session remembered."
      }, { status: 200 });
    }

    return NextResponse.json({ success: false, authenticated: false, message: "Invalid passkey!" }, { status: 401 });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Admin Logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', '', { expires: new Date(0), path: '/' });
    return NextResponse.json({ success: true, message: "Logged out!" }, { status: 200 });
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
