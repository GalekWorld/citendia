import { CreditCard, PhoneCall, Timer } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { MonthSelector } from "@/components/shared/month-selector";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { requireClient } from "@/lib/auth/require-user";
import { getPortalCallsData } from "@/lib/data";

export default async function AccountCallsPage({
  searchParams
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const params = await searchParams;
  const { appUser } = await requireClient();
  const data = await getPortalCallsData(appUser.company_id!, params.month, appUser.id);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-borderBrand bg-white/90 p-5 shadow-panel sm:p-7">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Llamadas</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Historial del mes</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={PhoneCall}
          subtitle="Llamadas del periodo"
          title="Llamadas"
          value={String(data.stats.totalCalls)}
        />
        <StatCard
          icon={Timer}
          subtitle="Minutos facturables"
          title="Minutos"
          tone="accent"
          value={`${data.stats.totalMinutes.toFixed(2)} min`}
        />
        <StatCard
          icon={CreditCard}
          subtitle="Coste acumulado"
          title="Coste"
          tone="warm"
          value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
            data.stats.totalCost
          )}
        />
      </section>

      <form className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel md:grid-cols-[220px_auto]">
        <MonthSelector defaultValue={data.monthValue} />
        <button className="rounded-2xl bg-[#0d1628] px-5 py-4 text-sm font-medium text-white" type="submit">
          Filtrar
        </button>
      </form>

      {data.calls.length ? (
        <DataTable
          columns={["Fecha", "Bot", "Origen", "Duracion", "Minutos", "Coste", "Estado", "Resumen"]}
          rows={data.calls.map((call) => [
            <span key={`${call.id}-date`}>{new Date(call.created_at).toLocaleString("es-ES")}</span>,
            <span key={`${call.id}-bot`}>{call.bot_name}</span>,
            <span key={`${call.id}-caller`}>{call.caller_number ?? "Oculto"}</span>,
            <span key={`${call.id}-duration`}>{call.duration_seconds}s</span>,
            <MinutesDisplay key={`${call.id}-minutes`} value={call.billed_minutes} />,
            <CurrencyAmount amount={call.cost} key={`${call.id}-cost`} />,
            <span key={`${call.id}-status`} className="capitalize">
              {call.status ?? "Sin estado"}
            </span>,
            <span key={`${call.id}-summary`} className="max-w-xs text-sm text-slate-500">
              {call.summary ?? "Sin resumen"}
            </span>
          ])}
        />
      ) : (
        <EmptyState description="No hay llamadas en el periodo seleccionado." title="Sin llamadas" />
      )}
    </div>
  );
}
