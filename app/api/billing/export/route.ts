import { NextResponse } from "next/server";
import { requireAuthSession } from "@/lib/api/require-auth-session";

export async function GET(request: Request) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const status = searchParams.get("status");
  const date = month ? new Date(`${month}-01T00:00:00.000Z`) : new Date();
  const selectedMonth = date.getUTCMonth() + 1;
  const selectedYear = date.getUTCFullYear();

  let query = auth.supabase
    .from("invoices")
    .select("*, companies(name)")
    .eq("month", selectedMonth)
    .eq("year", selectedYear)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const header = [
    "cliente",
    "mes",
    "year",
    "llamadas",
    "minutos",
    "cuota_fija",
    "coste_variable",
    "instalacion",
    "total",
    "estado"
  ];
  const rows = (data ?? []).map((invoice) =>
    [
      `"${invoice.companies?.name ?? "Sin empresa"}"`,
      invoice.month,
      invoice.year,
      invoice.total_calls,
      invoice.total_minutes,
      invoice.fixed_fee,
      invoice.variable_fee,
      invoice.installation_fee,
      invoice.total,
      invoice.status
    ].join(",")
  );

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="billing-${selectedYear}-${selectedMonth}.csv"`
    }
  });
}
