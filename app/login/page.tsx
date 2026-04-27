import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/login/login-form";
import { BrandMark } from "@/components/brand/brand-mark";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Acceso a Citendia",
  description: "Inicia sesión en Citendia para revisar tu bot, llamadas, consumo y estado de tu cuenta.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-mesh-light px-4 py-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#0f1726] p-8 text-white shadow-panel lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.18),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.18),transparent_24%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm">
              <BrandMark label="Citendia" labelClassName="text-white" size="sm" />
            </div>
            <h1 className="mt-8 max-w-xl text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
              Accede a tu cuenta y gestiona tu atención con Citendia.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Consulta tus llamadas, minutos, reservas y estado de servicio desde un solo lugar.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Visión clara de tu bot y su actividad",
                "Llamadas y minutos actualizados",
                "Seguimiento de reservas y atención",
                "Consumo y estado de tu cuenta"
              ].map((item) => (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-panel backdrop-blur lg:p-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-400">Acceso</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">
              Inicia sesión para administrar tu bot
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Entra con tu correo y contraseña para ver llamadas, consumo y estado de tu cuenta.
            </p>

            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  );
}
