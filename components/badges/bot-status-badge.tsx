import { cn } from "@/lib/utils";

export function BotStatusBadge({ status }: { status: "active" | "inactive" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        status === "active"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-slate-100 text-slate-600"
      )}
    >
      {status === "active" ? "Activo" : "Inactivo"}
    </span>
  );
}
