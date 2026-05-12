import { writeClient } from "@/lib/sanity";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, message } = body;

  if (!name?.trim() || !message?.trim()) {
    return Response.json({ error: "Name and message are required" }, { status: 400 });
  }

  await writeClient.create({
    _type: "blessing",
    name: name.trim(),
    message: message.trim(),
    approved: false,
  });

  return Response.json({ ok: true });
}
