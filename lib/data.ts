import { endOfMonth, format, startOfMonth } from "date-fns";
import { calculateMonthlyCharges } from "@/lib/billing/calculate";
import { createClient } from "@/lib/supabase/server";
import { AppUser, CallListItem, ClientListItem, ContactLead, InvoiceListItem } from "@/types";

async function getVisibleBotIds(
  supabase: Awaited<ReturnType<typeof createClient>>,
  appUserId: string | undefined,
  companyId: string
) {
  if (!appUserId) {
    return null;
  }

  const { data } = await supabase
    .from("company_user_bots")
    .select("bot_id, bots!inner(company_id)")
    .eq("app_user_id", appUserId);

  const botIds =
    data
      ?.filter((item) => item.bots && "company_id" in item.bots && item.bots.company_id === companyId)
      .map((item) => item.bot_id) ?? [];

  return botIds.length ? botIds : null;
}

export function getMonthWindow(date = new Date()) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear()
  };
}

export async function getSettings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function getDashboardData() {
  const supabase = await createClient();
  const range = getMonthWindow();
  const [companiesRes, botsRes, callsRes, invoicesRes, leadsRes] = await Promise.all([
    supabase.from("companies").select("*").order("created_at", { ascending: false }),
    supabase.from("bots").select("*, companies(name)").order("created_at", { ascending: false }),
    supabase
      .from("calls")
      .select("*, companies(name), bots(name)")
      .gte("created_at", range.start)
      .lte("created_at", range.end)
      .order("created_at", { ascending: false }),
    supabase
      .from("invoices")
      .select("*, companies(name)")
      .eq("month", range.month)
      .eq("year", range.year)
      .order("created_at", { ascending: false }),
    supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8)
  ]);

  const companies = companiesRes.data ?? [];
  const bots = botsRes.data ?? [];
  const calls = (callsRes.data ?? []).map((call) => ({
    ...call,
    company_name: call.companies?.name ?? "Sin empresa",
    bot_name: call.bots?.name ?? "Sin bot"
  })) as CallListItem[];
  const invoices = (invoicesRes.data ?? []).map((invoice) => ({
    ...invoice,
    company_name: invoice.companies?.name ?? "Sin empresa"
  })) as InvoiceListItem[];
  const leads = (leadsRes.data ?? []) as ContactLead[];

  const estimatedRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0);
  const pendingInvoices = invoices.filter((invoice) => invoice.status !== "paid").length;
  const minutesThisMonth = calls.reduce((sum, call) => sum + Number(call.billed_minutes ?? 0), 0);

  const latestCalls = calls.slice(0, 8);
  const ranking = companies
    .map((company) => {
      const companyCalls = calls.filter((call) => call.company_id === company.id);
      const totalMinutes = companyCalls.reduce(
        (sum, call) => sum + Number(call.billed_minutes ?? 0),
        0
      );
      const totalAmount =
        invoices.find((invoice) => invoice.company_id === company.id)?.total ??
        calculateMonthlyCharges({
          company,
          totalMinutes,
          month: range.month,
          year: range.year
        }).totalAmount;

      return {
        id: company.id,
        name: company.name,
        totalMinutes,
        totalAmount: Number(totalAmount),
        totalCalls: companyCalls.length
      };
    })
    .sort((a, b) => b.totalMinutes - a.totalMinutes)
    .slice(0, 6);

  const dailyMinutes = new Map<string, number>();
  calls.forEach((call) => {
    const key = format(new Date(call.created_at), "dd MMM");
    dailyMinutes.set(key, Number((dailyMinutes.get(key) ?? 0) + Number(call.billed_minutes ?? 0)));
  });

  return {
    stats: {
      activeCompanies: companies.filter((company) => company.status === "active").length,
      activeBots: bots.filter((bot) => bot.status === "active").length,
      callsThisMonth: calls.length,
      minutesThisMonth,
      estimatedRevenue,
      pendingInvoices,
      newLeads: leads.filter((lead) => lead.status === "new").length
    },
    latestCalls,
    ranking,
    dailyMinutes: Array.from(dailyMinutes.entries()).map(([date, minutes]) => ({ date, minutes })),
    invoices,
    leads
  };
}

export async function getClientsData({
  query,
  status
}: {
  query?: string;
  status?: string;
}) {
  const supabase = await createClient();
  const range = getMonthWindow();
  const [companiesRes, botsRes, invoicesRes] = await Promise.all([
    supabase.from("companies").select("*").order("created_at", { ascending: false }),
    supabase.from("bots").select("*"),
    supabase
      .from("invoices")
      .select("*")
      .eq("month", range.month)
      .eq("year", range.year)
  ]);

  const bots = botsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];
  const companies = (companiesRes.data ?? [])
    .filter((company) =>
      query ? company.name.toLowerCase().includes(query.trim().toLowerCase()) : true
    )
    .filter((company) => (status ? company.status === status : true))
    .map((company) => {
      const invoice = invoices.find((item) => item.company_id === company.id);

      return {
        ...company,
        bot_count: bots.filter((bot) => bot.company_id === company.id).length,
        month_minutes: Number(invoice?.total_minutes ?? 0),
        month_amount: Number(invoice?.total ?? 0)
      };
    }) as ClientListItem[];

  return companies;
}

