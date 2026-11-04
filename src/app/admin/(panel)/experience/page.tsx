'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';

import { api } from '@/lib/adminFetch';
import { toFa } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface ExpRow {
  id: string;
  order: number;
  company: string;
  role: string;
  period: string;
  desc: string;
  tags: string;
  current: boolean;
  visible: boolean;
}

const EMPTY = {
  company: '',
  role: '',
  period: '',
  desc: '',
  tags: '',
  current: false,
  visible: true,
};

export default function AdminExperiencePage() {
  const [rows, setRows] = useState<ExpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ExpRow | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await api<ExpRow[]>('/api/admin/experience'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (r: ExpRow) => {
    let tags = r.tags;
    try {
      tags = (JSON.parse(r.tags) as string[]).join('، ');
    } catch {
      /* keep raw */
    }
    setEditing(r);
    setForm({
      company: r.company,
      role: r.role,
      period: r.period,
      desc: r.desc,
      tags,
      current: r.current,
      visible: r.visible,
    });
    setOpen(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api(`/api/admin/experience/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) });
      } else {
        await api('/api/admin/experience', { method: 'POST', body: JSON.stringify(form) });
      }
      setOpen(false);
      await load();
    } catch (e2) {
      alert(e2 instanceof Error ? e2.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r: ExpRow) => {
    if (!confirm(`سابقه «${r.company}» حذف شود؟`)) return;
    try {
      await api(`/api/admin/experience/${r.id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const toggleVisible = async (r: ExpRow) => {
    try {
      await api(`/api/admin/experience/${r.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...r,
          tags: (() => {
            try {
              return JSON.parse(r.tags) as string[];
            } catch {
              return r.tags;
            }
          })(),
          visible: !r.visible,
        }),
      });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const inputCls = 'bg-[#0B1210]/70 border-[#EDF3EF]/10 text-[#EDF3EF] placeholder:text-[#5E786E]';

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#EDF3EF]">سوابق کاری</h1>
          <p className="mt-1 text-xs text-[#7C948B]">
            تگ‌ها رو با «،» یا «,» جدا کن. ترتیب کوچیک‌تر = بالاتر در تایم‌لاین.
          </p>
        </div>
        <Button onClick={openNew} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
          <Plus size={16} className="me-1" />
          سابقه جدید
        </Button>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#121C19]" />
          ))}
        </div>
      ) : error ? (
        <p className="mt-6 rounded-xl border border-[#E9765C]/30 bg-[#E9765C]/10 px-4 py-3 text-xs font-semibold text-[#E9765C]">
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#EDF3EF]/15 px-4 py-12 text-center text-sm text-[#7C948B]">
          هنوز سابقه‌ای ثبت نکردی.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((r) => {
            let tagList: string[] = [];
            try {
              tagList = JSON.parse(r.tags) as string[];
            } catch {
              tagList = [];
            }
            return (
              <li
                key={r.id}
                className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-4 transition-colors hover:border-[#E9B44C]/30 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-[#3E5A51]">{toFa(r.order)}</span>
                      <h3 className="text-sm font-bold text-[#EDF3EF]">{r.company}</h3>
                      {r.current && (
                        <Badge className="bg-[#7FDBB6]/15 text-[10px] text-[#7FDBB6]">اکنون</Badge>
                      )}
                      {!r.visible && (
                        <Badge className="bg-[#E9765C]/15 text-[10px] text-[#E9765C]">مخفی</Badge>
                      )}
                      <span className="ms-auto text-[11px] text-[#7C948B]">{r.period}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-[#9FB6AE]">{r.role}</div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8AA398]">{r.desc}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tagList.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-[#EDF3EF]/10 px-1.5 py-0.5 font-mono text-[10px] text-[#7C948B]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleVisible(r)}
                      aria-label={r.visible ? 'مخفی کردن' : 'نمایش'}
                      title={r.visible ? 'مخفی کردن' : 'نمایش'}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE] transition-colors hover:border-[#7FDBB6]/50 hover:text-[#7FDBB6]"
                    >
                      {r.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(r)}
                      aria-label="ویرایش"
                      title="ویرایش"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE] transition-colors hover:border-[#E9B44C]/50 hover:text-[#E9B44C]"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(r)}
                      aria-label="حذف"
                      title="حذف"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#EDF3EF]/10 text-[#9FB6AE] transition-colors hover:border-[#E9765C]/50 hover:text-[#E9765C]"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* دیالوگ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#EDF3EF]/10 bg-[#121C19] sm:max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-[#EDF3EF]">
              {editing ? 'ویرایش سابقه کاری' : 'سابقه کاری جدید'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={save} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="e-company" className="text-[#9FB6AE]">شرکت *</Label>
                <Input
                  id="e-company"
                  required
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="e-period" className="text-[#9FB6AE]">بازه زمانی</Label>
                <Input
                  id="e-period"
                  placeholder="۱۴۰۲ — ۱۴۰۴"
                  value={form.period}
                  onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="e-role" className="text-[#9FB6AE]">سمت</Label>
              <Input
                id="e-role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="e-desc" className="text-[#9FB6AE]">توضیحات</Label>
              <Textarea
                id="e-desc"
                rows={3}
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="e-tags" className="text-[#9FB6AE]">تگ‌ها (با ، جدا کن)</Label>
              <Input
                id="e-tags"
                placeholder="Next.js، Fast Api، PostgreSQL"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/40 px-3 py-2.5">
                <Label htmlFor="e-current" className="text-sm text-[#9FB6AE]">شغل فعلی</Label>
                <Switch
                  id="e-current"
                  checked={form.current}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, current: v }))}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/40 px-3 py-2.5">
                <Label htmlFor="e-visible" className="text-sm text-[#9FB6AE]">نمایش در سایت</Label>
                <Switch
                  id="e-visible"
                  checked={form.visible}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, visible: v }))}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-[#EDF3EF]/15 text-[#9FB6AE]"
              >
                انصراف
              </Button>
              <Button type="submit" disabled={saving} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
                {saving ? 'در حال ذخیره…' : 'ذخیره'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
