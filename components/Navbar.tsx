import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-3 z-30 flex justify-center px-6 sm:px-10 lg:top-5">
      <div
        className="flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 uppercase tracking-[0.2em] text-zinc-500"
        style={{
          background: 'linear-gradient(160deg, rgba(23,29,36,0.85), rgba(10,13,17,0.85))',
          backdropFilter: 'blur(14px)',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.55), 0 10px 24px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link
          href={'/'}
          className="text-xs font-semibold text-zinc-300"
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.04), 0 2px 6px rgba(0,0,0,0.5)' }}
        >
          pirroot
        </Link>

        <Link
          href={'/todo'}
          className="group flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] text-zinc-300 transition-all duration-150 hover:text-cyan-200"
          style={{
            background: 'linear-gradient(160deg, #171d24, #0c1015)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.6)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: '#22d3ee' }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
                boxShadow: '0 0 6px 1px rgba(34,211,238,0.9)',
              }}
            />
          </span>
          برنامه روزانه
        </Link>
      </div>
    </header>
  );
}
