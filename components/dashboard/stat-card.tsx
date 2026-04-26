import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "default"
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone?: "default" | "accent" | "warm";
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-white/85 p-6 shadow-panel backdrop-blur",
        tone === "accent"
          ? "border-teal-100"
          : tone === "warm"
            ? "border-amber-100"
            : "border-borderBrand"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            tone === "accent"
              ? "bg-accent/10 text-accent"
              : tone === "warm"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
