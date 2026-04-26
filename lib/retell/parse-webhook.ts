import { z } from "zod";

const RetellWebhookSchema = z.object({
  event: z.string().optional(),
  call: z.record(z.any()).optional(),
  call_id: z.string().optional(),
  callId: z.string().optional(),
  retell_call_id: z.string().optional(),
  agent_id: z.string().optional(),
  retell_agent_id: z.string().optional(),
  duration_ms: z.number().optional(),
  duration_seconds: z.number().optional(),
  start_timestamp: z.union([z.string(), z.number()]).optional(),
  end_timestamp: z.union([z.string(), z.number()]).optional(),
  from_number: z.string().optional(),
  summary: z.string().optional(),
  transcript: z.string().optional(),
  status: z.string().optional()
});

type ParsedRetellCall = {
  retellCallId: string;
  retellAgentId: string;
  callerNumber: string | null;
  startedAt: string | null;
  endedAt: string | null;
  durationSeconds: number;
  summary: string | null;
  transcript: string | null;
  status: string | null;
  rawPayload: Record<string, unknown>;
};

function parseDateLike(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return null;
  }

  const date =
    typeof value === "number"
      ? new Date(value > 9999999999 ? value : value * 1000)
      : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function parseRetellWebhook(payload: unknown): ParsedRetellCall {
  const parsed = RetellWebhookSchema.parse(payload);
  const call = parsed.call ?? {};

  const retellCallId =
    String(
      parsed.retell_call_id ??
        parsed.call_id ??
        parsed.callId ??
        call.retell_call_id ??
        call.call_id ??
        call.callId ??
        ""
    ).trim() || "";
  const retellAgentId =
    String(
      parsed.retell_agent_id ??
        parsed.agent_id ??
        call.retell_agent_id ??
        call.agent_id ??
        call.agentId ??
        ""
    ).trim() || "";

  if (!retellCallId) {
    throw new Error("Missing retell_call_id in webhook payload");
  }

  if (!retellAgentId) {
    throw new Error("Missing retell_agent_id or agent_id in webhook payload");
  }

  const startedAt = parseDateLike(
    (call.start_timestamp as string | number | undefined) ?? parsed.start_timestamp
  );
  const endedAt = parseDateLike(
    (call.end_timestamp as string | number | undefined) ?? parsed.end_timestamp
  );

  const durationSeconds = normalizeDurationSeconds({
    durationMs:
      Number(call.duration_ms ?? parsed.duration_ms) ||
      Number(call.durationMilliseconds ?? 0),
    durationSeconds:
      Number(call.duration_seconds ?? parsed.duration_seconds) ||
      Number(call.duration ?? 0),
    startedAt,
    endedAt
  });

  return {
    retellCallId,
    retellAgentId,
    callerNumber:
      (call.from_number as string | undefined) ??
      (call.caller_number as string | undefined) ??
      parsed.from_number ??
      null,
    startedAt,
    endedAt,
    durationSeconds,
    summary: (call.summary as string | undefined) ?? parsed.summary ?? null,
    transcript: (call.transcript as string | undefined) ?? parsed.transcript ?? null,
    status: (call.call_status as string | undefined) ?? parsed.status ?? parsed.event ?? null,
    rawPayload: payload as Record<string, unknown>
  };
}

function normalizeDurationSeconds({
  durationMs,
  durationSeconds,
  startedAt,
  endedAt
}: {
  durationMs: number;
  durationSeconds: number;
  startedAt: string | null;
  endedAt: string | null;
}) {
  if (Number.isFinite(durationSeconds) && durationSeconds > 0) {
    return Math.max(0, Math.round(durationSeconds));
  }

  if (Number.isFinite(durationMs) && durationMs > 0) {
    return Math.max(0, Math.round(durationMs / 1000));
  }

  if (startedAt && endedAt) {
    const seconds = (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 1000;

    return Number.isFinite(seconds) && seconds > 0 ? Math.round(seconds) : 0;
  }

  return 0;
}
