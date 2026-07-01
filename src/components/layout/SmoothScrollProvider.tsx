"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Native momentum scroll is faster on touch devices; Lenis's RAF loop
    // fights iOS inertia and causes jank on Android. Use native on mobile.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose the instance so other components (e.g. ScrollToTop) can use Lenis's
    // smooth animation instead of falling back to native window.scrollTo.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
