"use client";

import { useEffect, useRef, Children, type ReactNode } from "react";

type LenisLike = {
  on(e: "scroll", fn: (d: { scroll: number }) => void): void;
  off(e: "scroll", fn: (d: { scroll: number }) => void): void;
};

interface Props {
  children: ReactNode;
}

/**
 * Stacking scroll — the classic "overlapping card" page transition.
 *
 * Each child section gets its own pin container. Sections have increasing
 * z-index so later sections slide UP from below, covering the earlier ones.
 *
 * When section N is about to be overtaken it scales slightly (1→0.92) and
 * grows rounded corners while section N+1 scrolls up in normal flow from
 * below. Once section N+1 reaches top:0 it snaps sticky and the cycle repeats.
 *
 * Works with Lenis smooth scroll via window.__lenis.
 */
export function StackingScroll({ children }: Props) {
  const pinRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const pins = pinRefs.current.filter((p): p is HTMLDivElement => !!p);
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
    const n = cards.length;
    if (n < 2 || pins.length !== n) return;

    // Scroll distance for the scale-down transition per section
    const TRIGGER = 500;

    // Cached document-relative top for each pin container and each card's content bottom
    let pinTops: number[] = [];
    let cardBottoms: number[] = [];

    function layout() {
      // 1. Set pin container heights: content + transition room (except last)
      cards.forEach((card, i) => {
        if (i < n - 1) {
          pins[i].style.height = `${card.offsetHeight + TRIGGER}px`;
        }
      });

      // 2. After heights are written, accumulate document tops (forces reflow once)
      const firstTop = pins[0].getBoundingClientRect().top + window.scrollY;
      pinTops = [firstTop];
      for (let i = 1; i < n; i++) {
        pinTops.push(pinTops[i - 1] + pins[i - 1].offsetHeight);
      }

      // 3. Content bottom = where the transition starts for each section
      cardBottoms = cards.map((card, i) => pinTops[i] + card.offsetHeight);
    }

    function render(scrollY: number) {
      cards.forEach((card, i) => {
        if (i === n - 1) return; // last card stays pristine

        const transitionStart = cardBottoms[i];
        if (scrollY <= transitionStart) {
          card.style.transform = "";
          card.style.borderRadius = "";
          card.style.overflow = "";
        } else {
          const p = Math.min(1, (scrollY - transitionStart) / TRIGGER);
          card.style.transform = `scale(${(1 - 0.08 * p).toFixed(5)}) translateZ(0)`;
          card.style.borderRadius = `${(24 * p).toFixed(2)}px`;
          card.style.overflow = "hidden";
        }
      });
    }

    layout();
    render(window.scrollY);

    // Throttle native scroll to one rAF per frame to avoid mid-frame repaints.
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        render(window.scrollY);
        rafId = 0;
      });
    };
    const onResize = () => { layout(); render(window.scrollY); };

    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    const onLenis = ({ scroll }: { scroll: number }) => render(scroll);
    if (lenis) lenis.on("scroll", onLenis);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (lenis) lenis.off("scroll", onLenis);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const items = Children.toArray(children);
  const n = items.length;

  return (
    <>
      {items.map((child, i) => (
        <div
          key={i}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={(el: any) => { pinRefs.current[i] = el; }}
          style={{
            position: "relative",
            // Sections stack in forward order: later = higher z = slides on top
            zIndex: i + 1,
          }}
        >
          <div
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={(el: any) => { cardRefs.current[i] = el; }}
            style={{
              position: "sticky",
              top: 0,
              transformOrigin: "top center",
              willChange: "transform",
              minHeight: "100vh",
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </>
  );
}
