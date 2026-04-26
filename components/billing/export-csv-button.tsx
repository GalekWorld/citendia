"use client";

export function ExportCsvButton({
  month,
  status
}: {
  month?: string;
  status?: string;
}) {
  return (
    <a
      className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm font-medium text-ink transition hover:bg-slate-50"
      href={`/api/billing/export${month || status ? `?${new URLSearchParams({
        ...(month ? { month } : {}),
        ...(status ? { status } : {})
      }).toString()}` : ""}`}
    >
      Exportar CSV
    </a>
  );
}
