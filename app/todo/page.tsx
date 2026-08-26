'use client';

import { useEffect, useRef, useState } from 'react';
import { TASKS, TRIGGERS, todayStr, toFaDigits } from '@/lib/tasks';

type DayRecord = {
  date: string;
  tasks: Record<string, boolean>;
  habit: 'clean' | 'slip' | null;
  triggers: string[];
  habitNote: string;
  note: string;
};

type HistoryDay = {
  date: string;
  tasks: Record<string, boolean>;
  habit: 'clean' | 'slip' | null;
};

type History = {
  days: HistoryDay[];
  currentStreak: number;
  longestStreak: number;
  weekRate: number;
};

const TODAY = todayStr();

function emptyDay(date: string): DayRecord {
  return { date, tasks: {}, habit: null, triggers: [], habitNote: '', note: '' };
}

export default function Home() {
  const [day, setDay] = useState<DayRecord>(emptyDay(TODAY));
  const [history, setHistory] = useState<History | null>(null);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      const [dayRes, histRes] = await Promise.all([
        fetch(`/api/day?date=${TODAY}`).then((r) => r.json()),
        fetch(`/api/history?days=35`).then((r) => r.json()),
      ]);
      setDay({ ...emptyDay(TODAY), ...dayRes, triggers: dayRes.triggers ?? [] });
      setHistory(histRes);
      setLoaded(true);
    })();
  }, []);

  function scheduleSave(next: DayRecord) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      await fetch('/api/day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      });
      const histRes = await fetch(`/api/history?days=35`).then((r) => r.json());
      setHistory(histRes);
      setSaving(false);
    }, 400);
  }

  function update(patch: Partial<DayRecord>) {
    setDay((prev) => {
      const next = { ...prev, ...patch };
      scheduleSave(next);
      return next;
    });
  }

  function toggleTask(id: string) {
    update({ tasks: { ...day.tasks, [id]: !day.tasks[id] } });
  }

  function setHabit(v: 'clean' | 'slip') {
    update({ habit: day.habit === v ? null : v });
  }

  function toggleTrigger(t: string) {
    const set = new Set(day.triggers);
    set.has(t) ? set.delete(t) : set.add(t);
    update({ triggers: Array.from(set) });
  }

  async function resetAll() {
    if (!confirm('Delete all saved data? This is irreversible.')) return;
    await fetch('/api/day', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emptyDay(TODAY)),
    });
    location.reload();
  }

  const doneCount = TASKS.filter((t) => day.tasks[t.id]).length;
  const progress = Math.round((doneCount / TASKS.length) * 100);

  const perfectDays =
    history?.days.filter((d) => {
      const done = TASKS.filter((t) => d.tasks[t.id]).length;
      return done === TASKS.length;
    }).length || 0;

  if (!loaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0b0d14]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-[#94a3b8] font-medium tracking-wide">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main dir="ltr" className="min-h-screen w-full text-white overflow-x-hidden">
      {/* Main Content - Responsive Grid */}
      <main className="px-3 mt-20 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6">
          {/* Left Column - Mobile First: Progress & Stats */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-[#13151f] to-[#0f1117] border border-white/[0.06] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
                  <svg className="w-14 h-14 sm:w-16 sm:h-16 -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="url(#grad1)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                      className="transition-all duration-700 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold">{progress}%</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate">
                    Today's Progress
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#64748b] mt-0.5">
                    {doneCount} of {TASKS.length}
                  </p>
                  <div className="mt-1.5 sm:mt-2 h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#8B5CF6] to-[#6366f1]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
              <StatCard
                value={toFaDigits(history?.currentStreak ?? 0)}
                label="Streak"
                icon="🔥"
                color="from-[#3fb950]/20 to-[#3fb950]/5"
                border="border-[#3fb950]/20"
                text="text-[#3fb950]"
              />
              <StatCard
                value={toFaDigits(history?.longestStreak ?? 0)}
                label="Best"
                icon="🏆"
                color="from-[#d29922]/20 to-[#d29922]/5"
                border="border-[#d29922]/20"
                text="text-[#d29922]"
              />
              <StatCard
                value={toFaDigits(perfectDays)}
                label="Perfect"
                icon="💎"
                color="from-[#8B5CF6]/20 to-[#8B5CF6]/5"
                border="border-[#8B5CF6]/20"
                text="text-[#8B5CF6]"
              />
              <StatCard
                value={`${toFaDigits(history?.weekRate ?? 0)}%`}
                label="Week"
                icon="📈"
                color="from-[#38bdf8]/20 to-[#38bdf8]/5"
                border="border-[#38bdf8]/20"
                text="text-[#38bdf8]"
              />
            </div>

            {/* Habit Section */}
            <div className="bg-gradient-to-br from-[#13151f] to-[#0f1117] border border-white/[0.06] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-base sm:text-lg">🧠</span>
                <h2 className="text-[10px] sm:text-xs font-bold text-[#94a3b8] uppercase tracking-widest">
                  Daily Habit
                </h2>
              </div>

              <div className="flex gap-2 sm:gap-2.5 mb-3">
                <button
                  onClick={() => setHabit('clean')}
                  className={`flex-1 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 ${day.habit === 'clean' ? 'bg-[#3fb950]/10 border-[#3fb950]/40 text-[#3fb950] shadow-lg shadow-[#3fb950]/10' : 'bg-white/[0.02] border-white/[0.06] text-[#64748b] hover:border-[#3fb950]/30'}`}
                >
                  ✓ Clean
                </button>
                <button
                  onClick={() => setHabit('slip')}
                  className={`flex-1 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all duration-200 ${day.habit === 'slip' ? 'bg-[#f85149]/10 border-[#f85149]/40 text-[#f85149] shadow-lg shadow-[#f85149]/10' : 'bg-white/[0.02] border-white/[0.06] text-[#64748b] hover:border-[#f85149]/30'}`}
                >
                  ✗ Slip
                </button>
              </div>

              {day.habit === 'slip' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
                    {TRIGGERS.map((t) => (
                      <button
                        key={t}
                        onClick={() => toggleTrigger(t)}
                        className={`text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded-lg border transition-all ${day.triggers.includes(t) ? 'bg-[#f85149]/10 border-[#f85149]/40 text-[#f85149]' : 'bg-white/[0.02] border-white/[0.06] text-[#64748b] hover:border-[#f85149]/20'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={day.habitNote}
                    onChange={(e) => update({ habitNote: e.target.value })}
                    placeholder="What triggered it?"
                    className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs p-2.5 sm:p-3 min-h-[50px] sm:min-h-[60px] resize-none text-white placeholder-[#475569] focus:border-[#8B5CF6]/40 transition-all outline-none"
                  />
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <div className="font-mono text-[10px] sm:text-[11px] text-[#475569] bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]">
                  {(history?.currentStreak ?? 0) > 0 ? (
                    <span>
                      Streak: <b className="text-[#3fb950]">{toFaDigits(history!.currentStreak)}</b>{' '}
                      days — keep going!
                    </span>
                  ) : (
                    'Start today. Every day builds your legacy.'
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Checklist */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#13151f] to-[#0f1117] border border-white/[0.06] rounded-2xl shadow-2xl shadow-black/40 h-full flex flex-col">
              <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-white/[0.04] flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">📋</span>
                  <h2 className="text-[10px] sm:text-xs font-bold text-[#94a3b8] uppercase tracking-widest">
                    Today's Checklist
                  </h2>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 sm:px-3 py-1 rounded-full border border-[#8B5CF6]/20">
                  {doneCount}/{TASKS.length}
                </span>
              </div>

              <div className="p-2 sm:p-3 space-y-1 max-h-[350px] sm:max-h-[400px] md:max-h-[500px] overflow-y-auto custom-scrollbar">
                {TASKS.map((t) => {
                  const done = !!day.tasks[t.id];
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      className={`group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl border transition-all duration-200 cursor-pointer ${done ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-white/[0.03] border-white/[0.06] hover:border-[#8B5CF6]/30 hover:bg-white/[0.05]'}`}
                    >
                      <div
                        className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${done ? 'bg-gradient-to-br from-[#8B5CF6] to-[#6366f1] border-transparent shadow-lg shadow-[#8B5CF6]/20' : 'border-white/[0.1] group-hover:border-[#8B5CF6]/40'}`}
                      >
                        {done && (
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs sm:text-sm font-medium transition-all ${done ? 'text-[#475569] line-through' : 'text-white'}`}
                        >
                          {t.title}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#475569] mt-0.5">
                          {t.meta}
                        </div>
                      </div>
                      <div className="shrink-0 font-mono text-[9px] sm:text-[10px] text-[#64748b] bg-white/[0.04] border border-white/[0.06] rounded-md px-1.5 sm:px-2 py-0.5 sm:py-1">
                        P{t.prio}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Heatmap & Note */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            {/* Heatmap */}
            <div className="bg-gradient-to-br from-[#13151f] to-[#0f1117] border border-white/[0.06] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-base sm:text-lg">📊</span>
                <h2 className="text-[10px] sm:text-xs font-bold text-[#94a3b8] uppercase tracking-widest">
                  Heatmap
                </h2>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {history?.days.map((d) => {
                  const doneN = TASKS.filter((t) => d.tasks[t.id]).length;
                  const ratio = doneN / TASKS.length;
                  let bg = 'bg-white/[0.03]';
                  let border = 'border-white/[0.04]';
                  if (ratio > 0.75) {
                    bg = 'bg-[#8B5CF6]';
                    border = 'border-[#8B5CF6]/50';
                  } else if (ratio > 0.45) {
                    bg = 'bg-[#6366f1]';
                    border = 'border-[#6366f1]/50';
                  } else if (ratio > 0.1) {
                    bg = 'bg-[#4f46e5]';
                    border = 'border-[#4f46e5]/50';
                  }
                  const isToday = d.date === TODAY;
                  return (
                    <div
                      key={d.date}
                      title={`${d.date}: ${doneN}/${TASKS.length}`}
                      className={`relative aspect-square rounded-lg border transition-all hover:scale-110 ${isToday ? 'ring-2 ring-[#8B5CF6] ring-offset-2 ring-offset-[#0b0d14]' : ''} ${bg} ${border}`}
                    >
                      {d.habit === 'slip' && (
                        <span className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#f85149] bottom-0.5 right-0.5 shadow-sm" />
                      )}
                      {doneN === TASKS.length && (
                        <span className="absolute inset-0 flex items-center justify-center text-[7px] sm:text-[9px]">
                          ⭐
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center gap-2 sm:gap-3 justify-end flex-wrap">
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[#475569]">
                  <span>Low</span>
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded bg-white/[0.03] border border-white/[0.06]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded bg-[#4f46e5]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded bg-[#6366f1]" />
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded bg-[#8B5CF6]" />
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-[#475569]">
                  <span className="flex items-center gap-0.5 sm:gap-1">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#f85149]" />
                    Slip
                  </span>
                  <span className="flex items-center gap-0.5 sm:gap-1">⭐Perfect</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-gradient-to-br from-[#13151f] to-[#0f1117] border border-white/[0.06] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/40">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-base sm:text-lg">📝</span>
                <h2 className="text-[10px] sm:text-xs font-bold text-[#94a3b8] uppercase tracking-widest">
                  Daily Note
                </h2>
              </div>
              <textarea
                value={day.note}
                onChange={(e) => update({ note: e.target.value })}
                placeholder="What did you learn or feel today?"
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs sm:text-sm p-2.5 sm:p-3 min-h-[60px] sm:min-h-[80px] resize-none text-white placeholder-[#475569] focus:border-[#8B5CF6]/40 transition-all outline-none"
              />
            </div>

            {/* Reset */}
            <button
              onClick={resetAll}
              className="w-full text-[10px] sm:text-[11px] text-[#475569] text-center py-2 hover:text-[#f85149] transition-colors"
            >
              Reset Today's Record
            </button>
          </div>
        </div>
      </main>
    </main>
  );
}

function StatCard({
  value,
  label,
  icon,
  color,
  border,
  text,
}: {
  value: string;
  label: string;
  icon: string;
  color: string;
  border: string;
  text: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} border ${border} rounded-xl px-2 py-2.5 sm:py-3 text-center backdrop-blur-sm`}
    >
      <div className="text-sm sm:text-base mb-0.5">{icon}</div>
      <div className={`font-mono text-base sm:text-lg font-bold ${text}`}>{value}</div>
      <div className="text-[9px] sm:text-[10px] text-[#64748b] mt-0.5 leading-tight font-medium">
        {label}
      </div>
    </div>
  );
}
