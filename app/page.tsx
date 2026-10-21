import Background from '@/components/Background';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import SkillsMarquee from '@/components/SkillsMarquee';
import JsonLd from '@/components/ui/JsonLd';
import { jsonLd } from '@/lib/data';

/**
 * Page — Server Component (default in App Router).
 *
 * SEO rationale:
 *  • No `'use client'` here → entire markup ships in the initial HTML.
 *  • Interactive islands (Background, Header, Hero, Projects, Contact)
 *    hydrate lazily; content above the fold still renders server-side.
 *  • JSON-LD structured data is rendered server-side via <JsonLd />.
 *  • Semantic landmarks are used: <main>, <header>, <section>, <footer>.
 *
 * For full SEO, also export a `metadata` object from layout.tsx (title,
 * description, openGraph, twitter, robots, canonical, alternates).
 */
export default function Page() {
  return (
    <main id="top" className={`relative font-sans text-[#EDF3EF]`}>
      {/* Structured data (SEO) — server-rendered */}
      <JsonLd data={jsonLd} />

      {/* Ambient effects, cursor, scroll progress — client-only island */}
      <Background />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ناوبری */}
        <Header />

        {/* قهرمان */}
        <Hero />

        {/* نوار مهارت‌ها */}
        <SkillsMarquee />

        {/* سوابق + پروژه‌ها */}
        <section className="grid gap-14 py-14 md:grid-cols-[0.85fr_1.15fr] md:py-20">
          <Experience />
          <Projects />
        </section>

        {/* ارتباط */}
        <Contact />

        {/* فوتر */}
        <Footer />
      </div>
    </main>
  );
}
