"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Vazirmatn, JetBrains_Mono } from "next/font/google";
import {
  Send,
  ArrowUpLeft,
  Circle,
  Download,
  User,
  Briefcase,
  Quote,
  GitBranch,
  ExternalLinkIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  فونت‌ها                                                             */
/*  فونت پیش‌فرض Vazirmatn است. اگر فونت اختصاصی خودت رو داری،         */
/*  همین import رو با next/font/local یا @font-face خودت جایگزین کن.   */
/* ------------------------------------------------------------------ */
const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-fa",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

/* ------------------------------------------------------------------ */
/*  دیتا                                                                */
/* ------------------------------------------------------------------ */
const GITHUB_USER = "pirroot";
const RESUME_URL = "/resume.pdf"; // فایل رزومه رو با همین اسم توی پوشه public بذار

const SOCIALS = [
  { label: "گیت‌هاب", handle: "pirroot", href: "https://github.com/pirroot", icon: GitBranch },
  { label: "لینکدین", handle: "pirroot", href: "https://linkedin.com/in/pirroot", icon: ExternalLinkIcon },
  { label: "اینستاگرام", handle: "pirroot", href: "https://instagram.com/pirroot", icon: ExternalLinkIcon },
  { label: "تلگرام", handle: "pirroot", href: "https://t.me/pirroot", icon: Send },
];

const KARLANCER_URL = "https://www.karlancer.com/profile/1241439";
const PHONE = "۰۹۳۶ ۴۷۳ ۳۵۸۳";
const EMAIL = "pirzadehroot@gmail.com";

const ABOUT = [
  "توسعه رابط‌های کاربری سریع، واکنش‌گرا و SEO-Friendly با Next.js و React",
  "پیاده‌سازی APIهای ساختاریافته، ماژولار و قابل توسعه با NestJS",
  "مدیریت داده‌ها با PostgreSQL و طراحی مدرن و ریسپانسیو با Tailwind CSS",
  "تجربه واقعی در توسعه فروشگاه‌های اینترنتی و وب‌اپلیکیشن‌ها",
  "درک دقیق نیاز پروژه و ارتباط شفاف با کارفرما در طول کار",
  "آماده همکاری به‌صورت فریلنسری و ریموت",
];

const SKILLS = [
  "Next.js",
  "React.js",
  "NestJS",
  "Tailwind CSS",
  "SEO",
  "HTML",
  "Full Stack Developer",
];

const EXPERIENCE = [
  {
    company: "ایران‌کتاب",
    role: "سئوکار و پشتیبان برنامه‌نویس بک‌اند و فرانت‌اند",
    stack: "Next.js · Nest.js",
    period: "۱۴۰۴ — تاکنون",
  },
  {
    company: "بارش",
    role: "توسعه‌دهنده Front-End و Back-End",
    stack: "Next.js · NestJS · Tailwind",
    period: "",
  },
  {
    company: "آرام گستر",
    role: "برنامه‌نویس وب",
    stack: "Next.js · Node.js",
    period: "۱۳۹۹ — ۱۴۰۴",
  },
  {
    company: "باران مسیح",
    role: "برنامه‌نویس Mid-Level",
    stack: "React · Node.js · PostgreSQL",
    period: "۱۳۹۸ — ۱۴۰۱",
  },
];

const EDUCATION = {
  degree: "مهندسی کامپیوتر",
  school: "دانشگاه تهران",
  period: "۱۳۹۹ — ۱۴۰۳",
};

const CERTIFICATES = ["آزمون Next.js — سطح طلایی", "آزمون سئو — سطح طلایی"];

const PROJECTS = [
  {
    title: "اپلیکیشن آموزشگاهی و فروشگاهی رایا",
    desc: "وب‌اپلیکیشن آموزشگاهی و فروشگاهی با فرانت‌اند Next.js و بک‌اند Django. ارتباط دو بخش از طریق RESTful API انجام شده.",
    stack: ["Next.js", "React.js", "Tailwind CSS", "Django", "DRF"],
  },
  {
    title: "توسعه وب‌سایت با Next.js و PostgreSQL",
    desc: "وب‌سایت مدرن با تمرکز بر تجربه کاربری سریع، ساختار مناسب برای موتورهای جستجو و بهینه‌سازی عملکرد.",
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "SEO"],
  },
  {
    title: "فروشگاه اینترنتی با Next.js و NestJS",
    desc: "فروشگاه Full-Stack با رابط کاربری کاملاً واکنش‌گرا و APIهای ماژولار برای مدیریت محصولات و سفارش‌ها.",
    stack: ["Next.js", "React.js", "NestJS", "PostgreSQL"],
  },
];

