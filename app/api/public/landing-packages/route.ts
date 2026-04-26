import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { defaultLandingPackages } from "@/lib/landing-packages";

export async function GET() {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("landing_packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data: data?.length ? data : defaultLandingPackages });
  } catch {
    return NextResponse.json({ data: defaultLandingPackages });
  }
}
