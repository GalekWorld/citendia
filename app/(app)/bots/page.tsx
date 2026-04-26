import { BotForm } from "@/components/forms/bot-form";
import { BotStatusBadge } from "@/components/badges/bot-status-badge";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { RemoteActionButton } from "@/components/shared/remote-action-button";
import { getBotsData } from "@/lib/data";

export default async function BotsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; companyId?: string; status?: string }>;
}) {
  const params = await searchParams;
  const { companies, bots } = await getBotsData({
    query: params.q,
    companyId: params.companyId,
    status: params.status
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-5 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Bots</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Listado de bots</h2>
        </div>
        <BotForm companies={companies} />
      </section>

      <form className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel md:grid-cols-[minmax(0,1fr)_240px_220px_auto]">
        <input
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
          defaultValue={params.q}
          name="q"
          placeholder="Buscar por nombre"
        />
        <select
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
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
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
          defaultValue={params.status ?? ""}
          name="status"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
        <button className="rounded-2xl bg-[#0f1726] px-5 py-4 text-sm font-medium text-white" type="submit">
          Filtrar
        </button>
      </form>

      {bots.length ? (
        <DataTable
          columns={[
            "Bot",
            "Empresa",
            "Telefono",
            "Retell agent",
            "Estado",
            "Llamadas del mes",
            "Minutos del mes",
            "Coste del mes",
            "Acciones"
          ]}
          rows={bots.map((bot) => [
            <span className="font-semibold text-ink" key={`${bot.id}-name`}>
              {bot.name}
            </span>,
            <span key={`${bot.id}-company`}>{bot.company_name}</span>,
            <span key={`${bot.id}-phone`}>{bot.phone_number ?? "Sin numero"}</span>,
            <span className="font-mono text-xs text-slate-500" key={`${bot.id}-agent`}>
              {bot.retell_agent_id}
            </span>,
            <BotStatusBadge key={`${bot.id}-status`} status={bot.status} />,
            <span key={`${bot.id}-calls`}>{bot.month_calls}</span>,
            <MinutesDisplay key={`${bot.id}-minutes`} value={bot.month_minutes} />,
            <CurrencyAmount amount={bot.month_cost} key={`${bot.id}-cost`} />,
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" key={`${bot.id}-actions`}>
              <BotForm bot={bot} companies={companies} triggerLabel="Editar" />
              {bot.status !== "inactive" ? (
                <RemoteActionButton
                  endpoint={`/api/bots/${bot.id}`}
                  label="Desactivar"
                  payload={{ status: "inactive" }}
                />
              ) : null}
            </div>
          ])}
        />
      ) : (
        <EmptyState description="Crea un bot y añade su agent id." title="No hay bots" />
      )}
    </div>
  );
}
