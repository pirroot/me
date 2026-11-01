'use client';

import { useState, type FormEvent } from 'react';

import { CONTACT, socials as defaultSocials, type ContactInfo, type Social } from '@/lib/data';
import { getSocialIcon } from '@/lib/socialIcons';
import { toFa } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface Props {
  socials?: Social[];
  contact?: ContactInfo;
}

export default function Contact({ socials: socialsProp, contact: contactProp }: Props = {}) {
  const socials = socialsProp ?? defaultSocials;
  const contact = contactProp ?? CONTACT;

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  /* ── فرم تماس ── */
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ ok: true, msg: 'پیامت رسید! به‌زودی جواب می‌دم 🙌' });
        setForm({ name: '', email: '', subject: '', body: '' });
      } else {
        setFeedback({ ok: false, msg: data.error || 'ارسال پیام ناموفق بود.' });
      }
    } catch {
      setFeedback({ ok: false, msg: 'ارتباط با سرور برقرار نشد.' });
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/60 px-3.5 py-2.5 text-sm text-[#EDF3EF] placeholder:text-[#5E786E] outline-none transition-colors focus:border-[#E9B44C]/50 focus:bg-[#0B1210]';

  return (
    <section id="contact" className="relative scroll-mt-24 py-14 md:py-20">
      <Reveal>
        <h2 className="flex items-center gap-2.5 text-sm font-bold text-[#E9B44C]">
          <span className="font-mono">03.</span> بیایید همکاری کنیم
          <span className="h-px flex-1 bg-linear-to-l from-[#EDF3EF]/15 to-transparent" />
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-6 sm:p-8">
          <span
            aria-hidden
            dir="ltr"
            className="absolute -left-3 -top-9 select-none font-mono text-[7rem] font-black leading-none text-[#EDF3EF]/[0.04]"
          >
            {'</>'}
          </span>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-[#E9B44C]/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-[#7FDBB6]/10 blur-3xl"
          />

          <div className="relative flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-md">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#7FDBB6]/25 bg-[#7FDBB6]/10 px-3 py-1 text-[11px] text-[#B7E9D3]">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#7FDBB6]"
                  style={{ animation: 'blink-dot 1.8s ease-in-out infinite' }}
                />
                معمولاً ظرف چند ساعت پاسخ می‌دم
              </span>
              <p className="text-sm leading-7 text-[#9FB6AE]">
                برای پروژهٔ بعدی‌ات یک Full-Stack Developer می‌خوای؟ هر وقت خواستی در دسترسم.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2.5 rounded-lg border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-4 py-2.5 text-sm font-bold text-[#7FDBB6] transition-transform hover:scale-[1.03] hover:bg-[#7FDBB6]/20"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7FDBB6]/15">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" />
                  </svg>
                </span>
                <span dir="ltr">{toFa(contact.phone)}</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-bold transition-all hover:scale-[1.03] ${
                  copied
                    ? 'border-[#7FDBB6]/50 bg-[#7FDBB6]/15 text-[#7FDBB6]'
                    : 'border-[#E9B44C]/30 bg-[#E9B44C]/10 text-[#E9B44C] hover:bg-[#E9B44C]/20'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${copied ? 'bg-[#7FDBB6]/15' : 'bg-[#E9B44C]/15'}`}
                >
                  {copied ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-10 6L2 7" />
                    </svg>
                  )}
                </span>
                {copied ? (
                  'کپی شد!'
                ) : (
                  <span dir="ltr" className="font-mono text-[13px]">
                    {contact.email}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {socials.map((s) => {
              const Icon = getSocialIcon(s.iconKey);
              return (
                <a
                  key={s.href + s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/60 px-4 py-4 transition duration-300 hover:-translate-y-1.5 hover:border-[#7FDBB6]/50 hover:bg-[#7FDBB6]/[0.07]"
                >
                  <span
                    aria-hidden
                    className="absolute -left-3 -top-3 h-14 w-14 rounded-full bg-[#7FDBB6]/0 blur-2xl transition group-hover:bg-[#7FDBB6]/20"
                  />
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#EDF3EF]/10 bg-[#121C19] text-[#7C948B] transition group-hover:scale-110 group-hover:border-[#7FDBB6]/40 group-hover:text-[#7FDBB6]">
                    <Icon />
                  </span>
                  <div>
                    <div className="text-xs text-[#7C948B]">{s.name}</div>
                    <div
                      className="mt-0.5 text-sm font-bold text-[#EDF3EF] transition group-hover:text-[#7FDBB6]"
                      dir="ltr"
                    >
                      {s.handle}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* فرم ارسال پیام */}
          <div className="relative mt-7 rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/60 p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#EDF3EF]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#E9B44C]"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              یا مستقیم برام بنویس
            </h3>

            <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                required
                maxLength={80}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="نام و نام خانوادگی *"
                className={inputCls}
                aria-label="نام و نام خانوادگی"
              />
              <input
                type="email"
                maxLength={120}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="ایمیل یا شماره تماس (اختیاری)"
                className={inputCls}
                aria-label="ایمیل یا شماره تماس"
              />
              <input
                maxLength={120}
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="موضوع"
                className={`${inputCls} sm:col-span-2`}
                aria-label="موضوع"
              />
              <textarea
                required
                rows={4}
                maxLength={3000}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                placeholder="سلام! درباره‌ی... *"
                className={`${inputCls} resize-y sm:col-span-2`}
                aria-label="متن پیام"
              />

              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E9B44C] px-5 py-2.5 text-sm font-bold text-[#0B1210] shadow-[0_10px_30px_-10px_rgba(233,180,76,.5)] transition-all hover:bg-[#f0c063] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <span
                        className="h-3.5 w-3.5 rounded-full border-2 border-[#0B1210]/30 border-t-[#0B1210]"
                        style={{ animation: 'spin-slow 0.8s linear infinite' }}
                      />
                      در حال ارسال…
                    </>
                  ) : (
                    'ارسال پیام'
                  )}
                </button>

                {feedback && (
                  <span
                    role="status"
                    aria-live="polite"
                    className={`text-xs font-semibold ${feedback.ok ? 'text-[#7FDBB6]' : 'text-[#E9765C]'}`}
                  >
                    {feedback.msg}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
