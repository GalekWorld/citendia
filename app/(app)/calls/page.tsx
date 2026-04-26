import { CallStatusBadge } from "@/components/badges/call-status-badge";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { MonthSelector } from "@/components/shared/month-selector";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { getCallsData } from "@/lib/data";

export default async function CallsPage({
  searchParams
}: {
  searchParams: Promise<{
    companyId?: string;
    botId?: string;
    status?: string;
    from?: string;
    to?: string;
    month?: string;
  }>;
}) {
  const params = await searchParams;
  const { companies, bots, calls } = await getCallsData(params);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Llamadas</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink">Histórico y filtros de tráfico</h2>
      </div>

      <form className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel md:grid-cols-2 xl:grid-cols-6">
        <select
          className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
          defaultValue={params.companyId ?? ""}
          name="companyId"
        >
          <option value="">Todas las empresas</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
          defaultValue={params.botId ?? ""}
          name="botId"
        >
          <option value="">Todos los bots</option>
          {bots.map((bot) => (
            <option key={bot.id} value={bot.id}>
              {bot.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
          defaultValue={params.status ?? ""}
          name="status"
        >
          <option value="">Todos los estados</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <input
          className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
          defaultValue={params.from}
          name="from"
          type="date"
        />
        <input
          className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
          defaultValue={params.to}
          name="to"
          type="date"
        />
        <MonthSelector defaultValue={params.month} />
        <button className="rounded-2xl bg-[#0f1726] px-4 py-3 text-sm font-medium text-white" type="submit">
          Filtrar
        </button>
      </form>

      {calls.length ? (
        <DataTable
          columns={[
            "Fecha y hora",
            "Empresa",
            "Bot",
            "Número",
            "Duración",
            "Minutos",
            "Coste",
            "Estado",
            "Resumen",
            "Retell Call ID"
          ]}
          rows={calls.map((call) => [
            <span key={`${call.id}-date`}>{new Date(call.created_at).toLocaleString("es-ES")}</span>,
            <span key={`${call.id}-company`}>{call.company_name}</span>,
            <span key={`${call.id}-bot`}>{call.bot_name}</span>,
            <span key={`${call.id}-number`}>{call.caller_number ?? "Oculto"}</span>,
            <span key={`${call.id}-duration`}>{call.duration_seconds}s</span>,
            <MinutesDisplay key={`${call.id}-minutes`} value={call.billed_minutes} />,
            <CurrencyAmount amount={call.cost} key={`${call.id}-cost`} />,
            <CallStatusBadge key={`${call.id}-status`} status={call.status} />,
            <span className="max-w-xs text-sm text-slate-500" key={`${call.id}-summary`}>
              {call.summary ?? "Sin resumen"}
            </span>,
            <span className="font-mono text-xs text-slate-500" key={`${call.id}-retell`}>
              {call.retell_call_id}
            </span>
          ])}
        />
      ) : (
        <EmptyState
          description="Configura el webhook de Retell para empezar a ver cada llamada, su coste y su resumen."
          title="No hay llamadas para estos filtros"
        />
      )}
    </div>
  );
}
