import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/api/require-admin-session";
import { createAdminClient } from "@/lib/supabase/admin";

const CreateCompanyUserSchema = z.object({
  company_id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string().optional().nullable(),
  password: z.string().min(8, "La contrasena debe tener al menos 8 caracteres"),
  bot_ids: z.array(z.string().uuid()).optional().default([])
});

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = CreateCompanyUserSchema.parse(body);
    const admin = createAdminClient();

    const { data: availableBots, error: availableBotsError } = await admin
      .from("bots")
      .select("id")
      .eq("company_id", payload.company_id)
      .in("id", payload.bot_ids);

    if (availableBotsError) {
      throw availableBotsError;
    }

    if ((availableBots?.length ?? 0) !== payload.bot_ids.length) {
      throw new Error("Alguno de los bots seleccionados no pertenece a esta empresa");
    }

    const { data: createdUser, error: createError } = await admin.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      email_confirm: true,
      user_metadata: {
        full_name: payload.full_name ?? null
      },
      app_metadata: {
        role: "client",
        company_id: payload.company_id
      }
    });

    if (createError || !createdUser.user) {
      throw createError ?? new Error("No se pudo crear el usuario");
    }

    const { data, error } = await admin
      .from("app_users")
      .insert({
        user_id: createdUser.user.id,
        company_id: payload.company_id,
        email: payload.email,
        full_name: payload.full_name ?? null,
        role: "client"
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (payload.bot_ids.length) {
      const { error: assignmentsError } = await admin.from("company_user_bots").insert(
        payload.bot_ids.map((botId) => ({
          app_user_id: data.id,
          bot_id: botId
        }))
      );

      if (assignmentsError) {
        throw assignmentsError;
      }
    }

    return NextResponse.json({ data });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in error
          ? String((error as { message: unknown }).message)
          : "Unexpected error";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
