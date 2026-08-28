import { ChevronLeft, Quote } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: 'linear-gradient(160deg, #12161c, #0a0d11)',
        boxShadow:
          'inset 0 1px 1px rgba(255,255,255,0.04), inset 0 -1px 2px rgba(0,0,0,0.55), 0 10px 24px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Engraved quote plate */}
      <div
        className="mb-8 flex gap-4 rounded-xl p-5"
        style={{
          background: 'rgba(0,0,0,0.25)',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{
            background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          <Quote className="h-3.5 w-3.5 text-cyan-300/70" />
        </span>
        <blockquote
          className="font-display text-lg leading-snug text-zinc-400 sm:text-xl"
          style={{ textShadow: '0 1px 0 rgba(255,255,255,0.03)' }}
        >
          «کد فقط به این معنا نیست که چیزی کار کند. یعنی باید مقیاس‌پذیر، قابل نگهداری و لذت‌بخش
          باشد.»
        </blockquote>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
              boxShadow: '0 0 5px 1px rgba(34,211,238,0.8)',
            }}
          />
          <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-600">
            © {new Date().getFullYear()} سینا پیرزاده — ساخته‌شده با Next.js
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-700">
          <ChevronLeft className="h-3 w-3" />
          طراحی و توسعه توسط سینا پیرزاده
        </div>
      </div>
    </footer>
  );
}
