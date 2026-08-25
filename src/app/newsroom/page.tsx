import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { withLocale, type Locale } from "@/lib/i18n";
import { CardCarousel } from "@/components/ui/CardCarousel";
import { getPublishedPressReleases, STATIC_PRESS_RELEASES, type PressReleaseRow } from "@/lib/newsroom";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsroom | NMJ Group — Doha, Qatar",
  description:
    "Official newsroom of NMJ Group. Press releases, company announcements, media inquiries, and official statements from NMJ Group in Doha, Qatar.",
  alternates: { canonical: "https://nmj-group.qa/newsroom" },
};

const SECTION_PADDING = "px-6 py-[clamp(4rem,8vw,8rem)] md:px-10 lg:px-14";

const ANNOUNCEMENTS = {
  en: [
    {
      id: "an-hiring",
      title: "NMJ Group is Hiring Across All Divisions",
      body: "We are actively expanding our teams in hospitality, real estate, construction, events, services, technology, and AI. Visit our Careers page to view open positions.",
      date: "Ongoing — 2026",
    },
    {
      id: "an-new-website",
      title: "NMJ Group Launches Redesigned Group Website",
      body: "NMJ Group has launched a redesigned corporate website featuring detailed division profiles, bilingual Arabic and English content, and a comprehensive overview of all operating companies.",
      date: "June 2026",
    },
    {
      id: "an-linkedin",
      title: "Follow NMJ Group on LinkedIn for the Latest Updates",
      body: "Stay connected with NMJ Group on LinkedIn for business news, division updates, and career opportunities.",
      date: "Ongoing",
    },
  ],
  ar: [
    {
      id: "an-hiring",
      title: "مجموعة NMJ توظف في جميع الأقسام",
      body: "نحن نوسع فرقنا بنشاط في قطاعات الضيافة والعقارات والبناء والفعاليات والخدمات والتكنولوجيا والذكاء الاصطناعي. تفضل بزيارة صفحة الوظائف للاطلاع على الشواغر المتاحة.",
      date: "مستمر — 2026",
    },
    {
      id: "an-new-website",
      title: "مجموعة NMJ تطلق موقعها الإلكتروني المُعاد تصميمه",
      body: "أطلقت مجموعة NMJ موقعها الإلكتروني المؤسسي الجديد الذي يتضمن ملفات تفصيلية للأقسام، ومحتوى ثنائي اللغة بالعربية والإنجليزية، ونظرة شاملة على جميع الشركات التابعة.",
      date: "يونيو 2026",
    },
    {
      id: "an-linkedin",
      title: "تابع مجموعة NMJ على LinkedIn للحصول على آخر المستجدات",
      body: "ابقَ على تواصل مع مجموعة NMJ عبر LinkedIn لمتابعة أخبار الأعمال وتحديثات الأقسام وفرص العمل.",
      date: "مستمر",
    },
  ],
};

export default function NewsroomPage() {
  return <NewsroomBody locale="en" />;
}

