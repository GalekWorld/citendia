import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAuthSession } from "@/lib/api/require-auth-session";

const BotUpdateSchema = z.object({
  company_id: z.string().uuid().optional(),
  name: z.string().min(2).optional(),
  phone_number: z.string().optional().nullable(),
  retell_agent_id: z.string().min(2).optional(),
  status: z.enum(["active", "inactive"]).optional()
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = BotUpdateSchema.parse(body);
    const { id } = await params;
    const { data, error } = await auth.supabase
      .from("bots")
      .update({
        ...payload,
        phone_number: payload.phone_number === "" ? null : payload.phone_number
      })
      .eq("id", id)
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
