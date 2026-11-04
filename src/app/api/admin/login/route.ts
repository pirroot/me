import { NextRequest, NextResponse } from 'next/server';

import { setSessionCookie, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * POST /api/admin/login — verify credentials and set the session cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'نام کاربری و رمز عبور لازم است.' }, { status: 400 });
    }

    const admin = await db.admin.findUnique({ where: { username: String(username).trim() } });
    if (!admin || !verifyPassword(String(password), admin.passwordHash)) {
      return NextResponse.json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, { status: 401 });
    }

    await setSessionCookie(admin.username);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطای سرور؛ دوباره تلاش کن.' }, { status: 500 });
  }
}