const TESTIMONIALS = [
  {
    name: "رضا کریمی",
    text: "سینا رو به‌عنوان توسعه‌دهنده Next.js با دید قوی در سئو می‌شناسم. کدهای فرانت‌اندش تمیز و قابل نگهداریه و با بهینه‌سازی‌های هوشمندانه به بهبود رتبه سایت در گوگل کمک کرد.",
  },
  {
    name: "راسا احمدی",
    text: "درک عمیقش از Next.js و تسلط بر اصول سئو باعث شد نتیجه پروژه از نظر دیده‌شدن در موتورهای جستجو فراتر از انتظار باشه. تحویل کارها همیشه به‌موقع بود.",
  },
  {
    name: "عارف",
    text: "همکار سابقش به مدت سه سال بودم؛ هم از نظر فنی و هم از نظر تعهد کاری، فردی قابل اعتماد و توانمنده.",
  },
  {
    name: "کاربر کارلنسر",
    text: "آدم خیلی با شرافتیه. توی مدت‌زمان کم پروژه رو تموم کرد؛ ۲ روز وقت داده بودم ولی توی ۵ ساعت جمعش کرد.",
  },
];

/* ------------------------------------------------------------------ */
/*  Hookها                                                              */
/* ------------------------------------------------------------------ */
function useClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useGithubStats(username: string) {
  const [stats, setStats] = useState<{ followers: number | null; repos: number | null; stars: number | null }>({
    followers: null,
    repos: null,
    stars: null,
  });

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
          setStats({ followers: user.followers ?? 0, repos: user.public_repos ?? 0, stars });
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
/*  اجزای کوچیک                                                        */
/* ------------------------------------------------------------------ */
function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
      <span className="text-cyan-300/50">{index}</span>
      <span className="h-px w-8 bg-cyan-300/40" />
      <span className="font-[var(--font-fa)] normal-case tracking-normal text-zinc-300">
        {children}
      </span>
    </div>
  );
}

