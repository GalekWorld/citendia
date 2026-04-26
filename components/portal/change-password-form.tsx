"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("La contrasena debe tener al menos 8 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contrasenas no coinciden");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Contrasena actualizada");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form className="space-y-4 rounded-3xl border border-borderBrand bg-white/90 p-6 shadow-panel" onSubmit={onSubmit}>
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Cuenta</p>
        <h2 className="mt-1 text-xl font-semibold text-ink">Cambiar contrasena</h2>
      </div>

      <Field label="Nueva contrasena" type="password" value={password} onChange={setPassword} />
      <Field
        label="Repite la contrasena"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <div className="flex justify-end">
        <button className="rounded-2xl bg-[#0d1628] px-4 py-3 text-sm font-medium text-white" disabled={submitting} type="submit">
          {submitting ? "Guardando..." : "Actualizar contrasena"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  type,
  value,
  onChange
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        className="w-full rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm outline-none transition focus:border-accent"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}
