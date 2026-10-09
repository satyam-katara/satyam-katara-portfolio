import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";

/**
 * POST /api/contact — sends the contact-form message via Resend.
 * Requires RESEND_API_KEY and CONTACT_TO_EMAIL at runtime.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields and try again." },
      { status: 422 },
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot: silently accept but don't send.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message right now. Please email directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please email directly." },
      { status: 500 },
    );
  }
}
