import { STACK } from '@/lib/proflow_data';

const panel = 'linear-gradient(160deg, #171d24, #0c1015)';

export default function Stack() {
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
          تکنولوژی‌ها
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {STACK.map((s) => (
          <div
            key={s.group}
            className="rounded-2xl p-5 transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(160deg, #141a20, #0c0f13)',
              boxShadow:
                'inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 2px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <s.icon className="h-4 w-4 text-cyan-300/80" />
              </span>
              <h3 className="font-display text-md uppercase tracking-wide text-zinc-200">
                {s.group}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg px-3 py-1.5 text-[11px] tracking-wide text-zinc-300 transition-all duration-150 hover:-translate-y-0.5 hover:text-cyan-200"
                  style={{
                    background: 'linear-gradient(160deg, #171d24, #0d1116)',
                    boxShadow:
                      'inset 0 1px 1px rgba(255,255,255,0.07), inset 0 -1px 1px rgba(0,0,0,0.5), 0 3px 6px rgba(0,0,0,0.35)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
