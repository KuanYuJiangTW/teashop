// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";       // 保險起見讓它跑在 Node 環境
export const dynamic = "force-dynamic"; // 避免被預先編譯/快取

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return new NextResponse("Missing signature or secret", { status: 400 });
  }

  const buf = Buffer.from(await req.arrayBuffer());

  const stripe = getStripe(); // ✅ 匯入後、實際需要時才初始化
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Webhook signature verification failed.", msg);
    return new NextResponse("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("✅ Payment success:", session.id);
    // TODO: 寫入訂單、寄信、出貨通知…
  }

  return NextResponse.json({ received: true });
}