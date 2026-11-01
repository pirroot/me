import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

const ALLOWED_KEYS = new Set([
  'siteName',
  'jobTitle',
  'heroBio',
  'roles',
  'stack',
  'phone',
  'email',
  'karlancer',
  'resumePdf',
  'metaDesc',
]);

/** GET /api/admin/settings */
export async function GET() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  const rows = await db.setting.findMany();
  return NextResponse.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
}

/** PUT /api/admin/settings — body: { key: value, ... } */
export async function PUT(req: NextRequest) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const updates = Object.entries(body).filter(([k]) => ALLOWED_KEYS.has(k));

    if (updates.length === 0) {
      return NextResponse.json({ error: 'کلید معتبری ارسال نشد.' }, { status: 400 });
    }

    for (const [key, value] of updates) {
      await db.setting.upsert({
        where: { key },
        update: { value: String(value ?? '') },
        create: { key, value: String(value ?? '') },
      });
    }

    const rows = await db.setting.findMany();
    return NextResponse.json(Object.fromEntries(rows.map((r) => [r.key, r.value])));
  } catch {
    return NextResponse.json({ error: 'خطا در ذخیره تنظیمات.' }, { status: 500 });
  }
}
