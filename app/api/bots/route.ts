import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAuthSession } from "@/lib/api/require-auth-session";

const BotSchema = z.object({
  company_id: z.string().uuid(),
  name: z.string().min(2),
  phone_number: z.string().optional().nullable(),
  retell_agent_id: z.string().min(2),
  status: z.enum(["active", "inactive"]).default("active")
});

export async function POST(request: Request) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = BotSchema.parse(body);
    const { data, error } = await auth.supabase
      .from("bots")
      .insert({
        ...payload,
        phone_number: payload.phone_number || null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}
