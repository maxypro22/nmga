import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "nmj_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export type SessionPayload = JWTPayload & {
  sub: string; // admin id
  username: string;
};

function getSecret(): Uint8Array {
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.length < 32) {
    throw new Error(
      "AUTH_SECRET env var must be set to a random string of at least 32 characters."
    );
  }
  return new TextEncoder().encode(raw);
}

export async function signSession(payload: {
  id: string;
  username: string;
}): Promise<string> {
  return new SignJWT({ username: payload.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sub !== "string" || typeof payload.username !== "string") {
      return null;
    }
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Read + verify the session from the incoming request cookies (server-side).
 * Returns null if there's no cookie or the JWT is invalid/expired.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
