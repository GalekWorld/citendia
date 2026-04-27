import { LandingPackagesForm } from "@/components/settings/landing-packages-form";
import { getSettings } from "@/lib/data";
import { defaultLandingPackages, type LandingPackage } from "@/lib/landing-packages";
import { requireOwner } from "@/lib/auth/require-user";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function SettingsPage() {
  await requireOwner();
  const settings = await getSettings();
  const admin = createAdminClient();
  const { data } = await admin
    .from("landing_packages")
    .select("*")
    .order("sort_order", { ascending: true });
  const packages = ((data?.length ? data : defaultLandingPackages) as LandingPackage[]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Ajustes</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Facturacion</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">
          Ajustes base para precios y redondeo.
        </p>
      </div>

      <form
        action="/api/settings"
        className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel sm:p-6 md:grid-cols-2"
        method="post"
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Precio de instalacion (EUR)</span>
          <input
            className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3"
            defaultValue={settings?.installation_fee ?? 125}
            name="installation_fee"
            step="0.01"
            type="number"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Cuota mensual (EUR)</span>
          <input
            className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3"
            defaultValue={settings?.monthly_fee ?? 50}
            name="monthly_fee"
            step="0.01"
            type="number"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Precio por minuto (EUR)</span>
          <input
            className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3"
            defaultValue={settings?.per_minute_fee ?? 0.2}
            name="per_minute_fee"
            step="0.01"
            type="number"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Tipo de facturacion</span>
          <select
            className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3"
            defaultValue={settings?.billing_rounding ?? "exact"}
            name="billing_rounding"
          >
            <option value="exact">Minutos exactos</option>
            <option value="ceil">Redondear al minuto superior</option>
          </select>
        </label>
        <div className="flex justify-end md:col-span-2">
          <button className="rounded-2xl bg-[#0f1726] px-4 py-3 text-sm font-medium text-white" type="submit">
            Guardar ajustes
          </button>
        </div>
      </form>

      <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Landing</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Precios y paquetes</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-500">
          Solo las cuentas propietarias pueden editar los paquetes que se muestran en la web publica.
        </p>
      </div>

      <LandingPackagesForm initialPackages={packages} />
    </div>
  );
}
