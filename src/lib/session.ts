import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret';
const SESSION_COOKIE = 'adlancer_session';

export async function createSession(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(SESSION_SECRET));
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, { httpOnly: true, path: '/' });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SESSION_SECRET));
    return payload;
  } catch {
    return null;
  }
}
