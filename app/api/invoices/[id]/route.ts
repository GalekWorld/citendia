import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAuthSession } from "@/lib/api/require-auth-session";
import { createAdminClient } from "@/lib/supabase/admin";
import { euros } from "@/lib/utils";

const InvoiceStatusSchema = z.object({
  status: z.enum(["pending", "paid", "overdue", "cancelled"])
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = InvoiceStatusSchema.parse(body);
    const admin = createAdminClient();
    const { data: invoice, error: fetchError } = await admin
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !invoice) {
      throw fetchError ?? new Error("Invoice not found");
    }

    const { data, error } = await admin
      .from("invoices")
      .update({
        status,
        paid_at: status === "paid" ? new Date().toISOString() : null
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    await admin
      .from("monthly_usage")
      .update({ invoice_status: status })
      .eq("company_id", invoice.company_id)
      .eq("month", invoice.month)
      .eq("year", invoice.year);

    if (status === "paid" && Number(invoice.installation_fee) > 0) {
      await admin
        .from("companies")
        .update({ installation_charged: true })
        .eq("id", invoice.company_id);
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuthSession();
  if ("error" in auth) {
    return auth.error;
  }

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const supabase = auth.supabase;
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*, companies(name, email, contact_name, phone)")
    .eq("id", id)
    .single();

  if (error || !invoice) {
    return NextResponse.json({ error: error?.message ?? "Invoice not found" }, { status: 404 });
  }

  const company = Array.isArray(invoice.companies) ? invoice.companies[0] : invoice.companies;
  const issueDate = new Date(invoice.issued_at ?? invoice.created_at ?? Date.now());
  const paidDate = invoice.paid_at ? new Date(invoice.paid_at) : null;
  const periodLabel = `${String(invoice.month).padStart(2, "0")}/${invoice.year}`;
  const invoiceNumber = `ATD-${invoice.year}-${String(invoice.month).padStart(2, "0")}-${invoice.id.slice(0, 8).toUpperCase()}`;
  const statusLabel =
    invoice.status === "paid"
      ? "Pagada"
      : invoice.status === "overdue"
        ? "Vencida"
        : invoice.status === "cancelled"
          ? "Cancelada"
          : "Pendiente";
  const totalMinutes = Number(invoice.total_minutes ?? 0);
  const variableFee = Number(invoice.variable_fee ?? 0);
  const lineItems = [
    {
      description: `Cuota mensual - ${periodLabel}`,
      quantity: "1",
      unitPrice: Number(invoice.fixed_fee ?? 0),
      amount: Number(invoice.fixed_fee ?? 0)
    },
    {
      description: `Consumo de llamadas (${totalMinutes.toFixed(2)} min / ${invoice.total_calls} llamadas)`,
      quantity: totalMinutes.toFixed(2),
      unitPrice: totalMinutes > 0 ? variableFee / totalMinutes : 0,
      amount: variableFee
    },
    ...(Number(invoice.installation_fee ?? 0) > 0
      ? [
          {
            description: "Alta e instalacion inicial",
            quantity: "1",
            unitPrice: Number(invoice.installation_fee ?? 0),
            amount: Number(invoice.installation_fee ?? 0)
          }
        ]
      : [])
  ];

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Factura ${invoiceNumber}</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #102033;
        --muted: #627287;
        --border: #d9e3ef;
        --panel: #ffffff;
        --accent: #0f766e;
        --accent-soft: #e7f7f4;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: linear-gradient(180deg, #f4f7fb 0%, #eaf0f7 100%);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .page {
        max-width: 1080px;
        margin: 0 auto;
        padding: 40px 24px 64px;
      }
      .invoice {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 28px;
        overflow: hidden;
        box-shadow: 0 24px 60px rgba(16, 32, 51, 0.08);
      }
      .hero {
        display: flex;
        justify-content: space-between;
        gap: 32px;
        padding: 36px 40px;
        background:
          radial-gradient(circle at top right, rgba(15,118,110,0.18), transparent 22%),
          radial-gradient(circle at left bottom, rgba(217,119,6,0.10), transparent 20%),
          linear-gradient(135deg, #0f1726 0%, #12243b 55%, #163456 100%);
        color: white;
      }
      .brand h1 {
        margin: 0;
        font-size: 34px;
        line-height: 1;
        letter-spacing: -0.04em;
      }
      .brand p {
        margin: 10px 0 0;
        color: rgba(255,255,255,0.74);
        max-width: 440px;
        line-height: 1.6;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 8px 14px;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.16);
      }
      .summary {
        min-width: 290px;
        padding: 22px 24px;
        border-radius: 24px;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.1);
      }
      .summary .label {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: rgba(255,255,255,0.64);
      }
      .summary .value {
        margin-top: 10px;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: -0.04em;
      }
      .summary .sub {
        margin-top: 8px;
        color: rgba(255,255,255,0.72);
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
        padding: 32px 40px 20px;
      }
      .card {
        padding: 24px;
        border: 1px solid var(--border);
        border-radius: 24px;
        background: #fbfdff;
      }
      .eyebrow {
        margin: 0 0 12px;
        color: var(--muted);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
      }
      .card h2 {
        margin: 0 0 10px;
        font-size: 20px;
        letter-spacing: -0.03em;
      }
      .meta-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
      .meta-row:last-child { border-bottom: 0; padding-bottom: 0; }
      .meta-row span:first-child { color: var(--muted); }
      .meta-row span:last-child { font-weight: 600; text-align: right; }
      .table-wrap { padding: 12px 40px 0; }
      table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid var(--border);
      }
      thead th {
        background: #f5f8fc;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 12px;
        text-align: left;
        padding: 18px 20px;
      }
      tbody td {
        padding: 20px;
        border-top: 1px solid var(--border);
        vertical-align: top;
      }
      tbody tr:first-child td { border-top: 0; }
      .right { text-align: right; white-space: nowrap; }
      .totals {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 360px;
        gap: 24px;
        padding: 28px 40px 40px;
      }
      .note {
        padding: 24px;
        border-radius: 24px;
        background: var(--accent-soft);
        border: 1px solid #c8ebe7;
      }
      .note p { margin: 0; line-height: 1.7; color: #1f4f49; }
      .totals-card {
        border: 1px solid var(--border);
        border-radius: 24px;
        background: #fbfdff;
        padding: 22px 24px;
      }
      .totals-row {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
      .totals-row:last-child { border-bottom: 0; }
      .totals-row.total {
        margin-top: 8px;
        padding-top: 18px;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.03em;
      }
      .footer {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        padding: 24px 40px 36px;
        border-top: 1px solid var(--border);
        color: var(--muted);
        font-size: 13px;
        line-height: 1.6;
      }
      @media print {
        body { background: white; }
        .page { padding: 0; max-width: none; }
        .invoice { border: 0; box-shadow: none; border-radius: 0; }
      }
      @media (max-width: 900px) {
        .hero, .footer { flex-direction: column; }
        .grid, .totals { grid-template-columns: 1fr; }
        .summary { min-width: 0; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <article class="invoice">
        <section class="hero">
          <div class="brand">
            <div class="badge">Citendia · Factura</div>
            <h1>Factura de servicios</h1>
            <p>Detalle del servicio prestado en el periodo facturado.</p>
          </div>
          <div class="summary">
            <div class="label">Importe total</div>
            <div class="value">${euros(invoice.total)}</div>
            <div class="sub">Estado: ${statusLabel}</div>
            <div class="sub">Factura: ${invoiceNumber}</div>
          </div>
        </section>

        <section class="grid">
          <div class="card">
            <p class="eyebrow">Emisor</p>
            <h2>Citendia</h2>
            <div class="meta-row"><span>Servicio</span><span>Asistentes telefonicos</span></div>
            <div class="meta-row"><span>Email</span><span>info@citendia.com</span></div>
            <div class="meta-row"><span>Concepto</span><span>Servicio mensual y consumo</span></div>
          </div>
          <div class="card">
            <p class="eyebrow">Cliente</p>
            <h2>${company?.name ?? "Sin empresa"}</h2>
            <div class="meta-row"><span>Contacto</span><span>${company?.contact_name ?? "No informado"}</span></div>
            <div class="meta-row"><span>Email</span><span>${company?.email ?? "No informado"}</span></div>
            <div class="meta-row"><span>Telefono</span><span>${company?.phone ?? "No informado"}</span></div>
          </div>
        </section>

        <section class="grid" style="padding-top: 4px;">
          <div class="card">
            <p class="eyebrow">Datos de factura</p>
            <div class="meta-row"><span>Numero de factura</span><span>${invoiceNumber}</span></div>
            <div class="meta-row"><span>Fecha de emision</span><span>${issueDate.toLocaleDateString("es-ES")}</span></div>
            <div class="meta-row"><span>Periodo facturado</span><span>${periodLabel}</span></div>
          </div>
          <div class="card">
            <p class="eyebrow">Estado de cobro</p>
            <div class="meta-row"><span>Estado</span><span>${statusLabel}</span></div>
            <div class="meta-row"><span>Fecha de pago</span><span>${paidDate ? paidDate.toLocaleDateString("es-ES") : "Pendiente"}</span></div>
            <div class="meta-row"><span>Llamadas / minutos</span><span>${invoice.total_calls} / ${totalMinutes.toFixed(2)} min</span></div>
          </div>
        </section>

        <section class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Descripcion</th>
                <th class="right">Cantidad</th>
                <th class="right">Precio unitario</th>
                <th class="right">Importe</th>
              </tr>
            </thead>
            <tbody>
              ${lineItems
                .map(
                  (item) => `
                    <tr>
                      <td>${item.description}</td>
                      <td class="right">${item.quantity}</td>
                      <td class="right">${euros(item.unitPrice)}</td>
                      <td class="right">${euros(item.amount)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
        </section>

        <section class="totals">
          <div class="note">
            <p>Factura correspondiente al periodo indicado, con el desglose de cuota mensual, consumo y alta inicial cuando corresponda.</p>
          </div>
          <div class="totals-card">
            <div class="totals-row"><span>Cuota mensual</span><strong>${euros(invoice.fixed_fee)}</strong></div>
            <div class="totals-row"><span>Consumo variable</span><strong>${euros(invoice.variable_fee)}</strong></div>
            <div class="totals-row"><span>Instalacion</span><strong>${euros(invoice.installation_fee)}</strong></div>
            <div class="totals-row total"><span>Total</span><span>${euros(invoice.total)}</span></div>
          </div>
        </section>

        <footer class="footer">
          <div>
            <strong>Citendia</strong><br />
            Factura emitida por Citendia.
          </div>
          <div>
            Fecha de generacion: ${new Date().toLocaleString("es-ES")}<br />
            Documento listo para impresion o PDF.
          </div>
        </footer>
      </article>
    </div>
  </body>
</html>`;

  const isDownload = searchParams.get("download") === "1";

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `${isDownload ? "inline" : "inline"}; filename="${invoiceNumber}.html"`
    }
  });
}
