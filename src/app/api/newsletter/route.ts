import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  }

  // Persist if a database is configured; otherwise succeed gracefully (demo mode).
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.newsletterSubscriber.upsert({
        where: { email: parsed.data.email },
        update: {},
        create: { email: parsed.data.email },
      });
    } catch {
      // Ignore persistence errors in demo mode.
    }
  }

  return NextResponse.json({ ok: true, email: parsed.data.email });
}
