"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { sectors } from "@/lib/sectors";
import {
  getDictionary,
  localeFromPathname,
  withLocale,
} from "@/lib/i18n";

const LINKEDIN_URL = "https://www.linkedin.com/company/nmj-qatar";

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dict = getDictionary(locale);
  const d = dict.footer;
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/divisions", label: dict.nav.divisions },
    { href: "/careers", label: dict.nav.careers },
    { href: "/newsroom", label: locale === "ar" ? "غرفة الأخبار" : "Newsroom" },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <footer data-cursor-light className="bg-[var(--color-obsidian)] text-[var(--color-ivory)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 md:grid-cols-4 md:gap-12 md:px-10 md:py-20 lg:px-14 lg:py-24">
        {/* Brand — full width on mobile */}
        <div className="col-span-2 space-y-4 md:col-span-1">
          <div className="font-serif text-2xl tracking-[0.28em]">NMJ</div>
          <p className="max-w-[30ch] text-sm leading-relaxed text-[rgba(255,255,255,0.55)]">
            {d.blurb}
          </p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NMJ Group on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border-dark)] text-[rgba(255,255,255,0.7)] transition-colors hover:border-[var(--color-gold-subtle)] hover:text-[var(--color-gold-subtle)]"
          >
            <Icon name="linkedin" size={16} />
          </a>
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          <Eyebrow tone="gold-subtle" line={false}>
            {d.quickLinks}
          </Eyebrow>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={withLocale(link.href, locale)}
                  className="text-[rgba(255,255,255,0.75)] transition-colors hover:text-[var(--color-gold-subtle)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Divisions */}
        <div className="space-y-3">
          <Eyebrow tone="gold-subtle" line={false}>
            {d.coreSectors}
          </Eyebrow>
          <ul className="space-y-2 text-sm">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  href={withLocale(`/divisions#${sector.slug}`, locale)}
                  className="text-[rgba(255,255,255,0.75)] transition-colors hover:text-[var(--color-gold-subtle)]"
                >
                  {dict.divisions.items[sector.slug]?.name ?? sector.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact — full width on mobile */}
        <address className="col-span-2 space-y-3 not-italic md:col-span-1">
          <Eyebrow tone="gold-subtle" line={false}>
            {d.contactInfo}
          </Eyebrow>
          <ul className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-3 md:grid-cols-1">
            <li className="flex items-start gap-2.5 text-[rgba(255,255,255,0.8)]">
              <span className="mt-0.5 flex-none text-[var(--color-gold-subtle)]">
                <Icon name="location" size={14} />
              </span>
              {d.location}
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex-none text-[var(--color-gold-subtle)]">
                <Icon name="phone" size={14} />
              </span>
              <a href="tel:+97444440085" dir="ltr" className="text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]">
                +974 44440085
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex-none text-[var(--color-gold-subtle)]">
                <Icon name="mail" size={14} />
              </span>
              <a href="mailto:info@nmj-group.qa" dir="ltr" className="break-all text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]">
                info@nmj-group.qa
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="border-t border-[var(--color-border-dark)]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-[rgba(255,255,255,0.45)] md:flex-row md:items-center md:gap-4 md:px-10 lg:px-14">
          <p>© {year} NMJ Group. {d.rights}</p>
          <p className="tracking-[0.22em] uppercase">{d.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
