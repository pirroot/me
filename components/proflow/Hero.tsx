import Image from 'next/image';
import { Download, Sticker } from 'lucide-react';
import { SKILL_TAGS } from '@/lib/proflow_data';
import GithubStack from './GithubStack';
import profile from '@/public/profile.webp';
import Link from 'next/link';

export default async function Hero() {
  return (
    <section className="mb-40">
      <div className="flex flex-col-reverse justify-center mx-auto items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <div className="flex-1">
          {/* Status LED — skeuomorphic hardware indicator */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
            style={{
              background: 'linear-gradient(160deg, #171d24, #0c1015)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: '#22d3ee' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
                  boxShadow: '0 0 6px 1px rgba(34,211,238,0.9)',
                }}
              />
            </span>
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
              آنلاین برای همکاری
            </span>
          </div>

          <h1
            className="font-display text-5xl leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl"
            style={{ textShadow: '0 1px 0 rgba(255,255,255,0.04), 0 3px 10px rgba(0,0,0,0.6)' }}
          >
            سینا
            <br />
            <span
              className="text-cyan-300"
              style={{ textShadow: '0 0 22px rgba(34,211,238,0.35)' }}
            >
              پیرزاده
            </span>
            <span className="cursor-blink text-cyan-300">_</span>
          </h1>

          <p className="mt-6 text-md uppercase tracking-[0.25em] text-zinc-400">
            Full Stack Web Developer · Next.js · NestJS · TypeScript
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            سلام! من سینا پیرزاده هستم، برنامه‌نویس Full-Stack با تمرکز بر توسعه وب‌اپلیکیشن‌ها و
            فروشگاه‌های اینترنتی با Next.js و NestJS. رابط‌های کاربری سریع، واکنش‌گرا و SEO-Friendly
            می‌سازم و APIهای ساختاریافته و ماژولار پیاده‌سازی می‌کنم.
          </p>

          {/* Skill chips — tactile keycaps */}
          <div className="mt-10 flex flex-wrap gap-3">
            {SKILL_TAGS.map((t) => (
              <span
                key={t}
                className="rounded-lg px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-zinc-300 transition-all duration-150 hover:-translate-y-0.5 hover:text-cyan-200"
                style={{
                  background: 'linear-gradient(160deg, #171d24, #0d1116)',
                  boxShadow:
                    'inset 0 1px 1px rgba(255,255,255,0.07), inset 0 -1px 1px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <GithubStack />

          {/* CTAs — glossy convex button + inset bezel button */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={'https://github.com/pirroot/pirroot/blob/main/resume.pdf'}
              download
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs uppercase tracking-wider text-cyan-950 transition-all duration-150 active:translate-y-px"
              style={{
                background: 'linear-gradient(180deg, #67e8f9 0%, #22d3ee 55%, #0891b2 100%)',
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(8,60,72,0.5), 0 6px 14px rgba(34,211,238,0.25), 0 2px 4px rgba(0,0,0,0.4)',
              }}
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              <span className="font-semibold">دانلود رزومه PDF</span>
            </Link>

            <Link
              href="https://karlancer.com/profile/1241439"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs uppercase tracking-wider text-zinc-300 transition-all duration-150 hover:text-cyan-200 active:translate-y-px"
              style={{
                background: 'linear-gradient(160deg, #171d24, #0c1015)',
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.07), inset 0 -1px 2px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Sticker className="h-4 w-4" />
              پروفایل کارلنسر
            </Link>
          </div>
        </div>

        {/* Profile — recessed screen in a hardware bezel */}
        <div className="relative shrink-0">
          {/* Ambient glow behind the device */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[3rem] opacity-70 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)',
            }}
          />

          {/* Outer bezel — brushed-metal feel */}
          <div
            className="relative h-72 w-72 rounded-4xl p-3 sm:h-88 sm:w-88"
            style={{
              background: 'linear-gradient(155deg, #232a32 0%, #12161b 45%, #0a0d11 100%)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Recessed screen well */}
            <div
              className="relative h-full w-full overflow-hidden rounded-[1.4rem]"
              style={{
                boxShadow:
                  'inset 0 3px 10px rgba(0,0,0,0.85), inset 0 -1px 2px rgba(255,255,255,0.04)',
              }}
            >
              <Image
                src={profile}
                alt="سینا پیرزاده پروفایل"
                width={1000}
                height={1000}
                priority
                className="h-full w-full object-cover"
              />

              {/* Glass sheen */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 22%, transparent 45%)',
                }}
              />
              {/* Bottom vignette for depth */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.35), transparent 40%)',
                }}
              />
            </div>

            {/* Corner status light on the bezel, like device power LED */}
            <span
              className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
                boxShadow: '0 0 5px 1px rgba(34,211,238,0.9)',
              }}
            />
          </div>

          {/* Decorative rings */}
          <div className="pointer-events-none absolute -inset-3 rounded-[2.4rem] border border-cyan-300/10" />
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] border border-cyan-300/5" />
        </div>
      </div>
    </section>
  );
}
