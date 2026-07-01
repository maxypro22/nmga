import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { withLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "News & Media | NMJ Group — Doha, Qatar",
  description:
    "Latest news, company updates, and media releases from NMJ Group — a diversified business group headquartered in Doha, Qatar.",
  alternates: { canonical: "https://nmj-group.qa/news" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

type NewsItem = {
  id: string;
  category: string;
  date: string;
  headline: string;
  body: string;
  division?: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "nmj-35-years",
    category: "Milestone",
    date: "2026",
    headline: "NMJ Group Celebrates 35 Years of Business Excellence in Qatar",
    body: "Since its founding in 1991, NMJ Group has grown from a single enterprise into a diversified holding group spanning hospitality, real estate, construction, events, services, technology, and AI. The group marks this milestone with a renewed commitment to quality and long-term growth.",
    division: "NMJ Group",
  },
  {
    id: "five-nodes-platform",
    category: "Technology",
    date: "March 2026",
    headline: "Five Nodes AI Launches Advanced Business Automation Platform",
    body: "Five Nodes AI, NMJ Group's AI division, has released a new intelligent automation platform designed to streamline operations for Qatari businesses. The platform integrates workflow automation, AI communication systems, and real-time analytics.",
    division: "AI Division",
  },
  {
    id: "sapphire-renovation",
    category: "Hospitality",
    date: "February 2026",
    headline: "Sapphire Plaza Hotel Completes Major Facility Upgrade",
    body: "Sapphire Plaza Hotel has completed a comprehensive upgrade of its guest facilities, including renovated rooms, expanded banquet hall capacity, and a new fitness center. The hotel continues to serve as one of Doha's premier 4-star destinations.",
    division: "Hospitality Division",
  },
  {
    id: "al-emara-contract",
    category: "Construction",
    date: "April 2026",
    headline: "Al Emara Al Islamiya Awarded Major Infrastructure Contract",
    body: "Al Emara Al Islamiya Trading & Contracting, NMJ Group's construction arm, has secured a significant new contract for commercial infrastructure work in Doha. The project reinforces Al Emara's track record in delivering high-quality construction and MEP services.",
    division: "Construction Division",
  },
  {
    id: "nexit-expansion",
    category: "Technology",
    date: "January 2026",
    headline: "NexIT Global Expands Digital Solutions Portfolio for Qatari Enterprises",
    body: "NexIT Global has broadened its suite of digital services to include enhanced document management systems and enterprise workflow automation. The expansion supports NMJ Group's broader technology-driven growth strategy.",
    division: "Technology Division",
  },
  {
    id: "al-anaqa-season",
    category: "Events",
    date: "December 2025",
    headline: "Al Anaqh Events Records Record Wedding Season in Qatar",
    body: "Al Anaqh Events & Wedding Planning concluded its most successful season to date, organizing over 80 events across Doha's leading venues. The company continues to expand its corporate event capabilities alongside its established wedding services.",
    division: "Events Division",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Milestone: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  Technology: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Hospitality: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Construction: "bg-stone-500/10 text-stone-700 dark:text-stone-300",
  Events: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
};

export default function NewsPage() {
  return <NewsBody locale="en" />;
}

export function NewsBody({ locale }: { locale: Locale }) {
  const featured = NEWS_ITEMS[0];
  const rest = NEWS_ITEMS.slice(1);

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="news-hero"
        className="cinematic-bg relative -mt-px overflow-hidden pt-[85px]"
      >
        <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING}`}>
          <Eyebrow data-reveal tone="gold">
            {locale === "ar" ? "آخر الأخبار" : "Latest Updates"}
          </Eyebrow>
          <h1
            id="news-hero"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 max-w-[14ch] font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
          >
            {locale === "ar" ? "الأخبار والإعلامية" : "News & Media"}
          </h1>
          <p
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
            className="mt-8 max-w-[55ch] text-[16px] leading-[1.85] text-[var(--color-text-muted)]"
          >
            {locale === "ar"
              ? "آخر الإعلانات وتحديثات الشركة والإصدارات الإعلامية من مجموعة NMJ."
              : "Latest announcements, company updates, and media releases from NMJ Group and its operating divisions."}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section
        aria-labelledby="news-featured"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>
            {locale === "ar" ? "أبرز الأخبار" : "Featured"}
          </Eyebrow>

          <article
            data-reveal
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="mt-10 overflow-hidden rounded-[24px] border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)]"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] font-medium ${CATEGORY_COLORS[featured.category] ?? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"}`}>
                    {featured.category}
                  </span>
                  <span className="text-[12px] text-[var(--color-text-muted)]">
                    {featured.date}
                  </span>
                </div>
                <h2
                  id="news-featured"
                  className="mt-6 font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]"
                >
                  {featured.headline}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.8] text-[var(--color-text-muted)]">
                  {featured.body}
                </p>
                {featured.division && (
                  <span className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    {featured.division}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center border-t border-[var(--color-border)] p-8 md:border-l md:border-t-0 md:p-12">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-gold)]/30 text-[var(--color-gold)]">
                    <Icon name="building" size={32} />
                  </div>
                  <p className="font-serif text-2xl tracking-[0.28em] text-[var(--color-ink)]">
                    NMJ
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {locale === "ar" ? "منذ ١٩٩١" : "Since 1991"}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* News Grid */}
      <section
        aria-labelledby="news-all"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>
            {locale === "ar" ? "جميع التحديثات" : "All Updates"}
          </Eyebrow>
          <h2
            id="news-all"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {locale === "ar" ? "آخر الأخبار" : "Latest News"}
          </h2>

          <ul
            data-reveal-stagger="100"
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {rest.map((item) => (
              <li key={item.id} data-reveal>
                <article className="premium-card group flex h-full flex-col gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] font-medium ${CATEGORY_COLORS[item.category] ?? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]"}`}>
                        {item.category}
                      </span>
                      <span className="text-[11px] text-[var(--color-text-muted)]">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-lg leading-snug tracking-[-0.005em] text-[var(--color-ink)] md:text-xl">
                      {item.headline}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)] line-clamp-3">
                      {item.body}
                    </p>
                  </div>
                  {item.division && (
                    <div className="mt-auto border-t border-[var(--color-border)] pt-4">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
                        {item.division}
                      </span>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Media Inquiries CTA */}
      <section
        aria-labelledby="news-media-cta"
        data-cursor-light
        className={`border-t border-[var(--color-border-dark)] bg-[var(--color-obsidian)] text-[var(--color-ivory)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <Eyebrow data-reveal tone="gold-subtle">
                {locale === "ar" ? "استفسارات إعلامية" : "Media Inquiries"}
              </Eyebrow>
              <h2
                id="news-media-cta"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[var(--color-ivory)]"
              >
                {locale === "ar" ? "تواصل مع قسم الإعلام" : "Get in Touch with Our Media Team"}
              </h2>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-white/70"
              >
                {locale === "ar"
                  ? "للاستفسارات الإعلامية أو طلبات التغطية الصحفية أو الشراكات الإعلامية، تواصل مع فريقنا."
                  : "For press inquiries, media requests, interview opportunities, or partnership communications, contact our team in Doha."}
              </p>
            </div>
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "200ms" }}
              className="flex flex-col items-start gap-5"
            >
              <Link
                href={withLocale("/contact", locale)}
                className="btn-metallic group inline-flex items-center gap-3 rounded-full bg-[var(--color-ivory)] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-obsidian)] transition-colors hover:bg-[var(--color-gold)]"
              >
                {locale === "ar" ? "تواصل معنا" : "Contact Our Team"}
                <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:rotate-180">
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
              <a
                href="mailto:info@nmj-group.qa"
                className="text-[13px] text-white/55 transition-colors hover:text-white"
              >
                info@nmj-group.qa
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
