'use client';

import { useEffect, useState } from 'react';

import { useInView } from '@/hooks/useInView';
import { toFa } from '@/lib/utils';

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

/**
 * Animated count-up. Starts at 0 on the server (no hydration mismatch)
 * and ramps up to `to` with cubic easing when scrolled into view.
 */
export default function Counter({ to, suffix = '', duration = 1500 }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const loop = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} dir="ltr" className="inline-block">
      {toFa(n)}
      {suffix}
    </span>
  );
}
