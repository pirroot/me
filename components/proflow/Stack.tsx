import { STACK } from '@/lib/proflow_data';

export default function Stack() {
  return (
    <section
      // initial={{ opacity: 0, y: 24 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // viewport={{ once: true, margin: '-80px' }}
      // transition={{ duration: 0.6 }}
      className="mb-32"
    >
      <div className="mb-6 flex items-center gap-3  text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
        تکنولوژی‌ها
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {STACK.map((s) => (
          <div
            key={s.group}
            className="rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-cyan-300/20"
          >
            <div className="mb-4 flex items-center gap-2">
              <s.icon className="h-4 w-4 text-cyan-300/70" />
              <h3 className="font-display text-md uppercase tracking-wide text-zinc-200">
                {s.group}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span
                  className="rounded-full border border-white/10 bg-white/3 px-3 py-1  text-[11px] tracking-wide text-zinc-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
            {s.note && <p className="mt-4  text-[11px] leading-relaxed text-zinc-500">{s.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
