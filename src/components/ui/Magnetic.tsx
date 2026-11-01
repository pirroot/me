'use client';

import { useRef, type ReactNode } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps a child element with a subtle magnetic-pull effect on mouse-move.
 * Only meaningful on devices with a fine pointer (ignored on touch).
 */
export default function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transition: 'transform .25s cubic-bezier(.22,1,.36,1)' }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = '';
      }}
    >
      {children}
    </div>
  );
}
