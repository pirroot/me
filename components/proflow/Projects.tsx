import Image from 'next/image';
import { Code2 } from 'lucide-react';
import { PROJECTS } from '@/lib/proflow_data';
import Link from 'next/link';
import project_img from '@/public/img1.webp';

const panel = 'linear-gradient(160deg, #171d24, #0c1015)';

export default function Projects() {
  return (
    <section className="mb-32">
      <div
        className="mb-8 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
        style={{
          background: panel,
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
            boxShadow: '0 0 5px 1px rgba(34,211,238,0.8)',
          }}
        />
        <span className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
          پروژه‌های انجام‌شده
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, index) => (
          <Link href={p.link} key={index} className="block">
            <div
              className="group h-full rounded-2xl p-5 transition-transform duration-150 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(160deg, #141a20, #0c0f13)',
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 2px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {p.image && (
                <div
                  className="relative mb-3 h-40 w-full overflow-hidden rounded-xl"
                  style={{
                    boxShadow:
                      'inset 0 3px 8px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.04)',
                  }}
                >
                  <Image
                    alt={p.title}
                    src={project_img}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Glass sheen — consistent with Hero's profile screen */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(115deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 20%, transparent 40%)',
                    }}
                  />
                </div>
              )}

              <div className="mb-3 flex items-center justify-between">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{
                    background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
                  }}
                >
                  <Code2 className="h-3.5 w-3.5 text-cyan-300/80" />
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] tracking-wide text-zinc-500"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  {p.tech}
                </span>
              </div>

              <h3 className="mb-2 font-display text-md font-medium text-zinc-100 transition-colors group-hover:text-cyan-200">
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
