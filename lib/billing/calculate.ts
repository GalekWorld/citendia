import { BillingRounding, Company, Settings } from "@/types";

export type BillingResult = {
  billedMinutes: number;
  variableCost: number;
  fixedCost: number;
  installationFee: number;
  totalAmount: number;
};

export function calculateBilledMinutes(
  durationSeconds: number,
  rounding: BillingRounding = "exact"
) {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return 0;
  }

  const rawMinutes = durationSeconds / 60;

  return rounding === "ceil" ? Math.ceil(rawMinutes) : Number(rawMinutes.toFixed(4));
}

export function shouldChargeInstallation(
  company: Pick<Company, "installation_charged" | "created_at">,
  month: number,
  year: number
) {
  if (company.installation_charged) {
    return false;
  }

  const createdAt = new Date(company.created_at);
  const installationWindowEnds = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  const billingPeriodStart = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
  const billingPeriodEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

  return billingPeriodStart < installationWindowEnds && billingPeriodEnd >= createdAt;
}

export function calculateMonthlyCharges({
  company,
  totalMinutes,
  month,
  year
}: {
  company: Pick<
    Company,
    | "installation_charged"
    | "installation_fee"
    | "monthly_fee"
    | "per_minute_fee"
    | "created_at"
  >;
  totalMinutes: number;
  month: number;
  year: number;
}): BillingResult {
  const fixedCost = Number(company.monthly_fee ?? 0);
  const variableCost = Number((totalMinutes * Number(company.per_minute_fee ?? 0)).toFixed(2));
  const installationFee = shouldChargeInstallation(company, month, year)
    ? Number(company.installation_fee ?? 0)
    : 0;
  const totalAmount = Number((fixedCost + variableCost + installationFee).toFixed(2));

  return {
    billedMinutes: Number(totalMinutes.toFixed(2)),
    variableCost,
    fixedCost,
    installationFee,
    totalAmount
  };
}

export function resolveBillingSettings(settings?: Pick<Settings, "billing_rounding"> | null) {
  return settings?.billing_rounding ?? "exact";
}
