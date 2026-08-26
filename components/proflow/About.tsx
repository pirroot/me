import { ABOUT_LINES, CONTACT } from '@/lib/proflow_data';
import { Circle, Mail, MapPin, Phone } from 'lucide-react';

export default function About() {
  return (
    <section className="mb-32">
      <div className="mb-6 flex items-center gap-3  text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
        درباره من
      </div>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-10">
        {ABOUT_LINES.map((line) => (
          <div
            key={line}
            className="flex items-start gap-3 border-b border-white/5 py-3 text-md text-zinc-300"
          >
            <span className="mt-0.5  text-cyan-300/60">{'>'}</span>
            {line}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/2 p-5">
        <div className="flex items-center gap-2 text-md text-zinc-400">
          <MapPin className="h-4 w-4 text-cyan-300/60" />
          {CONTACT.location}
        </div>
        <div className="flex items-center gap-2 text-md text-zinc-400">
          <Phone className="h-4 w-4 text-cyan-300/60" />
          {CONTACT.phone}
        </div>
        <div className="flex items-center gap-2 text-md text-zinc-400">
          <Mail className="h-4 w-4 text-cyan-300/60" />
          {CONTACT.email}
        </div>
        <div className="flex items-center gap-2 text-md text-cyan-400">
          <Circle className="h-2 w-2 fill-cyan-400 text-cyan-400" />
          {CONTACT.status}
        </div>
      </div>
    </section>
  );
}
