import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // ← 這裡是 Promise
) {
  const { id } = await context.params;          // ← 這裡要 await

  // （可選）簡易 Bearer 驗證
  const auth = req.headers.get("authorization");
  const key = auth?.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!key || key !== process.env.ADMIN_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { status } = await req.json();
  const allowed = ["pending", "paid", "fulfilled", "shipped", "canceled"] as const;
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Bad status" }, { status: 400 });
  }

  const order = await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.json({ success: true, order });
}