import { NextRequest, NextResponse } from 'next/server';

import { requireSession, UNAUTHORIZED } from '@/lib/auth';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

/** GET /api/admin/projects — list all (including hidden). */
export async function GET() {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;
  const projects = await db.project.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(projects);
}

/** POST /api/admin/projects — create. */
export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return UNAUTHORIZED;

  try {
    const b = await req.json();
    const title = String(b.title ?? '').trim();
    if (!title) return NextResponse.json({ error: 'عنوان لازم است.' }, { status: 400 });

    const last = await db.project.findFirst({ orderBy: { order: 'desc' } });
    const project = await db.project.create({
      data: {
        title,
        desc: String(b.desc ?? '').trim(),
        stack: String(b.stack ?? '').trim(),
        href: String(b.href ?? '#').trim(),
        cat: b.cat === 'app' ? 'app' : 'shop',
        order: typeof b.order === 'number' ? b.order : (last?.order ?? 0) + 1,
        visible: b.visible !== false,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'خطا در ایجاد پروژه.' }, { status: 500 });
  }
}
