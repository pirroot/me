'use client';

import Image from 'next/image';

import { useTypewriter } from '@/hooks/useTypewriter';
import { CONTACT, roles, stack, termLines } from '@/lib/data';
import Counter from '@/components/ui/Counter';
import Magnetic from '@/components/ui/Magnetic';
import Reveal from '@/components/ui/Reveal';

export default function Hero({
  roles: rolesProp,
  stack: stackProp,
  contact,
  heroBio,
}: {
  roles?: string[];
  stack?: string[];
  contact?: { resumePdf: string; karlancer: string };
  heroBio?: string;
} = {}) {
  const typedRoles = rolesProp ?? roles;
  const typedStack = stackProp ?? stack;
  const typed = useTypewriter(typedRoles);

  return (
    <section className="grid items-center gap-12 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
      {/* متن */}
      <div className="order-2 md:order-1">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#E9B44C]/25 bg-[#E9B44C]/10 px-4 py-1.5 text-xs text-[#E9B44C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E9B44C]" />
            سایت شخصی
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-6 font-mono text-xs tracking-widest text-[#7FDBB6]" dir="ltr">
            $ whoami_
          </p>
          <h1 className="mt-2 text-5xl font-black leading-[1.15] sm:text-6xl lg:text-7xl">
            سینا{' '}
            <span className="bg-linear-to-b from-[#EDF3EF] via-[#E9B44C] to-[#E9B44C]/60 bg-clip-text text-transparent">
              پیرزاده
            </span>
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-lg text-[#9FB6AE]">
            برنامه‌نویس
            <span dir="ltr" className="font-mono text-base text-[#7FDBB6]">
              {typed}
              <span
                className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-[#E9B44C]"
                style={{ animation: 'blink-caret 1.05s steps(1) infinite' }}
              />
            </span>
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-8 text-[#C4D3CC]">
            {heroBio ??
              'وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js , Fast Api می‌سازم؛ کدی می‌نویسم که هم سریع بار می‌شود، هم برای موتورهای جستجو خواناست و هم بعد از ماه‌ها هنوز قابل نگهداری و توسعه بماند.'}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-6 flex flex-wrap gap-2">
            {typedStack.map((s) => (
              <span
                key={s}
                className="cursor-default rounded-md border border-[#EDF3EF]/10 bg-[#121C19] px-2.5 py-1 font-mono text-xs text-[#9FB6AE] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E9B44C]/40 hover:text-[#E9B44C]"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={contact?.resumePdf ?? CONTACT.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#E9B44C] px-5 py-2.5 text-sm font-bold text-[#0B1210] shadow-[0_10px_30px_-10px_rgba(233,180,76,.5)] transition-colors hover:bg-[#f0c063]"
              >
                دانلود رزومه PDF
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={contact?.karlancer ?? CONTACT.karlancer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#EDF3EF]/15 px-5 py-2.5 text-sm text-[#EDF3EF] transition-colors hover:border-[#7FDBB6]/50 hover:text-[#7FDBB6]"
              >
                پروفایل کارلنسر
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 17 7 7m10 0H7m10 0v10" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* پرتره */}
      <div className="order-1 pb-8 md:order-2 md:pb-0">
        <div className="relative mx-auto flex h-[21rem] w-full max-w-md items-center justify-center sm:h-[26rem]">
          {/* نور رنگی پشت */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 blur-2xl"
            style={{
              background:
                'radial-gradient(circle at 30% 25%, rgba(233,180,76,.22), transparent 50%), radial-gradient(circle at 75% 80%, rgba(127,219,182,.2), transparent 50%)',
            }}
          />

          {/* حلقه‌های مداری */}
          <div
            aria-hidden
            className="absolute inset-0 m-auto aspect-square h-[92%] rounded-full border border-dashed border-[#E9B44C]/25"
            style={{ animation: 'spin-slow 50s linear infinite' }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E9B44C] shadow-[0_0_14px_#E9B44C]" />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 m-auto aspect-square h-[74%] rounded-full border border-[#7FDBB6]/20"
            style={{ animation: 'spin-slow 35s linear infinite reverse' }}
          >
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#7FDBB6] shadow-[0_0_14px_#7FDBB6]" />
          </div>

          {/* قاب عکس */}
          <div className="anim-float relative z-10 h-72 w-56 rounded-2xl bg-linear-to-b from-[#E9B44C]/70 via-[#EDF3EF]/15 to-[#7FDBB6]/70 p-0.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] sm:h-[22rem] sm:w-64">
            <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#121C19]">
              <Image
                src="/profile.webp"
                alt="پروفایل سینا پیرزاده"
                fill
                sizes="(max-width: 768px) 224px, 256px"
                priority
                className="rounded-2xl object-cover object-top transition duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#7FDBB6]/10 mix-blend-soft-light" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0B1210]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/55 px-3 py-2 text-center backdrop-blur-md">
                <div className="text-sm font-bold text-[#EDF3EF]">سینا پیرزاده</div>
                <div className="mt-0.5 font-mono text-[11px] text-[#9FB6AE]" dir="ltr">
                  Full-Stack Developer
                </div>
              </div>
            </div>
          </div>

          {/* چیپ‌های شناور */}
          <span
            dir="ltr"
            className="absolute left-0 top-5 rounded-xl border border-[#E9B44C]/30 bg-[#0B1210]/70 px-3.5 py-2 font-mono text-xs font-semibold text-[#E9B44C] shadow-lg backdrop-blur-md sm:-left-2"
            style={{ animation: 'float-y 7s ease-in-out infinite' }}
          >
            Next.js
          </span>
          <span
            dir="ltr"
            className="absolute right-0 top-16 rounded-xl border border-[#7FDBB6]/30 bg-[#0B1210]/70 px-3.5 py-2 font-mono text-xs font-semibold text-[#7FDBB6] shadow-lg backdrop-blur-md sm:-right-2"
            style={{ animation: 'float-y 8s ease-in-out .8s infinite' }}
          >
            Fast Api
          </span>
          <span
            dir="ltr"
            className="absolute left-0 top-[40%] rounded-xl border border-[#EDF3EF]/15 bg-[#0B1210]/70 px-3.5 py-2 font-mono text-xs font-semibold text-[#EDF3EF] shadow-lg backdrop-blur-md sm:-left-3"
            style={{ animation: 'float-y 9s ease-in-out 1.6s infinite' }}
          >
            TypeScript
          </span>
          <div
            className="absolute bottom-2 right-0 rounded-xl border border-[#E9B44C]/30 bg-[#0B1210]/70 px-3.5 py-2 text-center shadow-lg backdrop-blur-md sm:-right-2"
            style={{ animation: 'float-y 7.5s ease-in-out 2.2s infinite' }}
          >
            <div className="text-lg font-black leading-none text-[#E9B44C]">
              <Counter to={7} suffix="+" />
            </div>
            <div className="mt-1 text-[10px] text-[#9FB6AE]">سال تجربه</div>
          </div>

          {/* کارت ترمینال */}
          <div
            dir="ltr"
            className="absolute bottom-0 left-0 z-20 w-[16.5rem] rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/90 shadow-[0_20px_50px_-12px_rgba(0,0,0,.8)] backdrop-blur-md sm:-left-6"
          >
            <div className="flex items-center gap-1.5 border-b border-[#EDF3EF]/10 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#E9765C]/80" />
              <span className="h-2 w-2 rounded-full bg-[#E9B44C]/80" />
              <span className="h-2 w-2 rounded-full bg-[#7FDBB6]/80" />
              <span className="ml-auto font-mono text-[10px] text-[#7C948B]">pirroot — zsh</span>
            </div>
            <div className="space-y-1 p-3 font-mono text-[11px] leading-5">
              {termLines.map((l, i) => (
                <div key={l.cmd}>
                  <div className="term-line" style={{ animationDelay: `${0.5 + i * 0.55}s` }}>
                    <span className="text-[#7FDBB6]">$</span> <span className="text-[#EDF3EF]">{l.cmd}</span>
                  </div>
                  <div className={`term-line ${l.cls}`} style={{ animationDelay: `${0.75 + i * 0.55}s` }}>
                    {l.out}
                  </div>
                </div>
              ))}
              <div
                className="term-line pt-1"
                style={{ animationDelay: `${0.5 + termLines.length * 0.55}s` }}
              >
                <span className="text-[#7FDBB6]">$</span>
                <span
                  className="ml-1 inline-block h-3 w-[7px] translate-y-[2px] bg-[#E9B44C]"
                  style={{ animation: 'blink-caret 1s steps(1) infinite' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
