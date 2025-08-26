import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/data/products";


type Line = { id: string; qty: number };


export async function POST(req: Request) {
const { items } = (await req.json()) as { items: Line[] };
const line_items = items.map(({ id, qty }) => {
const p = products.find(x => x.id === id);
if (!p) throw new Error("Product not found: " + id);
return {
quantity: qty,
price_data: {
currency: "twd",
product_data: { name: p.name },
unit_amount: p.price,
},
};
});


const session = await stripe.checkout.sessions.create({
mode: "payment",
line_items,
success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
});


return NextResponse.json({ url: session.url });
}