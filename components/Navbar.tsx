import { Circle } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-1.5 lg:top-3 z-30 flex items-center justify-between px-6 py-4 uppercase tracking-[0.2em] text-zinc-500 sm:px-10">
      <Link href={'/'} className="text-zinc-300">
        pirroot
      </Link>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <Circle className="h-2 w-2 fill-cyan-300 text-cyan-300" />
          <Link href={'/todo'} className="text-zinc-300">
            برنامه روزانه
          </Link>
        </span>
      </div>
    </header>
  );
}
