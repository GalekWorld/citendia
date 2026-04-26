import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppUser } from "@/types";
import { OWNER_EMAIL } from "@/lib/owner";

type AuthContext = {
  supabase: Awaited<ReturnType<typeof createClient>>;
  user: NonNullable<Awaited<ReturnType<Awaited<ReturnType<typeof createClient>>["auth"]["getUser"]>>["data"]["user"]>;
  appUser: AppUser;
};

async function getAuthenticatedContext() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: appUser } = await supabase
    .from("app_users")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!appUser) {
    redirect("/login");
  }

  return {
    supabase,
    user,
    appUser
  } satisfies AuthContext;
}

export async function requireUser() {
  return getAuthenticatedContext();
}

export async function requireAdmin() {
  const context = await getAuthenticatedContext();

  if (context.appUser.role !== "admin") {
    redirect("/account");
  }

  return context;
}

export async function requireOwner() {
  const context = await requireAdmin();

  if (context.user.email !== OWNER_EMAIL) {
    redirect("/dashboard");
  }

  return context;
}

export async function requireClient() {
  const context = await getAuthenticatedContext();

  if (context.appUser.role !== "client" || !context.appUser.company_id) {
    redirect("/dashboard");
  }

  return context;
}
