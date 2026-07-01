"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  getDictionary,
  stripLocale,
  withLocale,
  type Locale,
} from "@/lib/i18n";

const NAV: { href: string; key: "overview" | "content" | "jobs" | "newsroom" | "theme" | "admins" | "account" }[] = [
  { href: "/dashboard", key: "overview" },
  { href: "/dashboard/content", key: "content" },
  { href: "/dashboard/jobs", key: "jobs" },
  { href: "/dashboard/newsroom", key: "newsroom" },
  { href: "/dashboard/theme", key: "theme" },
  { href: "/dashboard/admins", key: "admins" },
  { href: "/dashboard/account", key: "account" },
];

export function DashboardShell({
  username,
  children,
  locale = "en",
}: {
  username: string;
  children: React.ReactNode;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const neutralPath = stripLocale(pathname ?? "/");
  const router = useRouter();
  const dict = getDictionary(locale);
  const d = dict.dashboard;
  const [busy, setBusy] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace(withLocale("/login", locale));
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-85px)] bg-[var(--color-bg-secondary)]">
      <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] px-6 py-4 md:hidden">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            {d.brand}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle dashboard menu"
            className="rounded-md border border-[var(--color-border-strong)] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)]"
          >
            {mobileOpen ? d.close : d.menu}
          </button>
        </div>

        <aside
          className={cn(
            "border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] md:w-64 md:flex-none md:border-b-0 md:border-r rtl:md:border-l rtl:md:border-r-0",
            mobileOpen ? "block" : "hidden md:block"
          )}
        >
          <div className="hidden p-8 md:block">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
              {d.adminLabel}
            </p>
            <p className="mt-3 font-serif text-xl leading-tight text-[var(--color-ink)]">
              {d.dashboard}
            </p>
            <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
              {d.signedInAs} <span className="font-mono">{username}</span>
            </p>
          </div>

          <nav aria-label="Dashboard sections" className="px-4 py-4 md:px-6">
            <ul className="space-y-1">
              {NAV.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? neutralPath === "/dashboard"
                    : neutralPath.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={withLocale(item.href, locale)}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-[13px] uppercase tracking-[0.18em] transition-colors",
                        active
                          ? "bg-[var(--color-bg-secondary)] text-[var(--color-gold)]"
                          : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-ink)]"
                      )}
                    >
                      {d.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <button
                type="button"
                onClick={logout}
                disabled={busy}
                className="w-full rounded-md px-3 py-2.5 text-start text-[13px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-ink)] disabled:opacity-50"
              >
                {busy ? d.loggingOut : d.logout}
              </button>
            </div>

            <div className="mt-6 md:hidden">
              <p className="px-3 text-[11px] text-[var(--color-text-subtle)]">
                {d.signedInAs} <span className="font-mono">{username}</span>
              </p>
            </div>
          </nav>
        </aside>

        <main className="flex-1 px-6 py-10 md:px-12 md:py-14">{children}</main>
      </div>
    </div>
  );
}
