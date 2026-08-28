import { CONTACT, SOCIALS } from '@/lib/proflow_data';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';

const panel = 'linear-gradient(160deg, #171d24, #0c1015)';
const plaqueShadow =
  'inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 2px rgba(0,0,0,0.5), 0 8px 18px rgba(0,0,0,0.35)';

export default function Contacts() {
  return (
    <section className="mb-32">
      <div
        className="mb-8 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
        style={{
          background: panel,
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #a5f3fc, #22d3ee 60%, #0e7490)',
            boxShadow: '0 0 5px 1px rgba(34,211,238,0.8)',
          }}
        />
        <span className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
          ارتباط با من
        </span>
      </div>

      {/* Primary tiles — tactile buttons with a recessed icon socket */}
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <a
          href={`tel:${CONTACT.phone}`}
          className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(160deg, #141a20, #0c0f13)',
            boxShadow: plaqueShadow,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <Phone className="h-5 w-5 text-cyan-300" />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">تماس</div>
            <div className="mt-0.5 text-md text-zinc-100 transition-colors group-hover:text-cyan-200">
              {CONTACT.phone}
            </div>
          </div>
        </a>

        <a
          href={`mailto:${CONTACT.email}`}
          className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(160deg, #141a20, #0c0f13)',
            boxShadow: plaqueShadow,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            <Mail className="h-5 w-5 text-cyan-300" />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">ایمیل</div>
            <div className="mt-0.5 text-md text-zinc-100 transition-colors group-hover:text-cyan-200">
              {CONTACT.email}
            </div>
          </div>
        </a>
      </div>

      {/* Socials — raised rows, arrow lifts and lights up on hover */}
      <div className="grid gap-3 sm:grid-cols-2">
        {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(160deg, #141a20, #0c0f13)',
              boxShadow: plaqueShadow,
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background: 'linear-gradient(160deg, #1c232b, #0a0d11)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                <Icon className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="font-display text-md text-zinc-100">{label}</span>
              <span className="text-xs text-zinc-500">{handle}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]" />
          </a>
        ))}
      </div>
    </section>
  );
}
