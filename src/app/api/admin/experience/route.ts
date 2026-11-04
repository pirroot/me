import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** GET /api/admin/experience — list all (including hidden). */
export async function GET() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  const items = await db.experience.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(items);
}

/** POST /api/admin/experience — create. */
export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const b = await req.json();
    const company = String(b.company ?? '').trim();
    if (!company) return NextResponse.json({ error: 'نام شرکت لازم است.' }, { status: 400 });

    const last = await db.experience.findFirst({ orderBy: { order: 'desc' } });
    const item = await db.experience.create({
      data: {
        company,
        role: String(b.role ?? '').trim(),
        period: String(b.period ?? '').trim(),
        desc: String(b.desc ?? '').trim(),
        tags: JSON.stringify(
          Array.isArray(b.tags) ? b.tags.map(String).filter(Boolean) : String(b.tags ?? '')
            .split(/[,،]/)
            .map((t: string) => t.trim())
            .filter(Boolean),
        ),
        current: !!b.current,
        order: typeof b.order === 'number' ? b.order : (last?.order ?? 0) + 1,
        visible: b.visible !== false,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'خطا در ایجاد سابقه.' }, { status: 500 });
  }
}
