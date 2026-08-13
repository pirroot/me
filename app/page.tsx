'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Send,
  ArrowUpRight,
  Circle,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Quote,
  ExternalLink,
  Code2,
  Server,
  Database,
  Layout,
  Search,
  Cpu,
  Globe,
  ChevronLeft,
  User,
  LucideUserRoundKey,
  StickerIcon,
  GitBranch,
  ExternalLinkIcon,
} from 'lucide-react';
import profile from '../public/profile.jpg';
import Link from 'next/link';
import LinkedInSection from '@/components/LinkedInSection';

const GITHUB_USER = 'pirroot';

const SOCIALS = [
  { label: 'گیت‌هاب', handle: 'pirroot', href: 'https://github.com/pirroot', icon: GitBranch },
  {
    label: 'لینکدین',
    handle: 'pirroot',
    href: 'https://linkedin.com/in/pirroot',
    icon: ExternalLinkIcon,
  },
  {
    label: 'اینستاگرام',
    handle: 'pirroot',
    href: 'https://instagram.com/pirroot',
    icon: ExternalLinkIcon,
  },
  { label: 'تلگرام', handle: '@pirroot', href: 'https://t.me/pirroot', icon: Send },
];

const ABOUT_LINES = [
  'توسعه‌دهنده Full-Stack با تمرکز بر Next.js و NestJS',
  'طراحی رابط کاربری سریع، واکنش‌گرا و SEO-Friendly',
  'پیاده‌سازی APIهای ساختاریافته و ماژولار با NestJS',
  'مدیریت دیتابیس با PostgreSQL، Prisma و TypeORM',
  'بهینه‌سازی عملکرد و Core Web Vitals',
  'Docker، Linux و CI/CD',
  'آماده همکاری فریلنسری و ریموت',
];

const STACK = [
  {
    group: 'فرانت‌اند',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    icon: Layout,
  },
  {
    group: 'بک‌اند',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'TypeORM', 'Redis', 'FastAPI'],
    note: 'تمرکز اصلی روی NestJS است — FastAPI به‌عنوان ابزار تکمیلی.',
    icon: Server,
  },
  {
    group: 'ابزارها و دیپلوی',
    items: ['Docker', 'Linux', 'Git', 'CI/CD', 'SEO'],
    icon: Cpu,
  },
];

const EXPERIENCE = [
  {
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    stack: 'Next.js · NestJS · PostgreSQL · SEO',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی',
  },
  {
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    stack: 'Next.js · NestJS · Tailwind',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز',
  },
  {
    company: 'آرام گستر',
    role: 'برنامه‌نویس وب',
    stack: 'Next.js · Node.js',
    period: '۱۳۹۹ — ۱۴۰۴',
    desc: 'طراحی و توسعه سایت‌های شرکتی و خدماتی',
  },
  {
    company: 'باران مسیح',
    role: 'برنامه‌نویس Mid-Level',
    stack: 'React · Node.js · PostgreSQL',
    period: '۱۳۹۸ — ۱۴۰۱',
    desc: 'همکاری در تیم فنی توسعه محصولات وب',
  },
];

const PROJECTS = [
  {
    image: '',
    title: 'فروشگاه اینترنتی Full-Stack',
    tech: 'Next.js + NestJS + PostgreSQL',
    desc: 'طراحی و توسعه فروشگاه اینترنتی کامل با پنل ادمین، سبد خرید، درگاه پرداخت و سیستم مدیریت سفارشات.',
    link: 'https://github.com/pirroot/',
  },
  {
    image: '',
    title: 'وب‌سایت bellanzo',
    tech: 'Next.js + PostgreSQL + SEO',
    desc: 'توسعه سایت مدرن با بهینه‌سازی سئو، ساختار مناسب موتورهای جستجو و رابط کاربری سریع.',
    link: 'https://bellanzo-home.ir/',
  },
  {
    image: '',
    title: 'اپلیکیشن آموزشگاهی رایا',
    tech: 'Next.js + Django REST',
    desc: 'پلتفرم آموزشگاهی و فروشگاهی با رابط کاربری ریسپانسیو و APIهای RESTful.',
    link: 'https://github.com/pirroot/Next/',
  },
];

