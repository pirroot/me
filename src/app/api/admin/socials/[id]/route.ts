import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

const ICONS = ['github', 'linkedin', 'instagram', 'telegram'];

/** PUT /api/admin/socials/[id] */
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    const b = await req.json();
    const item = await db.social.update({
      where: { id },
      data: {
        name: String(b.name ?? '').trim(),
        handle: String(b.handle ?? '').trim(),
        href: String(b.href ?? '').trim(),
        iconKey: ICONS.includes(b.iconKey) ? b.iconKey : 'github',
        ...(typeof b.order === 'number' ? { order: b.order } : {}),
        ...(typeof b.visible === 'boolean' ? { visible: b.visible } : {}),
      },
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: 'خطا در ویرایش شبکه اجتماعی.' }, { status: 500 });
  }
}

/** DELETE /api/admin/socials/[id] */
export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const { id } = await ctx.params;
    await db.social.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'خطا در حذف شبکه اجتماعی.' }, { status: 500 });
  }
}
