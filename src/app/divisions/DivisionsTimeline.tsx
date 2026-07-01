"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sectors, type Division } from "@/lib/sectors";
import { Icon } from "@/components/ui/Icon";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

export function DivisionsTimeline({ locale = "en" }: { locale?: Locale }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    function onScroll() {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Marker line sits at 45% from top of viewport — feels like the "current"
      // node a touch above center so users see the rail filling toward them.
      const marker = vh * 0.45;
      const pct = (marker - rect.top) / rect.height;
      const clamped = Math.max(0, Math.min(1, pct));
      setProgress(clamped);

      // Figure out which division is currently "active" based on the marker.
      const children = Array.from(
        el.querySelectorAll<HTMLElement>("[data-timeline-node]")
      );
      let nextActive = -1;
      for (let i = 0; i < children.length; i++) {
        const top = children[i].getBoundingClientRect().top;
        if (top <= marker) nextActive = i;
        else break;
      }
      setActiveIndex(nextActive);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Vertical timeline rail — desktop only. The wrapper mirrors each
          section's layout (px-6 md:px-10 lg:px-14 around mx-auto max-w-[1200px])
          so the rail sits at the exact left edge of the inner content column,
          where each section's col-2 number/dot also begins. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div className="h-full px-6 md:px-10 lg:px-14">
          <div className="relative mx-auto h-full max-w-[1200px]">
            <div className="absolute inset-y-0 left-0 w-px bg-[var(--color-border-strong)]">
              <div
                className="absolute left-0 top-0 w-px bg-[var(--color-gold)]"
                style={{
                  height: `${progress * 100}%`,
                  boxShadow: "0 0 14px var(--color-accent-glow-strong)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {sectors.map((division, index) => (
        <DivisionSection
          key={division.slug}
          division={division}
          isActive={index <= activeIndex}
          locale={locale}
        />
      ))}
    </div>
  );
}

function DivisionSection({
  division,
  isActive,
  locale,
}: {
  division: Division;
  isActive: boolean;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const tr = dict.divisions.items[division.slug];
  const name = tr?.name ?? division.name;
  return (
    <section
      id={division.slug}
      aria-labelledby={`division-${division.slug}`}
      className={`relative border-t border-[var(--color-border)] ${
        Number(division.number) % 2 === 0
          ? "bg-[var(--color-bg-secondary)]"
          : "bg-[var(--color-bg-primary)]"
      } ${SECTION_PADDING}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 grid items-start gap-6 md:grid-cols-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3" data-timeline-node>
              {/* Node dot — sits centered on the rail */}
              <span
                aria-hidden
                className={`hidden h-3 w-3 -ml-[6px] flex-none rounded-full border-2 transition-all duration-500 md:block ${
                  isActive
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)] shadow-[0_0_14px_var(--color-accent-glow-strong)] scale-110"
                    : "border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] scale-100"
                }`}
              />
              <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--color-gold)]">
                {division.number}
              </span>
            </div>
            <span
              className={`mt-6 hidden md:inline-flex icon-tile transition-all duration-500 ${
                isActive
                  ? "border-[var(--color-gold)] text-[var(--color-gold)] shadow-[0_0_22px_var(--color-accent-glow)]"
                  : ""
              }`}
            >
              <Icon name={division.icon} size={22} />
            </span>
          </div>
          <div className="md:col-span-10">
            <div className="grid items-start gap-8 md:grid-cols-2">
              <div>
                <h2
                  id={`division-${division.slug}`}
                  data-reveal
                  className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
                >
                  {locale === "ar"
                    ? `${dict.divisionsPage.divisionWord} ${name}`
                    : `${name} ${dict.divisionsPage.divisionWord}`}
                </h2>
                <p
                  data-reveal
                  style={{ ["--reveal-delay" as string]: "120ms" }}
                  className="mt-6 max-w-[52ch] text-[15px] leading-[1.8] text-[var(--color-text-muted)]"
                >
                  {tr?.intro ?? division.intro}
                </p>
              </div>
              {/* Cover image */}
              <div
                data-reveal="scale"
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={division.coverImage}
                    alt={`${name} Division — NMJ Group`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 ring-1 ring-inset ring-[var(--color-border-strong)] rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul
          data-reveal-stagger="120"
          className={`grid grid-cols-1 gap-6 md:gap-8 ${
            division.companies.length > 1 ? "sm:grid-cols-2" : ""
          } md:pl-[calc(16.667%+1.5rem)]`}
        >
          {division.companies.map((company) => (
            <li
              key={company.name}
              data-reveal
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border-strong)] bg-[var(--color-card-bg)] p-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-[18px] md:rounded-[24px] md:p-[30px]"
            >
              {/* Fill — sweeps up on hover: gold in both modes */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />

              {/* Content above fill */}
              <div className="relative z-10 flex flex-1 flex-col">
                <h3 className="font-serif text-xl leading-tight tracking-[-0.005em] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-obsidian)] dark:group-hover:text-white md:text-2xl">
                  {company.name}
                </h3>
                <p className="mt-5 flex-1 text-[14px] leading-[1.7] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-obsidian)]/80 dark:group-hover:text-white/80">
                  {tr?.companies[company.name] ?? company.description}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {company.externalUrl ? (
                    <Link
                      href={company.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-obsidian)]/40 group-hover:text-[var(--color-obsidian)] dark:group-hover:border-white/50 dark:group-hover:text-white"
                    >
                      {dict.divisionsPage.officialWebsite}
                      <span aria-hidden>↗</span>
                    </Link>
                  ) : (
                    <Link
                      href={withLocale("/contact", locale)}
                      className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-obsidian)]/40 group-hover:text-[var(--color-obsidian)] dark:group-hover:border-white/50 dark:group-hover:text-white"
                    >
                      {dict.divisionsPage.contactViaMain}
                      <span aria-hidden className="rtl:rotate-180">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
