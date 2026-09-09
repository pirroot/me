import Image from 'next/image';
import profile_img from '@/public/profile.webp';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'سینا پیرزاده',
  alternateName: 'pirroot',
  jobTitle: 'Full-Stack Web Developer',
  url: 'https://github.com/pirroot',
  email: 'mailto:pirzadehroot@gmail.com',
  telephone: '+98-936-473-3583',
  sameAs: [
    'https://github.com/pirroot',
    'https://linkedin.com/in/pirroot',
    'https://instagram.com/pirroot',
    'https://t.me/pirroot',
  ],
  knowsAbout: ['Next.js', 'NestJS', 'React.js', 'TypeScript', 'PostgreSQL', 'Docker', 'SEO'],
};

const stack = [
  'Next.js',
  'Nest.js',
  'React.js',
  'Tailwind',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'SEO',
  'Node.js',
  'REST API',
];

const experience = [
  {
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'SEO'],
    current: true,
  },
  {
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز و مقیاس‌پذیر.',
    tags: ['Next.js', 'NestJS', 'Tailwind'],
  },
  {
    company: 'آرام گستر',
    role: 'برنامه‌نویس وب',
    period: '۱۳۹۹ — ۱۴۰۴',
    desc: 'طراحی و توسعه سایت‌های شرکتی و خدماتی.',
    tags: ['Next.js', 'Node.js'],
  },
  {
    company: 'باران مسیح',
    role: 'برنامه‌نویس Mid-Level',
    period: '۱۳۹۸ — ۱۴۰۱',
    desc: 'همکاری در تیم فنی توسعه محصولات وب.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

const projects = [
  {
    title: 'فروشگاه اینترنتی Full-Stack - Comping Shop',
    desc: 'فروشگاه کامل با پنل ادمین، سبد خرید، درگاه پرداخت و سیستم مدیریت سفارش.',
    stack: 'Next.js · NestJS · PostgreSQL',
    href: 'https://github.com/pirroot/Comping',
    cat: 'shop',
  },
  {
    title: 'وب‌سایت Bellanzo',
    desc: 'سایت مدرن با بهینه‌سازی سئو، ساختار مناسب موتورهای جستجو و رابط کاربری سریع.',
    stack: 'Next.js · PostgreSQL · SEO',
    href: 'https://bellanzo-home.ir/',
    cat: 'shop',
  },
  {
    title: 'اپلیکیشن آموزشگاهی رایا',
    desc: 'پلتفرم آموزشگاهی و فروشگاهی با رابط کاربری ریسپانسیو و APIهای RESTful.',
    stack: 'Next.js · Django REST',
    href: 'https://github.com/pirroot/Raya',
    cat: 'app',
  },
];

const socials = [
  {
    name: 'گیت‌هاب',
    handle: 'pirroot',
    href: 'https://github.com/pirroot',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.58 4.94.36.31.68.93.68 1.87v2.78c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'لینکدین',
    handle: 'pirroot',
    href: 'https://linkedin.com/in/pirroot',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.94 1.94 0 1 0 0 3.88A1.94 1.94 0 0 0 5.25 3ZM20.44 20h-3.37v-6.1c0-1.46-.03-3.32-2.03-3.32-2.03 0-2.35 1.58-2.35 3.22V20H9.32V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.63 2.26 4.63 5.19V20Z" />
      </svg>
    ),
  },
  {
    name: 'اینستاگرام',
    handle: 'pirroot',
    href: 'https://instagram.com/pirroot',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'تلگرام',
    handle: '@pirroot',
    href: 'https://t.me/pirroot',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5 3.5 2.7 11c-.9.35-.9 1.6.03 1.9l4.6 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.5-2.9 4.6 3.4c.8.6 1.9.15 2.1-.8l3.2-14.6c.25-1.1-.8-2-1.9-1.6ZM8.4 13.7l9.3-6c.3-.2.6.15.3.4l-7.7 7.1-.3 3.3-1.6-4.8Z" />
      </svg>
    ),
  },
];

