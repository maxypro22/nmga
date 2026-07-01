"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import {
  getDictionary,
  localeFromPathname,
  stripLocale,
  withLocale,
} from "@/lib/i18n";

const NAV_HREFS: ReadonlyArray<{ href: string; key: "home" | "about" | "divisions" | "careers" | "newsroom" | "contact" }> = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/divisions", key: "divisions" },
  { href: "/careers", key: "careers" },
  { href: "/newsroom", key: "newsroom" },
  { href: "/contact", key: "contact" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dict = getDictionary(locale);
  const d = dict.nav;
  const neutralPath = stripLocale(pathname ?? "/");
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const t = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 80);
      return () => window.clearTimeout(t);
    }
    triggerRef.current?.focus();
  }, [isOpen, triggerRef]);

  function onTrapKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !drawerRef.current) return;
    const focusables = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => !el.hasAttribute("aria-hidden"));
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (active === first || !drawerRef.current.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function isActive(href: string) {
    if (href === "/") return neutralPath === "/";
    return neutralPath === href || neutralPath.startsWith(`${href}/`);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isOpen}
        onKeyDown={onTrapKeyDown}
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col overflow-y-auto bg-[var(--color-obsidian)] text-[var(--color-ivory)] shadow-2xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-serif text-sm tracking-[0.5em] text-[var(--color-ivory)]">
            NMJ
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold)]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Primary" className="px-6 pt-12">
          <ul>
            {NAV_HREFS.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-white/10">
                  <Link
                    href={withLocale(link.href, locale)}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="group relative flex items-center py-5 font-serif text-[28px] leading-tight tracking-[-0.005em] text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]"
                  >
                    {active ? (
                      <span
                        aria-hidden
                        className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-gold)] rtl:-right-3 rtl:left-auto"
                      />
                    ) : null}
                    {d[link.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6 pt-10">
          <Link
            href={withLocale("/contact", locale)}
            onClick={onClose}
            className="inline-flex w-full items-center justify-center border border-[var(--color-gold-subtle)] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
          >
            {dict.mobileMenu.contactUs}
          </Link>
        </div>

        <section
          aria-labelledby="mobile-contact-heading"
          className="mt-12 border-t border-white/10 px-6 py-10"
        >
          <h2
            id="mobile-contact-heading"
            className="text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--color-gold)]"
          >
            {dict.mobileMenu.getInTouch}
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href="tel:+97444440085"
                onClick={onClose}
                className="inline-block border-b border-[var(--color-gold-subtle)] pb-1 text-base text-[var(--color-ivory)] transition-colors hover:border-white"
              >
                +974 4444 0085
              </a>
            </li>
            <li>
              <a
                href="mailto:info@nmj-group.qa"
                onClick={onClose}
                className="inline-block border-b border-[var(--color-gold-subtle)] pb-1 text-base text-[var(--color-ivory)] transition-colors hover:border-white"
              >
                info@nmj-group.qa
              </a>
            </li>
          </ul>
          <address className="mt-6 text-[13px] not-italic leading-relaxed text-[rgba(255,255,255,0.55)]">
            {dict.mobileMenu.address}
          </address>
        </section>
      </div>
    </div>
  );
}
