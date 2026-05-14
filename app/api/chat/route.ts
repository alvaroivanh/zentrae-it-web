import { NextResponse } from "next/server";
import { z } from "zod";

const ChatLogSchema = z.object({
  transcript: z
    .array(
      z.object({
        role: z.enum(["bot", "user"]),
        text: z.string().max(2000),
        at: z.string().optional(),
      }),
    )
    .min(1)
    .max(100),
  lead: z.object({
    name: z.string().trim().min(2).max(120),
    contact: z.string().trim().min(5).max(200),
  }),
  startedAt: z.string().optional(),
});

/**
 * POST /api/chat
 * Receives the full chat transcript + the captured lead at the end of a
 * conversation. Currently a placeholder: validates, logs, and replies 200.
 *
 * When we wire the real agent (Claude API + Zentrae playbook), this same
 * endpoint will also serve streamed responses — the schema for *that*
 * incoming shape will be different (single user message + history).
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ChatLogSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const webhook = process.env.CHAT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "zentrae.com/chat-widget",
          receivedAt: new Date().toISOString(),
          ...parsed.data,
        }),
      });
    } catch (err) {
      console.error("[chat] webhook failed:", err);
    }
  } else {
    console.info("[chat] transcript received (no webhook configured):", {
      lead: parsed.data.lead,
      turns: parsed.data.transcript.length,
    });
  }

  return NextResponse.json({ ok: true });
}
