import { NextResponse, type NextRequest } from "next/server";
import { writeClient } from "@/lib/sanity";
import { isRateLimited } from "@/lib/rateLimit";
import { validateBlessing } from "@/lib/validate";
import { sendBlessingNotification } from "@/lib/mailer";

const URL_RE = /https?:\/\/|www\./i;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't
  if (body.website) {
    return Response.json({ ok: true }); // silent accept; don't reveal to bots
  }

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  // Validation
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !message) {
    return Response.json(
      { error: "Name and message are required." },
      { status: 400 },
    );
  }
  if (name.length > 100) {
    return Response.json({ error: "Name is too long." }, { status: 400 });
  }
  if (message.length < 10) {
    return Response.json(
      { error: "Message is too short. Share something heartfelt!" },
      { status: 400 },
    );
  }
  if (message.length > 1000) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }
  if (URL_RE.test(name) || URL_RE.test(message)) {
    return Response.json({ error: "Links are not allowed." }, { status: 400 });
  }
  // blessing validation
  const isValidated = validateBlessing(message);

  if (!isValidated.valid) {
    return NextResponse.json({ error: isValidated.reason }, { status: 400 });
  }

  try {
    await writeClient.create({
      _type: "blessing",
      name,
      message,
      approved: false,
    });

    sendBlessingNotification({ name, message }).catch((err) =>
      console.error("Failed to send blessing notification:", err),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error creating blessing:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
