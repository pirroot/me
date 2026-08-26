import { ChevronLeft } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-10">
      <blockquote className="mb-10 border-r border-cyan-300/30 pr-6 font-display text-lg leading-snug text-zinc-400 sm:text-xl">
        «کد فقط به این معنا نیست که چیزی کار کند. یعنی باید مقیاس‌پذیر، قابل نگهداری و لذت‌بخش
        باشد.»
      </blockquote>

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-600">
          © {new Date().getFullYear()} سینا پیرزاده — ساخته‌شده با Next.js
        </p>
        <div className="flex items-center gap-1 text-[10px] text-zinc-700">
          <ChevronLeft className="h-3 w-3" />
          طراحی و توسعه توسط سینا پیرزاده
        </div>
      </div>
    </footer>
  );
}
