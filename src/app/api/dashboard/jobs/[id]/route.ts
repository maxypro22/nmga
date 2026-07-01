import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { JOBS_TAG } from "@/lib/jobs";

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
    const { localDeleteJob } = await import("@/lib/local-store");
    localDeleteJob(id);
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("job_listings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(JOBS_TAG, "max");
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
  if (typeof body.is_active === "boolean") updates.is_active = body.is_active;
  if (typeof body.display_order === "number") updates.display_order = body.display_order;
  if (typeof body.title === "string" && body.title.trim()) updates.title = body.title.trim().slice(0, 200);
  if (typeof body.division === "string" && body.division.trim()) updates.division = body.division.trim().slice(0, 100);
  if (typeof body.type === "string") updates.type = body.type.trim();
  if (typeof body.location === "string" && body.location.trim()) updates.location = body.location.trim().slice(0, 200);
  if (typeof body.description === "string") updates.description = body.description.trim().slice(0, 2000);

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  if (!hasSupabaseConfig()) {
    const { localUpdateJob } = await import("@/lib/local-store");
    const job = localUpdateJob(id, updates as never);
    if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ job });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("job_listings")
    .update(updates)
    .eq("id", id)
    .select("id, title, division, type, location, description, is_active, display_order, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(JOBS_TAG, "max");
  return NextResponse.json({ job: data });
}
