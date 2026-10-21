'use client';

import { useEffect, useState } from 'react';

/**
 * Live Tehran wall-clock, formatted as HH:MM:SS (24h).
 * Returns `'--:--:--'` on first render (server & client) to avoid
 * hydration mismatch; real time appears after mount.
 */
export function useTehranClock(): string {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tehran',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
