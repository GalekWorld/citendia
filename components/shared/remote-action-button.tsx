"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RemoteActionButton({
  label,
  endpoint,
  method = "PATCH",
  payload,
  className
}: {
  label: string;
  endpoint: string;
  method?: "PATCH" | "POST";
  payload?: Record<string, unknown>;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      className={className ?? "rounded-2xl border border-borderBrand bg-white px-4 py-2 text-sm"}
      onClick={async () => {
        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload ?? {})
        });
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.error ?? "No se pudo completar la acción");
          return;
        }

        toast.success("Actualización guardada");
        router.refresh();
      }}
      type="button"
    >
      {label}
    </button>
  );
}
