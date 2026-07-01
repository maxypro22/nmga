"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(scrolled / total, 1) : 0;
      bar.style.transform = `scaleX(${pct})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[9999] h-[2px] origin-left bg-[var(--color-gold)]"
      style={{ transform: "scaleX(0)", transition: "transform 0.08s linear" }}
    />
  );
}
