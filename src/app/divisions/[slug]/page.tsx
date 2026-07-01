import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { sectors } from "@/lib/sectors";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = sectors.find((s) => s.slug === slug);
  if (!division) return {};
  const title = `${division.name} Division | NMJ Group`;
  const description = `${division.intro} Learn about NMJ Group's ${division.name} division and its operating companies in Doha, Qatar.`;
  return {
    title,
    description,
    alternates: { canonical: `https://nmj-group.qa/divisions/${slug}` },
    openGraph: { title, description, images: [division.coverImage] },
  };
}

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DivisionPageBody locale="en" slug={slug} />;
}

export function DivisionPageBody({ locale, slug }: { locale: Locale; slug: string }) {
  const division = sectors.find((s) => s.slug === slug);
  if (!division) notFound();

  const dict = getDictionary(locale);
  const tr = dict.divisions.items[division.slug];
  const name = tr?.name ?? division.name;
  const d = dict.divisionsPage;

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-px h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={division.coverImage}
          alt={`${name} Division — NMJ Group`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,12,20,0.35) 0%, rgba(8,12,20,0.55) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full items-end pb-16 md:pb-20">
          <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-14">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-gold)]">
              {division.number} &mdash; NMJ Group
            </span>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.015em] text-white">
              {locale === "ar"
                ? `${d.divisionWord} ${name}`
                : `${name} ${d.divisionWord}`}
            </h1>
            <p className="mt-5 max-w-[55ch] text-[15px] leading-[1.8] text-white/80">
              {tr?.intro ?? division.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section
        aria-labelledby="division-companies"
        className={`bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>{locale === "ar" ? "الشركات" : "Operating Companies"}</Eyebrow>
          <h2
            id="division-companies"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {locale === "ar" ? "الشركات التابعة" : "Our Companies"}
          </h2>

          <ul
            data-reveal-stagger="120"
            className={`mt-12 grid grid-cols-1 gap-6 md:gap-8 ${
              division.companies.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {division.companies.map((company) => (
              <li
                key={company.name}
                data-reveal
                className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border-strong)] bg-[var(--color-card-bg)] p-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-[18px] md:rounded-[24px] md:p-[30px]"
              >
                <div className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--color-gold)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                <div className="relative z-10 flex flex-1 flex-col">
                  <h3 className="font-serif text-xl leading-tight tracking-[-0.005em] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-obsidian)] dark:group-hover:text-white md:text-2xl">
                    {company.name}
                  </h3>
                  <p className="mt-5 flex-1 text-[14px] leading-[1.7] text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-obsidian)]/80 dark:group-hover:text-white/80">
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
                        {d.officialWebsite}
                        <span aria-hidden>↗</span>
                      </Link>
                    ) : (
                      <Link
                        href={withLocale("/contact", locale)}
                        className="inline-flex items-center gap-2 border-b border-[var(--color-gold)] pb-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors duration-300 group-hover:border-[var(--color-obsidian)]/40 group-hover:text-[var(--color-obsidian)] dark:group-hover:border-white/50 dark:group-hover:text-white"
                      >
                        {d.contactViaMain}
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

      {/* Back to all divisions */}
      <section className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Eyebrow>{locale === "ar" ? "استكشف المزيد" : "Explore More"}</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]">
                {locale === "ar" ? "جميع أقسام المجموعة" : "All NMJ Group Divisions"}
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:items-end">
              <Link
                href={withLocale("/divisions", locale)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold)] hover:text-white"
              >
                {locale === "ar" ? "عرض جميع الأقسام" : "View All Divisions"}
                <span aria-hidden className="rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
              <Link
                href={withLocale("/contact", locale)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
              >
                {locale === "ar" ? "تواصل معنا" : "Contact Us"}
                <span aria-hidden className="rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