const TESTIMONIALS = [
  {
    name: 'رضا کریمی',
    role: 'کارفرما',
    text: 'سینا رو به عنوان یک توسعه‌دهنده Next.js با دید قوی در SEO می‌شناسم. کدهای فرانت‌اند تمیز و قابل نگهداری نوشتند و با بهینه‌سازی‌های هوشمندانه به بهبود رتبه سایت در گوگل کمک کردند.',
  },
  {
    name: 'راسا احمدی',
    role: 'همکار',
    text: 'درک عمیق ایشان از Next.js و توانایی پیاده‌سازی سریع UI چشمگیر بود. تسلط بر SEO و ادغام آن در فرآیند توسعه، نتایج پروژه را فراتر از انتظار کرد. تعهد و تحویل به‌موقع عالی.',
  },
  {
    name: 'عارف',
    role: 'همکار سابق (۳ سال)',
    text: 'پیشرفت خیلی خوبی در حوزه JavaScript داشتند و هم از نظر فنی و هم تعهد کاری فردی قابل اعتماد و توانمند هستند. برای موفقیت‌شان آرزوی بهترین‌ها را دارم.',
  },
  {
    name: 'OD976IZ9781',
    role: 'کارفرما',
    text: 'آقای پیرزاده خیلی انسان با شرافتی هستند. توی مدت زمان کم پروژه من رو به اتمام رسوندند. توی ۲ روز وقت دادم ولی توی ۵ ساعت جمع کرد. دمت گرم مرد.',
  },
];

const SKILL_TAGS = [
  'Next.js',
  'Nest.js',
  'React.js',
  'Tailwind',
  'Full Stack Developer',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'SEO',
];

const EDUCATION = {
  degree: 'مهندسی کامپیوتر',
  uni: 'دانشگاه تهران',
  period: '۱۳۹۹ — ۱۴۰۳',
};

