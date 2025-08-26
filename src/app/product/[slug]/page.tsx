"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";


export default function ProductPage({ params }: { params: { slug: string } }) {
const p = products.find(x => x.slug === params.slug);
const { add } = useCart();
if (!p) return notFound();
return (
<main className="py-12">
<div className="grid gap-8 md:grid-cols-2">
<Image src={p.image} alt={p.name} width={900} height={700} className="rounded-2xl object-cover" />
<div>
<h1 className="text-3xl font-bold">{p.name}</h1>
<p className="mt-3 text-neutral-600">{p.description}</p>
<div className="mt-6 flex items-center gap-4">
<span className="text-2xl font-semibold">NT$ {(p.price/100).toLocaleString()}</span>
<button onClick={() => add(p)} className="rounded-xl bg-black px-4 py-2 text-white">加入購物車</button>
</div>
</div>
</div>
</main>
);
}