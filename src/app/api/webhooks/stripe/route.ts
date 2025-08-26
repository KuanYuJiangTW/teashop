import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {
const sig = req.headers.get("stripe-signature");
const secret = process.env.STRIPE_WEBHOOK_SECRET!;
const buf = Buffer.from(await req.arrayBuffer());


let event;
try {
event = stripe.webhooks.constructEvent(buf, sig!, secret);
} catch (err: any) {
console.error("Webhook signature verification failed.", err.message);
return new NextResponse("Bad signature", { status: 400 });
}


if (event.type === "checkout.session.completed") {
const session = event.data.object as any;
// TODO: 在這裡寫入訂單到 DB、寄信、出貨通知
console.log("✅ Payment success:", session.id);
}


return NextResponse.json({ received: true });
}