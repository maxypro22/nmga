import { getSession } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { AdminsManager } from "./AdminsManager";

export const dynamic = "force-dynamic";

async function getAdmins() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("admins")
      .select("id, username, created_at")
      .order("created_at", { ascending: true });
    if (error) return { admins: [], error: error.message };
    return { admins: data ?? [], error: null as string | null };
  } catch (err) {
    return {
      admins: [],
      error: err instanceof Error ? err.message : "Unable to load admins",
    };
  }
}

export default async function AdminsPage() {
  const session = await getSession();
  const { admins, error } = await getAdmins();

  return (
    <div className="mx-auto max-w-[900px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
        Admins
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        Dashboard users
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        Add new admins by setting a username and password, then share the
        credentials securely. Each admin can sign in, edit content/theme, and
        manage other admins.
      </p>

      {error ? (
        <p className="mt-6 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-10">
        <AdminsManager admins={admins} currentId={session?.sub ?? ""} />
      </div>
    </div>
  );
}
