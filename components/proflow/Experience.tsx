import { EXPERIENCE } from '@/lib/proflow_data';

export default function Experience() {
  return (
    <section className="mb-32">
      <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
        سوابق کاری
      </div>
      <div className="relative border-r border-white/10 pr-8">
        {EXPERIENCE.map((job) => (
          <div key={job.company} className="relative pb-10 last:pb-0">
            <span className="absolute -right-8.75 top-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(94,234,212,0.5)]" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-zinc-100">{job.company}</h3>
              <span className="text-[11px] uppercase tracking-wide text-cyan-300/70">
                {job.period}
              </span>
            </div>
            <div className="mt-1 text-xs text-cyan-300/70">{job.role}</div>
            <p className="mt-2 text-md text-zinc-400">{job.desc}</p>
            <p className="mt-2 text-[11px] text-zinc-500">{job.stack}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
