import Image from 'next/image';
import { Download, StickerIcon } from 'lucide-react';
import { SKILL_TAGS } from '@/lib/proflow_data';
import GithubStack from './GithubStack';

export default async function Hero() {
  return (
    <section className="mb-40">
      <div className="flex flex-col-reverse justify-center mx-auto items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <div className="flex-1">
          <p className="mb-4  text-xs uppercase tracking-[0.35em] text-cyan-300/70"></p>

          <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl">
            سینا
            <br />
            <span className="text-cyan-300">پیرزاده</span>
            <span className="cursor-blink text-cyan-300">_</span>
          </h1>

          <p className="mt-6  text-md uppercase tracking-[0.25em] text-zinc-400">
            Full Stack Web Developer · Next.js · NestJS · TypeScript
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400">
            سلام! من سینا پیرزاده هستم، برنامه‌نویس Full-Stack با تمرکز بر توسعه وب‌اپلیکیشن‌ها و
            فروشگاه‌های اینترنتی با Next.js و NestJS. رابط‌های کاربری سریع، واکنش‌گرا و SEO-Friendly
            می‌سازم و APIهای ساختاریافته و ماژولار پیاده‌سازی می‌کنم.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {SKILL_TAGS.map((t) => (
              <span
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1  text-[11px] tracking-wide text-zinc-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                key={t}
              >
                {t}
              </span>
            ))}
          </div>

          <GithubStack />

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://pirroot.site/avater_user_image/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-300/10 px-5 py-2.5  text-xs uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-300/20 hover:text-cyan-200"
            >
              <Download className="h-4 w-4" />
              دانلود رزومه PDF
            </a>
            <a
              href="https://karlancer.com/profile/1241439"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5  text-xs uppercase tracking-wider text-zinc-300 transition-all hover:border-cyan-300/40 hover:text-cyan-200"
            >
              <StickerIcon className="h-4 w-4" />
              پروفایل کارلنسر
            </a>
          </div>
        </div>

        {/* Profile Image Placeholder */}
        <div className="relative shrink-0">
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-white/10 bg-white/3 sm:h-80 sm:w-80">
            {/* Placeholder — replace src with your photo */}

            <Image
              src={'https://pirroot.site/avater_user_image/profile.jpg'}
              alt="سینا پیرزاده پروفایل"
              width={1000}
              height={1000}
              className="h-full w-full object-cover "
            />
          </div>
          {/* Decorative ring */}
          <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-cyan-300/10" />
          <div className="pointer-events-none absolute -inset-6 rounded-4xl border border-cyan-300/5" />
        </div>
      </div>
    </section>
  );
}
