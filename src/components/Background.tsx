"use client";

import { useEffect, useRef } from "react";

/**
 * Client-only ambient layer:
 *  • Noise texture
 *  • Scroll progress bar (top)
 *  • Custom cursor (dot + ring)
 *  • Ambient color glows + grid
 *  • Spotlight following the mouse
 *
 * Renders nothing meaningful server-side (just empty divs), so the
 * page stays SSR-friendly and SEO-respecting.
 */
export default function Background() {
  const progRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const root = document.documentElement;

    /* ── Scroll progress ── */
    const onScroll = () => {
      const max = root.scrollHeight - window.innerHeight;
      if (progRef.current) {
        progRef.current.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Cursor follow (lerp for the ring, instant for the dot) ── */
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.setProperty("--mx", `${mx}px`);
      root.style.setProperty("--my", `${my}px`);
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      if (fine && !raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest?.(
        "a, button, label",
      );
      ringRef.current?.classList.toggle("big", !!hit);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* بافت نویز */}
      <div aria-hidden className="noise" />

      {/* نوار پیشرفت اسکرول */}
      <div
        ref={progRef}
        className="fixed right-0 top-0 z-[70] h-[3px] w-0 bg-linear-to-l from-[#E9B44C] to-[#7FDBB6]"
      />

      {/* کرسر سفارشی */}
      <div ref={dotRef} id="cursor-dot" aria-hidden />
      <div ref={ringRef} id="cursor-ring" aria-hidden />

      {/* پس‌زمینهٔ محیطی */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="anim-drift glow-gold absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" />
        <div
          className="anim-drift glow-mint absolute -left-28 top-1/3 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="anim-drift glow-gold absolute -bottom-32 right-1/3 h-72 w-72 rounded-full blur-3xl"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#EDF3EF 1px, transparent 1px), linear-gradient(90deg, #EDF3EF 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 75%)",
          }}
        />
        {/* اسپات‌لایت دنبال‌کنندهٔ موس */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(560px circle at var(--mx, 70%) var(--my, 25%), rgba(233,180,76,.06), transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
