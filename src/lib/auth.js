import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// FIX: Yahan humne ek 'Fallback Key' add kar di hai.
// Agar .env me JWT_SECRET nahi milega, to ye default key use karega.
// Isse BUILD ERROR fix ho jayega.
const secretKey = process.env.JWT_SECRET || "default-dev-secret-key-change-this-in-prod";

// Sirf Console me Warning dikhayenge, App Crash nahi karenge
if (!process.env.JWT_SECRET) {
  console.warn("⚠️ WARNING: JWT_SECRET is missing in .env file. Using default insecure key.");
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input) {
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
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user: userData, expires });

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