"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ContactLead } from "@/types";
import { ContactLeadStatusBadge } from "@/components/badges/contact-lead-status-badge";

const statuses: Array<ContactLead["status"]> = ["new", "contacted", "qualified", "archived"];

export function ContactLeadsPanel({ leads }: { leads: ContactLead[] }) {
  const router = useRouter();

  return (
    <div className="mt-6 space-y-4">
      {leads.map((lead) => (
        <div className="rounded-2xl border border-borderBrand bg-slate-50/80 p-4" key={lead.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-semibold text-ink">{lead.name}</h4>
                <ContactLeadStatusBadge status={lead.status} />
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {lead.company_name || "Sin empresa"} · {lead.email}
                {lead.phone ? ` · ${lead.phone}` : ""}
              </p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{lead.message}</p>
              <p className="mt-2 text-xs text-slate-400">
                {new Date(lead.created_at).toLocaleString("es-ES")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                    lead.status === status
                      ? "bg-ink text-white"
                      : "border border-borderBrand bg-white text-slate-600 hover:border-slate-300 hover:text-ink"
                  }`}
                  key={status}
                  onClick={async () => {
                    if (status === lead.status) {
                      return;
                    }

                    const response = await fetch(`/api/contact-leads/${lead.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ status })
                    });
                    const result = await response.json();

                    if (!response.ok) {
                      toast.error(result.error ?? "No se pudo actualizar el lead");
                      return;
                    }

                    toast.success("Lead actualizado");
                    router.refresh();
                  }}
                  type="button"
                >
                  {status === "new"
                    ? "Nuevo"
                    : status === "contacted"
                      ? "Contactado"
                      : status === "qualified"
                        ? "Cerrado"
                        : "Archivado"}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
