'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.replace('/admin');
        router.refresh();
      } else {
        setError(data.error || 'ورود ناموفق بود.');
      }
    } catch {
      setError('ارتباط با سرور برقرار نشد.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-3.5 py-2.5 text-sm text-[#EDF3EF] placeholder:text-[#5E786E] outline-none transition-colors focus:border-[#E9B44C]/50';

  return (
    <main data-native-cursor className="relative flex min-h-screen items-center justify-center px-5 py-16">
      {/* پس‌زمینه محیطی */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="anim-drift glow-gold absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" />
        <div
          className="anim-drift glow-mint absolute -left-28 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: '-4s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-6 text-center">
          <p className="font-mono text-xs tracking-widest text-[#7FDBB6]" dir="ltr">
            $ sudo su pirroot_
          </p>
          <h1 className="mt-2 text-2xl font-black text-[#EDF3EF]">ورود به پنل مدیریت</h1>
          <p className="mt-1.5 text-xs text-[#7C948B]">فقط خودت باید اینجا رو ببینی 🤫</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          <label className="mb-1.5 block text-xs font-semibold text-[#9FB6AE]" htmlFor="username">
            نام کاربری
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className={inputCls}
            dir="ltr"
          />

          <label className="mb-1.5 mt-4 block text-xs font-semibold text-[#9FB6AE]" htmlFor="password">
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={inputCls}
            dir="ltr"
          />

          {error && (
            <p role="alert" className="mt-4 rounded-lg border border-[#E9765C]/30 bg-[#E9765C]/10 px-3 py-2 text-xs font-semibold text-[#E9765C]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-[#E9B44C] py-2.5 text-sm font-bold text-[#0B1210] shadow-[0_10px_30px_-10px_rgba(233,180,76,.5)] transition-colors hover:bg-[#f0c063] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'در حال ورود…' : 'ورود'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-xs text-[#7C948B] transition-colors hover:text-[#E9B44C]"
          >
            ← بازگشت به سایت
          </Link>
        </div>
      </div>
    </main>
  );
}
