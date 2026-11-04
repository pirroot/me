import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** GET /api/admin/messages — inbox (newest first). */
export async function GET() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  const messages = await db.message.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(messages);
}

/** DELETE /api/admin/messages — clear all read messages. */
export async function DELETE() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  await db.message.deleteMany({ where: { read: true } });
  return NextResponse.json({ ok: true });
}
