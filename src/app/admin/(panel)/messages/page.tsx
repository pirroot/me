'use client';

import { useEffect, useState } from 'react';
import { Check, Mail, MailOpen, Trash2, Trash } from 'lucide-react';

import { api } from '@/lib/adminFetch';
import { toFa } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MessageRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  body: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [rows, setRows] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await api<MessageRow[]>('/api/admin/messages'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطا');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const toggleRead = async (m: MessageRow) => {
    try {
      await api(`/api/admin/messages/${m.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ read: !m.read }),
      });
      setRows((rs) => rs.map((r) => (r.id === m.id ? { ...r, read: !r.read } : r)));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const remove = async (m: MessageRow) => {
    if (!confirm(`پیام ${m.name} حذف شود؟`)) return;
    try {
      await api(`/api/admin/messages/${m.id}`, { method: 'DELETE' });
      setRows((rs) => rs.filter((r) => r.id !== m.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const clearRead = async () => {
    if (!confirm('همه‌ی پیام‌های خوانده‌شده پاک شوند؟')) return;
    try {
      await api('/api/admin/messages', { method: 'DELETE' });
      await load();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'خطا');
    }
  };

  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));

  const unread = rows.filter((r) => !r.read).length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-[#EDF3EF]">صندوق پیام‌ها</h1>
          <p className="mt-1 text-xs text-[#7C948B]">
            پیام‌هایی که بازدیدکننده‌ها از فرم تماس سایت می‌فرستن.
            {unread > 0 && (
              <span className="ms-1 font-bold text-[#E9B44C]">({toFa(unread)} خوانده‌نشده)</span>
            )}
          </p>
        </div>
        {rows.some((r) => r.read) && (
          <Button
            variant="outline"
            onClick={clearRead}
            className="border-[#EDF3EF]/15 text-[#9FB6AE] hover:border-[#E9765C]/50 hover:text-[#E9765C]"
          >
            <Trash size={14} className="me-1" />
            پاک‌سازی خوانده‌شده‌ها
          </Button>
        )}
      </div>

      {loading ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-[#121C19]" />
          ))}
        </div>
      ) : error ? (
        <p className="mt-6 rounded-xl border border-[#E9765C]/30 bg-[#E9765C]/10 px-4 py-3 text-xs font-semibold text-[#E9765C]">
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-[#EDF3EF]/15 px-4 py-12 text-center text-sm text-[#7C948B]">
          صندوق خالیه — هنوز کسی پیام نفرستاده.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((m) => {
            const expanded = openId === m.id;
            return (
              <li
                key={m.id}
                className={`rounded-2xl border bg-[#121C19] transition-colors ${
                  m.read ? 'border-[#EDF3EF]/10' : 'border-[#E9B44C]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(expanded ? null : m.id)}
                  aria-expanded={expanded}
                  className="flex w-full flex-wrap items-center gap-3 p-4 text-start sm:p-5"
                >
                  <span className={`shrink-0 ${m.read ? 'text-[#3E5A51]' : 'text-[#E9B44C]'}`}>
                    {m.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[#EDF3EF]">{m.name}</span>
                      {!m.read && (
                        <Badge className="bg-[#E9B44C]/15 text-[10px] text-[#E9B44C]">جدید</Badge>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-[#7C948B]">
                      {m.subject || m.body}
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-[#7C948B]" dir="ltr">
                    {fmtDate(m.createdAt)}
                  </span>
                </button>

                {expanded && (
                  <div className="border-t border-[#EDF3EF]/10 px-4 py-4 sm:px-5">
                    {m.subject && (
                      <p className="text-xs font-semibold text-[#E9B44C]">موضوع: {m.subject}</p>
                    )}
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#C4D3CC]">
                      {m.body}
                    </p>
                    {(m.email || m.phone) && (
                      <p className="mt-3 font-mono text-xs text-[#7FDBB6]" dir="ltr">
                        {m.email || m.phone}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleRead(m)}
                        className="border-[#EDF3EF]/15 text-[#9FB6AE] hover:border-[#7FDBB6]/50 hover:text-[#7FDBB6]"
                      >
                        <Check size={14} className="me-1" />
                        {m.read ? 'علامت‌گذاری به‌عنوان جدید' : 'خوانده شد'}
                      </Button>
                      {(m.email?.includes('@') || m.phone) && (
                        <a
                          href={m.email?.includes('@') ? `mailto:${m.email}` : `tel:${m.phone}`}
                          className="inline-flex h-8 items-center rounded-md border border-[#7FDBB6]/30 bg-[#7FDBB6]/10 px-3 text-xs font-bold text-[#7FDBB6] transition-colors hover:bg-[#7FDBB6]/20"
                        >
                          پاسخ
                        </a>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => remove(m)}
                        className="border-[#EDF3EF]/15 text-[#9FB6AE] hover:border-[#E9765C]/50 hover:text-[#E9765C]"
                      >
                        <Trash2 size={14} className="me-1" />
                        حذف
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
