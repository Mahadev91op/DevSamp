import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encrypt, decrypt } from '@/lib/auth';

// GET: Check session status
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    
    if (!token) {
      return NextResponse.json({ isAuthenticated: false }, { status: 200 });
    }

    const payload = await decrypt(token);
    if (payload && payload.role === 'admin') {
      return NextResponse.json({ isAuthenticated: true }, { status: 200 });
    }

    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  } catch (error) {
    console.error("Admin check session error:", error);
    return NextResponse.json({ isAuthenticated: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Admin Login
export async function POST(request) {
  try {
    const { password } = await request.json();
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    const fallbackPassword = process.env.NEXT_PUBLIC_ADMIN_KEY;
    
    if (!adminPassword && !fallbackPassword) {
      return NextResponse.json(
        { success: false, message: "Server configuration error. Master key not set." },
        { status: 500 }
      );
    }

    if (password === adminPassword || password === fallbackPassword) {
      // Create session payload and encrypt it
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      const session = await encrypt({ role: 'admin', expires });

      const cookieStore = await cookies();
      cookieStore.set('admin_session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });

      return NextResponse.json({ success: true, message: "Login successful!" }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: "Invalid passkey!" }, { status: 401 });
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
