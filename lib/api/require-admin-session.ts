import { NextResponse } from "next/server";
import { requireAuthSession } from "@/lib/api/require-auth-session";

export async function requireAdminSession() {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth;
  }

  const { data: appUser } = await auth.supabase
    .from("app_users")
    .select("role")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (!appUser || appUser.role !== "admin") {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 })
    };
  }

  return auth;
}
