/**
 * Tiny JSON fetch helper for admin pages.
 * Throws a Persian error message when the API fails.
 */
export async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || 'خطای نامشخص');
  }
  return data as T;
}
