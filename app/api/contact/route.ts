import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  whatsapp: z.string().trim().min(7).max(40),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
});

/**
 * POST /api/contact
 * Placeholder endpoint for the public contact form.
 *
 * Wire to a real destination via env vars when ready:
 *   - CONTACT_WEBHOOK_URL   (n8n / HubSpot / Slack / Make)
 *   - RESEND_API_KEY        (if you switch to transactional email)
 *
 * For now we validate, log to stdout, and reply 200 so the UI can
 * render its success state end-to-end.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "zentrae.com/#contacto",
          receivedAt: new Date().toISOString(),
          ...data,
        }),
      });
    } catch (err) {
      console.error("[contact] webhook failed:", err);
    }
  } else {
    console.info("[contact] received (no webhook configured):", data);
  }

  return NextResponse.json({ ok: true });
}
