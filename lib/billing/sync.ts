import { endOfMonth, startOfMonth } from "date-fns";
import { calculateMonthlyCharges } from "@/lib/billing/calculate";
import { createAdminClient } from "@/lib/supabase/admin";

export async function syncCompanyMonth({
  companyId,
  month,
  year
}: {
  companyId: string;
  month: number;
  year: number;
}) {
  const supabase = createAdminClient();
  const start = startOfMonth(new Date(Date.UTC(year, month - 1, 1))).toISOString();
  const end = endOfMonth(new Date(Date.UTC(year, month - 1, 1))).toISOString();

  const [{ data: company, error: companyError }, { data: calls }, { data: existingInvoice }] =
    await Promise.all([
      supabase.from("companies").select("*").eq("id", companyId).single(),
      supabase
        .from("calls")
        .select("duration_seconds, billed_minutes, cost")
        .eq("company_id", companyId)
        .gte("created_at", start)
        .lte("created_at", end),
      supabase
        .from("invoices")
        .select("*")
        .eq("company_id", companyId)
        .eq("month", month)
        .eq("year", year)
        .maybeSingle()
    ]);

  if (companyError || !company) {
    throw new Error(companyError?.message ?? "Company not found");
  }

  const totalCalls = calls?.length ?? 0;
  const totalSeconds = (calls ?? []).reduce((sum, call) => sum + Number(call.duration_seconds ?? 0), 0);
  const totalMinutes = Number(
    (calls ?? []).reduce((sum, call) => sum + Number(call.billed_minutes ?? 0), 0).toFixed(2)
  );
  const totals = calculateMonthlyCharges({
    company,
    totalMinutes,
    month,
    year
  });

  const invoiceStatus = existingInvoice?.status ?? "pending";

  const usagePayload = {
    company_id: companyId,
    month,
    year,
    total_calls: totalCalls,
    total_seconds: totalSeconds,
    total_minutes: totals.billedMinutes,
    variable_cost: totals.variableCost,
    fixed_cost: totals.fixedCost,
    installation_fee: totals.installationFee,
    total_amount: totals.totalAmount,
    invoice_status: invoiceStatus
  };

  const invoicePayload = {
    company_id: companyId,
    month,
    year,
    total_calls: totalCalls,
    total_minutes: totals.billedMinutes,
    fixed_fee: totals.fixedCost,
    variable_fee: totals.variableCost,
    installation_fee: totals.installationFee,
    total: totals.totalAmount,
    status: invoiceStatus,
    paid_at: invoiceStatus === "paid" ? existingInvoice?.paid_at ?? new Date().toISOString() : null
  };

  const [usageResult, invoiceResult] = await Promise.all([
    supabase
      .from("monthly_usage")
      .upsert(usagePayload, { onConflict: "company_id,month,year" })
      .select()
      .single(),
    supabase
      .from("invoices")
      .upsert(invoicePayload, { onConflict: "company_id,month,year" })
      .select()
      .single()
  ]);

  if (usageResult.error) {
    throw new Error(usageResult.error.message);
  }
  if (invoiceResult.error) {
    throw new Error(invoiceResult.error.message);
  }

  return {
    usage: usageResult.data,
    invoice: invoiceResult.data,
    shouldMarkInstallationCharged: invoicePayload.status === "paid" && totals.installationFee > 0
  };
}
