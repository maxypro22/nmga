import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admins")
    .select("id, username, created_at, created_by")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ admins: data ?? [] });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let username = "";
  let password = "";
  try {
    const body = (await req.json()) as Record<string, unknown>;
    username = typeof body.username === "string" ? body.username.trim() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (username.length < 3 || username.length > 64) {
    return NextResponse.json(
      { error: "Username must be 3–64 characters" },
      { status: 400 }
    );
  }
  if (password.length < 10) {
    return NextResponse.json(
      { error: "Password must be at least 10 characters" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("create_admin", {
    p_username: username,
    p_password: password,
    p_created_by: session.sub,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data });
}
