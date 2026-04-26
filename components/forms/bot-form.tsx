"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Bot } from "@/types";

const BotFormSchema = z.object({
  company_id: z.string().uuid("Selecciona una empresa"),
  name: z.string().min(2, "El nombre es obligatorio"),
  phone_number: z.string().optional(),
  retell_agent_id: z.string().min(2, "El retell_agent_id es obligatorio"),
  status: z.enum(["active", "inactive"])
});

type BotFormValues = z.infer<typeof BotFormSchema>;

export function BotForm({
  companies,
  bot,
  triggerLabel = "Nuevo bot"
}: {
  companies: Array<{ id: string; name: string }>;
  bot?: Bot;
  triggerLabel?: string;
}) {
  const router = useRouter();
  const hasCompanies = companies.length > 0;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<BotFormValues>({
    company_id: bot?.company_id ?? companies[0]?.id ?? "",
    name: bot?.name ?? "",
    phone_number: bot?.phone_number ?? "",
    retell_agent_id: bot?.retell_agent_id ?? "",
    status: bot?.status ?? "active"
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = BotFormSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? "Campo invalido"])
        )
      );
      return;
    }

    setSubmitting(true);
    setErrors({});

    const response = await fetch(bot ? `/api/bots/${bot.id}` : "/api/bots", {
      method: bot ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();

    setSubmitting(false);

    if (!response.ok) {
      toast.error(result.error ?? "No se pudo guardar el bot");
      return;
    }

    toast.success(bot ? "Bot actualizado" : "Bot creado");
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        className="rounded-2xl bg-[#0f1726] px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={!hasCompanies && !bot}
        onClick={() => setOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-borderBrand px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Bots</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">
                  {bot ? "Editar bot" : "Crear bot"}
                </h3>
              </div>
              <button className="text-sm text-slate-500" onClick={() => setOpen(false)} type="button">
                Cerrar
              </button>
            </div>

            <form className="overflow-y-auto px-6 py-6 sm:px-8" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                {!hasCompanies && !bot ? (
                  <div className="md:col-span-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Crea antes una empresa para poder asociar este bot.
                  </div>
                ) : null}
                <SelectField
                  disabled={!hasCompanies && !bot}
                  label="Empresa"
                  placeholder="No hay empresas disponibles"
                  value={values.company_id}
                  onChange={(value) => setValues((prev) => ({ ...prev, company_id: value }))}
                  options={companies.map((company) => ({ value: company.id, label: company.name }))}
                />
                <Field
                  error={errors.name}
                  label="Nombre del bot"
                  value={values.name}
                  onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
                />
                <Field
                  error={errors.phone_number}
                  label="Telefono"
                  value={values.phone_number ?? ""}
                  onChange={(value) => setValues((prev) => ({ ...prev, phone_number: value }))}
                />
                <Field
                  error={errors.retell_agent_id}
                  label="retell_agent_id"
                  value={values.retell_agent_id}
                  onChange={(value) => setValues((prev) => ({ ...prev, retell_agent_id: value }))}
                />
                <SelectField
                  label="Estado"
                  value={values.status}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, status: value as BotFormValues["status"] }))
                  }
                  options={[
                    { value: "active", label: "Activo" },
                    { value: "inactive", label: "Inactivo" }
                  ]}
                />
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  className="rounded-2xl border border-borderBrand px-4 py-3 text-sm text-ink"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="rounded-2xl bg-accent px-4 py-3 text-sm font-medium text-white"
                  disabled={submitting || (!hasCompanies && !bot)}
                  type="submit"
                >
                  {submitting ? "Guardando..." : bot ? "Guardar cambios" : "Crear bot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 outline-none transition focus:border-accent"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  disabled,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <select
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {!options.length ? (
          <option value="">{placeholder ?? "Sin opciones"}</option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
