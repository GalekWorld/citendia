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

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if ("error_description" in error && typeof error.error_description === "string") {
      return error.error_description;
    }
  }

  return "Unexpected error";
}

export async function POST(request: Request) {
  const auth = await requireOwnerSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const payload = PayloadSchema.parse(body);
    const admin = createAdminClient();

    const packages = payload.packages.map((pkg) => ({
      slug: pkg.slug.trim(),
      name: pkg.name.trim(),
      price: pkg.price.trim(),
      price_suffix: pkg.price_suffix?.trim() || null,
      description: pkg.description.trim(),
      features: pkg.features.map((feature) => feature.trim()).filter(Boolean),
      button_label: pkg.button_label.trim(),
      cta_href: pkg.cta_href.trim(),
      theme: pkg.theme,
      badge: pkg.badge?.trim() || null,
      sort_order: pkg.sort_order,
      active: pkg.active
    }));

    const { error } = await admin
      .from("landing_packages")
      .upsert(packages, {
        onConflict: "slug"
      })
      .select("slug");

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 400 });
  }
}
