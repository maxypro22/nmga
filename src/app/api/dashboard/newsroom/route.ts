import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { NEWSROOM_TAG } from "@/lib/newsroom";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasSupabaseConfig()) {
    const { localGetAllReleases } = await import("@/lib/local-store");
    return NextResponse.json({ releases: localGetAllReleases() });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("press_releases")
    .select("id, date_label, category, headline, body, division, is_published, display_order, created_at")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ releases: data ?? [] });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const date_label = typeof body.date_label === "string" ? body.date_label.trim() : "";
  const category = typeof body.category === "string" ? body.category.trim() : "";
  const headline = typeof body.headline === "string" ? body.headline.trim() : "";
  const pr_body = typeof body.body === "string" ? body.body.trim() : "";
  const division = typeof body.division === "string" ? body.division.trim() : "";
  const display_order = typeof body.display_order === "number" ? body.display_order : 0;

  if (!date_label || date_label.length > 100) return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  if (!category || category.length > 100) return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  if (!headline || headline.length > 500) return NextResponse.json({ error: "Invalid headline" }, { status: 400 });
  if (!pr_body || pr_body.length > 5000) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  if (!division || division.length > 100) return NextResponse.json({ error: "Invalid division" }, { status: 400 });

  if (!hasSupabaseConfig()) {
    const { localCreateRelease } = await import("@/lib/local-store");
    const release = localCreateRelease({
      date_label, category, headline, body: pr_body, division, display_order, is_published: true,
    });
    return NextResponse.json({ release }, { status: 201 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("press_releases")
    .insert({ date_label, category, headline, body: pr_body, division, display_order, is_published: true })
    .select("id, date_label, category, headline, body, division, is_published, display_order, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(NEWSROOM_TAG, "max");
  return NextResponse.json({ release: data }, { status: 201 });
}
