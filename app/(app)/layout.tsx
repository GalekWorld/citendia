import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { requireAdmin } from "@/lib/auth/require-user";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();

  return (
    <div className="min-h-screen bg-mesh-light">
      <div className="mx-auto flex min-h-screen max-w-[1680px] gap-6 p-4 lg:p-6">
        <Sidebar />
        <main className="flex min-w-0 flex-1 flex-col gap-6 pt-16 lg:pt-0">
          <Topbar email={user.email} />
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
