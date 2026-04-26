"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Company } from "@/types";

const ClientFormSchema = z
  .object({
    name: z.string().min(2, "El nombre es obligatorio"),
    contact_name: z.string().optional(),
    email: z.string().email("Email invalido").or(z.literal("")),
    phone: z.string().optional(),
    status: z.enum(["active", "paused", "cancelled"]),
    installation_fee: z.coerce.number().min(0),
    monthly_fee: z.coerce.number().min(0),
    per_minute_fee: z.coerce.number().min(0),
    create_portal_access: z.boolean().default(false),
    portal_email: z.string().email("Email invalido").or(z.literal("")),
    portal_password: z.string().optional()
  })
  .superRefine((values, context) => {
    if (values.create_portal_access && !values.portal_email) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["portal_email"],
        message: "Introduce un email para el acceso"
      });
    }

    if (values.create_portal_access && (!values.portal_password || values.portal_password.length < 8)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["portal_password"],
        message: "Minimo 8 caracteres"
      });
    }
  });

type ClientFormValues = z.infer<typeof ClientFormSchema>;

export function ClientForm({
  company,
  triggerLabel = "Nuevo cliente"
}: {
  company?: Company;
  triggerLabel?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [values, setValues] = useState<ClientFormValues>({
    name: company?.name ?? "",
    contact_name: company?.contact_name ?? "",
    email: company?.email ?? "",
    phone: company?.phone ?? "",
    status: company?.status ?? "active",
    installation_fee: company?.installation_fee ?? 125,
    monthly_fee: company?.monthly_fee ?? 50,
    per_minute_fee: company?.per_minute_fee ?? 0.2,
    create_portal_access: false,
    portal_email: company?.email ?? "",
    portal_password: ""
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = ClientFormSchema.safeParse(values);

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

    const response = await fetch(company ? `/api/companies/${company.id}` : "/api/companies", {
      method: company ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();

    setSubmitting(false);

    if (!response.ok) {
      toast.error(result.error ?? "No se pudo guardar el cliente");
      return;
    }

    toast.success(company ? "Cliente actualizado" : "Cliente creado");
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        className="rounded-2xl bg-[#0f1726] px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        onClick={() => setOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-borderBrand px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Clientes</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">
                  {company ? "Editar cliente" : "Crear cliente"}
                </h3>
              </div>
              <button className="text-sm text-slate-500" onClick={() => setOpen(false)} type="button">
                Cerrar
              </button>
            </div>

            <form className="overflow-y-auto px-6 py-6 sm:px-8" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  error={errors.name}
                  label="Empresa"
                  value={values.name}
                  onChange={(value) => setValues((prev) => ({ ...prev, name: value }))}
                />
                <Field
                  error={errors.contact_name}
                  label="Contacto"
                  value={values.contact_name ?? ""}
                  onChange={(value) => setValues((prev) => ({ ...prev, contact_name: value }))}
                />
                <Field
                  error={errors.email}
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
                />
                <Field
                  error={errors.phone}
                  label="Telefono"
                  value={values.phone ?? ""}
                  onChange={(value) => setValues((prev) => ({ ...prev, phone: value }))}
                />
                <SelectField
                  label="Estado"
                  value={values.status}
                  onChange={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      status: value as ClientFormValues["status"]
                    }))
                  }
                  options={[
                    { value: "active", label: "Activo" },
                    { value: "paused", label: "Pausado" },
                    { value: "cancelled", label: "Cancelado" }
                  ]}
                />
                <Field
                  error={errors.installation_fee}
                  label="Instalacion (EUR)"
                  type="number"
                  step="0.01"
                  value={String(values.installation_fee)}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, installation_fee: Number(value) }))
                  }
                />
                <Field
                  error={errors.monthly_fee}
                  label="Cuota mensual (EUR)"
                  type="number"
                  step="0.01"
                  value={String(values.monthly_fee)}
                  onChange={(value) => setValues((prev) => ({ ...prev, monthly_fee: Number(value) }))}
                />
                <Field
                  error={errors.per_minute_fee}
                  label="Precio por minuto (EUR)"
                  type="number"
                  step="0.01"
                  value={String(values.per_minute_fee)}
                  onChange={(value) =>
                    setValues((prev) => ({ ...prev, per_minute_fee: Number(value) }))
                  }
                />
              </div>

              {!company ? (
                <div className="mt-6 rounded-3xl border border-borderBrand bg-slate-50/70 p-5">
                  <label className="flex items-center gap-3 text-sm font-medium text-ink">
                    <input
                      checked={values.create_portal_access}
                      className="h-4 w-4 rounded border-borderBrand text-accent focus:ring-accent"
                      onChange={(event) =>
                        setValues((prev) => ({ ...prev, create_portal_access: event.target.checked }))
                      }
                      type="checkbox"
                    />
                    Crear acceso al portal para este cliente
                  </label>

                  {values.create_portal_access ? (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Field
                        error={errors.portal_email}
                        label="Email de acceso"
                        type="email"
                        value={values.portal_email}
                        onChange={(value) => setValues((prev) => ({ ...prev, portal_email: value }))}
                      />
                      <Field
                        error={errors.portal_password}
                        label="Contrasena inicial"
                        type="password"
                        value={values.portal_password ?? ""}
                        onChange={(value) => setValues((prev) => ({ ...prev, portal_password: value }))}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}

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
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "Guardando..." : company ? "Guardar cambios" : "Crear cliente"}
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
  error,
  type = "text",
  step
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
        onChange={(event) => onChange(event.target.value)}
        step={step}
        type={type}
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
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <select
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
