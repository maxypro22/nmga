import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { THEME_TAG } from "@/lib/content";

export const runtime = "nodejs";

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .eq("key", "theme");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const row = data?.[0];
  return NextResponse.json({ theme: row?.value ?? {} });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let theme: Record<string, string> = {};
  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (body.theme && typeof body.theme === "object") {
      for (const [k, v] of Object.entries(body.theme as Record<string, unknown>)) {
        if (typeof v !== "string") continue;
        if (!HEX.test(v)) continue;
        // Whitelist of editable keys
        if (
          ![
            "gold",
            "goldSubtle",
            "goldDark",
            "goldSubtleDark",
          ].includes(k)
        )
          continue;
        theme[k] = v;
      }
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("site_settings")
    .upsert(
      {
        key: "theme",
        value: theme,
        updated_by: session.sub,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateTag(THEME_TAG, "max");
  return NextResponse.json({ ok: true });
}
