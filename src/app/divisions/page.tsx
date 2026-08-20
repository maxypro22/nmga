import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { DivisionsTimeline } from "./DivisionsTimeline";
import { t } from "@/lib/content";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title:
    "NMJ Group Divisions | Hospitality, Real Estate, Construction, Events, Technology & AI",
  description:
    "Explore the business divisions of NMJ Group in Doha, Qatar, including hospitality, real estate, construction, events, services, technology, and AI solutions.",
  alternates: { canonical: "https://nmj-group.qa/divisions" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

type DivisionsHero = { headline: string; subhead: string };

export default async function DivisionsPage() {
  const [headline, subhead] = await Promise.all([
    t("divisions.hero.headline"),
    t("divisions.hero.subhead"),
  ]);
  return <DivisionsBody locale="en" hero={{ headline, subhead }} />;
}

export function DivisionsBody({
  locale,
  hero,
}: {
  locale: Locale;
  hero: DivisionsHero;
}) {
  return (
    <article>
      <Hero locale={locale} hero={hero} />
      <Intro locale={locale} />
      <DivisionsTimeline locale={locale} />
      <FutureExpansion locale={locale} />
      <ContactCTA locale={locale} />
    </article>
  );
}

function Hero({ locale, hero }: { locale: Locale; hero: DivisionsHero }) {
  const dict = getDictionary(locale);
  return (
    <section
      aria-labelledby="divisions-hero"
      className="cinematic-bg relative bg-[var(--color-bg-primary)]"
    >
      <div
        className={`mx-auto max-w-[1200px] ${SECTION_PADDING} pt-[clamp(6rem,10vw,10rem)]`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 xl:gap-24">
          <div>
            <Eyebrow data-reveal>{dict.nav.divisions}</Eyebrow>
            <h1
              id="divisions-hero"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
              className="mt-8 max-w-[20ch] font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
            >
              {hero.headline}
            </h1>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "220ms" }}
              className="mt-10 max-w-[52ch] text-[16px] leading-[1.8] text-[var(--color-text-muted)] md:text-lg"
            >
              {hero.subhead}
            </p>
            <div data-reveal style={{ ["--reveal-delay" as string]: "320ms" }} className="mt-12">
              <Link
                href={withLocale("/contact", locale)}
                className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
              >
                {dict.divisionsPage.hero.cta}
                <span aria-hidden className="rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* Hero image — Sapphire Plaza, NMJ's luxury hotel in Qatar */}
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "150ms" }}
            className="relative h-[300px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:ring-white/[0.05] lg:h-[520px]"
          >
            <Image
              src="/images/heroes/divisions-hero-v3.jpg"
              alt="NMJ Group Divisions — Doha, Qatar"
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

function Intro({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).divisionsPage.intro;
  return (
    <section
      aria-labelledby="divisions-intro"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
        <h2
          id="divisions-intro"
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
          className="mt-6 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.005em] text-[var(--color-ink)]"
        >
          {d.heading}
        </h2>
        <p
          data-reveal
          style={{ ["--reveal-delay" as string]: "200ms" }}
          className="mx-auto mt-8 max-w-[60ch] text-[16px] leading-[1.85] text-[var(--color-text-muted)]"
        >
          {d.body}
        </p>
      </div>
    </section>
  );
}

function FutureExpansion({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).divisionsPage.future;
  return (
    <section
      aria-labelledby="divisions-future"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="divisions-future"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        <ul
          data-reveal-stagger="100"
          className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-10 lg:grid-cols-4"
        >
          {d.cards.map((card, index) => (
            <li key={card.title} data-reveal className="group relative pt-7 md:pt-10">
              <span aria-hidden className="ghost-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="premium-card relative flex h-full flex-col gap-3">
                <h3 className="font-serif text-base leading-tight tracking-[-0.005em] text-[var(--color-ink)] md:text-xl">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.7] text-[var(--color-text-muted)] md:text-[14px]">
                  {card.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ContactCTA({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).divisionsPage.cta;
  return (
    <section
      aria-labelledby="divisions-cta"
      data-cursor-light
      className="relative bg-[var(--color-obsidian)] text-[var(--color-ivory)]"
    >
      <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING} text-center`}>
        <Eyebrow data-reveal tone="gold-subtle">{d.eyebrow}</Eyebrow>
        <h2
          id="divisions-cta"
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
          className="mt-8 font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ivory)]"
        >
          {d.heading}
        </h2>
        <p className="mx-auto mt-8 max-w-[58ch] text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)]">
          {d.body}
        </p>
        <dl className="mx-auto mt-10 grid max-w-[480px] grid-cols-2 gap-4 text-[14px]">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.55)]">
              {d.phone}
            </dt>
            <dd className="mt-2">
              <a
                href="tel:+97444440085"
                dir="ltr"
                className="text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]"
              >
                +974 4444 0085
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.55)]">
              {d.email}
            </dt>
            <dd className="mt-2">
              <a
                href="mailto:info@nmj-group.qa"
                dir="ltr"
                className="break-all text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]"
              >
                info@nmj-group.qa
              </a>
            </dd>
          </div>
        </dl>
        <div className="mx-auto mt-8 grid max-w-[480px] grid-cols-2 gap-3">
          <Link
            href={withLocale("/contact", locale)}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-gold-subtle)]/40 bg-[var(--color-gold-subtle)]/10 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-gold-subtle)]/20"
          >
            {d.primary}
            <span aria-hidden className="rtl:rotate-180">→</span>
          </Link>
          <a
            href="mailto:info@nmj-group.qa"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3.5 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/[0.08]"
          >
            {d.secondary}
            <span aria-hidden className="rtl:rotate-180">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
