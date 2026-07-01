import { getAllReleasesForDashboard } from "@/lib/newsroom";
import { NewsroomManager } from "./NewsroomManager";
import { hasSupabaseConfig } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardNewsroomPage() {
  const releases = await getAllReleasesForDashboard();
  const connected = hasSupabaseConfig();

  return (
    <div className="mx-auto max-w-[900px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">Newsroom</p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        Manage Press Releases
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        Publish, draft, or delete press releases shown on the public Newsroom page. New releases appear immediately.
      </p>

      {!connected && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-[13px] text-amber-800 dark:border-amber-600 dark:bg-amber-900/20 dark:text-amber-300">
          Supabase is not configured. Set <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to enable database-backed press releases.
          Run <code className="font-mono">supabase/schema-jobs-newsroom.sql</code> in the Supabase SQL editor first.
        </div>
      )}

      <div className="mt-10">
        <NewsroomManager initialReleases={releases} />
      </div>
    </div>
  );
}
