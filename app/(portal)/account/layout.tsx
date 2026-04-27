import { AccountSidebar } from "@/components/layout/account-sidebar";
import { AccountTopbar } from "@/components/layout/account-topbar";
import { requireClient } from "@/lib/auth/require-user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, supabase, appUser } = await requireClient();
  const { data: company } = await supabase
    .from("companies")
    .select("name")
    .eq("id", appUser.company_id!)
    .single();

  return (
    <div className="min-h-screen bg-mesh-light">
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-6 p-4 lg:p-6">
        <AccountSidebar companyName={company?.name ?? "Cuenta"} />
        <main className="flex min-w-0 flex-1 flex-col gap-6 pt-16 lg:pt-0">
          <AccountTopbar companyName={company?.name ?? "Cuenta"} email={user.email} />
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
