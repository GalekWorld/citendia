import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DataTable({
  columns,
  rows,
  className
}: {
  columns: string[];
  rows: ReactNode[][];
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-borderBrand bg-white shadow-panel", className)}>
      <div className="hidden overflow-x-auto lg:block">
        <table className="min-w-full divide-y divide-borderBrand">
          <thead className="bg-slate-50/80">
            <tr>
              {columns.map((column) => (
                <th
                  className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
                  key={column}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-borderBrand">
            {rows.map((cells, index) => (
              <tr className="align-top" key={index}>
                {cells.map((cell, cellIndex) => (
                  <td className="px-6 py-5 text-sm text-slate-600" key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-borderBrand lg:hidden">
        {rows.map((cells, rowIndex) => (
          <div className="space-y-4 p-5" key={rowIndex}>
            {cells.map((cell, cellIndex) => (
              <div className="grid gap-2" key={cellIndex}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {columns[cellIndex]}
                </span>
                <div className="text-sm text-slate-700">{cell}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
