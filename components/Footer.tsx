import Reveal from '@/components/ui/Reveal';

/**
 * Footer — fully server-rendered (the only "interactivity" is a
 * scroll-to-top button which works without JS via `window.scrollTo`).
 *
 * Note: the scroll-to-top button uses inline onClick — it only runs
 * client-side, but the rest of the markup is server-rendered. We keep
 * it as a Server Component by using a vanilla anchor for graceful
 * degradation. (If you need the smooth scroll, replace with a tiny
 * Client Component.)
 */
export default function Footer() {
  const jYear = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());

  return (
    <footer className="border-t border-[#EDF3EF]/10 py-10">
      <Reveal>
        <blockquote className="mx-auto max-w-xl text-center text-sm italic leading-8 text-[#9FB6AE]">
          «آینده بیشتر از آدم‌هایی که فقط زیاد می‌دانند، به آدم‌هایی نیاز دارد که{' '}
          <span className="font-semibold not-italic text-[#E9B44C]">خوب سؤال می‌پرسند</span>،{' '}
          <span className="font-semibold not-italic text-[#7FDBB6]">دقیق می‌بینند</span>، مستقل
          فکر می‌کنند، سریع یاد می‌گیرند و مدت طولانی ادامه می‌دهند.»
        </blockquote>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs text-[#7C948B]">
        <span>© {jYear} سینا پیرزاده — ساخته‌شده با Next.js</span>
        <span className="text-[#3E5A51]">·</span>
        <span>طراحی و توسعه توسط سینا پیرزاده</span>
        <a
          href="#top"
          className="ms-2 inline-flex items-center gap-1.5 rounded-full border border-[#EDF3EF]/10 px-3 py-1.5 transition-colors hover:border-[#E9B44C]/50 hover:text-[#E9B44C]"
        >
          بازگشت به بالا
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5m0 0-6 6m6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
