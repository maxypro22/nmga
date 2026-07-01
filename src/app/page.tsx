import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { FlipText } from "@/components/ui/FlipText";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { OverviewCards } from "@/components/home/OverviewCards";
import { StackingScroll } from "@/components/ui/StackingScroll";
import { sectors } from "@/lib/sectors";
import { t } from "@/lib/content";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "NMJ Group | Diversified Business Group in Doha, Qatar",
  description:
    "NMJ Group is a diversified business group in Doha, Qatar, operating across Hospitality, Real Estate, Construction, Services, IT technology, and AI solutions.",
  alternates: { canonical: "https://nmj-group.qa" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

type Hero = {
  tagline: string;
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default async function Home() {
  const [tagline, headline, subhead, ctaPrimary, ctaSecondary] = await Promise.all([
    t("home.hero.tagline"),
    t("home.hero.headline"),
    t("home.hero.subhead"),
    t("home.hero.cta_primary"),
    t("home.hero.cta_secondary"),
  ]);
  return (
    <HomeBody
      locale="en"
      hero={{ tagline, headline, subhead, ctaPrimary, ctaSecondary }}
    />
  );
}

export function HomeBody({ locale, hero }: { locale: Locale; hero: Hero }) {
  return (
    <>
      <OrganizationSchema />
      {/* Hero, Overview, and Identity use the stacking card scroll effect:
          each section scales down as the next one rises from below. */}
      <StackingScroll>
        <Hero locale={locale} hero={hero} />
        <GroupOverview locale={locale} />
        <CoreIdentity locale={locale} />
      </StackingScroll>
      <DivisionsSummary locale={locale} />
      <LeadershipPreview locale={locale} />
      <FutureExpansion locale={locale} />
      <FinalContactCTA locale={locale} />
    </>
  );
}

function Hero({ locale, hero }: { locale: Locale; hero: Hero }) {
  const c = getDictionary(locale).common;
  return (
    <section
      aria-labelledby="home-hero"
      className="relative -mt-px h-screen min-h-[640px] w-full overflow-hidden"
    >
      {/* Parallax background — oversized 15% so movement never exposes edges */}
      <div
        aria-hidden
        data-parallax="0.2"
        className="absolute inset-0"
        style={{ "--px-scale": "1.15" } as React.CSSProperties}
      >
        <Image
          src="/hero/qatar.png"
          alt="Doha skyline at dusk — NMJ Group, Qatar's diversified business group headquartered in Doha"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,12,20,0.12) 0%, rgba(8,12,20,0.04) 40%, rgba(8,12,20,0.52) 100%)",
        }}
      />

      <div className="relative z-10 flex h-full items-end pb-28 md:pb-32 lg:items-center lg:pb-0">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <div
              className="hero-rise mb-6 flex items-center gap-3"
              style={{
                textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                ["--hero-delay" as string]: "180ms",
              }}
            >
              <span
                aria-hidden
                className="h-px w-10 flex-none bg-[var(--color-gold-subtle)] sm:w-12"
              />
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-subtle)] sm:text-[11px] sm:tracking-[0.35em]">
                {hero.tagline}
              </p>
            </div>

            <h1
              id="home-hero"
              className="hero-rise mb-8 font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.015em] text-white"
              style={{
                textShadow: "0 2px 14px rgba(0,0,0,0.45)",
                ["--hero-delay" as string]: "0ms",
              }}
            >
              {hero.headline}
            </h1>

            <p
              className="hero-rise mb-12 max-w-[58ch] text-[15px] leading-[1.85] text-white/85 md:text-[17px]"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.45)",
                ["--hero-delay" as string]: "320ms",
              }}
            >
              {hero.subhead}
            </p>

            <div
              className="hero-rise flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 md:gap-10"
              style={{ ["--hero-delay" as string]: "460ms" }}
            >
              <Link
                href={withLocale("/divisions", locale)}
                className="btn-metallic group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-white/[0.04] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all hover:border-[var(--color-gold-subtle)] hover:bg-[var(--color-gold)] hover:text-[#0a0a0a] hover:shadow-[0_8px_28px_var(--color-accent-glow-strong)]"
              >
                <FlipText>{hero.ctaPrimary}</FlipText>
                <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
              <Link
                href={withLocale("/contact", locale)}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/85 transition-colors hover:text-[var(--color-gold-subtle)]"
              >
                <FlipText>{hero.ctaSecondary}</FlipText>
                <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#home-overview"
        aria-label={c.scroll}
        className="group absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <span
          className="hero-rise flex flex-col items-center gap-3"
          style={{ ["--hero-delay" as string]: "760ms" }}
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">{c.scroll}</span>
          <span className="relative block h-10 w-px overflow-hidden bg-white/25">
            <span
              aria-hidden
              className="scroll-line absolute left-0 top-0 block h-1/2 w-px bg-[var(--color-gold-subtle)]"
            />
          </span>
        </span>
      </a>
    </section>
  );
}


