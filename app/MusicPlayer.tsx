'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

type MusicPlayerProps = {
  src?: string;
  title?: string;
  loop?: boolean;
  className?: string;
};

export default function MusicPlayer({
  src = '/m.mp3',
  loop = true,
  className = '',
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause();
    else el.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <div className={`fixed bottom-0 right-2 z-10 ${className}`}>
      <audio ref={audioRef} src={src} loop={loop} onEnded={() => setPlaying(false)} />

      <div className="max-w-md mx-auto m-3 rounded-3xl bg-[#171B22]/10 backdrop-blur border-[#262C36] p-2 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <a
          href={'/me'}
          className="shrink-0 w-8 h-8 rounded-full bg-[#E7A83D] text-[#0E1116] flex items-center justify-center text-[15px]"
        >
          Dev
        </a>
        <button
          onClick={togglePlay}
          aria-label={playing ? 'توقف آهنگ' : 'پخش آهنگ'}
          className="shrink-0 w-8 h-8 rounded-full bg-[#E7A83D] text-[#0E1116] flex items-center justify-center text-[15px]"
        >
          {playing ? '❚❚' : '▶'}
        </button>

        <div className="flex items-end gap-0.75 h-4 shrink-0">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full ${
                playing ? 'bg-[#4FA88A] animate-[eq_0.9s_ease-in-out_infinite]' : 'bg-[#333A47] h-1'
              }`}
              style={playing ? { animationDelay: `${i * 0.12}s` } : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
