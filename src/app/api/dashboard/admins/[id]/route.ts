import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;

  if (id === session.sub) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Refuse to delete the last admin.
  const { count, error: countError } = await supabase
    .from("admins")
    .select("id", { count: "exact", head: true });
  if (countError) {
    return NextResponse.json({ error: countError.message }, { status: 500 });
  }
  if ((count ?? 0) <= 1) {
    return NextResponse.json(
      { error: "Cannot delete the last remaining admin" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("admins").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
