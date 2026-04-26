import { CheckCircle2, Clock3, CreditCard } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { InvoiceStatusBadge } from "@/components/badges/invoice-status-badge";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { requireClient } from "@/lib/auth/require-user";
import { getPortalBillingData } from "@/lib/data";

export default async function AccountBillingPage() {
  const { appUser } = await requireClient();
  const { currentInvoice, invoices, stats } = await getPortalBillingData(appUser.company_id!);

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-borderBrand bg-white/90 p-5 shadow-panel sm:p-7">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Facturas</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Historial de cobros</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500">
            Consulta el estado de cada factura y el detalle acumulado por mes.
          </p>
        </div>

        <div className="rounded-3xl border border-borderBrand bg-[linear-gradient(180deg,#0d1628_0%,#14213b_100%)] p-6 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-300">Factura actual</p>
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">Estado</p>
              <div className="mt-2">
                <InvoiceStatusBadge
                  status={(currentInvoice?.status ?? "pending") as "pending" | "paid" | "overdue" | "cancelled"}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-300">Total</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">
                {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
                  Number(currentInvoice?.total ?? 0)
                )}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <DarkMetric label="Llamadas" value={String(currentInvoice?.total_calls ?? 0)} />
            <DarkMetric
              label="Minutos"
              value={`${Number(currentInvoice?.total_minutes ?? 0).toFixed(2)} min`}
            />
            <DarkMetric
              label="Periodo"
              value={
                currentInvoice
                  ? `${String(currentInvoice.month).padStart(2, "0")}/${currentInvoice.year}`
                  : "Sin datos"
              }
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={CreditCard}
          subtitle="Importe total del historial"
          title="Facturado"
          value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
            stats.totalInvoiced
          )}
        />
        <StatCard
          icon={CheckCircle2}
          subtitle="Facturas abonadas"
          title="Pagadas"
          tone="accent"
          value={String(stats.paidCount)}
        />
        <StatCard
          icon={Clock3}
          subtitle="Pendientes o vencidas"
          title="Pendientes"
          tone="warm"
          value={String(stats.pendingCount)}
        />
      </section>

      {invoices.length ? (
        <DataTable
          columns={["Periodo", "Llamadas", "Minutos", "Cuota fija", "Variable", "Instalacion", "Total", "Estado"]}
          rows={invoices.map((invoice) => [
            <span key={`${invoice.id}-period`}>
              {String(invoice.month).padStart(2, "0")}/{invoice.year}
            </span>,
            <span key={`${invoice.id}-calls`}>{invoice.total_calls}</span>,
            <MinutesDisplay key={`${invoice.id}-minutes`} value={invoice.total_minutes} />,
            <CurrencyAmount amount={invoice.fixed_fee} key={`${invoice.id}-fixed`} />,
            <CurrencyAmount amount={invoice.variable_fee} key={`${invoice.id}-variable`} />,
            <CurrencyAmount amount={invoice.installation_fee} key={`${invoice.id}-install`} />,
            <CurrencyAmount amount={invoice.total} key={`${invoice.id}-total`} />,
            <InvoiceStatusBadge key={`${invoice.id}-status`} status={invoice.status} />
          ])}
        />
      ) : (
        <EmptyState description="Todavia no hay facturas para esta cuenta." title="Sin facturas" />
      )}
    </div>
  );
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
