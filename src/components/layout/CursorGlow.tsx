"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";

/**
 * Golden custom cursor.
 *
 * - A solid gold dot tracks the pointer 1:1.
 * - A gold ring trails it with eased lerp and expands over interactive elements.
 * - A soft radial gold glow follows further behind for depth.
 *
 * Only runs on fine-pointer (mouse) devices. Under prefers-reduced-motion the
 * trailing/glow is pinned to the pointer (no easing). The native cursor is
 * hidden while active, except on text inputs where the caret stays useful.
 */
export function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!ring || !dot || !glow) return;

    const root = document.documentElement;
    root.classList.add("cursor-glow-active");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf = 0;
    let shown = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const reveal = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      glow.style.opacity = "1";
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      reveal();
      place(dot, mouseX, mouseY);
      if (reduce) {
        place(ring, mouseX, mouseY);
        place(glow, mouseX, mouseY);
      }
      // Invert cursor to white when hovering over dark (obsidian) sections
      const overDark = !!(e.target as HTMLElement | null)?.closest("[data-cursor-light]");
      dot.classList.toggle("is-light", overDark);
      ring.classList.toggle("is-light", overDark);
      glow.classList.toggle("is-light", overDark);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE)) ring.classList.add("is-hover");
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE)) ring.classList.remove("is-hover");
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      glow.style.opacity = "0";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      glowX += (mouseX - glowX) * 0.09;
      glowY += (mouseY - glowY) * 0.09;
      place(ring, ringX, ringY);
      place(glow, glowX, glowY);
      raf = requestAnimationFrame(tick);
    };

    place(dot, mouseX, mouseY);
    place(ring, ringX, ringY);
    place(glow, glowX, glowY);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    document.addEventListener("mouseleave", onLeave);
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      document.removeEventListener("mouseleave", onLeave);
      root.classList.remove("cursor-glow-active");
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
