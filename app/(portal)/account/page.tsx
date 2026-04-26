import type { ReactNode } from "react";
import { Bot, CreditCard, PhoneCall, Timer } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { InvoiceStatusBadge } from "@/components/badges/invoice-status-badge";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { requireClient } from "@/lib/auth/require-user";
import { getPortalDashboardData } from "@/lib/data";

export default async function AccountHomePage() {
  const { appUser } = await requireClient();
  const data = await getPortalDashboardData(appUser.company_id!, appUser.id);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-panel">
        <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Portal de cliente</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Resumen del mes</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Consulta el uso de llamadas, el importe previsto y el estado de la factura actual.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-borderBrand bg-[linear-gradient(180deg,#f8fafc_0%,#eef4fb_100%)] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Factura en curso</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Estado</p>
                <div className="mt-2">
                  <InvoiceStatusBadge
                    status={data.stats.paymentStatus as "pending" | "paid" | "overdue" | "cancelled"}
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Importe previsto</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                  {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
                    data.stats.estimatedTotal
                  )}
                </p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniMetric label="Llamadas" value={String(data.stats.callsThisMonth)} />
              <MiniMetric label="Minutos" value={`${data.stats.minutesThisMonth.toFixed(2)} min`} />
              <MiniMetric label="Bots" value={String(data.stats.activeBots)} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Bot}
          subtitle="Bots activos asignados"
          title="Bots"
          value={String(data.stats.activeBots)}
        />
        <StatCard
          icon={PhoneCall}
          subtitle="Llamadas del mes"
          title="Llamadas"
          value={String(data.stats.callsThisMonth)}
        />
        <StatCard
          icon={Timer}
          subtitle="Consumo acumulado"
          title="Minutos"
          tone="accent"
          value={`${data.stats.minutesThisMonth.toFixed(2)} min`}
        />
        <StatCard
          icon={CreditCard}
          subtitle="Estimacion actual"
          title="A pagar"
          tone="warm"
          value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
            data.stats.estimatedTotal
          )}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Desglose</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Factura del mes</h2>
          <div className="mt-6 space-y-4">
            <Row label="Llamadas" value={<span>{data.currentInvoice?.total_calls ?? data.stats.callsThisMonth}</span>} />
            <Row
              label="Minutos"
              value={<MinutesDisplay value={data.currentInvoice?.total_minutes ?? data.stats.minutesThisMonth} />}
            />
            <Row
              label="Cuota fija"
              value={<CurrencyAmount amount={data.currentInvoice?.fixed_fee ?? data.company?.monthly_fee ?? 0} />}
            />
            <Row
              label="Variable"
              value={<CurrencyAmount amount={data.currentInvoice?.variable_fee ?? data.currentUsage?.variable_cost ?? 0} />}
            />
            <Row
              label="Instalacion"
              value={<CurrencyAmount amount={data.currentInvoice?.installation_fee ?? data.currentUsage?.installation_fee ?? 0} />}
            />
            <Row label="Total" value={<CurrencyAmount amount={data.stats.estimatedTotal} />} />
          </div>
        </div>

        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Bots</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Numeros y agentes</h2>
          <div className="mt-6 grid gap-4">
            {data.bots.length ? (
              data.bots.map((bot) => (
                <div
                  className="grid gap-4 rounded-2xl border border-borderBrand bg-slate-50/80 p-4 sm:grid-cols-[minmax(0,1fr)_auto]"
                  key={bot.id}
                >
                  <div>
                    <h3 className="font-semibold text-ink">{bot.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{bot.phone_number ?? "Sin numero asignado"}</p>
                    <p className="mt-2 break-all font-mono text-xs text-slate-400">{bot.retell_agent_id}</p>
                  </div>
                  <div className="flex items-start justify-end">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                      {bot.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState description="No hay bots asignados a esta cuenta." title="Sin bots" />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Actividad reciente</p>
            <h2 className="mt-1 text-xl font-semibold text-ink">Ultimas llamadas</h2>
          </div>
        </div>

        {data.latestCalls.length ? (
          <DataTable
            columns={["Fecha", "Duracion", "Minutos", "Coste", "Estado", "Resumen"]}
            rows={data.latestCalls.map((call) => [
              <span key={`${call.id}-date`}>{new Date(call.created_at).toLocaleString("es-ES")}</span>,
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
          <EmptyState description="Todavia no hay llamadas este mes." title="Sin llamadas" />
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-borderBrand bg-slate-50/80 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-right font-semibold text-ink">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
