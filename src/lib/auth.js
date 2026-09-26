import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "devsamp-secure-jwt-auth-key-2026-production";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload, duration = "30d") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(duration)
    .sign(key);
}

export async function decrypt(input) {
  if (!input) return null;
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function login(userData) {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const session = await encrypt({ user: userData, expires }, "30d");

  const cookieStore = await cookies();
  cookieStore.set("session", session, { 
    expires, 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/" 
  });
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function verifyAdminSession(request = null) {
  try {
    // 1. Check Authorization Bearer Header if request object provided
    if (request && request.headers) {
      const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const bearerToken = authHeader.substring(7);
        const decrypted = await decrypt(bearerToken);
        if (decrypted && decrypted.role === "admin") {
          return decrypted;
        }
      }
    }

    // 2. Check Cookie Store
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session) return null;
    const decrypted = await decrypt(session);
    if (decrypted && decrypted.role === "admin") {
      return decrypted;
    }
    return null;
  } catch (error) {
    return null;
  }
}