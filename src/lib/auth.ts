import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/* ═══════════════════════ Config ═══════════════════════ */
const COOKIE_NAME = 'pirroot_admin';
const SESSION_TTL = 60 * 60 * 24 * 7; // ۷ روز
const SECRET =
  process.env.AUTH_SECRET || 'pirroot-portfolio-dev-secret-change-in-production';

/* ═══════════════════════ Password hashing (scrypt) ═══════════════════════ */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

/* ═══════════════════════ Signed session cookie (HMAC) ═══════════════════════ */
interface SessionPayload {
  u: string; // username
  exp: number; // expiry (unix seconds)
}

function sign(data: string): string {
  return createHmac('sha256', SECRET).update(data).digest('base64url');
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = { u: username, exp: Math.floor(Date.now() / 1000) + SESSION_TTL };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body)}`;
}

function readToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as SessionPayload;
    if (!payload.u || typeof payload.exp !== 'number') return null;
    if (payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* ═══════════════════════ Cookie helpers ═══════════════════════ */
export async function setSessionCookie(username: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export async function getSession(): Promise<{ username: string } | null> {
  const jar = await cookies();
  const payload = readToken(jar.get(COOKIE_NAME)?.value);
  return payload ? { username: payload.u } : null;
}

/* ═══════════════════════ API guard ═══════════════════════ */
export const UNAUTHORIZED = Response.json({ error: 'دسترسی غیرمجاز' }, { status: 401 });

export async function requireSession(): Promise<{ username: string } | null> {
  return getSession();
}