export async function NewsroomBody({ locale }: { locale: Locale }) {
  const dbReleases = await getPublishedPressReleases();
  const pressReleases: PressReleaseRow[] = dbReleases.length > 0
    ? dbReleases
    : STATIC_PRESS_RELEASES.map((r, i) => ({
        ...r,
        id: String(i),
        is_published: true,
        display_order: i,
        created_at: "",
      }));
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="newsroom-hero"
        className="cinematic-bg relative -mt-px bg-[var(--color-bg-primary)] pt-[85px]"
      >
        <div className={`mx-auto max-w-[1200px] ${SECTION_PADDING}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16 xl:gap-24">
            <div>
              <Eyebrow data-reveal tone="gold">
                {locale === "ar" ? "غرفة الأخبار" : "Newsroom"}
              </Eyebrow>
              <h1
                id="newsroom-hero"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 max-w-[16ch] font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.015em] text-[var(--color-ink)]"
              >
                {locale === "ar"
                  ? "الأخبار والبيانات الرسمية"
                  : "Official News & Press Releases"}
              </h1>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="mt-8 max-w-[46ch] text-[16px] leading-[1.85] text-[var(--color-text-muted)]"
              >
                {locale === "ar"
                  ? "بيانات صحفية رسمية وتحديثات مجموعة NMJ والأقسام التابعة لها."
                  : "Official press releases, company announcements, and updates from NMJ Group and its operating divisions in Doha, Qatar."}
              </p>

              <div
                data-reveal
                style={{ ["--reveal-delay" as string]: "300ms" }}
                className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
              >
                <a
                  href="mailto:media@nmj-group.qa"
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-obsidian)] transition-colors hover:bg-transparent hover:text-[var(--color-gold)]"
                >
                  {locale === "ar" ? "تواصل مع قسم الإعلام" : "Media Enquiries"}
                  <Icon name="mail" size={13} />
                </a>
                <span className="text-[13px] text-[var(--color-text-muted)]">
                  media@nmj-group.qa
                </span>
              </div>
            </div>

            {/* Hero image — Al Anaqa corporate event, NMJ's events division */}
            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "150ms" }}
              className="relative h-[300px] overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] dark:ring-white/[0.05] lg:h-[500px]"
            >
              <Image
                src="/images/heroes/newsroom-hero-v2.jpg"
                alt="NMJ Group Newsroom — Official News & Press Releases"
                fill
                sizes="(min-width: 1024px) 920px, 150vw"
                quality={92}
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                priority
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section
        aria-labelledby="newsroom-press"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>
            {locale === "ar" ? "البيانات الصحفية" : "Press Releases"}
          </Eyebrow>
          <h2
            id="newsroom-press"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {locale === "ar" ? "آخر البيانات" : "Latest Releases"}
          </h2>

          <ul data-reveal-stagger="80" className="mt-12 divide-y divide-[var(--color-border)]">
            {pressReleases.map((pr) => (
              <li key={pr.id} data-reveal>
                <div className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8">
                  {/* Date + category */}
                  <div className="md:col-span-3">
                    <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                      {pr.category}
                    </span>
                    <span className="mt-1 block text-[13px] text-[var(--color-text-muted)]">
                      {pr.date_label}
                    </span>
                    <span className="mt-3 hidden rounded-full border border-[var(--color-border-strong)] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] md:inline-block">
                      {pr.division}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-xl leading-snug tracking-[-0.005em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-gold)] md:text-2xl">
                      {pr.headline}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.75] text-[var(--color-text-muted)]">
                      {pr.body}
                    </p>
                    <span className="mt-4 inline-block rounded-full border border-[var(--color-border-strong)] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] md:hidden">
                      {pr.division}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company Announcements */}
      <section
        aria-labelledby="newsroom-announcements"
        className={`border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <Eyebrow data-reveal>
            {locale === "ar" ? "إعلانات الشركة" : "Company Announcements"}
          </Eyebrow>
          <h2
            id="newsroom-announcements"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
            className="mt-6 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]"
          >
            {locale === "ar" ? "آخر الإعلانات" : "Latest Announcements"}
          </h2>

          {/* Mobile: auto-rotating carousel */}
          <div className="mt-12 md:hidden">
            <CardCarousel>
              {ANNOUNCEMENTS[locale].map((ann) => (
                <div
                  key={ann.id}
                  className="flex flex-col gap-3 rounded-[16px] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] p-4 shadow-sm"
                >
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                    {ann.date}
                  </span>
                  <h3 className="font-serif text-sm leading-snug text-[var(--color-ink)]">
                    {ann.title}
                  </h3>
                  <p className="flex-1 text-[12px] leading-[1.65] text-[var(--color-text-muted)]">
                    {ann.body}
                  </p>
                </div>
              ))}
            </CardCarousel>
          </div>

          {/* Desktop: 3-col grid */}
          <ul
            data-reveal-stagger="100"
            className="mt-12 hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {ANNOUNCEMENTS[locale].map((ann) => (
              <li key={ann.id} data-reveal>
                <div className="flex h-full flex-col gap-3 rounded-[16px] border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] p-4 shadow-sm md:p-6">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                    {ann.date}
                  </span>
                  <h3 className="font-serif text-sm leading-snug text-[var(--color-ink)] md:text-base lg:text-lg">
                    {ann.title}
                  </h3>
                  <p className="flex-1 text-[12px] leading-[1.65] text-[var(--color-text-muted)] md:text-[13px]">
                    {ann.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Media Contact */}
      <section
        aria-labelledby="newsroom-contact"
        data-cursor-light
        className={`border-t border-[var(--color-border-dark)] bg-[var(--color-obsidian)] text-[var(--color-ivory)] ${SECTION_PADDING}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <div>
              <Eyebrow data-reveal tone="gold-subtle">
                {locale === "ar" ? "التواصل الإعلامي" : "Media Contact"}
              </Eyebrow>
              <h2
                id="newsroom-contact"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
                className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-[var(--color-ivory)]"
              >
                {locale === "ar" ? "تواصل مع فريق الإعلام" : "Get in Touch with Our Media Team"}
              </h2>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "200ms" }}
                className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-white/70"
              >
                {locale === "ar"
                  ? "للاستفسارات الصحفية وطلبات المقابلات وفرص الشراكة الإعلامية، تواصل مع فريقنا في الدوحة."
                  : "For press enquiries, interview requests, corporate photography, or media partnership opportunities, contact our team in Doha, Qatar."}
              </p>
            </div>

            <div
              data-reveal
              style={{ ["--reveal-delay" as string]: "150ms" }}
              className="space-y-4"
            >
              {/* Media contact card */}
              <div className="rounded-2xl border border-[var(--color-border-dark)] bg-white/[0.04] p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.5)]">
                  {locale === "ar" ? "البريد الإعلامي" : "Media Email"}
                </p>
                <a
                  href="mailto:media@nmj-group.qa"
                  className="mt-2 block text-[17px] text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]"
                >
                  media@nmj-group.qa
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--color-border-dark)] bg-white/[0.04] p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(255,255,255,0.5)]">
                  {locale === "ar" ? "الهاتف" : "Phone"}
                </p>
                <a
                  href="tel:+97444440085"
                  className="mt-2 block text-[17px] text-[var(--color-ivory)] transition-colors hover:text-[var(--color-gold-subtle)]"
                >
                  +974 4444 0085
                </a>
              </div>
              <div className="mt-6">
                <Link
                  href={withLocale("/contact", locale)}
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-[var(--color-gold-subtle)]"
                >
                  {locale === "ar" ? "صفحة التواصل الكاملة" : "Full Contact Page"}
                  <span aria-hidden className="rtl:rotate-180">
                    <Icon name="arrow-right" size={13} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
