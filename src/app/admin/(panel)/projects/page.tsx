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

interface ProjectRow {
  id: string;
  order: number;
  title: string;
  desc: string;
  stack: string;
  href: string;
  cat: string;
  visible: boolean;
}

const EMPTY = { title: '', desc: '', stack: '', href: '', cat: 'shop', visible: true };

export default function AdminProjectsPage() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectRow | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await api<ProjectRow[]>('/api/admin/projects'));
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

  const openEdit = (r: ProjectRow) => {
    setEditing(r);
    setForm({ title: r.title, desc: r.desc, stack: r.stack, href: r.href, cat: r.cat, visible: r.visible });
    setOpen(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api(`/api/admin/projects/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) });
      } else {
        await api('/api/admin/projects', { method: 'POST', body: JSON.stringify(form) });
      }
      setOpen(false);
      await load();
    } catch (e2) {
      alert(e2 instanceof Error ? e2.message : 'خطا');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r: ProjectRow) => {
    if (!confirm(`پروژه «${r.title}» حذف شود؟`)) return;
    try {
      await api(`/api/admin/projects/${r.id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const toggleVisible = async (r: ProjectRow) => {
    try {
      await api(`/api/admin/projects/${r.id}`, { method: 'PUT', body: JSON.stringify({ ...r, visible: !r.visible }) });
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
          <h1 className="text-xl font-black text-[#EDF3EF]">مدیریت پروژه‌ها</h1>
          <p className="mt-1 text-xs text-[#7C948B]">
            ترتیب نمایش با فیلد «ترتیب» کنترل می‌شه (عدد کوچیک‌تر = بالاتر).
          </p>
        </div>
        <Button onClick={openNew} className="bg-[#E9B44C] text-[#0B1210] hover:bg-[#f0c063]">
          <Plus size={16} className="me-1" />
          پروژه جدید
        </Button>
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-[#121C19]" />
          ))}
        </div>
      ) : error ? (
        <p className="mt-6 rounded-xl border border-[#E9765C]/30 bg-[#E9765C]/10 px-4 py-3 text-xs font-semibold text-[#E9765C]">
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#EDF3EF]/15 px-4 py-12 text-center text-sm text-[#7C948B]">
          هنوز پروژه‌ای نداری — اولین پروژه‌ات رو اضافه کن!
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-[#EDF3EF]/10 bg-[#121C19] p-4 transition-colors hover:border-[#E9B44C]/30 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[#3E5A51]">{toFa(r.order)}</span>
                    <h3 className="text-sm font-bold text-[#EDF3EF]">{r.title}</h3>
                    <Badge variant="outline" className="border-[#EDF3EF]/15 text-[10px] text-[#7C948B]">
                      {r.cat === 'shop' ? 'فروشگاهی' : 'آموزشگاهی'}
                    </Badge>
                    {!r.visible && (
                      <Badge className="bg-[#E9765C]/15 text-[10px] text-[#E9765C]">مخفی</Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8AA398]">{r.desc}</p>
                  <div className="mt-1.5 font-mono text-[10px] text-[#7C948B]" dir="ltr">
                    {r.stack}
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
          ))}
        </ul>
      )}

      {/* دیالوگ ایجاد/ویرایش */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-[#EDF3EF]/10 bg-[#121C19] sm:max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-[#EDF3EF]">
              {editing ? 'ویرایش پروژه' : 'پروژه جدید'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={save} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="p-title" className="text-[#9FB6AE]">عنوان *</Label>
              <Input
                id="p-title"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="p-desc" className="text-[#9FB6AE]">توضیحات</Label>
              <Textarea
                id="p-desc"
                rows={3}
                value={form.desc}
                onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="p-stack" className="text-[#9FB6AE]">استک (لاتین)</Label>
                <Input
                  id="p-stack"
                  dir="ltr"
                  placeholder="Next.js · FastAPI"
                  value={form.stack}
                  onChange={(e) => setForm((f) => ({ ...f, stack: e.target.value }))}
                  className={inputCls}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-cat" className="text-[#9FB6AE]">دسته‌بندی</Label>
                <select
                  id="p-cat"
                  value={form.cat}
                  onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}
                  className="h-9 rounded-md border border-[#EDF3EF]/10 bg-[#0B1210]/70 px-3 text-sm text-[#EDF3EF] outline-none focus:border-[#E9B44C]/50"
                >
                  <option value="shop">فروشگاهی</option>
                  <option value="app">آموزشگاهی</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="p-href" className="text-[#9FB6AE]">لینک</Label>
              <Input
                id="p-href"
                dir="ltr"
                placeholder="https://…"
                value={form.href}
                onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                className={inputCls}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[#EDF3EF]/10 bg-[#0B1210]/40 px-3 py-2.5">
              <Label htmlFor="p-visible" className="text-sm text-[#9FB6AE]">نمایش در سایت</Label>
              <Switch
                id="p-visible"
                checked={form.visible}
                onCheckedChange={(v) => setForm((f) => ({ ...f, visible: v }))}
              />
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
