import { InvoiceStatusBadge } from "@/components/badges/invoice-status-badge";
import { ExportCsvButton } from "@/components/billing/export-csv-button";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { MonthSelector } from "@/components/shared/month-selector";
import { RemoteActionButton } from "@/components/shared/remote-action-button";
import { getBillingData } from "@/lib/data";

export default async function BillingPage({
  searchParams
}: {
  searchParams: Promise<{ month?: string; status?: string }>;
}) {
  const params = await searchParams;
  const { invoices, selectedMonth, selectedYear } = await getBillingData(params);
  const monthValue = params.month ?? `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-5 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Facturacion</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Facturas del mes</h2>
        </div>
        <ExportCsvButton month={params.month} status={params.status} />
      </section>

      <form className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel md:grid-cols-[220px_240px_auto]">
        <MonthSelector defaultValue={monthValue} />
        <select
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
          defaultValue={params.status ?? ""}
          name="status"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="paid">Pagadas</option>
          <option value="overdue">Vencidas</option>
          <option value="cancelled">Canceladas</option>
        </select>
        <button className="rounded-2xl bg-[#0f1726] px-5 py-4 text-sm font-medium text-white" type="submit">
          Filtrar
        </button>
      </form>

      {invoices.length ? (
        <DataTable
          columns={[
            "Cliente",
            "Periodo",
            "Llamadas",
            "Minutos",
            "Cuota fija",
            "Variable",
            "Instalacion",
            "Total",
            "Estado",
            "Acciones"
          ]}
          rows={invoices.map((invoice) => [
            <span className="font-semibold text-ink" key={`${invoice.id}-company`}>
              {invoice.company_name}
            </span>,
            <span key={`${invoice.id}-month`}>
              {String(invoice.month).padStart(2, "0")}/{invoice.year}
            </span>,
            <span key={`${invoice.id}-calls`}>{invoice.total_calls}</span>,
            <span key={`${invoice.id}-minutes`}>{invoice.total_minutes.toFixed(2)} min</span>,
            <CurrencyAmount amount={invoice.fixed_fee} key={`${invoice.id}-fixed`} />,
            <CurrencyAmount amount={invoice.variable_fee} key={`${invoice.id}-variable`} />,
            <CurrencyAmount amount={invoice.installation_fee} key={`${invoice.id}-install`} />,
            <CurrencyAmount amount={invoice.total} key={`${invoice.id}-total`} />,
            <InvoiceStatusBadge key={`${invoice.id}-status`} status={invoice.status} />,
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" key={`${invoice.id}-actions`}>
              <RemoteActionButton
                endpoint={`/api/invoices/${invoice.id}`}
                label="Pagado"
                payload={{ status: "paid" }}
              />
              <RemoteActionButton
                endpoint={`/api/invoices/${invoice.id}`}
                label="Pendiente"
                payload={{ status: "pending" }}
              />
              <RemoteActionButton
                endpoint={`/api/invoices/${invoice.id}`}
                label="Vencida"
                payload={{ status: "overdue" }}
              />
              <a
                className="rounded-2xl border border-borderBrand bg-white px-4 py-2 text-center text-sm"
                href={`/api/invoices/${invoice.id}?download=1`}
                rel="noreferrer"
                target="_blank"
              >
                Ver factura
              </a>
            </div>
          ])}
        />
      ) : (
        <EmptyState description="No hay facturas para este periodo." title="Sin facturas" />
      )}
    </div>
  );
}
