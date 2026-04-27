import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/api/require-admin-session";
import { isOwnerEmail } from "@/lib/owner";

export async function requireOwnerSession() {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return auth;
  }

  if (!isOwnerEmail(auth.user.email)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 })
    };
  }

  return auth;
}
