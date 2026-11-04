import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** PUT /api/admin/projects/[id] — update. */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    const b = await req.json();
    const project = await db.project.update({
      where: { id },
      data: {
        title: String(b.title ?? '').trim(),
        desc: String(b.desc ?? '').trim(),
        stack: String(b.stack ?? '').trim(),
        href: String(b.href ?? '#').trim(),
        cat: b.cat === 'app' ? 'app' : 'shop',
        ...(typeof b.order === 'number' ? { order: b.order } : {}),
        ...(typeof b.visible === 'boolean' ? { visible: b.visible } : {}),
      },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'خطا در ویرایش پروژه.' }, { status: 500 });
  }
}

/** DELETE /api/admin/projects/[id] — remove. */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف پروژه.' }, { status: 500 });
  }
}
