import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * POST /api/contact — public endpoint: saves a message to the admin inbox.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim().slice(0, 120);
    const subject = String(body.subject ?? '').trim().slice(0, 120);
    const text = String(body.body ?? '').trim();

    if (!name || name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: 'نام را وارد کنید (حداقل ۲ حرف).' }, { status: 400 });
    }
    if (!text || text.length < 5 || text.length > 3000) {
      return NextResponse.json({ error: 'متن پیام خیلی کوتاه است.' }, { status: 400 });
    }

    await db.message.create({
      data: {
        name,
        email: email || null,
        subject: subject || null,
        body: text,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطای سرور؛ دوباره تلاش کن.' }, { status: 500 });
  }
}
