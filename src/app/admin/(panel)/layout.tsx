import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import AdminShell from '@/components/admin/AdminShell';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export const metadata = {
  title: 'پنل مدیریت',
  robots: { index: false, follow: false },
};

/**
 * Admin panel layout — server-side auth guard.
 * Anything under /admin (except /admin/login) requires a valid session.
 */
export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  let unread = 0;
  try {
    unread = await db.message.count({ where: { read: false } });
  } catch {
    /* DB unavailable — badge stays 0 */
  }

  return (
    <AdminShell username={session.username} unread={unread}>
      {children}
    </AdminShell>
  );
}
