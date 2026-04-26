import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerSession } from "@/lib/api/require-owner-session";
import { createAdminClient } from "@/lib/supabase/admin";

const LandingPackageSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  price_suffix: z.string().nullable().optional(),
  description: z.string().min(1),
  features: z.array(z.string().min(1)),
  button_label: z.string().min(1),
  cta_href: z.string().min(1),
  theme: z.enum(["light", "dark"]),
  badge: z.string().nullable().optional(),
  sort_order: z.number().int().min(0),
  active: z.boolean()
});

const PayloadSchema = z.object({
  packages: z.array(LandingPackageSchema).min(1)
});

export async function POST(request: Request) {
  const auth = await requireOwnerSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = PayloadSchema.parse(body);
    const admin = createAdminClient();

    const { error } = await admin.from("landing_packages").upsert(payload.packages, {
      onConflict: "slug"
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}
