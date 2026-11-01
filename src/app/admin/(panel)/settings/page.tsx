'use client';

import { FormEvent, useEffect, useState } from 'react';
import { KeyRound, Pencil, Plus, Save, Trash2 } from 'lucide-react';

import { api } from '@/lib/adminFetch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SOCIAL_ICON_KEYS,
  SOCIAL_LABELS,
  getSocialIcon,
} from '@/lib/socialIcons';
import type { SocialIconKey } from '@/lib/data';

interface SettingsMap {
  siteName: string;
  jobTitle: string;
  heroBio: string;
  roles: string;
  stack: string;
  phone: string;
  email: string;
  karlancer: string;
  resumePdf: string;
  metaDesc: string;
}

interface SocialRow {
  id: string;
  name: string;
  handle: string;
  href: string;
  iconKey: string;
  visible: boolean;
}

const FIELDS: { key: keyof SettingsMap; label: string; hint?: string; ltr?: boolean; area?: boolean }[] = [
  { key: 'siteName', label: 'نام و نام خانوادگی' },
  { key: 'jobTitle', label: 'عنوان شغلی', hint: 'مثل: Full-Stack Web Developer', ltr: true },
  { key: 'heroBio', label: 'بایوی بخش هرو', area: true },
  { key: 'metaDesc', label: 'توضیحات متا (سئو)', area: true },
  { key: 'phone', label: 'شماره تماس', ltr: true },
  { key: 'email', label: 'ایمیل', ltr: true },
  { key: 'karlancer', label: 'لینک کارلنسر', ltr: true },
  { key: 'resumePdf', label: 'لینک رزومه PDF', ltr: true },
];

