import Link from "next/link";
import { ClientForm } from "@/components/forms/client-form";
import { CompanyStatusBadge } from "@/components/badges/company-status-badge";
import { CurrencyAmount } from "@/components/shared/currency-amount";
import { MinutesDisplay } from "@/components/shared/minutes-display";
import { DataTable } from "@/components/tables/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { getClientsData } from "@/lib/data";

export default async function ClientsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const clients = await getClientsData({
    query: params.q,
    status: params.status
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-5 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Clientes</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Empresas</h2>
        </div>
        <ClientForm />
      </section>

      <form className="grid gap-4 rounded-3xl border border-borderBrand bg-white/85 p-5 shadow-panel md:grid-cols-[minmax(0,1fr)_260px_auto]">
        <input
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
          defaultValue={params.q}
          name="q"
          placeholder="Buscar por nombre"
        />
        <select
          className="rounded-2xl border border-borderBrand bg-white px-5 py-4 text-sm outline-none transition focus:border-accent"
          defaultValue={params.status ?? ""}
          name="status"
        >
          <option value="">Todos los estados</option>
          <option value="active">Activos</option>
          <option value="paused">Pausados</option>
          <option value="cancelled">Cancelados</option>
        </select>
        <button className="rounded-2xl bg-[#0f1726] px-5 py-4 text-sm font-medium text-white" type="submit">
          Filtrar
        </button>
      </form>

      {clients.length ? (
        <DataTable
          columns={[
            "Empresa",
            "Contacto",
            "Estado",
            "Alta",
            "Bots",
            "Minutos del mes",
            "Importe estimado",
            "Acciones"
          ]}
          rows={clients.map((client) => [
            <div key={`${client.id}-name`} className="min-w-[160px]">
              <p className="font-semibold text-ink">{client.name}</p>
              <p className="mt-1 text-sm text-slate-400">{client.email ?? "Sin email"}</p>
            </div>,
            <div key={`${client.id}-contact`} className="min-w-[180px]">
              <p className="font-medium text-ink">{client.contact_name ?? "Sin contacto"}</p>
              <p className="mt-1 text-sm text-slate-400">{client.phone ?? "Sin telefono"}</p>
            </div>,
            <CompanyStatusBadge key={`${client.id}-status`} status={client.status} />,
            <span key={`${client.id}-date`}>{new Date(client.created_at).toLocaleDateString("es-ES")}</span>,
            <span key={`${client.id}-bots`} className="font-medium text-ink">
              {client.bot_count}
            </span>,
            <MinutesDisplay key={`${client.id}-minutes`} value={client.month_minutes} />,
            <CurrencyAmount amount={client.month_amount} key={`${client.id}-amount`} />,
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" key={`${client.id}-actions`}>
              <Link
                className="rounded-2xl border border-borderBrand bg-white px-4 py-2.5 text-center text-sm font-medium text-ink"
                href={`/clients/${client.id}`}
              >
                Ver detalle
              </Link>
              <ClientForm company={client} triggerLabel="Editar" />
              {client.status !== "paused" ? (
                <ConfirmDialog
                  description={`Se pausara el cliente ${client.name}.`}
                  endpoint={`/api/companies/${client.id}`}
                  payload={{ status: "paused" }}
                  title="Pausar cliente"
                  triggerLabel="Pausar"
                />
              ) : null}
              {client.status !== "cancelled" ? (
                <ConfirmDialog
                  description={`Se cancelara el cliente ${client.name}.`}
                  endpoint={`/api/companies/${client.id}`}
                  payload={{ status: "cancelled" }}
                  title="Cancelar cliente"
                  triggerLabel="Cancelar"
                  variant="danger"
                />
              ) : null}
            </div>
          ])}
        />
      ) : (
        <EmptyState description="Crea un cliente para empezar." title="No hay clientes" />
      )}
    </div>
  );
}