function GroupOverview({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).home.overview;
  return (
    <section
      aria-labelledby="home-overview"
      className={`min-h-screen border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="home-overview"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        <OverviewCards cards={d.cards} />
      </div>
    </section>
  );
}

function CoreIdentity({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).home.identity;
  return (
    <section
      aria-labelledby="home-identity"
      className={`min-h-screen border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="home-identity"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        <div data-reveal-stagger="120" className="vmv-grid">
          {d.cards.map((card) => (
            <div
              key={card.tag}
              data-reveal
              className="vmv-card min-h-[280px] justify-start"
            >
              <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
                {card.tag}
              </span>
              <h3 className="mt-5 font-serif text-2xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
                {card.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionsSummary({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.home.divisions;
  const items = dict.divisions.items;
  return (
    <section
      aria-labelledby="home-divisions"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid items-end gap-8 md:mb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
            <h2
              id="home-divisions"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
              className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
            >
              {d.heading}
            </h2>
          </div>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
            className="md:col-span-7 max-w-[60ch] text-[15px] leading-[1.8] text-[var(--color-text-muted)]"
          >
            {d.intro}
          </p>
        </div>

        <ul
          data-reveal-stagger="90"
          className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:grid-cols-3"
        >
          {sectors.map((division) => {
            const tr = items[division.slug];
            const name = tr?.name ?? division.name;
            const leadCompany = division.companies[0]?.name ?? division.name;
            return (
              <li key={division.slug} data-reveal>
                <Link
                  href={withLocale(`/divisions/${division.slug}`, locale)}
                  className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] dark:bg-[var(--color-card-bg)] sm:rounded-[20px]"
                >
                  <div className="relative h-28 overflow-hidden sm:h-44 md:h-56">
                    <Image
                      src={division.coverImage}
                      alt={`${division.name} — NMJ Group`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span aria-hidden className="absolute bottom-2 right-2 font-mono text-[10px] tracking-[0.15em] text-white drop-shadow-md sm:bottom-3 sm:right-3 sm:text-[12px]">
                      {division.number}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-4 sm:p-5 md:p-7">
                    {/* Company name pill */}
                    <span className="inline-block w-fit rounded-full border border-[var(--color-border-strong)] px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:px-3.5 sm:py-1.5 sm:text-[9px] sm:tracking-[0.22em]">
                      {leadCompany}
                    </span>

                    {/* Division name */}
                    <h3 className="font-serif text-sm leading-tight tracking-[-0.005em] text-[var(--color-ink)] sm:text-xl md:text-[1.45rem]">
                      {locale === "ar"
                        ? `${d.divisionWord} ${name}`
                        : `${name} ${d.divisionWord}`}
                    </h3>

                    {/* Summary — hidden on mobile, shown sm+ */}
                    <p className="hidden flex-1 text-[14px] leading-[1.7] text-[var(--color-text-muted)] sm:block">
                      {tr?.summary ?? division.summary}
                    </p>

                    {/* Footer row */}
                    <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-2.5 sm:pt-5">
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors group-hover:text-[var(--color-gold-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
                        {name}
                      </span>
                      <span
                        aria-hidden
                        className="text-[var(--color-text-subtle)] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-gold)] rtl:-scale-x-100"
                      >
                        <Icon name="arrow-up-right" size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}

          <li data-reveal>
            <Link
              href={withLocale("/contact", locale)}
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed border-[var(--color-border-strong)] p-5 text-center transition-colors hover:border-[var(--color-gold)] sm:gap-5 sm:rounded-[20px] sm:p-8 md:rounded-[24px]"
            >
              <span className="text-[var(--color-text-subtle)] transition-colors group-hover:text-[var(--color-gold)]">
                <Icon name="plus-circle" size={40} />
              </span>
              <div>
                <h3 className="font-serif text-xl leading-tight text-[var(--color-ink)]">
                  {d.partnerTitle}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-text-muted)]">
                  {d.partnerBody}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                {d.partnerCta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-12 md:mt-16">
          <Link
            href={withLocale("/divisions", locale)}
            className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            {getDictionary(locale).common.viewAllDivisions}
            <span aria-hidden className="rtl:rotate-180">
              <Icon name="arrow-right" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function LeadershipPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.home.leadership;
  return (
    <section
      aria-labelledby="home-leadership"
      className={`overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative md:col-span-5" data-reveal="left">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[var(--color-bg-primary)] md:rounded-[24px]">
            <div
              aria-hidden
              data-parallax="0.12"
              className="absolute inset-0"
              style={{ "--px-scale": "1.1" } as React.CSSProperties}
            >
              <Image
                src="/hero/qatar.png"
                alt="NMJ Group leadership — Doha, Qatar"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-5 rounded-[12px] border border-white/15"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal="right">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2
            id="home-leadership"
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
            {d.body}
          </p>
          <ul className="mt-8 space-y-5">
            {d.bullets.map((bullet, index) => (
              <li key={bullet} className="group flex items-center gap-5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] font-mono text-[11px] text-[var(--color-gold)] transition-all duration-300 group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-bg-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-[var(--color-ink)]">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href={withLocale("/about", locale)}
              className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
            >
              {dict.common.readMoreAboutUs}
              <span aria-hidden className="rtl:rotate-180">
                <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FutureExpansion({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).home.future;
  return (
    <section
      aria-labelledby="home-future"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="home-future"
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

function FinalContactCTA({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).home.cta;
  const channelIcons = ["location", "phone", "mail"] as const;
  const channelHrefs = [
    "https://maps.app.goo.gl/NuSF7L8Y9TWVDGW17",
    "tel:+97444440085",
    "mailto:info@nmj-group.qa",
  ];
  const channelExternal = [true, false, false];
  return (
    <section
      aria-labelledby="home-cta"
      data-cursor-light
      className="relative border-t border-[var(--color-border-dark)] bg-[var(--color-obsidian)] text-[var(--color-ivory)]"
    >
      <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING}`}>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <Eyebrow data-reveal tone="gold-subtle">{d.eyebrow}</Eyebrow>
            <h2
              id="home-cta"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
              className="mt-8 font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ivory)]"
            >
              {d.heading}
            </h2>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "200ms" }}
              className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)]"
            >
              {d.body}
            </p>
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "300ms" }}
              className="mt-12 hidden items-start gap-5 md:flex md:flex-col md:items-start md:gap-5 lg:flex-row lg:items-center lg:gap-10"
            >
              <Link
                href={withLocale("/contact", locale)}
                className="btn-metallic group inline-flex rounded-full bg-[var(--color-ivory)] text-[11px] uppercase tracking-[0.2em] text-[var(--color-obsidian)] transition-colors hover:bg-[var(--color-gold)]"
              >
                <span className="flex items-center gap-4 px-7 py-3.5 [will-change:transform] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-full">
                  {getDictionary(locale).common.contactUs}
                  <span
                    aria-hidden
                    className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-obsidian)]"
                  >
                    <span className="text-[var(--color-ivory)]">
                      <Icon name="arrow-up-right" size={13} />
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 flex translate-x-full items-center gap-4 px-7 [will-change:transform] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
                >
                  <span className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-obsidian)]">
                    <span className="text-[var(--color-ivory)]">
                      <Icon name="arrow-up-right" size={13} />
                    </span>
                  </span>
                  {getDictionary(locale).common.contactUs}
                </span>
              </Link>
              <a
                href="mailto:info@nmj-group.qa"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
              >
                {getDictionary(locale).common.emailUs}
                <span aria-hidden className="rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </a>
            </div>
          </div>

          <ul
            data-reveal-stagger="120"
            className="hidden space-y-6 md:col-span-5 md:col-start-8 md:self-center md:block"
          >
            {d.channels.map((channel, i) => (
              <li key={channel.label} data-reveal>
                <a
                  href={channelHrefs[i]}
                  target={channelExternal[i] ? "_blank" : undefined}
                  rel={channelExternal[i] ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-5 rounded-2xl border border-[var(--color-border-dark)] bg-white/[0.03] p-5 transition-colors hover:border-[var(--color-gold-subtle)] hover:bg-white/[0.06]"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-white/10 text-[var(--color-gold-subtle)] transition-colors group-hover:border-[var(--color-gold-subtle)]">
                    <Icon name={channelIcons[i]} size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.55)]">
                      {channel.label}
                    </span>
                    <span className="mt-1.5 block whitespace-pre-line break-words text-[15px] text-[var(--color-ivory)]">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile-only 2×2 contact grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            <a
              href="tel:+97444440085"
              className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors active:bg-white/[0.08]"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                {d.channels[1].label}
              </span>
              <span className="text-[13px] leading-snug text-[var(--color-ivory)]">
                {d.channels[1].value}
              </span>
            </a>
            <a
              href="mailto:info@nmj-group.qa"
              className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors active:bg-white/[0.08]"
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                {d.channels[2].label}
              </span>
              <span className="break-all text-[13px] leading-snug text-[var(--color-ivory)]">
                {d.channels[2].value}
              </span>
            </a>
            <Link
              href={withLocale("/contact", locale)}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 py-4 text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)] transition-colors active:bg-[var(--color-gold)]/20"
            >
              {getDictionary(locale).common.contactUs}
              <span aria-hidden className="rtl:rotate-180">→</span>
            </Link>
            <a
              href="mailto:info@nmj-group.qa"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-4 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors active:bg-white/[0.08]"
            >
              {getDictionary(locale).common.emailUs}
              <span aria-hidden className="rtl:rotate-180">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
