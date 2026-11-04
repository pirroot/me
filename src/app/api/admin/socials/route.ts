import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

const ICONS = ['github', 'linkedin', 'instagram', 'telegram'];

/** GET /api/admin/socials */
export async function GET() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  const items = await db.social.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(items);
}

/** POST /api/admin/socials */
export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const b = await req.json();
    const name = String(b.name ?? '').trim();
    const href = String(b.href ?? '').trim();
    if (!name || !href) {
      return NextResponse.json({ error: 'نام و لینک لازم است.' }, { status: 400 });
    }

    const last = await db.social.findFirst({ orderBy: { order: 'desc' } });
    const item = await db.social.create({
      data: {
        name,
        handle: String(b.handle ?? '').trim(),
        href,
        iconKey: ICONS.includes(b.iconKey) ? b.iconKey : 'github',
        order: typeof b.order === 'number' ? b.order : (last?.order ?? 0) + 1,
        visible: b.visible !== false,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'خطا در ایجاد شبکه اجتماعی.' }, { status: 500 });
  }
}
