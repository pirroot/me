import Background from '@/components/Background';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import SkillsMarquee from '@/components/SkillsMarquee';
import JsonLd from '@/components/ui/JsonLd';
import { buildJsonLd, getSiteData } from '@/lib/site';

/**
 * Page — Server Component (default in App Router).
 *
 * SEO rationale:
 *  • No `'use client'` here → entire markup ships in the initial HTML.
 *  • Interactive islands (Background, Header, Hero, Projects, Contact)
 *    hydrate lazily; content above the fold still renders server-side.
 *  • JSON-LD structured data is rendered server-side via <JsonLd />.
 *  • Content comes from the database (managed via /admin) with a static
 *    fallback, so the page always renders.
 */
export default async function Page() {
  const site = await getSiteData();

  return (
    <main id="top" className={`relative font-sans text-[#EDF3EF]`}>
      {/* Structured data (SEO) — server-rendered */}
      <JsonLd data={buildJsonLd(site)} />

      {/* Ambient effects, cursor, scroll progress — client-only island */}
      <Background />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ناوبری */}
        <Header contact={site.contact} />

        {/* قهرمان */}
        <Hero
          roles={site.settings.roles}
          stack={site.settings.stack}
          heroBio={site.settings.heroBio}
          contact={{ resumePdf: site.contact.resumePdf, karlancer: site.contact.karlancer }}
        />

        {/* نوار مهارت‌ها */}
        <SkillsMarquee stack={site.settings.stack} />

        {/* سوابق + پروژه‌ها */}
        <section className="grid gap-14 py-14 md:grid-cols-[0.85fr_1.15fr] md:py-20">
          <Experience items={site.experience} />
          <Projects items={site.projects} />
        </section>

        {/* ارتباط */}
        <Contact socials={site.socials} contact={site.contact} />

        {/* فوتر */}
        <Footer />
      </div>
    </main>
  );
}
