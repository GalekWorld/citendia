import {
  Activity,
  Bot,
  Building2,
  Inbox,
  CreditCard,
  PhoneCall,
  TimerReset
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ContactLeadsPanel } from "@/components/dashboard/contact-leads-panel";
import { MinutesChart } from "@/components/dashboard/minutes-chart";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { CallStatusBadge } from "@/components/badges/call-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { getDashboardData } from "@/lib/data";

export default async function DashboardPage() {
  const { stats, latestCalls, ranking, dailyMinutes, invoices, leads } = await getDashboardData();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={Building2}
          subtitle="Empresas activas"
          title="Clientes activos"
          value={String(stats.activeCompanies)}
        />
        <StatCard
          icon={Bot}
          subtitle="Bots activos"
          title="Bots activos"
          tone="accent"
          value={String(stats.activeBots)}
        />
        <StatCard
          icon={PhoneCall}
          subtitle="Llamadas registradas"
          title="Llamadas del mes"
          value={String(stats.callsThisMonth)}
        />
        <StatCard
          icon={TimerReset}
          subtitle="Minutos acumulados"
          title="Minutos del mes"
          tone="accent"
          value={`${stats.minutesThisMonth.toFixed(2)} min`}
        />
        <StatCard
          icon={CreditCard}
          subtitle="Total del mes"
          title="Facturacion estimada"
          tone="warm"
          value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
            stats.estimatedRevenue
          )}
        />
        <StatCard
          icon={Activity}
          subtitle="Pendientes o vencidas"
          title="Facturas pendientes"
          tone="warm"
          value={String(stats.pendingInvoices)}
        />
        <StatCard
          icon={Inbox}
          subtitle="Entradas desde la web"
          title="Leads nuevos"
          value={String(stats.newLeads)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Consumo mensual</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">Minutos por dia</h3>
            </div>
          </div>
          {dailyMinutes.length ? (
            <div className="mt-6">
              <MinutesChart data={dailyMinutes} />
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState description="Todavia no hay llamadas este mes." title="Sin consumo" />
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Top consumo</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Ranking de clientes</h3>
          <div className="mt-6 space-y-4">
            {ranking.length ? (
              ranking.map((item, index) => (
                <div className="rounded-2xl border border-borderBrand bg-slate-50/80 p-4" key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        #{index + 1}
                      </p>
                      <h4 className="mt-1 font-semibold text-ink">{item.name}</h4>
                      <p className="mt-2 text-sm text-slate-500">{item.totalCalls} llamadas este mes</p>
                    </div>
                    <div className="text-right">
                      <MinutesDisplay className="font-semibold text-ink" value={item.totalMinutes} />
                      <p className="mt-2 text-sm text-slate-500">
                        <CurrencyAmount amount={item.totalAmount} />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState description="Aparecera cuando haya consumo registrado." title="Sin datos" />
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Actividad</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Ultimas llamadas</h3>
          <div className="mt-6 space-y-4">
            {latestCalls.length ? (
              latestCalls.map((call) => (
                <div className="rounded-2xl border border-borderBrand bg-slate-50/80 p-4" key={call.id}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-ink">{call.company_name}</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        {call.bot_name} · {call.caller_number ?? "Numero oculto"}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(call.created_at).toLocaleString("es-ES")}
                      </p>
                    </div>
                    <div className="text-right">
                      <CallStatusBadge status={call.status} />
                      <p className="mt-2 text-sm text-slate-500">
                        <MinutesDisplay value={call.billed_minutes} />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState description="Todavia no hay llamadas registradas." title="Sin llamadas" />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Ingresos</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Facturacion del mes</h3>
          <div className="mt-6 space-y-4">
            {invoices.length ? (
              invoices.slice(0, 8).map((invoice) => (
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-borderBrand bg-slate-50/80 p-4" key={invoice.id}>
                  <div>
                    <h4 className="font-semibold text-ink">{invoice.company_name}</h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {invoice.total_calls} llamadas · {invoice.total_minutes.toFixed(2)} min
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ink">
                      <CurrencyAmount amount={invoice.total} />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                      {invoice.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState description="Todavia no hay facturas para este mes." title="Sin facturas" />
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Contacto</p>
        <h3 className="mt-1 text-xl font-semibold text-ink">Solicitudes desde la web</h3>
        {leads.length ? (
          <ContactLeadsPanel leads={leads} />
        ) : (
          <div className="mt-6">
            <EmptyState
              description="Los formularios que entren desde la landing apareceran aqui."
              title="Sin solicitudes"
            />
          </div>
        )}
      </section>
    </div>
  );
}
