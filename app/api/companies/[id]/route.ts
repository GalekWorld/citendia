import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAuthSession } from "@/lib/api/require-auth-session";

const CompanyUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  contact_name: z.string().optional().nullable(),
  email: z.string().email().or(z.literal("")).optional(),
  phone: z.string().optional().nullable(),
  status: z.enum(["active", "paused", "cancelled"]).optional(),
  installation_fee: z.number().min(0).optional(),
  monthly_fee: z.number().min(0).optional(),
  per_minute_fee: z.number().min(0).optional(),
  installation_charged: z.boolean().optional()
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
    const payload = CompanyUpdateSchema.parse(body);
    const { id } = await params;
    const { data, error } = await auth.supabase
      .from("companies")
      .update({
        ...payload,
        email: payload.email === "" ? null : payload.email,
        contact_name: payload.contact_name === "" ? null : payload.contact_name,
        phone: payload.phone === "" ? null : payload.phone
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as { message: unknown }).message)
          : JSON.stringify(error);

    return NextResponse.json(
      { error: message || "Unexpected error" },
      { status: 400 }
    );
  }
}
