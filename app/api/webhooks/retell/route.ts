import { NextResponse } from "next/server";
import { calculateBilledMinutes, resolveBillingSettings } from "@/lib/billing/calculate";
import { syncCompanyMonth } from "@/lib/billing/sync";
import { parseRetellWebhook } from "@/lib/retell/parse-webhook";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const secret = request.headers.get("x-retell-secret") ?? request.headers.get("authorization");
    const retellSignature = request.headers.get("x-retell-signature");
    const expectedSecret = process.env.RETELL_WEBHOOK_SECRET;

    const normalizedSecret = secret?.replace(/^Bearer\s+/i, "").trim();
    const hasValidManualSecret = Boolean(
      expectedSecret && normalizedSecret && normalizedSecret === expectedSecret
    );
    const isRetellSignedRequest = Boolean(retellSignature);

    if (!hasValidManualSecret && !isRetellSignedRequest) {
      return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
    }

    const payload = await request.json();
    const parsed = parseRetellWebhook(payload);
    const supabase = createAdminClient();
    const [{ data: bot, error: botError }, { data: settings }] = await Promise.all([
      supabase
        .from("bots")
        .select("*, companies(*)")
        .eq("retell_agent_id", parsed.retellAgentId)
        .single(),
      supabase.from("settings").select("*").order("created_at", { ascending: true }).limit(1).maybeSingle()
    ]);

    if (botError || !bot) {
      return NextResponse.json(
        { error: botError?.message ?? "Bot not found for retell_agent_id" },
        { status: 404 }
      );
    }

    const company = Array.isArray(bot.companies) ? bot.companies[0] : bot.companies;
    if (!company) {
      return NextResponse.json({ error: "Company not found for bot" }, { status: 404 });
    }

    const billedMinutes = calculateBilledMinutes(
      parsed.durationSeconds,
      resolveBillingSettings(settings)
    );
    const cost = Number((billedMinutes * Number(company.per_minute_fee ?? 0)).toFixed(2));

    const insertResult = await supabase
      .from("calls")
      .insert({
        company_id: company.id,
        bot_id: bot.id,
        retell_call_id: parsed.retellCallId,
        caller_number: parsed.callerNumber,
        started_at: parsed.startedAt,
        ended_at: parsed.endedAt,
        duration_seconds: parsed.durationSeconds,
        billed_minutes: billedMinutes,
        cost,
        status: parsed.status,
        summary: parsed.summary,
        transcript: parsed.transcript,
        raw_payload: parsed.rawPayload
      })
      .select()
      .single();

    if (insertResult.error) {
      if (insertResult.error.code === "23505") {
        return NextResponse.json({ success: true, duplicate: true });
      }

      throw new Error(insertResult.error.message);
    }

    const callDate = parsed.startedAt ? new Date(parsed.startedAt) : new Date();
    await syncCompanyMonth({
      companyId: company.id,
      month: callDate.getUTCMonth() + 1,
      year: callDate.getUTCFullYear()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error" },
      { status: 400 }
    );
  }
}
