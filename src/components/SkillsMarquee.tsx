import { stack as defaultStack } from '@/lib/data';

/**
 * Marquee strips showing the tech stack. Pure CSS animation, no JS —
 * fully server-rendered (good for SEO & LCP).
 */
export default function SkillsMarquee({ stack }: { stack?: string[] } = {}) {
  const items = stack ?? defaultStack;
  const rows = [
    { rev: false, cls: 'border-[#E9B44C]/20 bg-[#E9B44C]/[0.06] text-[#E9B44C]' },
    { rev: true, cls: 'border-[#7FDBB6]/20 bg-[#7FDBB6]/[0.06] text-[#7FDBB6]' },
  ] as const;

  return (
    <section aria-label="مهارت‌ها" className="space-y-3 py-6">
      {rows.map((row, r) => (
        <div
          key={r}
          dir="ltr"
          className="flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div
            className="flex w-max shrink-0 hover:[animation-play-state:paused]"
            style={{ animation: `${row.rev ? 'mq-rev' : 'mq'} ${26 + r * 4}s linear infinite` }}
          >
            {[0, 1].map((g) => (
              <div key={g} aria-hidden={g === 1} className="flex shrink-0 gap-3 pe-3">
                {(row.rev ? [...items].reverse() : items).map((s) => (
                  <span
                    key={s}
                    className={`whitespace-nowrap rounded-xl border px-5 py-2.5 font-mono text-sm font-semibold ${row.cls}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