function Tag({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors ${strong
        ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-200"
        : "border-white/15 bg-white/[0.05] text-zinc-300 hover:border-cyan-300/40 hover:text-cyan-200"
        }`}
    >
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex flex-col gap-1 border-r border-white/15 pr-4">
      <span className="font-mono text-2xl text-zinc-100 sm:text-3xl">
        {value === null ? "—" : value.toLocaleString("en-US")}
      </span>
      <span className="font-[var(--font-fa)] text-[12px] text-zinc-400">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  صفحه                                                                */
/* ------------------------------------------------------------------ */
export default function Home() {
  const time = useClock();
  const stats = useGithubStats(GITHUB_USER);
  const { scrollYProgress } = useScroll();
  const scanY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main
      dir="rtl"
      lang="fa"
      className={`${vazir.variable} ${mono.variable} relative min-h-screen overflow-x-clip bg-[#0A0B10] font-[var(--font-fa)] text-zinc-200 selection:bg-cyan-300/20 selection:text-cyan-100`}
    >
      <style jsx global>{`
        .font-mono {
          font-family: var(--font-mono), monospace;
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
            opacity: 0.5;
          }
          50% {
            opacity: 0.85;
          }
        }
        .bg-grid {
          background-image: linear-gradient(to right, rgba(94, 234, 212, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 234, 212, 0.09) 1px, transparent 1px);
          background-size: 44px 44px;
          animation: gridPulse 5s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(24px, -18px);
          }
        }
        .blob-float {
          animation: floatSlow 12s ease-in-out infinite;
        }
      `}</style>

      {/* پس‌زمینه: گرید + نور محیطی، واضح‌تر و پرکنتراست‌تر */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(10,11,16,0)_0%,_rgba(10,11,16,0.9)_75%)]" />
      <div className="blob-float pointer-events-none fixed left-1/2 top-[-14%] z-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-[-15%] right-[-12%] z-0 h-[480px] w-[480px] rounded-full bg-violet-500/18 blur-[150px]" />
      <div className="pointer-events-none fixed bottom-[10%] left-[-10%] z-0 h-[360px] w-[360px] rounded-full bg-fuchsia-400/10 blur-[130px]" />

      {/* خط اسکن هم‌راستا با اسکرول */}
      <motion.div
        style={{ top: scanY }}
        className="pointer-events-none fixed left-0 z-40 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
      />

      {/* فریم HUD دور صفحه */}
      <div className="pointer-events-none fixed inset-4 z-40 sm:inset-6">
        <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-cyan-300/50" />
        <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-cyan-300/50" />
        <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-cyan-300/50" />
        <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-cyan-300/50" />
      </div>

      {/* نوار وضعیت بالا */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:px-10">
        <span className="text-zinc-200">SINA_PIRZADEH.SYS</span>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline" dir="ltr">
            {time || "۰۰:۰۰:۰۰"}
          </span>
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Circle className="h-2 w-2 fill-cyan-300 text-cyan-300" />
            ONLINE
          </span>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-32 sm:px-10 sm:pt-40">
        {/* -------------------------------------------------------- */}
        {/* هیرو                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-40">
          <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/80"
              >
                Portfolio // 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl font-bold leading-[1.15] tracking-tight text-zinc-50 sm:text-6xl"
              >
                سلام، من{" "}
                <span className="text-cyan-300">
                  سینا پیرزاده
                  <span className="cursor-blink text-cyan-300">_</span>
                </span>{" "}
                هستم
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-5 font-mono text-sm uppercase tracking-[0.15em] text-zinc-400"
              >
                Full-Stack Developer · Next.js · NestJS
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 text-base leading-8 text-zinc-400"
              >
                برنامه‌نویس فول‌استک با تمرکز بر توسعه وب‌اپلیکیشن‌ها و
                فروشگاه‌های اینترنتی با Next.js و NestJS. برای من فقط نوشتن
                کد مهم نیست؛ درک دقیق نیاز پروژه و تحویل به‌موقع بخش مهمی از
                کارمه.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href={RESUME_URL}
                  download
                  className="group flex items-center gap-2 rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-5 py-2.5 text-sm text-cyan-100 transition-colors hover:bg-cyan-300/20"
                >
                  <Download className="h-4 w-4" />
                  دانلود رزومه (PDF)
                </a>
                <a
                  href={KARLANCER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-cyan-300/40"
                >
                  <Briefcase className="h-4 w-4" />
                  پروفایل کارلنسر
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-12 flex flex-wrap gap-8 sm:gap-10"
              >
                <Stat label="دنبال‌کننده" value={stats.followers} />
                <Stat label="مخزن عمومی" value={stats.repos} />
                <Stat label="ستاره" value={stats.stars} />
              </motion.div>
            </div>

            {/* جای عکس پروفایل */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative shrink-0"
            >
              <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-cyan-400/25 blur-3xl" />
              <div className="flex h-40 w-40 items-center justify-center rounded-full border border-dashed border-cyan-300/50 bg-white/[0.03] text-zinc-500 sm:h-48 sm:w-48">
                {/* این باکس رو با <img src="/avatar.jpg" className="h-full w-full rounded-full object-cover" /> جایگزین کن */}
                <User className="h-14 w-14" strokeWidth={1.2} />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#0A0B10] px-3 py-1 font-mono text-[10px] tracking-wide text-zinc-500">
                عکس پروفایل
              </span>
            </motion.div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* درباره من */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۱">درباره من</Eyebrow>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-10">
            {ABOUT.map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 border-b border-white/10 py-3 text-sm leading-7 text-zinc-300"
              >
                <span className="mt-0.5 font-mono text-cyan-300/70">{"<"}</span>
                {line}
              </div>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------- */}
        {/* مهارت‌ها */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۲">مهارت‌ها</Eyebrow>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((s) => (
              <Tag key={s} strong>
                {s}
              </Tag>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 text-sm font-bold text-zinc-100">فرانت‌اند</h3>
              <div className="flex flex-wrap gap-2">
                <Tag>Next.js</Tag>
                <Tag>React</Tag>
                <Tag>TypeScript</Tag>
                <Tag>Tailwind CSS</Tag>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 text-sm font-bold text-zinc-100">بک‌اند</h3>
              <div className="flex flex-wrap gap-2">
                <Tag>NestJS</Tag>
                <Tag>Node.js</Tag>
                <Tag>PostgreSQL</Tag>
                <Tag>Prisma</Tag>
                <Tag>Redis</Tag>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 text-sm font-bold text-zinc-100">ابزار و DevOps</h3>
              <div className="flex flex-wrap gap-2">
                <Tag>Docker</Tag>
                <Tag>Linux</Tag>
                <Tag>Git</Tag>
                <Tag>SEO</Tag>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CERTIFICATES.map((c) => (
              <span
                key={c}
                className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/[0.06] px-3 py-1 text-[12px] text-fuchsia-200"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------- */}
        {/* تجربه‌های کاری */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۳">تجربه‌های کاری</Eyebrow>
          <div className="relative border-r border-white/15 pr-8">
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
                  <h3 className="text-lg font-bold text-zinc-100">{job.company}</h3>
                  {job.period && (
                    <span className="font-mono text-[11px] tracking-wide text-cyan-300/70">
                      {job.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-400">{job.role}</p>
                <p className="mt-2 font-mono text-xs text-zinc-500">{job.stack}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-bold text-zinc-100">{EDUCATION.degree}</h3>
            <p className="mt-1 text-sm text-zinc-400">{EDUCATION.school}</p>
            <p className="mt-2 font-mono text-xs text-zinc-500">{EDUCATION.period}</p>
          </div>
        </motion.section>

        {/* -------------------------------------------------------- */}
        {/* نمونه‌کارها */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۴">نمونه‌کارها</Eyebrow>
          <div className="grid gap-5 sm:grid-cols-3">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-lg border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-300/30"
              >
                <h3 className="text-sm font-bold leading-6 text-zinc-100">{p.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-6 text-zinc-400">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-zinc-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------- */}
        {/* نظرات کارفرمایان */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <Eyebrow index="۰۵">نظرات کارفرمایان</Eyebrow>
          <div className="grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <Quote className="mb-3 h-4 w-4 text-cyan-300/60" />
                <p className="text-[13px] leading-7 text-zinc-300">{t.text}</p>
                <p className="mt-4 font-mono text-[11px] text-zinc-500">— {t.name}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* -------------------------------------------------------- */}
        {/* راه‌های ارتباطی */}
        {/* -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow index="۰۶">راه‌های ارتباطی</Eyebrow>

          <div className="mb-4 flex flex-wrap gap-4 font-mono text-sm text-zinc-300" dir="ltr">
            <span>{PHONE}</span>
            <span className="text-zinc-600">·</span>
            <span>{EMAIL}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-cyan-300/40 hover:bg-white/[0.05]"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  <span className="text-sm font-bold text-zinc-100">{label}</span>
                  <span className="font-mono text-xs text-zinc-500" dir="ltr">
                    @{handle}
                  </span>
                </span>
                <ArrowUpLeft className="h-4 w-4 text-zinc-600 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-300" />
              </a>
            ))}
          </div>

          <blockquote className="mt-24 border-r border-cyan-300/40 pr-6 text-lg leading-9 text-zinc-400 sm:text-xl">
            «کد نوشتن فقط این نیست که چیزی کار کنه؛ مهم اینه که مقیاس‌پذیر،
            قابل نگهداری و لذت‌بخش باشه.»
          </blockquote>

          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600" dir="ltr">
            © {new Date().getFullYear()} Sina Pirzadeh
          </p>
        </motion.section>
      </div>
    </main>
  );
}
