'use client';

import type { ReactNode } from 'react';

import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Wraps children with a fade/slide-up reveal animation that triggers
 * when the element scrolls into view.
 */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-on' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
