import NeedTop from '@/components/proflow/ui/NeedTop';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/proflow/Hero';
import Stack from '@/components/proflow/Stack';
import Experience from '@/components/proflow/Experience';
import Contacts from '@/components/proflow/Contacts';
import Projects from '@/components/proflow/Projects';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#030508] font-(--font-body) text-zinc-200 selection:bg-cyan-300/20 selection:text-cyan-100">
      <NeedTop />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32 pt-32 sm:px-10 sm:pt-40">
        <Hero />
        <Stack />
        <Experience />
        <Projects />
        <Contacts />
      </div>
    </main>
  );
}
