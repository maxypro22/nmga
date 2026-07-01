import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ContactForm } from "./ContactForm";
import { t } from "@/lib/content";
import { getDictionary, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact NMJ Group | Business Inquiries in Doha, Qatar",
  description:
    "Get in touch with NMJ Group in Doha, Qatar for business inquiries, partnerships, or general information by phone, email, or office location.",
  alternates: { canonical: "https://nmj-group.qa/contact" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

const MAPS_URL = "https://maps.app.goo.gl/NuSF7L8Y9TWVDGW17";
const LINKEDIN_URL = "https://www.linkedin.com/company/nmj-qatar";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Al+Muftah+Plaza,+Al+Reem+Street,+Doha,+Qatar&output=embed";

type ContactCard = {
  label: string;
  value: string;
  href: string;
  external: boolean;
  icon: IconName;
};

type ContactInfo = { address: string; phone: string; email: string };
type ContactHero = { headline: string; subhead: string };

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

function mailHref(email: string): string {
  return `mailto:${email}`;
}

export default async function ContactPage() {
  const [headline, subhead, address, phone, email] = await Promise.all([
    t("contact.hero.headline"),
    t("contact.hero.subhead"),
    t("contact.info.address"),
    t("contact.info.phone"),
    t("contact.info.email"),
  ]);

  return (
    <ContactBody
      locale="en"
      hero={{ headline, subhead }}
      info={{ address, phone, email }}
    />
  );
}

export function ContactBody({
  locale,
  hero,
  info,
}: {
  locale: Locale;
  hero: ContactHero;
  info: ContactInfo;
}) {
  const d = getDictionary(locale).contact;
  const contactCards: ContactCard[] = [
    {
      label: d.info.location,
      value: info.address,
      href: MAPS_URL,
      external: true,
      icon: "location",
    },
    {
      label: d.info.phone,
      value: info.phone,
      href: telHref(info.phone),
      external: false,
      icon: "phone",
    },
    {
      label: d.info.email,
      value: info.email,
      href: mailHref(info.email),
      external: false,
      icon: "mail",
    },
    {
      label: d.info.linkedin,
      value: d.info.linkedinValue,
      href: LINKEDIN_URL,
      external: true,
      icon: "linkedin",
    },
  ];

  return (
    <article>
      <Hero locale={locale} hero={hero} />
      <ContactInfoSection locale={locale} cards={contactCards} />
      <ContactFormSection locale={locale} />
      <LocationSection locale={locale} />
      <FinalCTA locale={locale} phone={info.phone} email={info.email} />
    </article>
  );
}

function Hero({ locale, hero }: { locale: Locale; hero: ContactHero }) {
  const dict = getDictionary(locale);
  return (
    <section
      aria-labelledby="contact-hero"
      className="cinematic-bg relative bg-[var(--color-bg-primary)]"
    >
      <div
        className={`mx-auto max-w-[1200px] ${SECTION_PADDING} pt-[clamp(6rem,10vw,10rem)]`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 xl:gap-24">
          <div>
            <Eyebrow data-reveal>{dict.nav.contact}</Eyebrow>
            <h1
              id="contact-hero"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
              className="mt-8 max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
            >
              {hero.headline}
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "220ms" }}
              className="mt-10 max-w-[48ch] text-[16px] leading-[1.8] text-[var(--color-text-muted)] md:text-lg"
            >
              {hero.subhead}
            </p>
          </div>

          {/* Hero image — Al Anaqa venue at Kempinski, premium Qatar location */}
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "150ms" }}
            className="relative h-[300px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:ring-white/[0.05] lg:h-[480px]"
          >
            <Image
              src="/images/heroes/contact-hero.jpg"
              alt="NMJ Group Contact — Doha, Qatar"
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfoSection({
  locale,
  cards,
}: {
  locale: Locale;
  cards: ContactCard[];
}) {
  const d = getDictionary(locale).contact.info;
  return (
    <section
      aria-labelledby="contact-info"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="contact-info"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        <ul
          data-reveal-stagger="90"
          className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <li
              key={card.label}
              data-reveal
              className="premium-card group flex flex-col gap-3 md:gap-4"
            >
              <span className="icon-tile">
                <Icon name={card.icon} size={22} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)] md:text-[11px]">
                {card.label}
              </span>
              <a
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-baseline gap-2 break-words font-serif text-base leading-tight tracking-[-0.005em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-gold)] md:text-lg lg:text-xl"
              >
                {card.value}
                {card.external ? (
                  <span aria-hidden className="text-[12px] rtl:-scale-x-100">
                    <Icon name="arrow-up-right" size={13} />
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactFormSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).contact.form;
  return (
    <section
      aria-labelledby="contact-form"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="contact-form"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
            className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-[var(--color-text-muted)]"
          >
            {d.desc}
          </p>
        </div>
        <div data-reveal style={{ ["--reveal-delay" as string]: "300ms" }}>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

function LocationSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).contact.location;
  return (
    <section
      aria-labelledby="contact-location"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="contact-location"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
            className="mt-6 max-w-[60ch] text-[15px] leading-[1.7] text-[var(--color-text-muted)]"
          >
            {d.body}
          </p>
        </div>

        <div data-reveal="scale" className="overflow-hidden border border-[var(--color-border)]">
          <iframe
            title="NMJ Group office location on Google Maps"
            src={MAPS_EMBED}
            width="100%"
            height="420"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{ border: 0, display: "block" }}
          />
        </div>

        <div className="mt-8">
          <Link
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            {d.mapsLink}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({
  locale,
  phone,
  email,
}: {
  locale: Locale;
  phone: string;
  email: string;
}) {
  const d = getDictionary(locale).contact.finalCta;
  return (
    <section
      aria-labelledby="contact-final-cta"
      data-cursor-light
      className="relative bg-[var(--color-obsidian)] text-[var(--color-ivory)]"
    >
      <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING} text-center`}>
        <Eyebrow data-reveal tone="gold-subtle">{d.eyebrow}</Eyebrow>
        <h2
          id="contact-final-cta"
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
          className="mt-8 font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ivory)]"
        >
          {d.heading}
        </h2>
        <p className="mx-auto mt-8 max-w-[58ch] text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)]">
          {d.body}
        </p>
        <div className="mt-12 flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-10">
          <a
            href={telHref(phone)}
            className="inline-flex items-center gap-3 border border-[var(--color-gold-subtle)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
          >
            {d.call}
          </a>
          <a
            href={mailHref(email)}
            className="inline-flex items-center gap-3 border border-white/30 px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)] transition-colors hover:bg-white hover:text-[var(--color-obsidian)]"
          >
            {d.email}
          </a>
        </div>
      </div>
    </section>
  );
}
