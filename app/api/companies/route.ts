import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAuthSession } from "@/lib/api/require-auth-session";
import { createAdminClient } from "@/lib/supabase/admin";

const CompanySchema = z
  .object({
    name: z.string().min(2),
    contact_name: z.string().optional().nullable(),
    email: z.string().email().or(z.literal("")).optional(),
    phone: z.string().optional().nullable(),
    status: z.enum(["active", "paused", "cancelled"]).default("active"),
    installation_fee: z.number().min(0).default(125),
    monthly_fee: z.number().min(0).default(50),
    per_minute_fee: z.number().min(0).default(0.2),
    create_portal_access: z.boolean().optional().default(false),
    portal_email: z.string().email().or(z.literal("")).optional(),
    portal_password: z.string().optional(),
    portal_full_name: z.string().optional().nullable()
  })
  .superRefine((values, context) => {
    if (values.create_portal_access && !values.portal_email) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["portal_email"],
        message: "Portal email is required"
      });
    }

    if (values.create_portal_access && (!values.portal_password || values.portal_password.length < 8)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["portal_password"],
        message: "Portal password must be at least 8 characters"
      });
    }
  });

export async function POST(request: Request) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = CompanySchema.parse(body);
    const admin = createAdminClient();
    const { data, error } = await auth.supabase
      .from("companies")
      .insert({
        name: payload.name,
        status: payload.status,
        installation_fee: payload.installation_fee,
        monthly_fee: payload.monthly_fee,
        per_minute_fee: payload.per_minute_fee,
        email: payload.email || null,
        contact_name: payload.contact_name || null,
        phone: payload.phone || null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (payload.create_portal_access && data) {
      const { data: createdUser, error: createUserError } = await admin.auth.admin.createUser({
        email: payload.portal_email!,
        password: payload.portal_password!,
        email_confirm: true,
        user_metadata: {
          full_name: payload.portal_full_name ?? payload.contact_name ?? null
        },
        app_metadata: {
          role: "client",
          company_id: data.id
        }
      });

      if (createUserError || !createdUser.user) {
        await admin.from("companies").delete().eq("id", data.id);
        throw createUserError ?? new Error("No se pudo crear el acceso del cliente");
      }

      const { error: appUserError } = await admin.from("app_users").insert({
        user_id: createdUser.user.id,
        company_id: data.id,
        email: payload.portal_email!,
        full_name: payload.portal_full_name ?? payload.contact_name ?? null,
        role: "client"
      });

      if (appUserError) {
        await admin.auth.admin.deleteUser(createdUser.user.id);
        await admin.from("companies").delete().eq("id", data.id);
        throw appUserError;
      }
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
