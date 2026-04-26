import { Database } from "@/types/database";

export type AppUser = Database["public"]["Tables"]["app_users"]["Row"];
export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type Bot = Database["public"]["Tables"]["bots"]["Row"];
export type Call = Database["public"]["Tables"]["calls"]["Row"];
export type ContactLead = Database["public"]["Tables"]["contact_leads"]["Row"];
export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type MonthlyUsage = Database["public"]["Tables"]["monthly_usage"]["Row"];
export type Settings = Database["public"]["Tables"]["settings"]["Row"];
export type LandingPackageRow = Database["public"]["Tables"]["landing_packages"]["Row"];

export type InvoiceStatus = Invoice["status"];
export type CompanyStatus = Company["status"];
export type BotStatus = Bot["status"];
export type AppRole = AppUser["role"];

export type BillingRounding = Settings["billing_rounding"];

export type ClientListItem = Company & {
  bot_count: number;
  month_minutes: number;
  month_amount: number;
};

export type BotListItem = Bot & {
  company_name: string;
  month_calls: number;
  month_minutes: number;
  month_cost: number;
};

export type CallListItem = Call & {
  company_name: string;
  bot_name: string;
};

export type InvoiceListItem = Invoice & {
  company_name: string;
};

export type CompanyAccessItem = AppUser & {
  company_name?: string;
};

export type ContactLeadStatus = ContactLead["status"];
