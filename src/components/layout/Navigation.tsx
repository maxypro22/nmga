"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { FlipText } from "@/components/ui/FlipText";
import { Icon } from "@/components/ui/Icon";
import {
  dir,
  getDictionary,
  htmlLang,
  localeFromPathname,
  stripLocale,
  swapLocalePath,
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

const TRANSPARENT_TEXT_SHADOW = "0 1px 3px rgba(0,0,0,0.35)";

function pathHasHeroImage(pathname: string | null): boolean {
  return pathname === "/" || pathname === "/ar";
}

export function Navigation() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const d = getDictionary(locale).nav;
  const neutralPath = stripLocale(pathname ?? "/");
  const hasHeroImage = pathHasHeroImage(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Keep <html dir/lang> in sync across client-side navigations between
  // the English and Arabic trees (the head script handles the first paint).
  useEffect(() => {
    document.documentElement.dir = dir[locale];
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  useEffect(() => {
    if (!hasHeroImage) {
      const id = requestAnimationFrame(() => setScrolled(true));
      return () => cancelAnimationFrame(id);
    }
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHeroImage]);

  const opaque = scrolled;
  // White styling: English locale on transparent (pre-scroll) nav over dark hero
  const white = !opaque && locale === "en";
  const shadowStyle = opaque ? undefined : { textShadow: TRANSPARENT_TEXT_SHADOW };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
          opaque
            ? "bg-[var(--color-bg-primary)]/85 backdrop-blur-xl border-b border-[var(--color-border)] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            : "bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-[85px] max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-20",
            opaque ? "text-[var(--color-ink)]" : "text-white"
          )}
        >
          <Link
            href={withLocale("/", locale)}
            aria-label={d.home_aria}
            className="nav-intro flex items-center"
            style={{ ["--nav-delay" as string]: "400ms" }}
          >
            <Image
              src="/hero/nmg-logo.jpg"
              alt="NMJ Group"
              width={120}
              height={120}
              priority
              className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_HREFS.map((link, i) => {
              const isActive =
                link.href === "/"
                  ? neutralPath === "/"
                  : neutralPath.startsWith(link.href);
              return (
                <li
                  key={link.href}
                  className="nav-intro"
                  style={{ ["--nav-delay" as string]: `${480 + i * 70}ms` }}
                >
                  <Link
                    href={withLocale(link.href, locale)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-all duration-300",
                      isActive
                        ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"
                        : white
                          ? "text-white/80 hover:bg-white/10 hover:text-white"
                          : opaque
                            ? "text-[var(--color-ink)] hover:bg-[var(--color-gold)]/8 hover:text-[var(--color-gold)]"
                            : "text-[var(--color-ink)]/80 hover:bg-[var(--color-gold)]/10 hover:text-[var(--color-gold)]"
                    )}
                    style={shadowStyle}
                  >
                    <FlipText>{d[link.key]}</FlipText>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <Link
              href={swapLocalePath(pathname ?? "/")}
              aria-label={d.toggleAria}
              className={cn(
                "nav-intro group inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-all",
                white
                  ? "border-white/40 text-white hover:border-[var(--color-gold-subtle)] hover:text-[var(--color-gold-subtle)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              )}
              style={{ ...shadowStyle, ["--nav-delay" as string]: "760ms" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
              </svg>
              <FlipText>{d.toggleLabel}</FlipText>
            </Link>

            <span
              className="nav-intro inline-flex"
              style={{ ["--nav-delay" as string]: "800ms" }}
            >
              <ThemeToggle tone={white ? "dark-surface" : "auto"} />
            </span>

            <Link
              href={withLocale("/contact", locale)}
              className={cn(
                "nav-intro group relative hidden overflow-hidden rounded-full border text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[var(--color-gold)] hover:text-white hover:shadow-[0_0_24px_var(--color-accent-glow)] md:inline-flex",
                white
                  ? "border-white/40 text-white hover:border-[var(--color-gold-subtle)]"
                  : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-gold)]"
              )}
              style={{ ...shadowStyle, ["--nav-delay" as string]: "840ms" }}
            >
              <span className="flex items-center gap-3 px-5 py-2.5 [will-change:transform] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">
                <FlipText>{d.contactCta}</FlipText>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full",
                    white ? "bg-white" : "bg-[var(--color-ink)]"
                  )}
                >
                  <span className={white ? "text-[var(--color-obsidian)]" : "text-[var(--color-bg-primary)]"}>
                    <Icon name="arrow-up-right" size={10} />
                  </span>
                </span>
              </span>
              <span
                aria-hidden
                className="absolute inset-0 flex translate-x-full items-center gap-3 px-5 [will-change:transform] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
              >
                <span
                  className={cn(
                    "flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full",
                    white ? "bg-white" : "bg-[var(--color-ink)]"
                  )}
                >
                  <span className={white ? "text-[var(--color-obsidian)]" : "text-[var(--color-bg-primary)]"}>
                    <Icon name="arrow-up-right" size={10} />
                  </span>
                </span>
                {d.contactCta}
              </span>
            </Link>

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={d.openMenu}
              aria-controls="mobile-nav-drawer"
              aria-expanded={menuOpen}
              className={cn(
                "nav-intro -mr-2 inline-flex h-11 w-11 items-center justify-center transition-colors hover:text-[var(--color-gold)] md:hidden",
                white ? "text-white" : "text-[var(--color-ink)]"
              )}
              style={{ ...shadowStyle, ["--nav-delay" as string]: "560ms" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M3 7H21M3 12H21M3 17H21" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  );
}
