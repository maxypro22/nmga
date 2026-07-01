"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

interface Props {
  children: ReactNode;
  /** Auto-advance interval in ms. Default 3500. */
  autoPlayMs?: number;
}

export function CardCarousel({ children, autoPlayMs = 3500 }: Props) {
  const items = Children.toArray(children);
  const count = items.length;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef(0);

  const go = useCallback(
    (idx: number) => setCurrent(((idx % count) + count) % count),
    [count]
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(
      () => setCurrent((c) => (c + 1) % count),
      autoPlayMs
    );
  }, [count, autoPlayMs, stopTimer]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  if (count === 0) return null;
  if (count === 1) return <div>{items[0]}</div>;

  return (
    <div
      className="relative select-none"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Sliding track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            stopTimer();
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
            startTimer();
          }}
        >
          {items.map((item, i) => (
            <div key={i} className="min-w-full">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Nav: ← dots → */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          onClick={() => go(current - 1)}
          aria-label="Previous"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] active:scale-90"
        >
          <span className="block rotate-180">
            <Icon name="arrow-right" size={13} />
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-5 bg-[var(--color-gold)]"
                  : "w-1.5 bg-[var(--color-text-subtle)] opacity-60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(current + 1)}
          aria-label="Next"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] active:scale-90"
        >
          <Icon name="arrow-right" size={13} />
        </button>
      </div>
    </div>
  );
}
