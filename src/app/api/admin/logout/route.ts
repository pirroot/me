import { NextResponse } from 'next/server';

import { clearSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

/** POST /api/admin/logout — clear the session cookie. */
export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
