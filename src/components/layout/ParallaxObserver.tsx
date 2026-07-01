"use client";

import { useEffect } from "react";

/**
 * Parallax engine — finds all [data-parallax="speed"] elements and updates
 * the --px-y CSS custom property on each via requestAnimationFrame.
 *
 * CSS rule in globals.css handles the actual transform:
 *   [data-parallax] { transform: scale(var(--px-scale,1)) translateY(var(--px-y,0px)); }
 *
 * speed = fraction of scroll offset applied as counter-translate:
 *   0.1 → very subtle   (element moves at ~90% of scroll speed)
 *   0.2 → moderate      (~80% speed)
 *   0.3 → noticeable    (~70% speed)
 *  -0.1 → reverse       (~110% speed, "closer" layer)
 *
 * Automatically disabled under prefers-reduced-motion.
 */
export function ParallaxObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Parallax rAF on scroll adds per-frame JS work that tanks mobile framerates.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    type Item = { el: HTMLElement; speed: number };
    const items: Item[] = [];

    const collect = () => {
      items.length = 0;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach(el => {
        const speed = parseFloat(el.getAttribute("data-parallax") ?? "0");
        if (!Number.isFinite(speed) || speed === 0) return;
        items.push({ el, speed });
      });
    };

    const tick = () => {
      const vy = window.innerHeight / 2;
      for (const { el, speed } of items) {
        const { top, height } = el.getBoundingClientRect();
        // Distance between element centre and viewport centre.
        // Positive → element is below centre (hasn't been reached yet)
        // Negative → element is above centre (has been scrolled past)
        const centre = top + height / 2 - vy;
        // Negate so positive speed produces a "slow-down" (background) effect.
        el.style.setProperty("--px-y", `${(centre * -speed).toFixed(2)}px`);
      }
    };

    collect();
    tick();

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    const onResize = () => { collect(); tick(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      items.forEach(({ el }) => el.style.removeProperty("--px-y"));
    };
  }, []);

  return null;
}
