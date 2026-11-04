'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Briefcase,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'پروژه‌ها', icon: FolderKanban },
  { href: '/admin/experience', label: 'سوابق کاری', icon: Briefcase },
  { href: '/admin/messages', label: 'پیام‌ها', icon: Inbox },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

export default function AdminShell({
  username,
  unread,
  children,
}: {
  username: string;
  unread: number;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  };

  const renderNavLinks = (onClick?: () => void) => (
    <nav className="flex flex-col gap-1" aria-label="ناوبری ادمین">
      {NAV.map((item) => {
        const active = isActive(item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            aria-current={active ? 'page' : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active
                ? 'bg-[#E9B44C]/15 text-[#E9B44C]'
                : 'text-[#9FB6AE] hover:bg-[#EDF3EF]/5 hover:text-[#EDF3EF]'
            }`}
          >
            <item.icon size={17} strokeWidth={2} />
            {item.label}
            {item.href === '/admin/messages' && unread > 0 && (
              <span className="ms-auto rounded-full bg-[#E9765C] px-2 py-0.5 text-[10px] font-bold text-[#0B1210]">
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div data-native-cursor className="flex min-h-screen bg-[#0B1210]">
      {/* سایدبار دسکتاپ */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-s border-[#EDF3EF]/10 bg-[#0E1714] p-4 md:flex">
        <Link href="/admin" className="mb-6 flex items-center gap-2 px-2 pt-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9B44C]/15 font-mono text-sm font-bold text-[#E9B44C]">
            ~/
          </span>
          <div>
            <div className="text-sm font-black text-[#EDF3EF]">پنل مدیریت</div>
            <div className="font-mono text-[10px] text-[#7C948B]" dir="ltr">
              pirroot admin
            </div>
          </div>
        </Link>

        {renderNavLinks()}

        <div className="mt-auto space-y-2 border-t border-[#EDF3EF]/10 pt-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#9FB6AE] transition-colors hover:bg-[#EDF3EF]/5 hover:text-[#7FDBB6]"
          >
            <ExternalLink size={17} />
            مشاهده سایت
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#9FB6AE] transition-colors hover:bg-[#E9765C]/10 hover:text-[#E9765C]"
          >
            <LogOut size={17} />
            خروج
            <span className="ms-auto font-mono text-[10px] text-[#3E5A51]" dir="ltr">
              {username}
            </span>
          </button>
        </div>
      </aside>

      {/* ستون اصلی */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* هدر موبایل */}
        <header className="sticky top-0 z-40 border-b border-[#EDF3EF]/10 bg-[#0B1210]/85 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="باز و بسته کردن منو"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#EDF3EF]"
            >
              <Menu size={17} />
            </button>
            <span className="font-mono text-sm font-bold text-[#EDF3EF]">
              <span className="text-[#E9B44C]">~/</span>admin
            </span>
            <button
              type="button"
              onClick={logout}
              aria-label="خروج"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE]"
            >
              <LogOut size={16} />
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-[#EDF3EF]/10 bg-[#0E1714] p-3">
              {renderNavLinks(() => setMobileOpen(false))}
            </div>
          )}
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
