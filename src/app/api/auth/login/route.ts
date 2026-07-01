import { NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";
import { signSession, setSessionCookie } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 8 attempts per minute per IP — generous for humans, painful for bots.
  const rl = rateLimit({
    key: clientKey(req, "login"),
    max: 8,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "retry-after": String(rl.retryAfter) },
      }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = (await req.json()) as Record<string, unknown>;
    username = typeof body.username === "string" ? body.username.trim() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Hard size limits — prevents oversized inputs from burning CPU on bcrypt.
  if (username.length > 64 || password.length > 1024) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 }
    );
  }

  // ── Local fallback (no Supabase) ─────────────────────────────────────────
  // When LOCAL_ADMIN_USERNAME / LOCAL_ADMIN_PASSWORD are set in .env.local,
  // authentication works without a database. Useful for local development.
  if (!hasSupabaseConfig()) {
    return localAuth(username, password);
  }

  // ── Supabase auth ────────────────────────────────────────────────────────
  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch {
    return localAuth(username, password);
  }

  const { data, error } = await supabase.rpc("verify_admin_password", {
    p_username: username,
    p_password: password,
  });

  if (error) {
    // Schema not yet run or connection failed — fall back to local creds.
    return localAuth(username, password);
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.id) {
    // Constant-ish timing: don't leak whether the username exists.
    await new Promise((r) => setTimeout(r, 250));
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const token = await signSession({ id: row.id, username: row.username });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}

async function localAuth(username: string, password: string): Promise<NextResponse> {
  const localUser = process.env.LOCAL_ADMIN_USERNAME;
  const localPass = process.env.LOCAL_ADMIN_PASSWORD;

  if (!localUser || !localPass) {
    return NextResponse.json(
      { error: "Server not configured. Set LOCAL_ADMIN_USERNAME and LOCAL_ADMIN_PASSWORD in .env.local for local development." },
      { status: 500 }
    );
  }

  await new Promise((r) => setTimeout(r, 250)); // constant-time delay
  if (username !== localUser || password !== localPass) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = await signSession({ id: "local-admin", username: localUser });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
