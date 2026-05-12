import { writeClient } from "@/lib/sanity";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, phone, guests, message } = body;

  if (!fullName?.trim() || !phone?.trim()) {
    return Response.json({ error: "Full name and phone are required" }, { status: 400 });
  }

  await writeClient.create({
    _type: "rsvp",
    fullName: fullName.trim(),
    phone: phone.trim(),
    guests: guests ?? "1 Guest",
    message: message?.trim() ?? "",
  });

  return Response.json({ ok: true });
}
