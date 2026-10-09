"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` once the returned ref scrolls into
 * view. Respects reduced motion (jumps straight to the target).
 */
export function useCountUp(target: number, durationMs = 1400): {
  ref: React.RefObject<HTMLSpanElement | null>;
  value: number;
} {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      started.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}
