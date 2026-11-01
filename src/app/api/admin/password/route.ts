import { NextRequest, NextResponse } from 'next/server';

import { hashPassword, requireSession, UNAUTHORIZED, verifyPassword } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * POST /api/admin/password — change the admin password.
 * Body: { current: string, next: string }
 */
export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { current, next } = await req.json();
    if (!current || !next || String(next).length < 6) {
      return NextResponse.json(
        { error: 'رمز جدید باید حداقل ۶ کاراکتر باشد.' },
        { status: 400 },
      );
    }

    const admin = await db.admin.findUnique({ where: { username: session.username } });
    if (!admin || !verifyPassword(String(current), admin.passwordHash)) {
      return NextResponse.json({ error: 'رمز فعلی اشتباه است.' }, { status: 400 });
    }

    await db.admin.update({
      where: { username: session.username },
      data: { passwordHash: hashPassword(String(next)) },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطای سرور؛ دوباره تلاش کن.' }, { status: 500 });
  }
}
