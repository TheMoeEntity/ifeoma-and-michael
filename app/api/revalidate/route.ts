import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  const authHeader = req.headers.get("authorization");
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (body._type !== "blessing") {
    return Response.json({ message: "Ignored" }, { status: 200 });
  }

  revalidateTag("blessings", { expire: 0 });

  return Response.json({ revalidated: true, now: Date.now() });
}
