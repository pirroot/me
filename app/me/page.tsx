'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Send, Mail, Phone, ExternalLink, Download } from 'lucide-react';

// ═══════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════

const SKILLS = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛' },
  { name: 'TypeScript', icon: '◈' },
  { name: 'NestJS', icon: '◆' },
  { name: 'Tailwind', icon: '❖' },
];

const PROJECTS = [
  {
    title: 'فروشگاه اینترنتی',
    desc: 'Next.js + NestJS + Stripe',
    tech: 'Full-Stack',
    link: '#',
    image: '/img1.webp',
  },
  {
    title: 'داشبورد مدیریت',
    desc: 'React + TypeScript + D3',
    tech: 'Front-End',
    link: '#',
    image: '/img1.webp',
  },
  {
    title: 'API سرویس',
    desc: 'NestJS + PostgreSQL + Redis',
    tech: 'Back-End',
    link: '#',
    image: '/img1.webp',
  },
];

const CONTACTS = [
  { icon: Send, href: 'https://github.com/pirroot', label: 'GitHub' },
  { icon: Send, href: 'https://linkedin.com/in/pirroot', label: 'LinkedIn' },
  { icon: Send, href: 'https://t.me/pirroot', label: 'Telegram' },
  { icon: Mail, href: 'mailto:sina@pirroot.site', label: 'Email' },
  { icon: Phone, href: 'tel:+989123456789', label: 'Phone' },
];

// ═══════════════════════════════════════════
//  PAGE
//  ✦ Modern Dark Theme with Gradient Accents ✦
// ═══════════════════════════════════════════

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#0a0a0f]">
      {/* Modern gradient background layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      {/* Subtle animated glow orbs */}
      <div className="pointer-events-none fixed left-1/4 top-1/4 z-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 z-0 h-80 w-80 rounded-full bg-pink-500/8 blur-[120px] animate-pulse delay-700" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-8 py-24 sm:px-12">
        {/* ═══ NAVBAR ═══ */}
        <nav className="animate-fade-in mb-24 flex items-center justify-between">
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-sm font-bold tracking-[0.2em] text-transparent">
            pirroot
          </span>
          <Link
            href="https://github.com/pirroot/pirroot/blob/main/resume.pdf"
            target="_blank"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-wider text-white/60 backdrop-blur-sm transition-all hover:border-indigo-400/30 hover:bg-white/10 hover:text-white"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            رزومه
          </Link>
        </nav>

        {/* ═══ HERO ═══ */}
        <section className="mb-32 flex flex-col items-center text-center sm:mb-40">
          {/* Profile with modern gradient ring */}
          <div className="animate-fade-up mb-10 animate-float">
            <div className="relative">
              {/* Animated gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-75 blur-sm animate-spin-slow" />
              <div className="relative h-32 w-32 rounded-full border-2 border-white/10 bg-[#0a0a0f] p-1 sm:h-40 sm:w-40">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/profile.webp"
                    alt="سینا پیرزاده"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Name with gradient */}
          <h1 className="animate-fade-up delay-100 mb-3 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              سینا پیرزاده
            </span>
            <span className="animate-cursor text-indigo-400">_</span>
          </h1>

          {/* One-liner with accent */}
          <p className="animate-fade-up delay-200 mb-8 text-sm uppercase tracking-[0.3em] text-white/40">
            <span className="text-indigo-400">✦</span> Full Stack Developer{' '}
            <span className="text-pink-400">✦</span>
          </p>

          {/* Skills — modern pill tags */}
          <div className="animate-fade-up delay-300 flex flex-wrap justify-center gap-2.5">
            {SKILLS.map((s) => (
              <span
                key={s.name}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white"
              >
                <span className="mr-1.5 text-indigo-400">{s.icon}</span>
                {s.name}
              </span>
            ))}
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section className="animate-fade-up delay-400 mb-28 sm:mb-36">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-indigo-400 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">پروژه‌ها</span>
            <span className="h-px flex-1 bg-gradient-to-l from-pink-400 to-transparent" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {PROJECTS.map((p) => (
              <Link href={p.link} key={p.title}>
                <div className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-indigo-400/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/10">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-pink-500/0 transition-all group-hover:from-indigo-500/10 group-hover:to-pink-500/10" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-indigo-400/80">
                          {p.tech}
                        </span>
                        <ExternalLink className="h-3 w-3 text-white/30 transition-all group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <h3 className="mb-0.5 text-sm font-medium text-white">{p.title}</h3>
                      <p className="text-[11px] text-white/40">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section className="animate-fade-up delay-500 mb-20 sm:mb-28">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-pink-400 to-transparent" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">ارتباط</span>
            <span className="h-px flex-1 bg-gradient-to-l from-indigo-400 to-transparent" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {CONTACTS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group rounded-full border border-white/10 bg-white/5 p-3 text-white/40 backdrop-blur-sm transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>

          {/* Contact details with gradient accents */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-white/30">
            <a
              href="mailto:sina@pirroot.site"
              className="transition-all hover:text-indigo-400 hover:underline underline-offset-4"
            >
              sina@pirroot.site
            </a>
            <span className="h-1 w-1 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400" />
            <a
              href="tel:+989123456789"
              className="transition-all hover:text-pink-400 hover:underline underline-offset-4"
            >
              +98 912 345 6789
            </a>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="animate-fade-up delay-600 mt-auto border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-white/20">
            © {new Date().getFullYear()} سینا پیرزاده —{' '}
            <span className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Next.js
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}
