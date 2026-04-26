import { cn } from "@/lib/utils";
import { ContactLeadStatus } from "@/types";

const styles: Record<ContactLeadStatus, string> = {
  new: "border border-sky-200 bg-sky-50 text-sky-700",
  contacted: "border border-amber-200 bg-amber-50 text-amber-700",
  qualified: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  archived: "border border-slate-200 bg-slate-100 text-slate-600"
};

const labels: Record<ContactLeadStatus, string> = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Cerrado",
  archived: "Archivado"
};

export function ContactLeadStatusBadge({
  status,
  className
}: {
  status: ContactLeadStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
