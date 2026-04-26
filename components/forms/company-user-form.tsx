"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

const CompanyUserSchema = z.object({
  company_id: z.string().uuid(),
  email: z.string().email("Introduce un email valido"),
  full_name: z.string().optional(),
  password: z.string().min(8, "Minimo 8 caracteres"),
  bot_ids: z.array(z.string().uuid()).optional().default([])
});

type CompanyUserValues = z.infer<typeof CompanyUserSchema>;

export function CompanyUserForm({
  companyId,
  bots,
  triggerLabel = "Nuevo acceso"
}: {
  companyId: string;
  bots: Array<{ id: string; name: string }>;
  triggerLabel?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<CompanyUserValues>({
    company_id: companyId,
    email: "",
    full_name: "",
    password: "",
    bot_ids: []
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = CompanyUserSchema.safeParse(values);

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

    const response = await fetch("/api/company-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      toast.error(result.error ?? "No se pudo crear el acceso");
      return;
    }

    toast.success("Acceso creado");
    setOpen(false);
    setValues({
      company_id: companyId,
      email: "",
      full_name: "",
      password: "",
      bot_ids: []
    });
    router.refresh();
  }

  return (
    <>
      <button
        className="rounded-2xl bg-[#0f1726] px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        onClick={() => setOpen(true)}
        type="button"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-borderBrand px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Accesos</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">Crear acceso cliente</h3>
              </div>
              <button className="text-sm text-slate-500" onClick={() => setOpen(false)} type="button">
                Cerrar
              </button>
            </div>

            <form className="overflow-y-auto px-6 py-6 sm:px-8" onSubmit={onSubmit}>
              <div className="grid gap-4">
                <Field
                  error={errors.full_name}
                  label="Nombre"
                  value={values.full_name ?? ""}
                  onChange={(value) => setValues((prev) => ({ ...prev, full_name: value }))}
                />
                <Field
                  error={errors.email}
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={(value) => setValues((prev) => ({ ...prev, email: value }))}
                />
                <Field
                  error={errors.password}
                  label="Contrasena"
                  type="password"
                  value={values.password}
                  onChange={(value) => setValues((prev) => ({ ...prev, password: value }))}
                />

                <div className="block">
                  <span className="mb-2 block text-sm font-medium text-ink">Bots asignados</span>
                  <div className="rounded-2xl border border-borderBrand bg-slate-50/70 p-4">
                    {bots.length ? (
                      <div className="grid gap-3">
                        {bots.map((bot) => {
                          const checked = values.bot_ids.includes(bot.id);

                          return (
                            <label
                              className="flex items-center gap-3 rounded-2xl border border-transparent bg-white px-4 py-3 text-sm text-ink transition hover:border-borderBrand"
                              key={bot.id}
                            >
                              <input
                                checked={checked}
                                className="h-4 w-4 rounded border-borderBrand text-accent focus:ring-accent"
                                onChange={(event) =>
                                  setValues((prev) => ({
                                    ...prev,
                                    bot_ids: event.target.checked
                                      ? [...prev.bot_ids, bot.id]
                                      : prev.bot_ids.filter((value) => value !== bot.id)
                                  }))
                                }
                                type="checkbox"
                              />
                              <span>{bot.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No hay bots en esta empresa todavia.</p>
                    )}
                  </div>
                  <span className="mt-2 block text-xs text-slate-500">
                    Si no seleccionas ninguno, el usuario vera todos los bots de la empresa.
                  </span>
                </div>
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
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "Creando..." : "Crear acceso"}
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
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
