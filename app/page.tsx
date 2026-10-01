'use client';

import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type ReactNode } from 'react';
import Image from 'next/image';
import { Vazirmatn, JetBrains_Mono } from 'next/font/google';
import profile_img from '@/public/profile.webp';

/* ═══════════════════════ فونت‌ها ═══════════════════════ */
const vazir = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-sans', display: 'swap' });
const jbMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

/* ═══════════════════════ داده‌ها ═══════════════════════ */
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
  knowsAbout: ['Next.js', 'FastAPI', 'React.js', 'Python', 'PostgreSQL', 'Docker', 'SEO'],
};

const stack = [
  'Next.js',
  'FastAPI',
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

const roles = [
  'Full-Stack Developer',
  'Next.js Expert',
  'Fast Api Craftsman',
  'SEO-First Engineer',
];

const stats = [
  { n: 13, l: 'فالوور', s: '' },
  { n: 11, l: 'ریپازیتوری', s: '' },
  { n: 7, l: 'سال تجربه', s: '+' },
];

const navLinks = [
  { href: '#experience', label: 'سوابق' },
  { href: '#projects', label: 'پروژه‌ها' },
  { href: '#contact', label: 'ارتباط' },
];

const termLines = [
  { cmd: 'stack --top 3', out: 'next.js · fast api · typescript', cls: 'text-[#E9B44C]' },
];

const experience = [
  {
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی.',
    tags: ['Next.js', 'Fast Api', 'PostgreSQL', 'SEO'],
    current: true,
  },
  {
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز و مقیاس‌پذیر.',
    tags: ['Next.js', 'Fast Api', 'Tailwind'],
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
    title: 'فروشگاه اینترنتی Full-Stack — Comping Shop',
    desc: 'فروشگاه کامل با پنل ادمین، سبد خرید، درگاه پرداخت و سیستم مدیریت سفارش.',
    stack: 'Next.js · Fast Api · PostgreSQL',
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
/* ═══════════════════════ هوک‌ها ═══════════════════════ */
const toFa = (v: string | number) => String(v).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

function useInView<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useTehranClock() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tehran',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useTypewriter(words: string[], typeMs = 65, holdMs = 1700) {
  const [text, setText] = useState('');
  useEffect(() => {
    let word = 0,
      pos = 0,
      del = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const w = words[word];
      if (!del) {
        pos += 1;
        setText(w.slice(0, pos));
        if (pos === w.length) {
          del = true;
          timer = setTimeout(step, holdMs);
        } else timer = setTimeout(step, typeMs);
      } else {
        pos -= 1;
        setText(w.slice(0, pos));
        if (pos === 0) {
          del = false;
          word = (word + 1) % words.length;
          timer = setTimeout(step, 350);
        } else timer = setTimeout(step, 32);
      }
    };
    timer = setTimeout(step, 700);
    return () => clearTimeout(timer);
  }, [words, typeMs, holdMs]);
  return text;
}

/* ═══════════════════════ کامپوننت‌های کوچک ═══════════════════════ */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-on' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Counter({
  to,
  suffix = '',
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const loop = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} dir="ltr" className="inline-block">
      {toFa(n)}
      {suffix}
    </span>
  );
}

function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transition: 'transform .25s cubic-bezier(.22,1,.36,1)' }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = '';
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════ صفحه ═══════════════════════ */
const cats = [
  { id: 'all', l: 'همه' },
  { id: 'shop', l: 'فروشگاهی' },
  { id: 'app', l: 'آموزشگاهی' },
] as const;

type CatId = (typeof cats)[number]['id'];

