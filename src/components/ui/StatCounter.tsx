"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  /** Final value to count up to. */
  value: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Appended after the number (e.g. "%", "+"). */
  suffix?: string;
  className?: string;
}

/**
 * Counts up from 0 to `value` once it scrolls into view, using an
 * easeOutCubic curve. Renders the final value immediately when the user
 * prefers reduced motion.
 */
export function StatCounter({
  value,
  duration = 1400,
  suffix = "",
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(eased * value));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
