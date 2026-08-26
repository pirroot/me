import { CONTACT, SOCIALS } from '@/lib/proflow_data';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

export default function Contacts() {
  return (
    <section className="mb-32">
      <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300/70">
        ارتباط با من
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <a
          href={`tel:${CONTACT.phone}`}
          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-cyan-300/30 hover:bg-white/4"
        >
          <Phone className="h-5 w-5 text-cyan-300" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">تماس</div>
            <div className="mt-0.5 text-md text-zinc-100">{CONTACT.phone}</div>
          </div>
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-cyan-300/30 hover:bg-white/4"
        >
          <Mail className="h-5 w-5 text-cyan-300" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">ایمیل</div>
            <div className="mt-0.5 text-md text-zinc-100">{CONTACT.email}</div>
          </div>
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/2 px-5 py-4 transition-colors hover:border-cyan-300/40 hover:bg-white/4"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-cyan-300" />
              <span className="font-display text-md text-zinc-100">{label}</span>
              <span className="text-xs text-zinc-500">{handle}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
          </a>
        ))}
      </div>
    </section>
  );
}
