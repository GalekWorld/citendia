"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function Topbar({ email }: { email?: string }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/80 px-4 py-4 shadow-panel backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div className="pl-12 lg:pl-0">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Citendia AI</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink">Resumen general</h2>
      </div>

      <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
        <div className="hidden rounded-2xl border border-borderBrand bg-slate-50 px-4 py-2 text-right text-sm md:block">
          <p className="font-medium text-ink">{email ?? "Administrador"}</p>
          <p className="text-slate-500">Conectado</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-2xl bg-[#0f1726] px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          onClick={async () => {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (error) {
              toast.error(error.message);
              return;
            }

            toast.success("Sesion cerrada");
            router.replace("/login");
            router.refresh();
          }}
          type="button"
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    </header>
  );
}
