export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      app_users: {
        Row: {
          company_id: string | null;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          role: "admin" | "client";
          updated_at: string;
          user_id: string;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
          role: "admin" | "client";
          updated_at?: string;
          user_id: string;
        };
        Update: {
          company_id?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          role?: "admin" | "client";
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "app_users_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      company_user_bots: {
        Row: {
          app_user_id: string;
          bot_id: string;
          created_at: string;
          id: string;
        };
        Insert: {
          app_user_id: string;
          bot_id: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          app_user_id?: string;
          bot_id?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "company_user_bots_app_user_id_fkey";
            columns: ["app_user_id"];
            isOneToOne: false;
            referencedRelation: "app_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "company_user_bots_bot_id_fkey";
            columns: ["bot_id"];
            isOneToOne: false;
            referencedRelation: "bots";
            referencedColumns: ["id"];
          }
        ];
      };
      companies: {
        Row: {
          contact_name: string | null;
          created_at: string;
          email: string | null;
          id: string;
          installation_charged: boolean;
          installation_fee: number;
          monthly_fee: number;
          name: string;
          per_minute_fee: number;
          phone: string | null;
          status: "active" | "paused" | "cancelled";
          updated_at: string;
        };
        Insert: {
          contact_name?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          installation_charged?: boolean;
          installation_fee?: number;
          monthly_fee?: number;
          name: string;
          per_minute_fee?: number;
          phone?: string | null;
          status?: "active" | "paused" | "cancelled";
          updated_at?: string;
        };
        Update: {
          contact_name?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          installation_charged?: boolean;
          installation_fee?: number;
          monthly_fee?: number;
          name?: string;
          per_minute_fee?: number;
          phone?: string | null;
          status?: "active" | "paused" | "cancelled";
          updated_at?: string;
        };
        Relationships: [];
      };
      bots: {
        Row: {
          company_id: string;
          created_at: string;
          id: string;
          name: string;
          phone_number: string | null;
          retell_agent_id: string;
          status: "active" | "inactive";
          updated_at: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          id?: string;
          name: string;
          phone_number?: string | null;
          retell_agent_id: string;
          status?: "active" | "inactive";
          updated_at?: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          phone_number?: string | null;
          retell_agent_id?: string;
          status?: "active" | "inactive";
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bots_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      calls: {
        Row: {
          billed_minutes: number;
          bot_id: string;
          caller_number: string | null;
          company_id: string;
          cost: number;
          created_at: string;
          duration_seconds: number;
          ended_at: string | null;
          id: string;
          raw_payload: Json | null;
          retell_call_id: string;
          started_at: string | null;
          status: string | null;
          summary: string | null;
          transcript: string | null;
        };
        Insert: {
          billed_minutes?: number;
          bot_id: string;
          caller_number?: string | null;
          company_id: string;
          cost?: number;
          created_at?: string;
          duration_seconds?: number;
          ended_at?: string | null;
          id?: string;
          raw_payload?: Json | null;
          retell_call_id: string;
          started_at?: string | null;
          status?: string | null;
          summary?: string | null;
          transcript?: string | null;
        };
        Update: {
          billed_minutes?: number;
          bot_id?: string;
          caller_number?: string | null;
          company_id?: string;
          cost?: number;
          created_at?: string;
          duration_seconds?: number;
          ended_at?: string | null;
          id?: string;
          raw_payload?: Json | null;
          retell_call_id?: string;
          started_at?: string | null;
          status?: string | null;
          summary?: string | null;
          transcript?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "calls_bot_id_fkey";
            columns: ["bot_id"];
            isOneToOne: false;
            referencedRelation: "bots";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calls_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      contact_leads: {
        Row: {
          company_name: string | null;
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          phone: string | null;
          source: string;
          status: "new" | "contacted" | "qualified" | "archived";
          updated_at: string;
        };
        Insert: {
          company_name?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          phone?: string | null;
          source?: string;
          status?: "new" | "contacted" | "qualified" | "archived";
          updated_at?: string;
        };
        Update: {
          company_name?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          phone?: string | null;
          source?: string;
          status?: "new" | "contacted" | "qualified" | "archived";
          updated_at?: string;
        };
        Relationships: [];
      };
      monthly_usage: {
        Row: {
          company_id: string;
          created_at: string;
          fixed_cost: number;
          id: string;
          installation_fee: number;
          invoice_status: "pending" | "paid" | "overdue" | "cancelled";
          month: number;
          total_amount: number;
          total_calls: number;
          total_minutes: number;
          total_seconds: number;
          updated_at: string;
          variable_cost: number;
          year: number;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          fixed_cost?: number;
          id?: string;
          installation_fee?: number;
          invoice_status?: "pending" | "paid" | "overdue" | "cancelled";
          month: number;
          total_amount?: number;
          total_calls?: number;
          total_minutes?: number;
          total_seconds?: number;
          updated_at?: string;
          variable_cost?: number;
          year: number;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          fixed_cost?: number;
          id?: string;
          installation_fee?: number;
          invoice_status?: "pending" | "paid" | "overdue" | "cancelled";
          month?: number;
          total_amount?: number;
          total_calls?: number;
          total_minutes?: number;
          total_seconds?: number;
          updated_at?: string;
          variable_cost?: number;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: "monthly_usage_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      invoices: {
        Row: {
          company_id: string;
          created_at: string;
          fixed_fee: number;
          id: string;
          installation_fee: number;
          issued_at: string;
          month: number;
          paid_at: string | null;
          status: "pending" | "paid" | "overdue" | "cancelled";
          total: number;
          total_calls: number;
          total_minutes: number;
          updated_at: string;
          variable_fee: number;
          year: number;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          fixed_fee?: number;
          id?: string;
          installation_fee?: number;
          issued_at?: string;
          month: number;
          paid_at?: string | null;
          status?: "pending" | "paid" | "overdue" | "cancelled";
          total?: number;
          total_calls?: number;
          total_minutes?: number;
          updated_at?: string;
          variable_fee?: number;
          year: number;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          fixed_fee?: number;
          id?: string;
          installation_fee?: number;
          issued_at?: string;
          month?: number;
          paid_at?: string | null;
          status?: "pending" | "paid" | "overdue" | "cancelled";
          total?: number;
          total_calls?: number;
          total_minutes?: number;
          updated_at?: string;
          variable_fee?: number;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: "invoices_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      landing_packages: {
        Row: {
          active: boolean;
          badge: string | null;
          button_label: string;
          created_at: string;
          cta_href: string;
          description: string;
          features: Json;
          id: string;
          name: string;
          price: string;
          price_suffix: string | null;
          slug: string;
          sort_order: number;
          theme: "light" | "dark";
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          badge?: string | null;
          button_label: string;
          created_at?: string;
          cta_href: string;
          description: string;
          features?: Json;
          id?: string;
          name: string;
          price: string;
          price_suffix?: string | null;
          slug: string;
          sort_order?: number;
          theme?: "light" | "dark";
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          badge?: string | null;
          button_label?: string;
          created_at?: string;
          cta_href?: string;
          description?: string;
          features?: Json;
          id?: string;
          name?: string;
          price?: string;
          price_suffix?: string | null;
          slug?: string;
          sort_order?: number;
          theme?: "light" | "dark";
          updated_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          billing_rounding: "exact" | "ceil";
          created_at: string;
          id: string;
          installation_fee: number;
          monthly_fee: number;
          per_minute_fee: number;
          updated_at: string;
        };
        Insert: {
          billing_rounding?: "exact" | "ceil";
          created_at?: string;
          id?: string;
          installation_fee?: number;
          monthly_fee?: number;
          per_minute_fee?: number;
          updated_at?: string;
        };
        Update: {
          billing_rounding?: "exact" | "ceil";
          created_at?: string;
          id?: string;
          installation_fee?: number;
          monthly_fee?: number;
          per_minute_fee?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      can_access_company: {
        Args: {
          target_company_id: string;
        };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
