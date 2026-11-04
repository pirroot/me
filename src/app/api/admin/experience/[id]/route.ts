import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** PUT /api/admin/experience/[id] — update. */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    const b = await req.json();
    const item = await db.experience.update({
      where: { id },
      data: {
        company: String(b.company ?? '').trim(),
        role: String(b.role ?? '').trim(),
        period: String(b.period ?? '').trim(),
        desc: String(b.desc ?? '').trim(),
        tags: JSON.stringify(
          Array.isArray(b.tags)
            ? b.tags.map(String).filter(Boolean)
            : String(b.tags ?? '')
                .split(/[,،]/)
                .map((t: string) => t.trim())
                .filter(Boolean),
        ),
        current: !!b.current,
        ...(typeof b.order === 'number' ? { order: b.order } : {}),
        ...(typeof b.visible === 'boolean' ? { visible: b.visible } : {}),
      },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'خطا در ویرایش سابقه.' }, { status: 500 });
  }
}

/** DELETE /api/admin/experience/[id] — remove. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    await db.experience.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف سابقه.' }, { status: 500 });
  }
}
