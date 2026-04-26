"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ConfirmDialog({
  triggerLabel,
  title,
  description,
  endpoint,
  payload,
  method = "PATCH",
  variant = "default"
}: {
  triggerLabel: string;
  title: string;
  description: string;
  endpoint: string;
  payload?: Record<string, unknown>;
  method?: "PATCH" | "POST";
  variant?: "default" | "danger";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        className={cn(
          "rounded-2xl border px-4 py-2 text-sm font-medium transition",
          variant === "danger"
            ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
            : "border-borderBrand bg-white text-ink hover:bg-slate-50"
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-panel">
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{description}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-2xl border border-borderBrand px-4 py-2 text-sm text-ink"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm font-medium text-white",
                  variant === "danger" ? "bg-rose-600" : "bg-accent"
                )}
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  const response = await fetch(endpoint, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload ?? {})
                  });
                  const result = await response.json();
                  if (!response.ok) {
                    toast.error(result.error ?? "No se pudo completar la acción");
                    setLoading(false);
                    return;
                  }
                  toast.success("Acción completada");
                  setLoading(false);
                  setOpen(false);
                  router.refresh();
                }}
                type="button"
              >
                {loading ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
