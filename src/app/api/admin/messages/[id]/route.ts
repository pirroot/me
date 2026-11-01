import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** PATCH /api/admin/messages/[id] — mark read/unread. */
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    const { read } = await req.json();
    const message = await db.message.update({ where: { id }, data: { read: !!read } });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'خطا در به‌روزرسانی پیام.' }, { status: 500 });
  }
}

/** DELETE /api/admin/messages/[id] */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    await db.message.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف پیام.' }, { status: 500 });
  }
}
