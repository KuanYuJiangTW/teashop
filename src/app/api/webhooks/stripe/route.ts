import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import type { Stripe } from "stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  const buf = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig!, secret);
  } catch (err) {
    const error = err as Error;
    console.error("Webhook signature verification failed.", error.message);
    return new NextResponse("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // TODO: 在這裡寫入訂單到 DB、寄信、出貨通知
    console.log("✅ Payment success:", session.id);
  }

  return NextResponse.json({ received: true });
}