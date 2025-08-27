import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { products } from "@/data/products";

type Line = { id: string; qty: number };

function getBaseUrl() {
  // 在 Vercel 上可用 VERCEL_URL；本機回退 localhost
  const explicit = process.env.NEXT_PUBLIC_BASE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: Line[] };

  const line_items = items.map(({ id, qty }) => {
    const p = products.find((x) => x.id === id);
    if (!p) throw new Error("Product not found: " + id);

    return {
      quantity: qty,
      price_data: {
        currency: "twd",
        product_data: { name: p.name },
        unit_amount: p.price, // 確保是「以元的最小單位（分/角）」的整數
      },
    };
  });

  const stripe = getStripe(); // ✅ 這時才初始化

  const base = getBaseUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: new URL("/success", base).toString(),
    cancel_url: new URL("/cart", base).toString(),
  });

  return NextResponse.json({ url: session.url });
}