const CONTACT = {
  phone: '۰۹۳۶۴۷۳۳۵۸۳',
  email: 'pirzadehroot@gmail.com',
  location: 'تهران، ایران',
  status: 'آماده همکاری ریموت',
};

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */
function useClock() {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useGithubStats(username: string) {
  const [stats, setStats] = useState<{
    followers: number | null;
    repos: number | null;
    stars: number | null;
  }>({ followers: null, repos: null, stars: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const user = await userRes.json();
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await repoRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
          : 0;
        if (!cancelled) {
          setStats({
            followers: user.followers ?? 0,
            repos: user.public_repos ?? 0,
            stars,
          });
        }
      } catch {
        if (!cancelled) setStats({ followers: 0, repos: 0, stars: 0 });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}

/* ------------------------------------------------------------------ */
/*  Particle Canvas Background                                         */
/* ------------------------------------------------------------------ */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const count = Math.min(80, Math.floor(w / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    let anim: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(94, 234, 212, 0.35)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = 'rgba(94, 234, 212, 0.06)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      anim = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9 }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  LinkedIn Posts (Mock / Ready for API)                              */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  UI atoms                                                            */
/* ------------------------------------------------------------------ */
export function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3  text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
      <span className="text-cyan-300/40">{index}</span>
      <span className="h-px w-8 bg-cyan-300/30" />
      <span>{children}</span>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1  text-[11px] tracking-wide text-zinc-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
      <span className="font-display text-2xl text-zinc-100 sm:text-3xl">
        {value === null ? '—' : value.toLocaleString('fa-IR')}
      </span>
      <span className=" text-[10px] uppercase tracking-[0.25em] text-zinc-500">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Home() {
  const time = useClock();
  const stats = useGithubStats(GITHUB_USER);
  const { scrollYProgress } = useScroll();
  const scanY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main
      className={`$ relative min-h-screen overflow-x-clip bg-[#030508] font-[var(--font-body)] text-zinc-200 selection:bg-cyan-300/20 selection:text-cyan-100`}
    >
      <style jsx global>{`
        .font-display {
          font-family: var(--font-display), 'Vazirmatn', 'IranSans', sans-serif;
        }
        . {
          font-family: var(--), monospace;
        }
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        .cursor-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes gridPulse {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.55;
          }
        }
        .bg-grid {
          background-image:
            linear-gradient(to right, rgba(94, 234, 212, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 234, 212, 0.07) 1px, transparent 1px);
          background-size: 56px 56px;
          animation: gridPulse 6s ease-in-out infinite;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Particle network */}
      <ParticleCanvas />

      {/* Ambient grid + glows */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" />
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" />

      {/* Glow orbs */}
      <div className="pointer-events-none fixed left-1/2 top-[-10%] z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[160px]" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] z-0 h-[480px] w-[480px] rounded-full bg-violet-500/[0.08] blur-[160px]" />
      <div className="pointer-events-none fixed left-[-5%] top-[30%] z-0 h-[400px] w-[400px] rounded-full bg-amber-500/[0.05] blur-[140px]" />

      {/* Scan line tied to scroll progress */}
      <motion.div
        style={{ top: scanY }}
        className="pointer-events-none fixed left-0 z-40 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"
      />

      {/* Corner brackets — HUD frame */}
      <div className="pointer-events-none fixed inset-4 z-40 sm:inset-6">
        <span className="absolute left-0 top-0 h-6 w-6 border-l-3 border-t-3 border-cyan-300/30" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r-3 border-t-3 border-cyan-300/30" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-3 border-l-3 border-cyan-300/30" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b-3 border-r-3 border-cyan-300/30" />
      </div>

      {/* Top status bar */}
      <header className="fixed inset-x-0 top-1.5  lg:top-3 z-30 flex items-center justify-between px-6 py-4   uppercase tracking-[0.2em] text-zinc-500 sm:px-10">
        <span className="text-zinc-300">Sina_Pirzadeh.sys</span>
        <div className="flex items-center gap-4">
          <span className="">{time || '۰۰:۰۰:۰۰'}</span>
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Circle className="h-2 w-2 fill-cyan-300 text-cyan-300" />
            آنلاین
          </span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-32 sm:px-10 sm:pt-40">
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="mb-40">
          <div className="flex flex-col-reverse justify-center mx-auto items-start gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Text */}
            <div className="flex-1">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4  text-xs uppercase tracking-[0.35em] text-cyan-300/70"
              ></motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-5xl leading-[0.95] tracking-tight text-zinc-50 sm:text-7xl"
              >
                سینا
                <br />
                <span className="text-cyan-300">پیرزاده</span>
                <span className="cursor-blink text-cyan-300">_</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-6  text-md uppercase tracking-[0.25em] text-zinc-400"
              >
                Full Stack Web Developer · Next.js · NestJS · TypeScript
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400"
              >
                سلام! من سینا پیرزاده هستم، برنامه‌نویس Full-Stack با تمرکز بر توسعه وب‌اپلیکیشن‌ها
                و فروشگاه‌های اینترنتی با Next.js و NestJS. رابط‌های کاربری سریع، واکنش‌گرا و
                SEO-Friendly می‌سازم و APIهای ساختاریافته و ماژولار پیاده‌سازی می‌کنم.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {SKILL_TAGS.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-10 flex flex-wrap items-center gap-6"
              >
                <Stat label="فالوورز" value={stats.followers} />
                <Stat label="ریپازیتوری" value={stats.repos} />
                <Stat label="استارها" value={stats.stars} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="/resume.pdf"
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
              </motion.div>
            </div>

            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative shrink-0"
            >
              <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:h-80 sm:w-80">
                {/* Placeholder — replace src with your photo */}

                <Image
                  src={profile}
                  alt="سینا پیرزاده"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover "
                />
              </div>
              {/* Decorative ring */}
              <div className="pointer-events-none absolute -inset-3 rounded-2xl border border-cyan-300/10" />
              <div className="pointer-events-none absolute -inset-6 rounded-4xl border border-cyan-300/5" />
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* About                                                      */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۱">درباره من</Eyebrow>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-10">
            {ABOUT_LINES.map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 border-b border-white/5 py-3 text-md text-zinc-300"
              >
                <span className="mt-0.5  text-cyan-300/60">{'>'}</span>
                {line}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 text-md text-zinc-400">
              <MapPin className="h-4 w-4 text-cyan-300/60" />
              {CONTACT.location}
            </div>
            <div className="flex items-center gap-2 text-md text-zinc-400">
              <Phone className="h-4 w-4 text-cyan-300/60" />
              {CONTACT.phone}
            </div>
            <div className="flex items-center gap-2 text-md text-zinc-400">
              <Mail className="h-4 w-4 text-cyan-300/60" />
              {CONTACT.email}
            </div>
            <div className="flex items-center gap-2 text-md text-cyan-400">
              <Circle className="h-2 w-2 fill-cyan-400 text-cyan-400" />
              {CONTACT.status}
            </div>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------- */}
        {/* Education                                                  */}
        {/* ---------------------------------------------------------- */}
        {/* <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۲">تحصیلات و مدارک</Eyebrow>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <div className="mb-1 font-display text-lg text-zinc-100">{EDUCATION.degree}</div>
              <div className=" text-xs text-cyan-300/70">{EDUCATION.uni}</div>
              <div className="mt-2 flex items-center gap-1  text-[11px] text-zinc-500">
                <Calendar className="h-3 w-3" />
                {EDUCATION.period}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] px-4 py-3 text-center">
                <div className="font-display text-md text-amber-300">Next.js</div>
                <div className="mt-1  text-[10px] text-amber-400/70">مدرک طلایی</div>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] px-4 py-3 text-center">
                <div className="font-display text-md text-amber-300">SEO</div>
                <div className="mt-1  text-[10px] text-amber-400/70">مدرک طلایی</div>
              </div>
            </div>
          </div>
        </motion.section> */}

        {/* ---------------------------------------------------------- */}
        {/* Stack                                                      */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰2">تکنولوژی‌ها</Eyebrow>
          <div className="grid gap-6 sm:grid-cols-3">
            {STACK.map((s) => (
              <div
                key={s.group}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-300/20"
              >
                <div className="mb-4 flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-cyan-300/70" />
                  <h3 className="font-display text-md uppercase tracking-wide text-zinc-200">
                    {s.group}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
                {s.note && (
                  <p className="mt-4  text-[11px] leading-relaxed text-zinc-500">{s.note}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ---------------------------------------------------------- */}
        {/* Experience                                                 */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰3">سوابق کاری</Eyebrow>
          <div className="relative border-r border-white/10 pr-8">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pb-10 last:pb-0"
              >
                <span className="absolute -right-[35px] top-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(94,234,212,0.5)]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-zinc-100">{job.company}</h3>
                  <span className=" text-[11px] uppercase tracking-wide text-cyan-300/70">
                    {job.period}
                  </span>
                </div>
                <div className="mt-1  text-xs text-cyan-300/70">{job.role}</div>
                <p className="mt-2 text-md text-zinc-400">{job.desc}</p>
                <p className="mt-2  text-[11px] text-zinc-500">{job.stack}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ---------------------------------------------------------- */}
        {/* Projects                                                   */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰4">پروژه‌های انجام‌شده</Eyebrow>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, index) => (
              <Link href={p.link} key={index}>
                <motion.div
                  key={p.title}
                  whileHover={{ y: -4 }}
                  className="group rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-cyan-300/20 hover:bg-white/4"
                >
                  {p.image && (
                    <Image alt={p.title} src={p.image} className="object-cover rounded-2xl mb-2" />
                  )}
                  <div className="mb-3 flex items-center justify-between">
                    <Code2 className="h-5 w-5 text-cyan-300/60" />
                    <span className=" text-[10px] text-zinc-600">{p.tech}</span>
                  </div>
                  <h3 className="mb-2 font-display text-md font-medium text-zinc-100">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{p.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ---------------------------------------------------------- */}
        {/* Testimonials                                               */}
        {/* ---------------------------------------------------------- */}
        {/* <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۶">نظرات مشتریان و همکاران</Eyebrow>
          <div className="grid gap-5 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <Quote className="absolute right-4 top-4 h-6 w-6 text-cyan-300/10" />
                <p className="mb-4 text-md leading-relaxed text-zinc-300">{t.text}</p>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/10  text-[10px] text-cyan-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-200">{t.name}</div>
                    <div className=" text-[10px] text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* ---------------------------------------------------------- */}
        {/* LinkedIn Posts                                             */}
        {/* ---------------------------------------------------------- */}
        {/* <LinkedInSection /> */}

        {/* ---------------------------------------------------------- */}
        {/* Contact                                                    */}
        {/* ---------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۷">ارتباط با من</Eyebrow>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${CONTACT.phone}`}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.04]"
            >
              <Phone className="h-5 w-5 text-cyan-300" />
              <div>
                <div className=" text-[10px] uppercase tracking-wider text-zinc-500">تماس</div>
                <div className="mt-0.5 text-md text-zinc-100">{CONTACT.phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.04]"
            >
              <Mail className="h-5 w-5 text-cyan-300" />
              <div>
                <div className=" text-[10px] uppercase tracking-wider text-zinc-500">ایمیل</div>
                <div className="mt-0.5 text-md text-zinc-100">{CONTACT.email}</div>
              </div>
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-cyan-300/40 hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  <span className="font-display text-md text-zinc-100">{label}</span>
                  <span className=" text-xs text-zinc-500">{handle}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-300/10 px-6 py-3  text-xs uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-300/20 transition-all hover:bg-cyan-300/20 hover:ring-cyan-300/40"
            >
              <Download className="h-4 w-4" />
              دانلود رزومه PDF
            </a>
          </div>
        </motion.section>

        {/* ---------------------------------------------------------- */}
        {/* Footer                                                     */}
        {/* ---------------------------------------------------------- */}
        <footer className="border-t border-white/5 pt-10">
          <blockquote className="mb-10 border-r border-cyan-300/30 pr-6 font-display text-lg leading-snug text-zinc-400 sm:text-xl">
            «کد فقط به این معنا نیست که چیزی کار کند. یعنی باید مقیاس‌پذیر، قابل نگهداری و لذت‌بخش
            باشد.»
          </blockquote>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className=" text-[11px] uppercase tracking-[0.25em] text-zinc-600">
              © {new Date().getFullYear()} سینا پیرزاده — ساخته‌شده با Next.js & Tailwind CSS
            </p>
            <div className="flex items-center gap-1  text-[10px] text-zinc-700">
              <ChevronLeft className="h-3 w-3" />
              طراحی و توسعه توسط سینا پیرزاده
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
