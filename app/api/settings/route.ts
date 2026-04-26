import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerSession } from "@/lib/api/require-owner-session";

const SettingsSchema = z.object({
  installation_fee: z.coerce.number().min(0),
  monthly_fee: z.coerce.number().min(0),
  per_minute_fee: z.coerce.number().min(0),
  billing_rounding: z.enum(["exact", "ceil"])
});

export async function POST(request: Request) {
  const auth = await requireOwnerSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const formData = await request.formData();
    const payload = SettingsSchema.parse({
      installation_fee: formData.get("installation_fee"),
      monthly_fee: formData.get("monthly_fee"),
      per_minute_fee: formData.get("per_minute_fee"),
      billing_rounding: formData.get("billing_rounding")
    });

    const { data: current } = await auth.supabase
      .from("settings")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    const query = current
      ? auth.supabase.from("settings").update(payload).eq("id", current.id)
      : auth.supabase.from("settings").insert(payload);
    const { error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.redirect(new URL("/settings", request.url));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}
