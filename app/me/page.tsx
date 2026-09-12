'use client';

import { useEffect, useState } from 'react';

/* ────────────────────────────────────────────────────────────
   ۶ حوزه — همه یک ساختار دارن: تیک روزانه + استریک + تاریخچه
──────────────────────────────────────────────────────────── */

type HabitKey = 'zehn' | 'mahart' | 'pool' | 'badan' | 'ertebat' | 'roshd';

const HABITS: { key: HabitKey; label: string; hint: string; icon: string }[] = [
  { key: 'zehn', label: 'ذهن', hint: 'امروز به این نتیجه رسیدم که...', icon: '🧠' },
  { key: 'mahart', label: 'مهارت', hint: '۲۰-۳۰ دقیقه کد یا کار عملی', icon: '💻' },
  { key: 'pool', label: 'پول', hint: 'یه قدم واقعی سمت درآمد', icon: '💰' },
  { key: 'badan', label: 'بدن', hint: 'تمرین یا حرکت امروز', icon: '🏋️' },
  { key: 'ertebat', label: 'ارتباط', hint: 'یه گفتگوی معنادار امروز', icon: '🗣️' },
  { key: 'roshd', label: 'رشد', hint: '۲۰ دقیقه مطالعه‌ی با معنا', icon: '📚' },
];

const COOKIE_NAME = 'daily_tracker_v1';
const HISTORY_DAYS = 30;

/* ────────────────────────────────────────────────────────────
   تاریخ (لوکال)
──────────────────────────────────────────────────────────── */

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(dateStr: string, delta: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + delta);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

const WEEKDAY_FULL = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];

function weekdayFull(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return WEEKDAY_FULL[new Date(y, m - 1, d).getDay()];
}

function toFaDigits(input: string | number): string {
  const map: Record<string, string> = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };
  return String(input).replace(/[0-9]/g, (c) => map[c]);
}

/* ────────────────────────────────────────────────────────────
   کوکی
──────────────────────────────────────────────────────────── */

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function writeCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

type Store = { habits: Record<HabitKey, { history: string[] }> };

function emptyStore(): Store {
  return {
    habits: {
      zehn: { history: [] },
      mahart: { history: [] },
      pool: { history: [] },
      badan: { history: [] },
      ertebat: { history: [] },
      roshd: { history: [] },
    },
  };
}

function loadStore(): Store {
  const raw = readCookie(COOKIE_NAME);
  if (!raw) return emptyStore();
  try {
    const parsed = JSON.parse(raw) as Store;
    const store = emptyStore();
    (Object.keys(store.habits) as HabitKey[]).forEach((k) => {
      if (parsed.habits?.[k]?.history) store.habits[k] = { history: parsed.habits[k].history };
    });
    return store;
  } catch {
    return emptyStore();
  }
}

function saveStore(store: Store) {
  writeCookie(COOKIE_NAME, JSON.stringify(store));
}

