import { EXPERIENCE } from '@/lib/proflow_data';

const panel = 'linear-gradient(160deg, #171d24, #0c1015)';

export default function Experience() {
  return (
    <section className="mb-32">
      {/* Eyebrow — matches About/Hero badge language */}
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
        <span className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">سوابق کاری</span>
      </div>

      {/* Rail — a physical connector cable, not a plain border */}
      <div className="relative pr-9">
        <div
          className="absolute right-0 top-1 bottom-1 w-0.75 rounded-full"
          style={{
            background: 'linear-gradient(180deg, rgba(34,211,238,0.35), rgba(34,211,238,0.05) 70%)',
            boxShadow: 'inset 0 0 2px rgba(0,0,0,0.6)',
          }}
        />

        {EXPERIENCE.map((job) => (
          <div key={job.company} className="relative pb-6 last:pb-0">
            {/* Node — an LED socket mounted on the rail */}
            <span
              className="absolute right-[-2.35rem] top-4 flex h-4 w-4 items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
                  boxShadow: '0 0 8px 2px rgba(34,211,238,0.6)',
                }}
              />
            </span>

            {/* Plaque — each role as a raised panel instead of bare text */}
            <div
              className="rounded-2xl p-5 transition-transform duration-150 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(160deg, #141a20, #0c0f13)',
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 2px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg text-zinc-100">{job.company}</h3>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wide text-cyan-300/80"
                  style={{
                    background: 'rgba(34,211,238,0.06)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
                  }}
                >
                  {job.period}
                </span>
              </div>
              <div className="mt-1 text-xs text-cyan-300/70">{job.role}</div>
              <p className="mt-2 text-md leading-relaxed text-zinc-400">{job.desc}</p>
              <p className="mt-3 text-[11px] text-zinc-500">{job.stack}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
