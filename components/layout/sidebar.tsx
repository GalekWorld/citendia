"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  Building2,
  CreditCard,
  Menu,
  PhoneCall,
  Settings,
  X
} from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/clients", label: "Clientes", icon: Building2 },
  { href: "/bots", label: "Bots", icon: Bot },
  { href: "/calls", label: "Llamadas", icon: PhoneCall },
  { href: "/billing", label: "Facturacion", icon: CreditCard },
  { href: "/settings", label: "Ajustes", icon: Settings }
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col rounded-r-3xl border-r border-white/60 bg-[#0f1726] px-5 py-6 text-slate-100 shadow-2xl">
      <div className="rounded-3xl bg-white/8 p-4">
        <div>
          <BrandMark label="Citendia" labelClassName="text-white" />
          <p className="mt-3 text-xs uppercase tracking-[0.28em] text-teal-200">Citendia AI</p>
        </div>
        <p className="mt-2 text-sm text-slate-300">Clientes, bots y facturas</p>
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
              href={href as never}
              key={href}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        Uso interno.
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden w-72 shrink-0 lg:block">
        <SidebarContent />
      </div>
      <button
        className="fixed left-4 top-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f1726] text-white shadow-panel lg:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw]">
            <SidebarContent />
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
