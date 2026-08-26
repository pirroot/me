'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function NeedTop() {
  const { scrollYProgress } = useScroll();
  const scanY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* Ambient grid + glows */}
      <div className="bg-noise pointer-events-none fixed inset-0 z-0" />

      {/* Glow orbs */}
      <div className="pointer-events-none fixed left-1/2 top-[-10%] z-0 h-150 w-150 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] z-0 h-120 w-120 rounded-full bg-violet-500/8 blur-[160px]" />
      <div className="pointer-events-none fixed left-[-5%] top-[30%] z-0 h-100 w-100 rounded-full bg-amber-500/5 blur-[140px]" />

      {/* Scan line tied to scroll progress */}
      <motion.div
        style={{ top: scanY }}
        className="pointer-events-none fixed left-0 z-40 h-px w-full bg-linear-to-r from-transparent via-cyan-300/50 to-transparent"
      />

      {/* Corner brackets — HUD frame */}
      <div className="pointer-events-none fixed inset-4 z-40 sm:inset-6">
        <span className="absolute left-0 top-0 h-6 w-6 border-l-3 border-t-3 border-cyan-300/30" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r-3 border-t-3 border-cyan-300/30" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-3 border-l-3 border-cyan-300/30" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b-3 border-r-3 border-cyan-300/30" />
      </div>
    </>
  );
}
