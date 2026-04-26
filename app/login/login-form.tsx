"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        setSubmitting(false);

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success("Sesion iniciada");
        router.replace((searchParams.get("next") ?? "/") as never);
        router.refresh();
      }}
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink">Email</span>
        <div className="flex items-center gap-3 rounded-2xl border border-borderBrand bg-white px-4 py-3">
          <Mail className="h-4 w-4 text-slate-400" />
          <input
            className="w-full border-0 bg-transparent outline-none"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            type="email"
            value={email}
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink">Contrasena</span>
        <div className="flex items-center gap-3 rounded-2xl border border-borderBrand bg-white px-4 py-3">
          <LockKeyhole className="h-4 w-4 text-slate-400" />
          <input
            className="w-full border-0 bg-transparent outline-none"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            type="password"
            value={password}
          />
        </div>
      </label>

      <button
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f1726] px-4 py-3 font-medium text-white transition hover:bg-slate-800"
        disabled={submitting}
        type="submit"
      >
        {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        Entrar
      </button>
    </form>
  );
}
