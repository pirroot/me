import Link from 'next/link';
import { Briefcase, FolderKanban, Inbox, Settings } from 'lucide-react';

import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { toFa } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getSession();

  let projects = 0;
  let experience = 0;
  let socials = 0;
  let messages = 0;
  let unread = 0;
  let dbError = false;
  let recent: { id: string; name: string; subject: string | null; createdAt: Date; read: boolean }[] = [];

  try {
    [projects, experience, socials, messages, unread, recent] = await Promise.all([
      db.project.count(),
      db.experience.count(),
      db.social.count(),
      db.message.count(),
      db.message.count({ where: { read: false } }),
      db.message.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);
  } catch {
    dbError = true;
  }

  const stats = [
    { label: 'پروژه‌ها', value: projects, href: '/admin/projects', icon: FolderKanban, color: 'text-[#E9B44C]' },
    { label: 'سوابق کاری', value: experience, href: '/admin/experience', icon: Briefcase, color: 'text-[#7FDBB6]' },
    { label: 'شبکه‌های اجتماعی', value: socials, href: '/admin/settings', icon: Settings, color: 'text-[#9FB6AE]' },
    {
      label: unread > 0 ? `پیام خوانده‌نشده (${toFa(unread)})` : 'پیام‌ها',
      value: messages,
      href: '/admin/messages',
      icon: Inbox,
      color: unread > 0 ? 'text-[#E9765C]' : 'text-[#9FB6AE]',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#EDF3EF]">
            سلام {session?.username ?? 'مدیر'} 👋
          </h1>
          <p className="mt-1 text-xs text-[#7C948B]">
            از این‌جا محتوای سایتت رو کنترل کن — هر چیزی که عوض کنی بلافاصله روی سایت اعمال می‌شه.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          className="rounded-lg border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-2 text-xs font-bold text-[#7FDBB6] transition-colors hover:bg-[#7FDBB6]/20"
        >
          مشاهده سایت ↗
        </a>
      </div>

      {dbError && (
        <p className="mt-5 rounded-xl border border-[#E9765C]/30 bg-[#E9765C]/10 px-4 py-3 text-xs font-semibold text-[#E9765C]">
          اتصال به دیتابیس برقرار نشد! مطمئن شو سرویس در حال اجراست.
        </p>
      )}

      {/* کارت‌های آمار */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#E9B44C]/40"
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1210]/60 ${s.color}`}>
                <s.icon size={18} />
              </span>
              <span className="text-3xl font-black text-[#EDF3EF] transition-colors group-hover:text-[#E9B44C]">
                {toFa(s.value)}
              </span>
            </div>
            <div className="mt-3 text-xs font-semibold text-[#7C948B]">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* آخرین پیام‌ها */}
      <div className="mt-8 rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#E9B44C]">آخرین پیام‌های فرم تماس</h2>
          <Link href="/admin/messages" className="text-xs text-[#7C948B] transition-colors hover:text-[#E9B44C]">
            همه پیام‌ها ←
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 rounded-xl border border-dashed border-[#EDF3EF]/15 px-4 py-8 text-center text-xs text-[#7C948B]">
            هنوز پیامی نداری. وقتی کسی از سایت برات بنویسه، این‌جا می‌بینیش.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-[#EDF3EF]/5">
            {recent.map((m) => (
              <li key={m.id} className="flex items-center gap-3 py-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${m.read ? 'bg-[#3E5A51]' : 'bg-[#E9B44C]'}`}
                  aria-label={m.read ? 'خوانده‌شده' : 'جدید'}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-[#EDF3EF]">
                    {m.name}
                    {m.subject && <span className="ms-2 text-xs font-normal text-[#7C948B]">— {m.subject}</span>}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-[#7C948B]" dir="ltr">
                  {new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(m.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* راهنمای سریع */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { href: '/admin/projects', title: 'پروژه جدید', desc: 'کارهای انجام‌شده‌ات رو اضافه یا ویرایش کن' },
          { href: '/admin/experience', title: 'سابقه کاری', desc: 'سوابق شغلی و تگ‌های مهارتی' },
          { href: '/admin/settings', title: 'تنظیمات سایت', desc: 'نام، بایو، تماس، سوشال و رمز عبور' },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="rounded-2xl border border-[#EDF3EF]/10 bg-[#0E1714] p-4 transition-colors hover:border-[#7FDBB6]/40"
          >
            <div className="text-sm font-bold text-[#7FDBB6]">{q.title} →</div>
            <p className="mt-1 text-xs leading-5 text-[#7C948B]">{q.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
