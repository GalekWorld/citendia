import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/api/require-admin-session";

const UpdateContactLeadSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "archived"])
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = UpdateContactLeadSchema.parse(body);
    const { id } = await context.params;

    const { data, error } = await auth.supabase
      .from("contact_leads")
      .update({
        status: payload.status
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
          : "No se pudo actualizar el lead";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
