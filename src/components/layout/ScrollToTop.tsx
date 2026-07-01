"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; offset?: number }
  ) => void;
};

const SHOW_AFTER_PX = 480;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > SHOW_AFTER_PX);

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Conic-gradient progress ring around the button — fills with gold as you scroll.
  const ringStyle = {
    background: `conic-gradient(var(--color-gold) ${progress * 360}deg, var(--color-border) 0deg)`,
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={cn(
        "group fixed right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full p-[2px]",
        "transition-all duration-500 ease-out md:right-8 md:h-14 md:w-14",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
        "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(2rem+env(safe-area-inset-bottom,0px))]"
      )}
      style={ringStyle}
    >
      <span
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-full",
          "border border-[var(--color-border-strong)] bg-[var(--color-card-bg)]",
          "shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-xl",
          "transition-all duration-300 group-hover:border-[var(--color-gold)]",
          "group-hover:shadow-[0_14px_36px_var(--color-accent-glow-strong)]",
          "group-active:scale-95"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4 text-[var(--color-ink)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[var(--color-gold)] md:h-5 md:w-5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </button>
  );
}
