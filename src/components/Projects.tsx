'use client';

import { useState, type MouseEvent as RMouseEvent } from 'react';

import { cats, projects as defaultProjects, type CatId, type Project } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

export default function Projects({ items }: { items?: Project[] } = {}) {
  const projects = items ?? defaultProjects;
  const [filter, setFilter] = useState<CatId>('all');

  const visible = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);

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

  return (
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
  );
}
