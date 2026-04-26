import { cn } from "@/lib/utils";

export function CallStatusBadge({ status }: { status: string | null }) {
  const normalized = status?.toLowerCase() ?? "unknown";
  const style =
    normalized === "completed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : normalized === "failed"
        ? "bg-rose-50 text-rose-700 border-rose-200"
        : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style
      )}
    >
      {status ?? "Sin estado"}
    </span>
  );
}