function currentStreak(history: string[]): number {
  const set = new Set(history);
  const today = todayStr();
  let cursor = set.has(today) ? today : addDays(today, -1);
  if (!set.has(cursor)) return 0;
  let streak = 0;
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function lastNDays(n: number): string[] {
  const today = todayStr();
  return Array.from({ length: n }, (_, i) => addDays(today, -(n - 1 - i)));
}

/* ────────────────────────────────────────────────────────────
   کامپوننت
──────────────────────────────────────────────────────────── */

export default function Page() {
  const [store, setStore] = useState<Store | null>(null);
  const [popKey, setPopKey] = useState<HabitKey | null>(null);
  const today = todayStr();

  useEffect(() => {
    setStore(loadStore());
  }, []);

  useEffect(() => {
    if (store) saveStore(store);
  }, [store]);

  const toggleHabit = (key: HabitKey) => {
    setStore((prev) => {
      if (!prev) return prev;
      const history = new Set(prev.habits[key].history);
      if (history.has(today)) {
        history.delete(today);
      } else {
        history.add(today);
        setPopKey(key);
        setTimeout(() => setPopKey(null), 500);
      }
      return { ...prev, habits: { ...prev.habits, [key]: { history: Array.from(history) } } };
    });
  };

  if (!store) {
    return <div className="min-h-screen bg-[#0E1116]" />;
  }

  const totalDone = HABITS.filter((h) => store.habits[h.key].history.includes(today)).length;
  const pct = (totalDone / HABITS.length) * 100;
  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0E1116] text-[#EDEFF3] font-[Vazirmatn] pb-28 relative overflow-hidden"
    >
      {/* گرادیان پس‌زمینه */}
      <div className="pointer-events-none absolute -top-24 right-1/2 translate-x-1/2 w-105 h-105 rounded-full bg-[#E7A83D]/10 blur-3xl animate-[floatOrb_7s_ease-in-out_infinite]" />
      <div
        className="pointer-events-none absolute top-40 -left-20 w-70 h-[28
      0px] rounded-full bg-[#4FA88A]/10 blur-3xl animate-[floatOrb_7s_ease-in-out_infinite] [animation-delay:2s]"
      />

      <div className="relative max-w-md mx-auto px-4 pt-10">
        {/* هدر */}
        <header
          className="opacity-0 animate-[riseIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] flex items-center justify-between mb-9"
          style={{ animationDelay: '40ms' }}
        >
          <div>
            <p className="text-[13px] text-[#8891A0] mb-1">{weekdayFull(today)}</p>
            <h1 className="text-[26px] font-extrabold tracking-tight">چک‌لیست امروز</h1>
          </div>

          <div className="relative w-18 h-18 shrink-0">
            <svg width="72" height="72" viewBox="0 0 80 80" className="-rotate-90">
              <circle cx="40" cy="40" r={R} fill="none" stroke="#20242D" strokeWidth="7" />
              <circle
                cx="40"
                cy="40"
                r={R}
                fill="none"
                stroke="#E7A83D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (pct / 100) * C}
                className="transition-[stroke-dashoffset] duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[15px] font-bold tabular-nums text-[#E7A83D]">
                {toFaDigits(totalDone)}/{toFaDigits(HABITS.length)}
              </span>
            </div>
          </div>
        </header>

        {/* کارت‌ها */}
        <div className="space-y-3">
          {HABITS.map((h, i) => {
            const history = store.habits[h.key].history;
            const doneToday = history.includes(today);
            const streak = currentStreak(history);
            const days = lastNDays(HISTORY_DAYS);
            const recentCount = history.filter((d) => days.includes(d)).length;

            return (
              <div
                key={h.key}
                className={`opacity-0 animate-[riseIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] rounded-2xl border p-4 transition-colors duration-300 ${
                  doneToday ? 'bg-[#1B1F27] border-[#E7A83D]/35' : 'bg-[#171B22] border-[#242A34]'
                } ${popKey === h.key ? 'animate-[glowFlash_0.6s_ease-out]' : ''}`}
                style={{ animationDelay: `${120 + i * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{h.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold leading-tight">{h.label}</p>
                      <p className="text-[12.5px] text-[#7A8190] truncate">{h.hint}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleHabit(h.key)}
                    aria-label={`${h.label} امروز انجام شد`}
                    className={`shrink-0 w-8 h-8 rounded-[10px] border-[1.5px] flex items-center justify-center text-[15px] transition-all duration-200 ${
                      doneToday
                        ? 'bg-[#E7A83D] border-[#E7A83D] text-[#0E1116]'
                        : 'border-[#333A47] text-transparent hover:border-[#4A5364]'
                    } ${popKey === h.key ? 'animate-[popCheck_0.45s_cubic-bezier(0.34,1.56,0.64,1)]' : ''}`}
                  >
                    ✓
                  </button>
                </div>

                <div className="flex items-baseline justify-between mt-3.5 mb-2.5">
                  <span className="text-[12.5px] font-semibold tabular-nums text-[#E7A83D]">
                    {streak > 0 ? `🔥 ${toFaDigits(streak)} روزه` : 'شروع نشده'}
                  </span>
                  <span className="text-[11.5px] tabular-nums text-[#565C69]">
                    {toFaDigits(recentCount)} از {toFaDigits(HISTORY_DAYS)} روز
                  </span>
                </div>

                <div className="grid grid-cols-10 gap-1">
                  {days.map((d) => (
                    <div
                      key={d}
                      title={d}
                      className={`aspect-square rounded-sm border-[1.5px] transition-colors duration-300 ${
                        history.includes(d) ? 'bg-[#E7A83D] border-[#E7A83D]' : 'border-[#242A34]'
                      } ${d === today && !history.includes(d) ? 'border-[#5A6273]' : ''}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