export default function Page() {
  const clock = useTehranClock();
  const typed = useTypewriter(roles);
  const [filter, setFilter] = useState<CatId>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const progRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const jYear = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());

  const visible = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

  /* کرسر سفارشی + اسپات‌لایت + نوار پیشرفت اسکرول */
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;

    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      if (progRef.current)
        progRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my,
      raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.setProperty('--mx', `${mx}px`);
      root.style.setProperty('--my', `${my}px`);
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (fine && !raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest?.('a, button, label');
      ringRef.current?.classList.toggle('big', !!hit);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* تیلت سه‌بعدی کارت پروژه‌ها */
  const tilt = (e: RMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty('--shx', `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--shy', `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const untilt = (e: RMouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('pirzadehroot@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* دسترسی کلیپ‌بورد موجود نیست */
    }
  };

  return (
    <main
      id="top"
      className={`${vazir.variable} ${jbMono.variable} relative font-sans text-[#EDF3EF]`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* بافت نویز */}
      <div aria-hidden className="noise" />

      {/* نوار پیشرفت اسکرول */}
      <div
        ref={progRef}
        className="fixed right-0 top-0 z-[70] h-[3px] w-0 bg-linear-to-l from-[#E9B44C] to-[#7FDBB6]"
      />

      {/* کرسر سفارشی */}
      <div ref={dotRef} id="cursor-dot" aria-hidden />
      <div ref={ringRef} id="cursor-ring" aria-hidden />

      {/* پس‌زمینهٔ محیطی */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="anim-drift glow-gold absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" />
        <div
          className="anim-drift glow-mint absolute -left-28 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="anim-drift glow-gold absolute -bottom-32 right-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ animationDelay: '-8s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#EDF3EF 1px, transparent 1px), linear-gradient(90deg, #EDF3EF 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)',
          }}
        />
        {/* اسپات‌لایت دنبال‌کنندهٔ موس */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(560px circle at var(--mx, 70%) var(--my, 25%), rgba(233,180,76,.06), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ══════════ ناوبری ══════════ */}
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
              href="https://karlancer.com/profile/1241439"
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
                  <span
                    className="font-mono text-[10px] text-[#3E5A51]"
                    dir="ltr"
                  >{`0${i + 1}`}</span>
                </a>
              ))}
              <div
                className="mt-1 border-t border-[#EDF3EF]/10 px-4 pb-1 pt-3 font-mono text-[10px] text-[#7C948B]"
                dir="ltr"
              >
                pirzadehroot@gmail.com
              </div>
            </div>
          )}
        </header>

        {/* ══════════ قهرمان ══════════ */}
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
                وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js , Fast Api می‌سازم؛ کدی می‌نویسم
                که هم سریع بار می‌شود، هم برای موتورهای جستجو خواناست و هم بعد از ماه‌ها هنوز قابل
                نگهداری و توسعه بماند.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-6 flex flex-wrap gap-2">
                {stack.map((s) => (
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
                    href="https://github.com/pirroot/pirroot/blob/main/resume.pdf"
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
                    href="https://karlancer.com/profile/1241439"
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

            <Reveal delay={340}>
              <div className="mt-9 flex max-w-sm gap-10 border-t border-[#EDF3EF]/10 pt-6">
                {stats.map((st, i) => (
                  <div
                    key={st.l}
                    style={{ animation: `float-y ${6.5 + i}s ease-in-out ${i * 0.7}s infinite` }}
                  >
                    <div className="text-2xl font-black text-[#E9B44C]">
                      <Counter to={st.n} suffix={st.s} />
                    </div>
                    <div className="mt-1 text-xs text-[#7C948B]">{st.l}</div>
                  </div>
                ))}
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
                    src={profile_img}
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
                  <span className="ml-auto font-mono text-[10px] text-[#7C948B]">
                    pirroot — zsh
                  </span>
                </div>
                <div className="space-y-1 p-3 font-mono text-[11px] leading-5">
                  {termLines.map((l, i) => (
                    <div key={l.cmd}>
                      <div className="term-line" style={{ animationDelay: `${0.5 + i * 0.55}s` }}>
                        <span className="text-[#7FDBB6]">$</span>{' '}
                        <span className="text-[#EDF3EF]">{l.cmd}</span>
                      </div>
                      <div
                        className={`term-line ${l.cls}`}
                        style={{ animationDelay: `${0.75 + i * 0.55}s` }}
                      >
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

        {/* ══════════ نوار مهارت‌ها ══════════ */}
        <section aria-label="مهارت‌ها" className="space-y-3 py-6">
          {[
            { rev: false, cls: 'border-[#E9B44C]/20 bg-[#E9B44C]/[0.06] text-[#E9B44C]' },
            { rev: true, cls: 'border-[#7FDBB6]/20 bg-[#7FDBB6]/[0.06] text-[#7FDBB6]' },
          ].map((row, r) => (
            <div
              key={r}
              dir="ltr"
              className="flex overflow-hidden"
              style={{
                maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <div
                className="flex w-max shrink-0 hover:[animation-play-state:paused]"
                style={{ animation: `${row.rev ? 'mq-rev' : 'mq'} ${26 + r * 4}s linear infinite` }}
              >
                {[0, 1].map((g) => (
                  <div key={g} aria-hidden={g === 1} className="flex shrink-0 gap-3 pe-3">
                    {(row.rev ? [...stack].reverse() : stack).map((s) => (
                      <span
                        key={s}
                        className={`whitespace-nowrap rounded-xl border px-5 py-2.5 font-mono text-sm font-semibold ${row.cls}`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ══════════ سوابق + پروژه‌ها ══════════ */}
        <section className="grid gap-14 py-14 md:grid-cols-[0.85fr_1.15fr] md:py-20">
          {/* تایم‌لاین سوابق */}
          <div id="experience" className="scroll-mt-24">
            <Reveal>
              <h2 className="flex items-center gap-2.5 text-sm font-bold text-[#E9B44C]">
                <span className="font-mono">01.</span> سوابق کاری
                <span className="h-px flex-1 bg-linear-to-l from-[#EDF3EF]/15 to-transparent" />
              </h2>
            </Reveal>

            <div className="mt-7 space-y-8 border-r border-[#EDF3EF]/10 pr-5">
              {experience.map((e, i) => (
                <Reveal key={e.company} delay={i * 90}>
                  <div className="group relative">
                    <span className="absolute right-[-1.625rem] top-1.5 flex h-3 w-3">
                      <span
                        className="absolute h-full w-full rounded-full bg-[#7FDBB6]/40"
                        style={{ animation: `ring-pulse 2.6s ease-out ${i * 0.5}s infinite` }}
                      />
                      <span
                        className={`relative h-3 w-3 rounded-full border-2 border-[#0B1210] transition-transform duration-300 group-hover:scale-125 ${
                          e.current ? 'bg-[#7FDBB6]' : 'bg-[#3E5A51]'
                        }`}
                      />
                    </span>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-bold text-[#EDF3EF] transition-colors group-hover:text-[#E9B44C]">
                        {e.company}
                        {e.current && (
                          <span className="mr-2 rounded-full bg-[#7FDBB6]/15 px-2 py-0.5 text-[10px] font-semibold text-[#7FDBB6]">
                            اکنون
                          </span>
                        )}
                      </span>
                      <span className="text-[11px] text-[#7C948B]">{e.period}</span>
                    </div>
                    <div className="mt-0.5 text-sm text-[#9FB6AE]">{e.role}</div>
                    <p className="mt-1.5 text-sm leading-6 text-[#8AA398]">{e.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[#EDF3EF]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#7C948B]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* پروژه‌ها */}
          <div id="projects" className="scroll-mt-24">
            <Reveal>
              <h2 className="flex items-center gap-2.5 text-sm font-bold text-[#E9B44C]">
                <span className="font-mono">02.</span> پروژه‌های انجام‌شده
                <span className="h-px flex-1 bg-linear-to-l from-[#EDF3EF]/15 to-transparent" />
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-5 flex flex-wrap gap-2">
                {cats.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFilter(c.id)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                      filter === c.id
                        ? 'border-[#E9B44C]/60 bg-[#E9B44C]/15 text-[#E9B44C]'
                        : 'border-[#EDF3EF]/15 text-[#9FB6AE] hover:border-[#E9B44C]/40 hover:text-[#E9B44C]'
                    }`}
                  >
                    {c.l}
                  </button>
                ))}
              </div>
            </Reveal>

            <div key={filter} className="mt-5 grid gap-4 sm:grid-cols-2">
              {visible.map((p, i) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                  style={{ animationDelay: `${i * 90}ms` }}
                  className={`p-card fade-item group relative overflow-hidden rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 ${
                    i === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-[10px] font-bold tracking-wider text-[#3E5A51]"
                        dir="ltr"
                      >
                        {`0${i + 1}`}
                      </span>
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#7C948B] transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-[#E9B44C]"
                    >
                      <path d="M17 17 7 7m10 0H7m10 0v10" />
                    </svg>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="font-bold leading-7 text-[#EDF3EF] transition-colors group-hover:text-[#E9B44C]">
                      {p.title}
                    </h3>
                    <span className="shrink-0 rounded-full border border-[#EDF3EF]/10 px-2.5 py-1 text-[10px] text-[#7C948B]">
                      {p.cat === 'shop' ? 'فروشگاهی' : 'آموزشگاهی'}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-[#8AA398]">{p.desc}</p>
                  <div className="mt-3 font-mono text-[11px] text-[#7C948B]" dir="ltr">
                    {p.stack}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ ارتباط ══════════ */}
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
                    href="tel:09364733583"
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
                    ۰۹۳۶۴۷۳۳۵۸۳
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
                        pirzadehroot@gmail.com
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* شبکه‌های اجتماعی */}
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
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 bg-[#121C19] text-[#7C948B] transition group-hover:scale-110 group-hover:border-[#7FDBB6]/40 group-hover:text-[#7FDBB6]">
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
          </Reveal>
        </section>

        {/* ══════════ فوتر ══════════ */}
        <footer className="border-t border-[#EDF3EF]/10 py-10">
          <Reveal>
            <blockquote className="mx-auto max-w-xl text-center text-sm italic leading-8 text-[#9FB6AE]">
              «آینده بیشتر از آدم‌هایی که فقط زیاد می‌دانند، به آدم‌هایی نیاز دارد که{' '}
              <span className="font-semibold not-italic text-[#E9B44C]">خوب سؤال می‌پرسند</span>،{' '}
              <span className="font-semibold not-italic text-[#7FDBB6]">دقیق می‌بینند</span>، مستقل
              فکر می‌کنند، سریع یاد می‌گیرند و مدت طولانی ادامه می‌دهند.»
            </blockquote>
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs text-[#7C948B]">
            <span>© {jYear} سینا پیرزاده — ساخته‌شده با Next.js</span>
            <span className="text-[#3E5A51]">·</span>
            <span>طراحی و توسعه توسط سینا پیرزاده</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ms-2 inline-flex items-center gap-1.5 rounded-full border border-[#EDF3EF]/10 px-3 py-1.5 transition-colors hover:border-[#E9B44C]/50 hover:text-[#E9B44C]"
            >
              بازگشت به بالا
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5m0 0-6 6m6-6 6 6" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
