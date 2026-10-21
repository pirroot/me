import { experience } from '@/lib/data';
import Reveal from '@/components/ui/Reveal';

/**
 * Work-experience timeline. Server component — Reveal is the only
 * client island, and it just controls an entrance animation.
 * Content is fully server-rendered for SEO.
 */
export default function Experience() {
  return (
    <div id="experience" className="scroll-mt-24">
      <Reveal>
        <h2 className="flex items-center gap-2.5 text-sm font-bold text-[#E9B44C]">
          <span className="font-mono">01.</span> سوابق کاری
          <span className="h-px flex-1 bg-linear-to-l from-[#EDF3EF]/15 to-transparent" />
        </h2>
      </Reveal>

      <div className="mt-7 space-y-8 border-r border-[#EDF3EF]/10 pr-5">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 90}>
            <div className="group relative">
              <span className="absolute right-[-1.625rem] top-1.5 flex h-3 w-3">
                <span
                  className="absolute h-full w-full rounded-full bg-[#7FDBB6]/40"
                  style={{ animation: `ring-pulse 2.6s ease-out ${i * 0.5}s infinite` }}
                />
                <span
                  className={`relative h-3 w-3 rounded-full border-2 border-[#0B1210] transition-transform duration-300 group-hover:scale-125 ${
                    e.current ? 'bg-[#7FDBB6]' : 'bg-[#3E5A51]'
                  }`}
                />
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-bold text-[#EDF3EF] transition-colors group-hover:text-[#E9B44C]">
                  {e.company}
                  {/* todo: this is for working now. */}
                  {/* {e.current && (
                    <span className="mr-2 rounded-full bg-[#7FDBB6]/15 px-2 py-0.5 text-[10px] font-semibold text-[#7FDBB6]">
                      اکنون
                    </span>
                  )} */}
                </span>
                <span className="text-[11px] text-[#7C948B]">{e.period}</span>
              </div>
              <div className="mt-0.5 text-sm text-[#9FB6AE]">{e.role}</div>
              <p className="mt-1.5 text-sm leading-6 text-[#8AA398]">{e.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[#EDF3EF]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#7C948B]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