export default function Page() {
  return (
    <main>
      <div aria-hidden className="scroll-progress" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Ambient background ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="glow-gold anim-drift absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl" />
        <div
          className="glow-mint anim-drift absolute top-1/3 -left-28 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="glow-gold anim-drift absolute bottom-[-8rem] right-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ animationDelay: '-8s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              'linear-gradient(#EDF3EF 1px, transparent 1px), linear-gradient(90deg, #EDF3EF 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ── Nav ── */}
        <header className="sticky top-4 z-50">
          <nav className="mt-4 flex items-center justify-between rounded-2xl border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-5 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,.8)] backdrop-blur-xl">
            <a href="#top" className=" text-sm font-semibold">
              <span className="text-[#E9B44C]">~/</span>pirroot
            </a>
            <div className="hidden items-center gap-6 text-sm text-[#9FB6AE] sm:flex">
              <a href="#experience" className="transition hover:text-[#E9B44C]">
                سوابق
              </a>
              <a href="#projects" className="transition hover:text-[#E9B44C]">
                پروژه‌ها
              </a>
              <a href="#contact" className="transition hover:text-[#E9B44C]">
                ارتباط
              </a>
            </div>
            <a
              href="https://karlancer.com/profile/1241439"
              className="flex items-center gap-2 rounded-full border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-1.5 text-xs text-[#B7E9D3] transition hover:border-[#7FDBB6]/60 hover:bg-[#7FDBB6]/15"
            >
              <span
                className="anim-blink h-2 w-2 rounded-full bg-[#7FDBB6]"
                style={{ animation: 'blinkDot 1.8s ease-in-out infinite' }}
              />
              آنلاین برای همکاری
            </a>
          </nav>
        </header>

        {/* ── Hero ── */}
        <section
          id="top"
          className="grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20"
        >
          <div className="order-2 md:order-1">
            <p className="mb-4 inline-block rounded-full border border-[#E9B44C]/25 bg-[#E9B44C]/10 px-4 py-1.5 text-xs text-[#E9B44C]">
              سایت شخصی
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              سینا پیرزاده
            </h1>
            <p className="mt-3 text-lg text-[#9FB6AE]">
              برنامه‌نویس Full-Stack —{' '}
              <span className=" text-[15px] text-[#7FDBB6]" dir="ltr">
                Next.js · NestJS · TypeScript
              </span>
            </p>

            <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-8 text-[#C4D3CC]">
              وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js و NestJS می‌سازم. کدی می‌نویسم که
              هم سریع بار می‌شود، هم برای موتورهای جستجو خواناست، هم بعد از ماه‌ها هنوز قابل نگهداری
              و توسعه بماند.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[#EDF3EF]/10 bg-[#121C19] px-2.5 py-1  text-xs text-[#9FB6AE] transition hover:-translate-y-0.5 hover:border-[#E9B44C]/40 hover:text-[#E9B44C]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://github.com/pirroot/pirroot/blob/main/resume.pdf"
                className="rounded-lg bg-[#E9B44C] px-5 py-2.5 text-sm font-bold text-[#0B1210] transition-transform hover:scale-[1.04]"
              >
                دانلود رزومه PDF
              </a>
              <a
                href="https://karlancer.com/profile/1241439"
                className="rounded-lg border border-[#EDF3EF]/15 px-5 py-2.5 text-sm text-[#EDF3EF] transition-colors hover:border-[#7FDBB6]/50 hover:text-[#7FDBB6]"
              >
                پروفایل کارلنسر
              </a>
            </div>

            <div className="mt-8 flex max-w-sm gap-10 border-t border-[#EDF3EF]/10 pt-5">
              {[
                { n: '۱۳', l: 'فالوور' },
                { n: '۱۱', l: 'ریپازیتوری' },
                { n: '+۷', l: 'سال تجربه' },
              ].map((st, i) => (
                <div
                  key={st.l}
                  style={{ animation: `drift ${7 + i}s ease-in-out ${i * 0.6}s infinite` }}
                >
                  <div className="text-2xl font-bold text-[#E9B44C]">{st.n}</div>
                  <div className="mt-0.5 text-xs text-[#7C948B]">{st.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D terminal */}
          <div className="order-1 perspective-distant md:order-2">
            <div className="relative h-72 sm:h-100">
              <div className="card-3d-back anim-float-back absolute inset-x-5 top-7 h-full rounded-xl border border-[#EDF3EF]/10 bg-[#101815]/80" />
              <div className="card-3d anim-float absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-[#EDF3EF]/10 bg-[#121C19] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5 border-b border-[#EDF3EF]/10 bg-[#0F1714] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E9765C]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E9B44C]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7FDBB6]" />
                  <span className="mr-2 text-[11px] text-[#7C948B]">profile.ts — zsh</span>
                </div>

                {/* wrapper با ارتفاع مشخص و relative، چون fill به این نیاز دارد */}
                <div className="relative flex-1">
                  <Image
                    src={profile_img}
                    alt="پروفایل سینا پیرزاده"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills marquee ── */}
        <section aria-label="مهارت‌ها" className="space-y-3 py-4">
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max shrink-0 gap-3 pl-3 [animation:marquee_26s_linear_infinite]">
              {[...stack, ...stack].map((s, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-xl border border-[#E9B44C]/20 bg-[#E9B44C]/[0.07] px-5 py-2.5 text-sm font-semibold text-[#E9B44C]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max shrink-0 gap-3 pl-3 [animation:marqueeRev_30s_linear_infinite]">
              {[...stack]
                .reverse()
                .concat([...stack].reverse())
                .map((s, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap rounded-xl border border-[#7FDBB6]/20 bg-[#7FDBB6]/[0.06] px-5 py-2.5 text-sm font-semibold text-[#7FDBB6]"
                  >
                    {s}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {/* ── Experience + Projects ── */}
        <section
          id="experience"
          className="grid gap-12 py-14 md:grid-cols-[0.85fr_1.15fr] md:py-20"
        >
          {/* Experience timeline */}
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#E9B44C]">
              <span className="">01.</span> سوابق کاری
            </h2>
            <ol className="mt-6 border-r border-[#EDF3EF]/10 pr-5">
              {experience.map((e, i) => (
                <li key={e.company} className="group relative pb-8 last:pb-0">
                  <span className="absolute right-[-1.46rem] top-1.5 flex h-3 w-3">
                    <span
                      className="absolute h-full w-full rounded-full bg-[#7FDBB6]/40"
                      style={{ animation: `ringPulse 2.6s ease-out ${i * 0.5}s infinite` }}
                    />
                    <span
                      className={`relative h-3 w-3 rounded-full border-2 border-[#0B1210] ${e.current ? 'bg-[#7FDBB6]' : 'bg-[#3E5A51]'} transition group-hover:scale-125`}
                    />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-bold text-[#EDF3EF] transition group-hover:text-[#E9B44C]">
                      {e.company}
                      {e.current && (
                        <span className="mr-2 rounded-full bg-[#7FDBB6]/15 px-2 py-0.5 text-[10px] font-semibold text-[#7FDBB6]">
                          اکنون
                        </span>
                      )}
                    </span>
                    <span className=" text-[11px] text-[#7C948B]">{e.period}</span>
                  </div>
                  <div className="mt-0.5 text-sm text-[#9FB6AE]">{e.role}</div>
                  <p className="mt-1.5 text-sm leading-6 text-[#8AA398]">{e.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#EDF3EF]/10 px-1.5 py-0.5 text-[10px] text-[#7C948B]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Projects with CSS-only filter */}
          <div id="projects">
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#E9B44C]">
              <span className="">02.</span> پروژه‌های انجام‌شده
            </h2>

            <input type="radio" name="pf" id="pf-all" defaultChecked className="sr-only" />
            <input type="radio" name="pf" id="pf-shop" className="sr-only" />
            <input type="radio" name="pf" id="pf-app" className="sr-only" />

            <div className="proj-tabs mt-5 flex gap-2">
              {[
                { id: 'pf-all', l: 'همه' },
                { id: 'pf-shop', l: 'فروشگاهی' },
                { id: 'pf-app', l: 'آموزشگاهی' },
              ].map((t) => (
                <label
                  key={t.id}
                  htmlFor={t.id}
                  className="tab-label cursor-pointer rounded-full border border-[#EDF3EF]/15 px-4 py-1.5 text-xs text-[#9FB6AE] hover:border-[#E9B44C]/50 hover:text-[#E9B44C]"
                >
                  {t.l}
                </label>
              ))}
            </div>

            <div className="proj-panels mt-5 grid gap-4 sm:grid-cols-2">
              {projects.map((p, i) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cat={p.cat}
                  className={`proj-panel tilt shine group relative overflow-hidden rounded-xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 ${
                    i === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#E9765C]/70" />
                      <span className="h-2 w-2 rounded-full bg-[#E9B44C]/70" />
                      <span className="h-2 w-2 rounded-full bg-[#7FDBB6]/70" />
                    </div>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#7C948B] transition group-hover:-translate-x-1 group-hover:text-[#E9B44C]"
                    >
                      <path d="M17 17 7 7m0 10V7h10" />
                    </svg>
                  </div>
                  <h3 className="mt-3 font-bold text-[#EDF3EF] transition-colors group-hover:text-[#E9B44C]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#8AA398]">{p.desc}</p>
                  <div className="mt-3  text-[11px] text-[#7C948B]">{p.stack}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        {/* ── Contact ── */}
        <section id="contact" className="relative py-14 md:py-20">
          <h2 className="flex items-center gap-2 text-sm font-bold text-[#E9B44C]">
            <span>03.</span> بیایید همکاری کنیم
          </h2>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-6 sm:p-8">
            {/* دکور پس‌زمینه‌ی کدی */}
            <span
              aria-hidden
              className="absolute -left-4 -top-6  text-[7rem] font-bold text-[#EDF3EF]/3 select-none"
            >
              {'{ }'}
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
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#7FDBB6]/25 bg-[#7FDBB6]/10 px-3 py-1 text-[11px] text-[#B7E9D3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7FDBB6] anim-blink" />
                  معمولاً ظرف چند ساعت پاسخ می‌دم
                </span>
                <p className="text-sm leading-7 text-[#9FB6AE]">
                  برای پروژه‌ی بعدی‌ات یه Full-Stack Developer می‌خوای؟ هر وقت خواستی در دسترسم.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:09364733583"
                  className="flex items-center gap-2.5 rounded-lg border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-2.5 text-sm font-bold text-[#7FDBB6] transition hover:scale-[1.03] hover:bg-[#7FDBB6]/20"
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
                  ۰۹۳۶۴۷۳۳۵۸۳
                </a>

                <a
                  href="mailto:pirzadehroot@gmail.com"
                  className="flex items-center gap-2.5 rounded-lg border border-[#E9B44C]/30 bg-[#E9B44C]/10 px-4 py-2.5 text-sm font-bold text-[#E9B44C] transition hover:scale-[1.03] hover:bg-[#E9B44C]/20"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9B44C]/15">
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
                  </span>
                  <span dir="ltr" className="text-[13px]">
                    pirzadehroot@gmail.com
                  </span>
                </a>
              </div>
            </div>

            {/* شبکه‌های اجتماعی با آیکون */}
            <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {socials.map((s) => (
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
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 bg-[#121C19] text-[#7C948B] transition group-hover:border-[#7FDBB6]/40 group-hover:text-[#7FDBB6] group-hover:scale-110">
                    {s.icon}
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
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-[#EDF3EF]/10 py-8">
          <blockquote className="mx-auto max-w-xl text-center text-sm italic leading-8 text-[#9FB6AE]">
            «کد فقط به این معنا نیست که چیزی کار کند؛ باید{' '}
            <span className="text-[#E9B44C]">مقیاس‌پذیر</span>،{' '}
            <span className="text-[#7FDBB6]">قابل نگهداری</span> و لذت‌بخش هم باشد.»
          </blockquote>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[#7C948B]">
            <span>© ۱۴۰۵ سینا پیرزاده — ساخته‌شده با Next.js</span>
            <span className="text-[#3E5A51]">·</span>
            <span>طراحی و توسعه توسط سینا پیرزاده</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
