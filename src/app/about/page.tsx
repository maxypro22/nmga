import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { t } from "@/lib/content";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { CardCarousel } from "@/components/ui/CardCarousel";

export const metadata: Metadata = {
  title: "About NMJ Group | Diversified Business Group in Doha, Qatar",
  description:
    "Learn about NMJ Group, a diversified business group in Doha, Qatar, operating across Hospitality, Real Estate, Construction, Events, Services, Technology, and AI.",
  alternates: { canonical: "https://nmj-group.qa/about" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

const OFFER_ICONS: IconName[] = ["hotel", "calendar", "hardhat", "sparkles", "cpu"];

type AboutHero = { headline: string; subhead: string };

export default async function AboutPage() {
  const [headline, subhead] = await Promise.all([
    t("about.hero.headline"),
    t("about.hero.subhead"),
  ]);
  return <AboutBody locale="en" hero={{ headline, subhead }} />;
}

export function AboutBody({
  locale,
  hero,
}: {
  locale: Locale;
  hero: AboutHero;
}) {
  return (
    <article>
      <Hero locale={locale} hero={hero} />
      <AboutGroup locale={locale} />
      <WhatDrivesUs locale={locale} />
      <WhatWeOffer locale={locale} />
      <LeadershipMessage locale={locale} />
      <ContactCTA locale={locale} />
    </article>
  );
}

function Hero({ locale, hero }: { locale: Locale; hero: AboutHero }) {
  const d = getDictionary(locale).about;
  return (
    <section
      aria-labelledby="about-hero"
      className="cinematic-bg relative bg-[var(--color-bg-primary)]"
    >
      <div
        className={`mx-auto max-w-[1200px] ${SECTION_PADDING} pt-[clamp(6rem,10vw,10rem)]`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 xl:gap-24">
          <div>
            <Eyebrow data-reveal>{d.group.eyebrow}</Eyebrow>
            <h1
              id="about-hero"
              data-reveal
              style={{ ["--reveal-delay" as string]: "100ms" }}
              className="mt-8 max-w-[18ch] font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
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
                {d.hero.cta}
                <span aria-hidden className="rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div
            data-reveal
            style={{ ["--reveal-delay" as string]: "150ms" }}
            className="relative h-[300px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:ring-white/[0.05] lg:h-[520px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85"
              alt="Modern corporate tower — NMJ Group, Doha, Qatar"
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

function AboutGroup({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).about.group;
  return (
    <section
      aria-labelledby="about-group"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-16">
        <div className="hidden md:col-span-5 md:block" data-reveal="left">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-secondary)]">
            <Image
              src="/hero/qatar.png"
              alt="NMJ Group headquarters — Doha, Qatar"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6" data-reveal="right">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2
            id="about-group"
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
          <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-[var(--color-text-muted)]">
            {d.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatDrivesUs({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).about.drives;
  return (
    <section
      aria-labelledby="about-drives"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="about-drives"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        <div data-reveal-stagger="140" className="vmv-grid">
          <div data-reveal className="vmv-card min-h-[300px] justify-start">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              {d.mission.tag}
            </span>
            <h3 className="mt-5 font-serif text-2xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
              {d.mission.title}
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
              {d.mission.body}
            </p>
          </div>

          <div data-reveal className="vmv-card min-h-[300px] justify-start">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              {d.vision.tag}
            </span>
            <h3 className="mt-5 font-serif text-2xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
              {d.vision.title}
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
              {d.vision.body}
            </p>
          </div>

          <div data-reveal className="vmv-card min-h-[300px] justify-start">
            <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              {d.values.tag}
            </span>
            <h3 className="mt-5 font-serif text-2xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
              {d.values.title}
            </h3>
            <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--color-ink)]">
              {d.values.items.map((v, i) => (
                <li key={v} className="inline-flex items-center gap-3">
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-[var(--color-gold)]"
                    />
                  ) : null}
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeOffer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.about.offer;
  return (
    <section
      aria-labelledby="about-offer"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[60ch] md:mb-16">
          <Eyebrow data-reveal>{d.eyebrow}</Eyebrow>
          <h2
            id="about-offer"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
        </div>

        {/* Mobile: auto-rotating carousel */}
        <div className="md:hidden">
          <CardCarousel>
            {d.items.map((offer, index) => (
              <div key={offer.title} className="premium-card flex flex-col">
                <div className="mb-5 flex items-start justify-between">
                  <span className="icon-tile">
                    <Icon name={OFFER_ICONS[index] ?? "sparkles"} size={24} />
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.2em] text-[var(--color-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl leading-tight tracking-[-0.005em] text-[var(--color-ink)]">
                  {offer.title}
                </h3>
                <p className="mt-5 flex-1 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
                  {offer.body}
                </p>
              </div>
            ))}
          </CardCarousel>
        </div>

        {/* Desktop: 2/3-col grid */}
        <ul
          data-reveal-stagger="90"
          className="hidden md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {d.items.map((offer, index) => (
            <li
              key={offer.title}
              data-reveal
              className="premium-card group flex flex-col"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="icon-tile">
                  <Icon name={OFFER_ICONS[index] ?? "sparkles"} size={24} />
                </span>
                <span className="num-reveal font-mono text-[12px] tracking-[0.2em] text-[var(--color-gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-serif text-base leading-tight tracking-[-0.005em] text-[var(--color-ink)] md:text-xl lg:text-2xl">
                {offer.title}
              </h3>
              <p className="mt-5 flex-1 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
                {offer.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 md:mt-16">
          <Link
            href={withLocale("/divisions", locale)}
            className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
          >
            {dict.common.viewAllDivisions}
            <span aria-hidden className="rtl:rotate-180">
              <Icon name="arrow-right" size={14} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function LeadershipMessage({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).about.leadership;
  return (
    <section
      aria-labelledby="about-leadership"
      className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5" data-reveal="left">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-primary)]">
            <Image
              src="/hero/qatar.png"
              alt="NMJ Group leadership"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal="right">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2
            id="about-leadership"
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.heading}
          </h2>
          <div className="mt-8 space-y-6 text-[16px] leading-[1.8] text-[var(--color-text-muted)]">
            {d.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).about.cta;
  return (
    <section
      aria-labelledby="about-cta"
      data-cursor-light
      className="relative bg-[var(--color-obsidian)] text-[var(--color-ivory)]"
    >
      <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING} text-center`}>
        <Eyebrow data-reveal tone="gold-subtle">{d.eyebrow}</Eyebrow>
        <h2
          id="about-cta"
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
          className="mt-8 font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ivory)]"
        >
          {d.heading}
        </h2>
        <p className="mx-auto mt-8 max-w-[58ch] text-[15px] leading-relaxed text-[rgba(255,255,255,0.75)]">
          {d.body}
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
          <Link
            href={withLocale("/contact", locale)}
            className="inline-flex items-center gap-3 border-b border-[var(--color-gold-subtle)] pb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-ivory)] transition-colors hover:border-white"
          >
            {d.primary}
            <span aria-hidden className="rtl:rotate-180">→</span>
          </Link>
          <Link
            href={withLocale("/divisions", locale)}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
          >
            {d.secondary}
            <span aria-hidden className="rtl:rotate-180">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
