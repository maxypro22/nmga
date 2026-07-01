"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal driver.
 *
 *   <h2 data-reveal>...</h2>                       fade + lift on view
 *   <p  data-reveal="fade">...</p>                 fade only
 *   <div data-reveal="left">...</div>              slide in from left
 *   <ul data-reveal-stagger="80">                  staggers immediate
 *     <li data-reveal>...</li>                     children by 80ms each
 *     <li data-reveal>...</li>
 *   </ul>
 *
 * A single IntersectionObserver handles every element on the page; a
 * MutationObserver picks up nodes added by client-side route changes.
 * Honors prefers-reduced-motion (everything is shown immediately).
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (reduced || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    function applyStaggerDelays(root: ParentNode) {
      const containers = root.querySelectorAll<HTMLElement>(
        "[data-reveal-stagger]"
      );
      containers.forEach((container) => {
        const step = Number(container.dataset.revealStagger || "100") || 100;
        const children = container.querySelectorAll<HTMLElement>(
          ":scope > [data-reveal]"
        );
        children.forEach((child, i) => {
          // Don't overwrite an explicit inline delay
          if (!child.style.getPropertyValue("--reveal-delay")) {
            child.style.setProperty("--reveal-delay", `${i * step}ms`);
          }
        });
      });
    }

    // Auto-stagger: every batch of elements that enters together (the first
    // screen on load, fresh content after a route change, or a row of cards
    // scrolling into view) cascades in document order so components appear
    // one after another rather than all at once.
    const STEP_MS = 90;
    const MAX_STEPS = 8;

    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        if (entering.length === 0) return;

        // Reveal in visual/DOM order, not the arbitrary callback order.
        entering.sort((a, b) =>
          a.target.compareDocumentPosition(b.target) &
          Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1
        );

        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          // Respect explicit/inline delays (hero sequence, stagger groups).
          if (!el.style.getPropertyValue("--reveal-delay")) {
            el.style.setProperty(
              "--reveal-delay",
              `${Math.min(i, MAX_STEPS) * STEP_MS}ms`
            );
          }
          el.classList.add("is-visible");
          observer.unobserve(el);
          // Release compositing layer once the entrance animation settles.
          el.addEventListener(
            "transitionend",
            () => { el.style.willChange = "auto"; },
            { once: true }
          );
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -64px 0px",
      }
    );

    const observed = new WeakSet<Element>();

    function observeAll(root: ParentNode = document) {
      applyStaggerDelays(root);
      root
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          if (observed.has(el)) return;
          observed.add(el);
          observer.observe(el);
        });
    }

    observeAll();

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          observeAll(node as ParentNode);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
