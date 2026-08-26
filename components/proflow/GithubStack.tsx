'use client';

import { useEffect, useState } from 'react';

export default function GithubStack() {
  const [stats, setStats] = useState<{
    followers: number | null;
    repos: number | null;
    stars: number | null;
  }>({ followers: null, repos: null, stars: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/pirroot`);
        const user = await userRes.json();
        const repoRes = await fetch(`https://api.github.com/users/pirroot/repos?per_page=100`);
        const repos = await repoRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((sum: number, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        if (!cancelled) {
          setStats({
            followers: user.followers ?? 0,
            repos: user.public_repos ?? 0,
            stars,
          });
        }
      } catch {
        if (!cancelled) setStats({ followers: 0, repos: 0, stars: 0 });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-6">
      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
        <span className="font-display text-2xl text-zinc-100 sm:text-3xl">
          {stats === null ? '—' : stats.followers?.toLocaleString('fa-IR')}
        </span>
        <span className=" text-[10px] uppercase tracking-[0.25em] text-zinc-500">فالوورز</span>
      </div>

      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
        <span className="font-display text-2xl text-zinc-100 sm:text-3xl">
          {stats === null ? '—' : stats.repos?.toLocaleString('fa-IR')}
        </span>
        <span className=" text-[10px] uppercase tracking-[0.25em] text-zinc-500">ریپازیتوری</span>
      </div>

      <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
        <span className="font-display text-2xl text-zinc-100 sm:text-3xl">
          {stats === null ? '—' : stats.stars?.toLocaleString('fa-IR')}
        </span>
        <span className=" text-[10px] uppercase tracking-[0.25em] text-zinc-500">استارها</span>
      </div>
    </div>
  );
}
