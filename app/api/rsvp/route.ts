import type { NextRequest } from "next/server";
import { writeClient } from "@/lib/sanity";
import { isRateLimited } from "@/lib/rateLimit";
import { validateBlessing } from "@/lib/validate";
import { sendRsvpNotification } from "@/lib/mailer";

const URL_RE = /https?:\/\/|www\./i;
const VALID_GUESTS = ["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests"];

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot — bots fill this, humans don't
  if (body.website) {
    return Response.json({ ok: true });
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
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const guests =
    typeof body.guests === "string" && VALID_GUESTS.includes(body.guests)
      ? body.guests
      : "1 Guest";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!fullName || !phone) {
    return Response.json(
      { error: "Full name and phone number are required." },
      { status: 400 },
    );
  }
  if (fullName.length > 100) {
    return Response.json({ error: "Name is too long." }, { status: 400 });
  }
  if (phone.length > 30) {
    return Response.json({ error: "Phone number is too long." }, { status: 400 });
  }
  if (URL_RE.test(fullName) || URL_RE.test(phone) || URL_RE.test(message)) {
    return Response.json({ error: "Links are not allowed." }, { status: 400 });
  }
  if (message.length > 1000) {
    return Response.json({ error: "Message is too long." }, { status: 400 });
  }

  // Validate the optional message if provided
  if (message.length >= 10) {
    const result = validateBlessing(message);
    if (!result.valid) {
      return Response.json(
        { error: "Your message doesn't look right. Please share a genuine note for the couple!" },
        { status: 422 },
      );
    }
  }

  try {
    await writeClient.create({
      _type: "rsvp",
      fullName,
      phone,
      guests,
      message,
    });

    try {
      await sendRsvpNotification({ fullName, phone, guests, message: message || undefined });
    } catch (err) {
      console.error("Failed to send RSVP notification:", err);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
