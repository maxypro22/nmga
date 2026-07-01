import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { JOBS_TAG } from "@/lib/jobs";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["Full-time", "Part-time", "Contract"]);

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!hasSupabaseConfig()) {
    const { localGetAllJobs } = await import("@/lib/local-store");
    return NextResponse.json({ jobs: localGetAllJobs() });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("job_listings")
    .select("id, title, division, type, location, description, is_active, display_order, created_at")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ jobs: data ?? [] });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const division = typeof body.division === "string" ? body.division.trim() : "";
  const type = typeof body.type === "string" ? body.type.trim() : "Full-time";
  const location = typeof body.location === "string" ? body.location.trim() : "Doha, Qatar";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const display_order = typeof body.display_order === "number" ? body.display_order : 0;

  if (!title || title.length > 200) return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  if (!division || division.length > 100) return NextResponse.json({ error: "Invalid division" }, { status: 400 });
  if (!ALLOWED_TYPES.has(type)) return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  if (!location || location.length > 200) return NextResponse.json({ error: "Invalid location" }, { status: 400 });
  if (description.length > 2000) return NextResponse.json({ error: "Description too long" }, { status: 400 });

  if (!hasSupabaseConfig()) {
    const { localCreateJob } = await import("@/lib/local-store");
    const job = localCreateJob({ title, division, type, location, description, display_order, is_active: true });
    return NextResponse.json({ job }, { status: 201 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("job_listings")
    .insert({ title, division, type, location, description, display_order, is_active: true })
    .select("id, title, division, type, location, description, is_active, display_order, created_at")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(JOBS_TAG, "max");
  return NextResponse.json({ job: data }, { status: 201 });
}
