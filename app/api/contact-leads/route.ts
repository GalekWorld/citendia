import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const CreateContactLeadSchema = z.object({
  name: z.string().trim().min(2, "Introduce tu nombre").max(120),
  company_name: z.string().trim().max(160).optional().nullable(),
  email: z.string().trim().email("Introduce un email valido"),
  phone: z.string().trim().max(40).optional().nullable(),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(2000),
  source: z.string().trim().max(60).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = CreateContactLeadSchema.parse(body);
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("contact_leads")
      .insert({
        name: payload.name,
        company_name: payload.company_name || null,
        email: payload.email,
        phone: payload.phone || null,
        message: payload.message,
        source: payload.source || "landing",
        status: "new"
      })
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
          : "No se pudo enviar la solicitud";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
