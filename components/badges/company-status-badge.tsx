import { cn } from "@/lib/utils";

export function CompanyStatusBadge({ status }: { status: "active" | "paused" | "cancelled" }) {
  const style =
    status === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "paused"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

  const label =
    status === "active" ? "Activo" : status === "paused" ? "Pausado" : "Cancelado";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style
      )}
    >
      {label}
    </span>
  );
}
