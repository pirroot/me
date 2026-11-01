'use client';

import { useEffect, useState } from 'react';

/**
 * Typewriter effect that cycles through `words`.
 * Types → holds → deletes → next word.
 */
export function useTypewriter(words: string[], typeMs = 65, holdMs = 1700): string {
  const [text, setText] = useState('');

  useEffect(() => {
    let word = 0;
    let pos = 0;
    let del = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const w = words[word];
      if (!del) {
        pos += 1;
        setText(w.slice(0, pos));
        if (pos === w.length) {
          del = true;
          timer = setTimeout(step, holdMs);
        } else {
          timer = setTimeout(step, typeMs);
        }
      } else {
        pos -= 1;
        setText(w.slice(0, pos));
        if (pos === 0) {
          del = false;
          word = (word + 1) % words.length;
          timer = setTimeout(step, 350);
        } else {
          timer = setTimeout(step, 32);
        }
      }
    };

    timer = setTimeout(step, 700);
    return () => clearTimeout(timer);
  }, [words, typeMs, holdMs]);

  return text;
}
