'use client';

import { useState } from 'react';

import { CONTACT, socials } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-14 md:py-20">
      <Reveal>
        <h2 className="flex items-center gap-2.5 text-sm font-bold text-[#E9B44C]">
          <span className="font-mono">03.</span> بیایید همکاری کنیم
          <span className="h-px flex-1 bg-linear-to-l from-[#EDF3EF]/15 to-transparent" />
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-6 sm:p-8">
          <span
            aria-hidden
            dir="ltr"
            className="absolute -left-3 -top-9 select-none font-mono text-[7rem] font-black leading-none text-[#EDF3EF]/[0.04]"
          >
            {'</>'}
          </span>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-[#E9B44C]/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-[#7FDBB6]/10 blur-3xl"
          />

          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-md">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#7FDBB6]/25 bg-[#7FDBB6]/10 px-3 py-1 text-[11px] text-[#B7E9D3]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#7FDBB6]"
                  style={{ animation: 'blink-dot 1.8s ease-in-out infinite' }}
                />
                معمولاً ظرف چند ساعت پاسخ می‌دم
              </span>
              <p className="text-sm leading-7 text-[#9FB6AE]">
                برای پروژهٔ بعدی‌ات یک Full-Stack Developer می‌خوای؟ هر وقت خواستی در دسترسم.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-2.5 rounded-lg border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-2.5 text-sm font-bold text-[#7FDBB6] transition-transform hover:scale-[1.03] hover:bg-[#7FDBB6]/20"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7FDBB6]/15">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" />
                  </svg>
                </span>
                {CONTACT.phoneFa}
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-bold transition-all hover:scale-[1.03] ${
                  copied
                    ? 'border-[#7FDBB6]/50 bg-[#7FDBB6]/15 text-[#7FDBB6]'
                    : 'border-[#E9B44C]/30 bg-[#E9B44C]/10 text-[#E9B44C] hover:bg-[#E9B44C]/20'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${copied ? 'bg-[#7FDBB6]/15' : 'bg-[#E9B44C]/15'}`}
                >
                  {copied ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  )}
                </span>
                {copied ? (
                  'کپی شد!'
                ) : (
                  <span dir="ltr" className="font-mono text-[13px]">
                    {CONTACT.email}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/60 px-4 py-4 transition duration-300 hover:-translate-y-1.5 hover:border-[#7FDBB6]/50 hover:bg-[#7FDBB6]/[0.07]"
                >
                  <span
                    aria-hidden
                    className="absolute -left-3 -top-3 h-14 w-14 rounded-full bg-[#7FDBB6]/0 blur-2xl transition group-hover:bg-[#7FDBB6]/20"
                  />
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 bg-[#121C19] text-[#7C948B] transition group-hover:scale-110 group-hover:border-[#7FDBB6]/40 group-hover:text-[#7FDBB6]">
                    <Icon />
                  </span>
                  <div>
                    <div className="text-xs text-[#7C948B]">{s.name}</div>
                    <div
                      className="mt-0.5 text-sm font-bold text-[#EDF3EF] transition group-hover:text-[#7FDBB6]"
                      dir="ltr"
                    >
                      {s.handle}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
