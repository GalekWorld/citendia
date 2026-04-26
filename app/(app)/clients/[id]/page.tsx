import { notFound } from "next/navigation";
import { BotStatusBadge } from "@/components/badges/bot-status-badge";
import { InvoiceStatusBadge } from "@/components/badges/invoice-status-badge";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { CallStatusBadge } from "@/components/badges/call-status-badge";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { CompanyUserForm } from "@/components/forms/company-user-form";
import { getClientDetail } from "@/lib/data";

export default async function ClientDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getClientDetail(id);

  if (!data.company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Cliente</p>
          <h2 className="mt-1 text-3xl font-semibold text-ink">{data.company.name}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DetailCard label="Contacto" value={data.company.contact_name ?? "Sin contacto"} />
            <DetailCard label="Email" value={data.company.email ?? "Sin email"} />
            <DetailCard label="Telefono" value={data.company.phone ?? "Sin telefono"} />
            <DetailCard
              label="Fecha de alta"
              value={new Date(data.company.created_at).toLocaleDateString("es-ES")}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Facturacion actual</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Total estimado del mes</h3>
          <div className="mt-6 space-y-4">
            <InfoRow label="Llamadas" value={String(data.currentInvoice?.total_calls ?? 0)} />
            <InfoRow
              label="Minutos"
              value={`${Number(data.currentInvoice?.total_minutes ?? 0).toFixed(2)} min`}
            />
            <InfoRow
              label="Cuota fija"
              value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
                Number(data.currentInvoice?.fixed_fee ?? data.company.monthly_fee)
              )}
            />
            <InfoRow
              label="Instalacion"
              value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
                Number(data.currentInvoice?.installation_fee ?? 0)
              )}
            />
            <InfoRow
              label="Total actual"
              value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
                Number(data.currentInvoice?.total ?? 0)
              )}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Bots asociados</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Bots</h3>
          <div className="mt-6 space-y-4">
            {data.bots.length ? (
              data.bots.map((bot) => (
                <div className="rounded-2xl border border-borderBrand bg-slate-50/80 p-4" key={bot.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-ink">{bot.name}</h4>
                      <p className="mt-1 text-sm text-slate-500">{bot.phone_number ?? "Sin numero"}</p>
                      <p className="mt-2 text-xs text-slate-400">{bot.retell_agent_id}</p>
                    </div>
                    <BotStatusBadge status={bot.status} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState description="Asocia un bot con su `retell_agent_id`." title="Sin bots asociados" />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Historico mensual</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">Consumo por mes</h3>
          <div className="mt-6 space-y-4">
            {data.usage.length ? (
              data.usage.map((item) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-2xl border border-borderBrand bg-slate-50/80 p-4"
                  key={item.id}
                >
                  <div>
                    <h4 className="font-semibold text-ink">
                      {String(item.month).padStart(2, "0")}/{item.year}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.total_calls} llamadas · {item.total_minutes.toFixed(2)} min
                    </p>
                  </div>
                  <CurrencyAmount amount={item.total_amount} className="font-semibold text-ink" />
                </div>
              ))
            ) : (
              <EmptyState description="Aqui veras el consumo de cada mes." title="Sin historico todavia" />
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-borderBrand bg-white/85 p-6 shadow-panel">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Accesos</p>
            <h3 className="mt-1 text-xl font-semibold text-ink">Usuarios del cliente</h3>
          </div>
          <CompanyUserForm
            bots={data.bots.map((bot) => ({ id: bot.id, name: bot.name }))}
            companyId={id}
          />
        </div>

        <div className="mt-6 space-y-4">
          {data.members.length ? (
            data.members.map((member) => (
              <div
                className="flex flex-col gap-2 rounded-2xl border border-borderBrand bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between"
                key={member.id}
              >
                <div>
                  <h4 className="font-semibold text-ink">{member.full_name ?? "Sin nombre"}</h4>
                  <p className="mt-1 text-sm text-slate-500">{member.email}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.assigned_bots?.length ? (
                      member.assigned_bots.map((bot: { id: string; name: string }) => (
                        <span
                          className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-medium text-[#1f51fb]"
                          key={bot.id}
                        >
                          {bot.name}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        Todos los bots
                      </span>
                    )}
                  </div>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-600">
                  {member.role}
                </span>
              </div>
            ))
          ) : (
            <EmptyState description="Crea el primer acceso para este cliente." title="Sin accesos" />
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold text-ink">Llamadas recientes</h3>
          {data.calls.length ? (
            <DataTable
              columns={["Fecha", "Duracion", "Minutos", "Estado", "Resumen"]}
              rows={data.calls.map((call) => [
                <span key={`${call.id}-date`}>{new Date(call.created_at).toLocaleString("es-ES")}</span>,
                <span key={`${call.id}-seconds`}>{call.duration_seconds}s</span>,
                <MinutesDisplay key={`${call.id}-minutes`} value={call.billed_minutes} />,
                <CallStatusBadge key={`${call.id}-status`} status={call.status} />,
                <span className="max-w-xs text-sm text-slate-500" key={`${call.id}-summary`}>
                  {call.summary ?? "Sin resumen"}
                </span>
              ])}
            />
          ) : (
            <EmptyState description="Las llamadas apareceran aqui cuando entren eventos." title="Sin llamadas registradas" />
          )}
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-ink">Facturas del cliente</h3>
          {data.invoices.length ? (
            <DataTable
              columns={["Mes", "Llamadas", "Minutos", "Total", "Estado"]}
              rows={data.invoices.map((invoice) => [
                <span key={`${invoice.id}-period`}>
                  {String(invoice.month).padStart(2, "0")}/{invoice.year}
                </span>,
                <span key={`${invoice.id}-calls`}>{invoice.total_calls}</span>,
                <MinutesDisplay key={`${invoice.id}-minutes`} value={invoice.total_minutes} />,
                <CurrencyAmount amount={invoice.total} key={`${invoice.id}-total`} />,
                <InvoiceStatusBadge key={`${invoice.id}-status`} status={invoice.status} />
              ])}
            />
          ) : (
            <EmptyState description="Las facturas se iran creando con el uso." title="Sin facturas" />
          )}
        </div>
      </section>
    </div>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-borderBrand bg-slate-50/80 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 font-medium text-ink">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-borderBrand bg-slate-50/80 px-4 py-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
