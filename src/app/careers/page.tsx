import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";
import { getActiveJobs, STATIC_JOBS, type JobRow } from "@/lib/jobs";
import { sectors } from "@/lib/sectors";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { JobsExplorer, type ExplorerDivision } from "./JobsExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers at NMJ Group | Jobs in Doha, Qatar",
  description:
    "Explore career opportunities at NMJ Group in Doha, Qatar. We hire across hospitality, real estate, construction, events, services, technology, and AI.",
  alternates: { canonical: "https://nmj-group.qa/careers" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

/** Loose key so "Real Estate", "real-estate" and "realestate" all resolve to one division. */
function divisionKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Groups the open roles under the division (company) they belong to, so the
 * careers page can ask the visitor to pick a division before showing its jobs.
 * Divisions with no live roles are still listed — shown as disabled cards.
 */
function groupJobsByDivision(jobs: JobRow[], locale: Locale): ExplorerDivision[] {
  const items = getDictionary(locale).divisions.items;
  const grouped: ExplorerDivision[] = sectors.map((sector) => ({
    slug: sector.slug,
    name: items[sector.slug]?.name ?? sector.name,
    icon: sector.icon,
    companies: sector.companies.map((c) => c.name),
    jobs: [],
  }));

  const bySlug = new Map<string, ExplorerDivision>();
  for (const division of grouped) bySlug.set(division.slug, division);

  const lookup = new Map<string, ExplorerDivision>();
  for (const sector of sectors) {
    const division = bySlug.get(sector.slug)!;
    lookup.set(divisionKey(sector.name), division);
    lookup.set(divisionKey(sector.slug), division);
  }

  for (const job of jobs) {
    const match = lookup.get(divisionKey(job.division ?? ""));
    if (match) {
      match.jobs.push(job);
      continue;
    }
    // Unknown division on the record — keep the role visible under its own card.
    const slug = `other-${divisionKey(job.division || "general")}`;
    let extra = bySlug.get(slug);
    if (!extra) {
      extra = {
        slug,
        name: job.division || "NMJ Group",
        icon: "building",
        companies: [],
        jobs: [],
      };
      bySlug.set(slug, extra);
      grouped.push(extra);
    }
    extra.jobs.push(job);
  }

  return grouped;
}

export default function CareersPage() {
  return <CareersBody locale="en" />;
}

export async function CareersBody({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).careers;
  const dbJobs = await getActiveJobs();
  const jobs: JobRow[] = dbJobs.length > 0
    ? dbJobs
    : STATIC_JOBS.map((j, i) => ({ ...j, id: String(i), is_active: true, display_order: i, created_at: "" }));

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="careers-hero"
        className="cinematic-bg relative -mt-px bg-[var(--color-bg-primary)] pt-[85px]"
      >
        <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 xl:gap-24">
            <div>
              <Eyebrow data-reveal tone="gold">{d.hero.eyebrow}</Eyebrow>
              <h1
                id="careers-hero"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
              >
                {d.hero.headline}
              </h1>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="mt-8 max-w-[48ch] text-[16px] leading-[1.85] text-[var(--color-text-muted)]"
              >
                {d.hero.subhead}
              </p>
              <div
                data-reveal
                style={{ ["--reveal-delay" as string]: "320ms" }}
                className="mt-10"
              >
                <a
                  href="#openings"
                  className="btn-metallic group inline-flex items-center gap-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[var(--color-obsidian)] transition-all hover:bg-transparent hover:text-[var(--color-gold)]"
                >
                  {d.hero.cta}
                  <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                    <Icon name="arrow-right" size={14} />
                  </span>
                </a>
              </div>
            </div>

            {/* Hero image — NexIT Global offices, NMJ's technology division */}
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "150ms" }}
              className="relative h-[300px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:ring-white/[0.05] lg:h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"
                alt="Professional team in a modern office — NMJ Group Careers"
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

      {/* Why Work With Us */}
      <section
        aria-labelledby="careers-why"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>{d.why.eyebrow}</Eyebrow>
          <h2
            id="careers-why"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {d.why.heading}
          </h2>

          {/* Mobile: auto-rotating carousel */}
          <div className="mt-12 md:hidden">
            <CardCarousel>
              {d.why.cards.map((card, i) => {
                const icons = ["target", "sparkles", "eye", "location"] as const;
                return (
                  <div key={card.title} className="vmv-card min-h-[240px] justify-start">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
                      <Icon name={icons[i]} size={18} />
                    </span>
                    <h3 className="mt-5 font-serif text-xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </CardCarousel>
          </div>

          {/* Desktop: 4-col grid */}
          <div
            data-reveal-stagger="120"
            className="mt-12 hidden md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4"
          >
            {d.why.cards.map((card, i) => {
              const icons = ["target", "sparkles", "eye", "location"] as const;
              return (
                <div key={card.title} data-reveal className="vmv-card min-h-[240px] justify-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
                    <Icon name={icons[i]} size={18} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section
        id="openings"
        aria-labelledby="careers-openings"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 grid items-end gap-8 md:mb-16 md:grid-cols-12">
            <div className="md:col-span-6">
              <Eyebrow data-reveal>{d.openings.eyebrow}</Eyebrow>
              <h2
                id="careers-openings"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
              >
                {d.openings.heading}
              </h2>
            </div>
            <p
              data-reveal
              style={{ ["--reveal-delay" as string]: "200ms" }}
              className="md:col-span-6 text-[15px] leading-[1.8] text-[var(--color-text-muted)]"
            >
              {d.openings.intro}
            </p>
          </div>

          <JobsExplorer
            divisions={groupJobsByDivision(jobs, locale)}
            applyEmail={d.apply.email}
            labels={{
              selectPrompt: d.openings.selectPrompt,
              back: d.openings.back,
              rolesOne: d.openings.rolesOne,
              rolesMany: d.openings.rolesMany,
              rolesNone: d.openings.rolesNone,
              viewRoles: d.openings.viewRoles,
              companiesLabel: d.openings.companiesLabel,
              emptyState: d.openings.emptyState,
              applyLabel: d.openings.applyLabel,
              divisionLabel: d.openings.divisionLabel,
            }}
          />
        </div>
      </section>


      {/* Apply CTA */}
      <section
        aria-labelledby="careers-apply"
        data-cursor-light
        className={`border-t border-[var(--color-border-dark)] bg-[var(--color-obsidian)] text-[var(--color-ivory)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <Eyebrow data-reveal tone="gold-subtle">{d.apply.eyebrow}</Eyebrow>
              <h2
                id="careers-apply"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[var(--color-ivory)]"
              >
                {d.apply.heading}
              </h2>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-white/70"
              >
                {d.apply.body}
              </p>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "280ms" }}
                className="mt-4 text-[13px] italic text-white/45"
              >
                {d.apply.note}
              </p>
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "200ms" }}
              className="flex flex-col items-start gap-5 sm:flex-row md:flex-col md:items-start lg:flex-row lg:items-center"
            >
              <a
                href={`mailto:${d.apply.email}`}
                className="btn-metallic group inline-flex items-center gap-3 rounded-full bg-[var(--color-ivory)] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-obsidian)] transition-colors hover:bg-[var(--color-gold)]"
              >
                {d.apply.cta}
                <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                  <Icon name="mail" size={14} />
                </span>
              </a>
              <span className="text-[13px] text-white/50">{d.apply.email}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
