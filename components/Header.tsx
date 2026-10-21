'use client';

import { useState } from 'react';

import { useTehranClock } from '@/hooks/useTehranClock';
import { CONTACT, navLinks } from '@/lib/data';

export default function Header() {
  const clock = useTehranClock();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50">
      <nav className="flex items-center justify-between gap-3 rounded-2xl border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-4 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)] backdrop-blur-xl sm:px-5">
        <a
          href="#top"
          className="font-mono text-sm font-bold text-[#EDF3EF] transition-colors hover:text-[#E9B44C]"
        >
          <span className="text-[#E9B44C]">~/</span>pirroot
        </a>

        <div className="hidden items-center gap-6 text-sm text-[#9FB6AE] sm:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nlink transition-colors hover:text-[#E9B44C]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div
          className="hidden items-center gap-2 font-mono text-[11px] text-[#7C948B] md:flex"
          dir="ltr"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#7FDBB6]" />
          TEH {clock}
        </div>

        <a
          href={CONTACT.karlancer}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-1.5 text-xs text-[#B7E9D3] transition hover:border-[#7FDBB6]/60 hover:bg-[#7FDBB6]/15 sm:flex"
        >
          <span
            className="h-2 w-2 rounded-full bg-[#7FDBB6]"
            style={{ animation: 'blink-dot 1.8s ease-in-out infinite' }}
          />
          آنلاین برای همکاری
        </a>

        <button
          aria-label="باز و بسته کردن منو"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-[#EDF3EF]/10 transition-colors hover:border-[#E9B44C]/40 sm:hidden"
        >
          <span
            className={`h-[1.5px] w-4 bg-[#EDF3EF] transition-transform duration-300 ${menuOpen ? 'translate-y-[3.25px] rotate-45' : ''}`}
          />
          <span
            className={`h-[1.5px] w-4 bg-[#EDF3EF] transition-transform duration-300 ${menuOpen ? '-translate-y-[3.25px] -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* منوی موبایل */}
      {menuOpen && (
        <div
          className="absolute inset-x-0 top-full z-50 mt-2 flex flex-col gap-1 rounded-2xl border border-[#EDF3EF]/10 bg-[#0B1210]/95 p-3 shadow-2xl backdrop-blur-xl sm:hidden"
          style={{ animation: 'fade-up .3s ease both' }}
        >
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#EDF3EF] transition-colors hover:bg-[#E9B44C]/10 hover:text-[#E9B44C]"
            >
              {l.label}
              <span className="font-mono text-[10px] text-[#3E5A51]" dir="ltr">{`0${i + 1}`}</span>
            </a>
          ))}
          <div
            className="mt-1 border-t border-[#EDF3EF]/10 px-4 pb-1 pt-3 font-mono text-[10px] text-[#7C948B]"
            dir="ltr"
          >
            {CONTACT.email}
          </div>
        </div>
      )}
    </header>
  );
}
