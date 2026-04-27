"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { LandingPackage } from "@/lib/landing-packages";

export function LandingPackagesForm({ initialPackages }: { initialPackages: LandingPackage[] }) {
  const [packages, setPackages] = useState(initialPackages);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/landing-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages })
      });

      const result = await response.json().catch(() => ({ error: "No se pudo procesar la respuesta del servidor" }));
      setSubmitting(false);

      if (!response.ok) {
        toast.error(result.error ?? "No se pudieron guardar los paquetes");
        return;
      }

      toast.success("Paquetes actualizados");
    } catch (error) {
      setSubmitting(false);
      toast.error(error instanceof Error ? error.message : "No se pudieron guardar los paquetes");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      {packages.map((pkg, index) => (
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel" key={pkg.slug}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Nombre"
              value={pkg.name}
              onChange={(value) => update(index, { name: value })}
            />
            <Field
              label="Precio"
              value={pkg.price}
              onChange={(value) => update(index, { price: value })}
            />
            <Field
              label="Sufijo"
              value={pkg.price_suffix ?? ""}
              onChange={(value) => update(index, { price_suffix: value || null })}
            />
            <Field
              label="Boton"
              value={pkg.button_label}
              onChange={(value) => update(index, { button_label: value })}
            />
            <Field
              label="CTA URL"
              value={pkg.cta_href}
              onChange={(value) => update(index, { cta_href: value })}
            />
            <Field
              label="Badge"
              value={pkg.badge ?? ""}
              onChange={(value) => update(index, { badge: value || null })}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Tema</span>
              <select
                className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm"
                onChange={(event) => update(index, { theme: event.target.value as "light" | "dark" })}
                value={pkg.theme}
              >
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-ink">Activo</span>
              <select
                className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm"
                onChange={(event) => update(index, { active: event.target.value === "true" })}
                value={String(pkg.active)}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-ink">Descripcion</span>
            <textarea
              className="min-h-[88px] w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm"
              onChange={(event) => update(index, { description: event.target.value })}
              value={pkg.description}
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-ink">Features</span>
            <textarea
              className="min-h-[120px] w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm"
              onChange={(event) =>
                update(index, {
                  features: event.target.value
                    .split("\n")
                    .map((item) => item.trim())
                    .filter(Boolean)
                })
              }
              value={pkg.features.join("\n")}
            />
          </label>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          className="rounded-2xl bg-[#0f1726] px-5 py-3 text-sm font-medium text-white"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Guardando..." : "Guardar paquetes"}
        </button>
      </div>
    </form>
  );

  function update(index: number, patch: Partial<LandingPackage>) {
    setPackages((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item))
    );
  }
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}