export async function getClientDetail(id: string) {
  const supabase = await createClient();
  const range = getMonthWindow();
  const [
    { data: company },
    { data: bots },
    { data: calls },
    { data: invoices },
    { data: usage },
    { data: members },
    { data: userBotAssignments }
  ] = await Promise.all([
    supabase.from("companies").select("*").eq("id", id).single(),
    supabase.from("bots").select("*").eq("company_id", id).order("created_at", { ascending: false }),
    supabase
      .from("calls")
      .select("*")
      .eq("company_id", id)
      .order("created_at", { ascending: false })
      .limit(25),
    supabase
      .from("invoices")
      .select("*")
      .eq("company_id", id)
      .order("year", { ascending: false })
      .order("month", { ascending: false }),
    supabase
      .from("monthly_usage")
      .select("*")
      .eq("company_id", id)
      .order("year", { ascending: false })
      .order("month", { ascending: false }),
    supabase
      .from("app_users")
      .select("*")
      .eq("company_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("company_user_bots")
      .select("app_user_id, bot_id, bots(id, name)")
  ]);

  const currentInvoice = invoices?.find(
    (invoice) => invoice.month === range.month && invoice.year === range.year
  );

  const memberBotMap = new Map<string, Array<{ id: string; name: string }>>();
  (userBotAssignments ?? []).forEach((assignment) => {
    const current = memberBotMap.get(assignment.app_user_id) ?? [];
    const relatedBots = Array.isArray(assignment.bots) ? assignment.bots : assignment.bots ? [assignment.bots] : [];
    relatedBots.forEach((bot) => {
      current.push({
        id: bot.id,
        name: bot.name
      });
    });
    memberBotMap.set(assignment.app_user_id, current);
  });

  return {
    company,
    bots: bots ?? [],
    calls: calls ?? [],
    invoices: invoices ?? [],
    usage: usage ?? [],
    currentInvoice,
    members: ((members ?? []) as AppUser[]).map((member) => ({
      ...member,
      assigned_bots: memberBotMap.get(member.id) ?? []
    }))
  };
}

export async function getBotsData({
  query,
  companyId,
  status
}: {
  query?: string;
  companyId?: string;
  status?: string;
}) {
  const supabase = await createClient();
  const range = getMonthWindow();
  const [{ data: bots }, { data: companies }, { data: calls }] = await Promise.all([
    supabase.from("bots").select("*").order("created_at", { ascending: false }),
    supabase.from("companies").select("id, name").order("name"),
    supabase
      .from("calls")
      .select("*")
      .gte("created_at", range.start)
      .lte("created_at", range.end)
  ]);

  const botRows =
    bots
      ?.filter((bot) => (query ? bot.name.toLowerCase().includes(query.toLowerCase()) : true))
      .filter((bot) => (companyId ? bot.company_id === companyId : true))
      .filter((bot) => (status ? bot.status === status : true))
      .map((bot) => {
        const botCalls = (calls ?? []).filter((call) => call.bot_id === bot.id);

        return {
          ...bot,
          company_name: companies?.find((company) => company.id === bot.company_id)?.name ?? "Sin empresa",
          month_calls: botCalls.length,
          month_minutes: Number(
            botCalls.reduce((sum, call) => sum + Number(call.billed_minutes ?? 0), 0).toFixed(2)
          ),
          month_cost: Number(
            botCalls.reduce((sum, call) => sum + Number(call.cost ?? 0), 0).toFixed(2)
          )
        };
      }) ?? [];

  return {
    companies: companies ?? [],
    bots: botRows
  };
}

export async function getCallsData(filters: {
  companyId?: string;
  botId?: string;
  status?: string;
  from?: string;
  to?: string;
  month?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("calls")
    .select("*, companies(name), bots(name)")
    .order("created_at", { ascending: false })
    .limit(200);

  if (filters.companyId) {
    query = query.eq("company_id", filters.companyId);
  }
  if (filters.botId) {
    query = query.eq("bot_id", filters.botId);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.from) {
    query = query.gte("created_at", new Date(filters.from).toISOString());
  }
  if (filters.to) {
    query = query.lte("created_at", new Date(filters.to).toISOString());
  }
  if (filters.month) {
    const date = new Date(`${filters.month}-01T00:00:00.000Z`);
    const range = getMonthWindow(date);
    query = query.gte("created_at", range.start).lte("created_at", range.end);
  }

  const [{ data: calls }, { data: companies }, { data: bots }] = await Promise.all([
    query,
    supabase.from("companies").select("id, name").order("name"),
    supabase.from("bots").select("id, name").order("name")
  ]);

  return {
    companies: companies ?? [],
    bots: bots ?? [],
    calls:
      calls?.map((call) => ({
        ...call,
        company_name: call.companies?.name ?? "Sin empresa",
        bot_name: call.bots?.name ?? "Sin bot"
      })) ?? []
  };
}

export async function getBillingData({
  month,
  status
}: {
  month?: string;
  status?: string;
}) {
  const supabase = await createClient();
  const date = month ? new Date(`${month}-01T00:00:00.000Z`) : new Date();
  const { month: selectedMonth, year } = getMonthWindow(date);
  const { data } = await supabase
    .from("invoices")
    .select("*, companies(name)")
    .eq("month", selectedMonth)
    .eq("year", year)
    .order("created_at", { ascending: false });

  const invoices =
    data
      ?.map((invoice) => ({
        ...invoice,
        company_name: invoice.companies?.name ?? "Sin empresa"
      }))
      .filter((invoice) => (status ? invoice.status === status : true)) ?? [];

  return {
    selectedMonth,
    selectedYear: year,
    invoices
  };
}

export async function getPortalDashboardData(companyId: string, appUserId?: string) {
  const supabase = await createClient();
  const range = getMonthWindow();
  const visibleBotIds = await getVisibleBotIds(supabase, appUserId, companyId);

  let botsQuery = supabase
    .from("bots")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  let callsQuery = supabase
    .from("calls")
    .select("*")
    .eq("company_id", companyId)
    .gte("created_at", range.start)
    .lte("created_at", range.end)
    .order("created_at", { ascending: false });

  if (visibleBotIds) {
    botsQuery = botsQuery.in("id", visibleBotIds);
    callsQuery = callsQuery.in("bot_id", visibleBotIds);
  }

  const [{ data: company }, { data: bots }, { data: calls }, { data: invoices }, { data: usage }] = await Promise.all([
    supabase.from("companies").select("*").eq("id", companyId).single(),
    botsQuery,
    callsQuery,
    supabase
      .from("invoices")
      .select("*")
      .eq("company_id", companyId)
      .eq("month", range.month)
      .eq("year", range.year)
      .maybeSingle(),
    supabase
      .from("monthly_usage")
      .select("*")
      .eq("company_id", companyId)
      .eq("month", range.month)
      .eq("year", range.year)
      .maybeSingle()
  ]);

  const currentCalls = calls ?? [];
  const totalMinutes = currentCalls.reduce((sum, call) => sum + Number(call.billed_minutes ?? 0), 0);
  const fallbackCharges = company
    ? calculateMonthlyCharges({
        company,
        totalMinutes,
        month: range.month,
        year: range.year
      })
    : null;

  const estimatedTotal = Number(invoices?.total ?? usage?.total_amount ?? fallbackCharges?.totalAmount ?? 0);

  return {
    company,
    bots: bots ?? [],
    latestCalls: currentCalls.slice(0, 10),
    stats: {
      activeBots: (bots ?? []).filter((bot) => bot.status === "active").length,
      callsThisMonth: currentCalls.length,
      minutesThisMonth: totalMinutes,
      estimatedTotal,
      paymentStatus: invoices?.status ?? usage?.invoice_status ?? "pending"
    },
    currentInvoice: invoices,
    currentUsage: usage
  };
}

export async function getPortalCallsData(companyId: string, month?: string, appUserId?: string) {
  const supabase = await createClient();
  const date = month ? new Date(`${month}-01T00:00:00.000Z`) : new Date();
  const range = getMonthWindow(date);
  const visibleBotIds = await getVisibleBotIds(supabase, appUserId, companyId);

  let callsQuery = supabase
    .from("calls")
    .select("*, bots(name)")
    .eq("company_id", companyId)
    .gte("created_at", range.start)
    .lte("created_at", range.end)
    .order("created_at", { ascending: false });

  let botsQuery = supabase.from("bots").select("id, name").eq("company_id", companyId).order("name");

  if (visibleBotIds) {
    callsQuery = callsQuery.in("bot_id", visibleBotIds);
    botsQuery = botsQuery.in("id", visibleBotIds);
  }

  const [{ data: calls }, { data: bots }] = await Promise.all([callsQuery, botsQuery]);

  const callRows =
    calls?.map((call) => ({
      ...call,
      bot_name: call.bots?.name ?? "Sin bot"
    })) ?? [];

  return {
    bots: bots ?? [],
    monthValue: `${range.year}-${String(range.month).padStart(2, "0")}`,
    stats: {
      totalCalls: callRows.length,
      totalMinutes: callRows.reduce((sum, call) => sum + Number(call.billed_minutes ?? 0), 0),
      totalCost: callRows.reduce((sum, call) => sum + Number(call.cost ?? 0), 0)
    },
    calls: callRows
  };
}

export async function getPortalBillingData(companyId: string) {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("company_id", companyId)
    .order("year", { ascending: false })
    .order("month", { ascending: false });

  const invoiceRows = invoices ?? [];

  return {
    currentInvoice: invoiceRows[0] ?? null,
    invoices: invoiceRows,
    stats: {
      totalInvoiced: invoiceRows.reduce((sum, invoice) => sum + Number(invoice.total ?? 0), 0),
      paidCount: invoiceRows.filter((invoice) => invoice.status === "paid").length,
      pendingCount: invoiceRows.filter((invoice) => invoice.status !== "paid").length
    }
  };
}