export default function AdminSettingsPage() {
  /* ── تنظیمات عمومی ── */
  const [settings, setSettings] = useState<SettingsMap | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  /* ── شبکه‌های اجتماعی ── */
  const [socials, setSocials] = useState<SocialRow[]>([]);
  const [socialOpen, setSocialOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialRow | null>(null);
  const [socialForm, setSocialForm] = useState({ name: '', handle: '', href: '', iconKey: 'github' as SocialIconKey });
  const [savingSocial, setSavingSocial] = useState(false);

  /* ── تغییر رمز ── */
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; msg: string } | null>(null);
  const [savingPw, setSavingPw] = useState(false);

  const load = async () => {
    try {
      const [s, socials] = await Promise.all([
        api<SettingsMap>('/api/admin/settings'),
        api<SocialRow[]>('/api/admin/socials'),
      ]);
      setSettings(s);
      setSocials(socials);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا در دریافت تنظیمات');
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const saveSettings = async (e: FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSavedMsg(null);
    try {
      await api('/api/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
      setSavedMsg('✅ ذخیره شد — سایت به‌روزرسانی شد.');
      window.setTimeout(() => setSavedMsg(null), 3000);
    } catch (e2) {
      alert(e2 instanceof Error ? e2.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  /* ── سوشال ── */
  const openNewSocial = () => {
    setEditingSocial(null);
    setSocialForm({ name: '', handle: '', href: '', iconKey: 'github' });
    setSocialOpen(true);
  };

  const openEditSocial = (s: SocialRow) => {
    setEditingSocial(s);
    setSocialForm({ name: s.name, handle: s.handle, href: s.href, iconKey: s.iconKey as SocialIconKey });
    setSocialOpen(true);
  };

  const saveSocial = async (e: FormEvent) => {
    e.preventDefault();
    setSavingSocial(true);
    try {
      if (editingSocial) {
        await api(`/api/admin/socials/${editingSocial.id}`, {
          method: 'PUT',
          body: JSON.stringify(socialForm),
        });
      } else {
        await api('/api/admin/socials', { method: 'POST', body: JSON.stringify(socialForm) });
      }
      setSocialOpen(false);
      await load();
    } catch (e2) {
      alert(e2 instanceof Error ? e2.message : 'خطا');
    } finally {
      setSavingSocial(false);
    }
  };

  const removeSocial = async (s: SocialRow) => {
    if (!confirm(`«${s.name}» حذف شود؟`)) return;
    try {
      await api(`/api/admin/socials/${s.id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  /* ── رمز ── */
  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.next !== pw.confirm) {
      setPwMsg({ ok: false, msg: 'تکرار رمز جدید مطابقت نداره.' });
      return;
    }
    setSavingPw(true);
    setPwMsg(null);
    try {
      await api('/api/admin/password', {
        method: 'POST',
        body: JSON.stringify({ current: pw.current, next: pw.next }),
      });
      setPwMsg({ ok: true, msg: '✅ رمز عبور عوض شد.' });
      setPw({ current: '', next: '', confirm: '' });
    } catch (e2) {
      setPwMsg({ ok: false, msg: e2 instanceof Error ? e2.message : 'خطا' });
    } finally {
      setSavingPw(false);
    }
  };

  const inputCls = 'bg-[#0B1210]/70 border-[#EDF3EF]/10 text-[#EDF3EF] placeholder:text-[#5E786E]';

  if (!settings) {
    return (
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="h-64 animate-pulse rounded-2xl bg-[#121C19]" />
        <div className="h-48 animate-pulse rounded-2xl bg-[#121C19]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* ─── تنظیمات عمومی ─── */}
      <form
        onSubmit={saveSettings}
        className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 sm:p-6"
      >
        <h1 className="text-lg font-black text-[#EDF3EF]">تنظیمات عمومی سایت</h1>
        <p className="mt-1 text-xs text-[#7C948B]">
          این اطلاعات در هدر، هرو، بخش تماس و متای سئو استفاده می‌شن.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div
              key={f.key}
              className={`grid gap-2 ${f.area ? 'sm:col-span-2' : ''}`}
            >
              <Label htmlFor={`s-${f.key}`} className="text-[#9FB6AE]">
                {f.label}
              </Label>
              {f.area ? (
                <textarea
                  id={`s-${f.key}`}
                  rows={3}
                  value={settings[f.key]}
                  onChange={(e) => setSettings((s) => (s ? { ...s, [f.key]: e.target.value } : s))}
                  className={`w-full rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-3.5 py-2.5 text-sm text-[#EDF3EF] outline-none transition-colors focus:border-[#E9B44C]/50 ${f.ltr ? 'text-left' : ''}`}
                  dir={f.ltr ? 'ltr' : undefined}
                />
              ) : (
                <Input
                  id={`s-${f.key}`}
                  value={settings[f.key]}
                  onChange={(e) => setSettings((s) => (s ? { ...s, [f.key]: e.target.value } : s))}
                  className={inputCls}
                  dir={f.ltr ? 'ltr' : undefined}
                />
              )}
              {f.hint && <p className="text-[10px] text-[#5E786E]">{f.hint}</p>}
            </div>
          ))}

          {/* نقش‌ها و استک */}
          <div className="grid gap-2">
            <Label htmlFor="s-roles" className="text-[#9FB6AE]">
              نقش‌های تایپ‌شونده (هر خط یک نقش)
            </Label>
            <textarea
              id="s-roles"
              rows={4}
              dir="ltr"
              value={(() => {
                try {
                  return (JSON.parse(settings.roles) as string[]).join('\n');
                } catch {
                  return settings.roles;
                }
              })()}
              onChange={(e) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        roles: JSON.stringify(
                          e.target.value.split('\n').map((x) => x.trim()).filter(Boolean),
                        ),
                      }
                    : s,
                )
              }
              className="w-full rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-3.5 py-2.5 text-left font-mono text-sm text-[#EDF3EF] outline-none focus:border-[#E9B44C]/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="s-stack" className="text-[#9FB6AE]">
              مهارت‌ها (با ، جدا کن)
            </Label>
            <textarea
              id="s-stack"
              rows={4}
              dir="ltr"
              value={(() => {
                try {
                  return (JSON.parse(settings.stack) as string[]).join('، ');
                } catch {
                  return settings.stack;
                }
              })()}
              onChange={(e) =>
                setSettings((s) =>
                  s
                    ? {
                        ...s,
                        stack: JSON.stringify(
                          e.target.value.split(/[،,]/).map((x) => x.trim()).filter(Boolean),
                        ),
                      }
                    : s,
                )
              }
              className="w-full rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-3.5 py-2.5 text-left font-mono text-sm text-[#EDF3EF] outline-none focus:border-[#E9B44C]/50"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" disabled={saving} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
            <Save size={15} className="me-1.5" />
            {saving ? 'در حال ذخیره…' : 'ذخیره تنظیمات'}
          </Button>
          {savedMsg && <span className="text-xs font-semibold text-[#7FDBB6]">{savedMsg}</span>}
        </div>
      </form>

      {/* ─── شبکه‌های اجتماعی ─── */}
      <section className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#EDF3EF]">شبکه‌های اجتماعی</h2>
            <p className="mt-1 text-xs text-[#7C948B]">در کارت «ارتباط با من» نمایش داده می‌شن.</p>
          </div>
          <Button onClick={openNewSocial} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
            <Plus size={15} className="me-1" />
            جدید
          </Button>
        </div>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {socials.map((s) => {
            const Icon = getSocialIcon(s.iconKey);
            return (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-xl border border-[#EDF3EF]/10 bg-[#0B1210]/50 p-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EDF3EF]/10 bg-[#121C19] text-[#7C948B]">
                  <Icon width={16} height={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-[#EDF3EF]">{s.name}</div>
                  <div className="truncate font-mono text-[10px] text-[#7C948B]" dir="ltr">
                    {s.handle} — {s.href}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openEditSocial(s)}
                  aria-label="ویرایش"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE] transition-colors hover:border-[#E9B44C]/50 hover:text-[#E9B44C]"
                >
                  <Pencil size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeSocial(s)}
                  aria-label="حذف"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE] transition-colors hover:border-[#E9765C]/50 hover:text-[#E9765C]"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ─── تغییر رمز ─── */}
      <form
        onSubmit={changePassword}
        className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-5 sm:p-6"
      >
        <h2 className="flex items-center gap-2 text-lg font-black text-[#EDF3EF]">
          <KeyRound size={17} className="text-[#E9B44C]" />
          تغییر رمز عبور
        </h2>
        <p className="mt-1 text-xs text-[#7C948B]">
          رمز پیش‌فرض «admin1234» هست — حتماً عوضش کن! (حداقل ۶ کاراکتر)
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="pw-current" className="text-[#9FB6AE]">رمز فعلی</Label>
            <Input
              id="pw-current"
              type="password"
              required
              value={pw.current}
              onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))}
              className={inputCls}
              dir="ltr"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw-next" className="text-[#9FB6AE]">رمز جدید</Label>
            <Input
              id="pw-next"
              type="password"
              required
              minLength={6}
              value={pw.next}
              onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))}
              className={inputCls}
              dir="ltr"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pw-confirm" className="text-[#9FB6AE]">تکرار رمز جدید</Label>
            <Input
              id="pw-confirm"
              type="password"
              required
              minLength={6}
              value={pw.confirm}
              onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))}
              className={inputCls}
              dir="ltr"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button type="submit" disabled={savingPw} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
            {savingPw ? 'در حال ذخیره…' : 'تغییر رمز'}
          </Button>
          {pwMsg && (
            <span className={`text-xs font-semibold ${pwMsg.ok ? 'text-[#7FDBB6]' : 'text-[#E9765C]'}`}>
              {pwMsg.msg}
            </span>
          )}
        </div>
      </form>

      {/* دیالوگ سوشال */}
      <Dialog open={socialOpen} onOpenChange={setSocialOpen}>
        <DialogContent className="border-[#EDF3EF]/10 bg-[#121C19] sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-[#EDF3EF]">
              {editingSocial ? 'ویرایش شبکه اجتماعی' : 'شبکه اجتماعی جدید'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={saveSocial} className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-[#9FB6AE]">آیکون</Label>
              <div className="flex gap-2">
                {SOCIAL_ICON_KEYS.map((key) => {
                  const Icon = getSocialIcon(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSocialForm((f) => ({ ...f, iconKey: key }))}
                      aria-pressed={socialForm.iconKey === key}
                      aria-label={SOCIAL_LABELS[key]}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                        socialForm.iconKey === key
                          ? 'border-[#E9B44C]/60 bg-[#E9B44C]/15 text-[#E9B44C]'
                          : 'border-[#EDF3EF]/10 text-[#7C948B] hover:text-[#EDF3EF]'
                      }`}
                    >
                      <Icon width={17} height={17} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="so-name" className="text-[#9FB6AE]">نام *</Label>
              <Input
                id="so-name"
                required
                placeholder="تلگرام"
                value={socialForm.name}
                onChange={(e) => setSocialForm((f) => ({ ...f, name: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="so-handle" className="text-[#9FB6AE]">آیدی نمایشی</Label>
              <Input
                id="so-handle"
                dir="ltr"
                placeholder="@pirroot"
                value={socialForm.handle}
                onChange={(e) => setSocialForm((f) => ({ ...f, handle: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="so-href" className="text-[#9FB6AE]">لینک *</Label>
              <Input
                id="so-href"
                required
                dir="ltr"
                placeholder="https://t.me/pirroot"
                value={socialForm.href}
                onChange={(e) => setSocialForm((f) => ({ ...f, href: e.target.value }))}
                className={inputCls}
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSocialOpen(false)}
                className="border-[#EDF3EF]/15 text-[#9FB6AE]"
              >
                انصراف
              </Button>
              <Button type="submit" disabled={savingSocial} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
                {savingSocial ? 'در حال ذخیره…' : 'ذخیره'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
