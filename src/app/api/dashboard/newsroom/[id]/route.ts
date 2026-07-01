import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { NEWSROOM_TAG } from "@/lib/newsroom";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  if (!hasSupabaseConfig()) {
    const { localDeleteRelease } = await import("@/lib/local-store");
    localDeleteRelease(id);
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("press_releases").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(NEWSROOM_TAG, "max");
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const updates: Record<string, unknown> = {};
  if (typeof body.is_published === "boolean") updates.is_published = body.is_published;
  if (typeof body.display_order === "number") updates.display_order = body.display_order;
  if (typeof body.date_label === "string" && body.date_label.trim()) updates.date_label = body.date_label.trim().slice(0, 100);
  if (typeof body.category === "string" && body.category.trim()) updates.category = body.category.trim().slice(0, 100);
  if (typeof body.headline === "string" && body.headline.trim()) updates.headline = body.headline.trim().slice(0, 500);
  if (typeof body.body === "string" && body.body.trim()) updates.body = body.body.trim().slice(0, 5000);
  if (typeof body.division === "string" && body.division.trim()) updates.division = body.division.trim().slice(0, 100);

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  if (!hasSupabaseConfig()) {
    const { localUpdateRelease } = await import("@/lib/local-store");
    const release = localUpdateRelease(id, updates as never);
    if (!release) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ release });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("press_releases")
    .update(updates)
    .eq("id", id)
    .select("id, date_label, category, headline, body, division, is_published, display_order, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(NEWSROOM_TAG, "max");
  return NextResponse.json({ release: data });
}
