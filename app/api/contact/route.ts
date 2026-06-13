import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact form is missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email directly for now." },
      { status: 503 },
    );
  }

  const safe = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New inquiry — Veiled Reverie</h2>
        <p><strong>Name:</strong> ${safe(name)}</p>
        <p><strong>Email:</strong> ${safe(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${safe(message)}</p>
      `,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend error:", res.status, detail);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
