import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rl = rateLimit({
    key: clientKey(req, `pwchange:${session.sub}`),
    max: 5,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a moment and try again." },
      { status: 429, headers: { "retry-after": String(rl.retryAfter) } }
    );
  }

  let currentPassword = "";
  let newPassword = "";
  try {
    const body = (await req.json()) as Record<string, unknown>;
    currentPassword =
      typeof body.currentPassword === "string" ? body.currentPassword : "";
    newPassword =
      typeof body.newPassword === "string" ? body.newPassword : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (newPassword.length < 10) {
    return NextResponse.json(
      { error: "New password must be at least 10 characters" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Verify current password
  const { data: verifyData, error: verifyError } = await supabase.rpc(
    "verify_admin_password",
    { p_username: session.username, p_password: currentPassword }
  );
  if (verifyError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
  const row = Array.isArray(verifyData) ? verifyData[0] : verifyData;
  if (!row?.id) {
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 }
    );
  }

  const { error: updateError } = await supabase.rpc("set_admin_password", {
    p_id: session.sub,
    p_new_password: newPassword,
  });
  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
