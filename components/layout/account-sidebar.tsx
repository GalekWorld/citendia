"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, KeyRound, Menu, PhoneCall, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

const items = [
  { href: "/account", label: "Resumen", icon: BarChart3 },
  { href: "/account/calls", label: "Llamadas", icon: PhoneCall },
  { href: "/account/billing", label: "Facturas", icon: CreditCard },
  { href: "/account/profile", label: "Cuenta", icon: KeyRound }
];

function Content({ companyName }: { companyName: string }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col rounded-r-3xl border-r border-white/60 bg-[#0d1628] px-5 py-6 text-slate-100 shadow-2xl">
      <div className="overflow-hidden rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))] p-4">
        <BrandMark label="Citendia" labelClassName="text-white" size="sm" />
        <p className="text-xs uppercase tracking-[0.28em] text-teal-200">Portal cliente</p>
        <h1 className="mt-2 text-xl font-semibold">{companyName}</h1>
        <p className="mt-2 text-sm text-slate-300">Minutos, llamadas y facturacion</p>
      </div>

      <nav className="mt-8 space-y-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-white text-ink shadow-soft"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              )}
              href={href}
              key={href}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Acceso seguro</p>
        <p className="mt-2 text-sm text-slate-300">Consulta el uso del mes y el importe previsto.</p>
      </div>
    </div>
  );
}

export function AccountSidebar({ companyName }: { companyName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden w-72 shrink-0 lg:block">
        <Content companyName={companyName} />
      </div>
      <button
        className="fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d1628] text-white shadow-panel lg:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw]">
            <Content companyName={companyName} />
          </div>
          <button
            className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
