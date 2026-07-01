import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { CONTENT_TAG, CONTENT_DEFAULTS } from "@/lib/content";

const ALLOWED_KEYS = new Set(Object.keys(CONTENT_DEFAULTS));
const MAX_VALUE_LENGTH = 2000;

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("content_overrides")
    .select("key, value, updated_at");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    map[row.key as string] = row.value as string;
  }
  return NextResponse.json({ overrides: map });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let updates: Record<string, string> = {};
  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (body.updates && typeof body.updates === "object") {
      for (const [k, v] of Object.entries(body.updates)) {
        if (
          typeof k === "string" &&
          ALLOWED_KEYS.has(k) &&
          typeof v === "string" &&
          v.length <= MAX_VALUE_LENGTH
        ) {
          updates[k] = v;
        }
      }
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const entries = Object.entries(updates);
  if (entries.length === 0) {
    return NextResponse.json({ ok: true, written: 0 });
  }

  const supabase = getSupabaseAdmin();
  const rows = entries.map(([key, value]) => ({
    key,
    value,
    updated_by: session.sub,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("content_overrides")
    .upsert(rows, { onConflict: "key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateTag(CONTENT_TAG, "max");
  return NextResponse.json({ ok: true, written: rows.length });
}
