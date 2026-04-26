import { ChangePasswordForm } from "@/components/portal/change-password-form";
import { requireClient } from "@/lib/auth/require-user";

export default async function AccountProfilePage() {
  const { user } = await requireClient();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-borderBrand bg-white/90 p-5 shadow-panel sm:p-7">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Perfil</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Cuenta del cliente</h1>
        <p className="mt-3 text-sm text-slate-500">{user.email}</p>
      </section>

      <ChangePasswordForm />
    </div>
  );
}
