import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase";
import { CONTENT_DEFAULTS } from "@/lib/content";
import { DashboardStats } from "./DashboardStats";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

const TOTAL_CONTENT_FIELDS = Object.keys(CONTENT_DEFAULTS).length;

type Stats = { admins: number; overrides: number; error: string | null };

export async function getStats(): Promise<Stats> {
  try {
    const supabase = getSupabaseAdmin();
    const [adminsRes, contentRes] = await Promise.all([
      supabase.from("admins").select("id", { count: "exact", head: true }),
      supabase
        .from("content_overrides")
        .select("key", { count: "exact", head: true }),
    ]);
    return {
      admins: adminsRes.count ?? 0,
      overrides: contentRes.count ?? 0,
      error: null,
    };
  } catch (err) {
    return {
      admins: 0,
      overrides: 0,
      error: err instanceof Error ? err.message : "Failed to load stats",
    };
  }
}

export default async function DashboardOverview() {
  const stats = await getStats();
  return <DashboardOverviewBody locale="en" stats={stats} />;
}

export async function DashboardOverviewBody({
  locale,
  stats,
}: {
  locale: Locale;
  stats: Stats;
}) {
  const dict = getDictionary(locale);
  const d = dict.dashboard.overview;

  return (
    <div className="ambient mx-auto max-w-[1100px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
        {d.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        {d.welcome}
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        {d.desc}
      </p>

      {stats.error ? (
        <p className="mt-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-700 dark:text-red-300">
          {d.supabaseError} {stats.error}
        </p>
      ) : (
        <DashboardStats
          locale={locale}
          admins={stats.admins}
          overrides={stats.overrides}
          totalFields={TOTAL_CONTENT_FIELDS}
        />
      )}

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {d.quickLinks.map((link) => (
          <Link
            key={link.href}
            href={withLocale(link.href, locale)}
            className="premium-card press group block !p-6"
          >
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
              {link.label}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180"
              >
                →
              </span>
            </p>
            <p className="mt-3 text-[14px] leading-[1.6] text-[var(--color-text-muted)]">
              {link.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
