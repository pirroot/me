import Image from 'next/image';
import { Code2 } from 'lucide-react';
import { PROJECTS } from '@/lib/proflow_data';
import Link from 'next/link';
import project_img from '@/public/img1.webp';

export default function Projects() {
  return (
    <section className="mb-32">
      <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
        پروژه‌های انجام‌شده
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, index) => (
          <Link href={p.link} key={index} className="block">
            <div className="group rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-cyan-300/20 hover:bg-white/4">
              {p.image && (
                <Image
                  alt={p.title}
                  src={project_img}
                  width={300}
                  height={300}
                  priority={index === 0}
                  className="mb-2 rounded-2xl object-cover"
                />
              )}
              <div className="mb-3 flex items-center justify-between">
                <Code2 className="h-5 w-5 text-cyan-300/60" />
                <span className="text-[10px] text-zinc-600">{p.tech}</span>
              </div>
              <h3 className="mb-2 font-display text-md font-medium text-zinc-100">{p.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
