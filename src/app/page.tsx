import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";


export default function Home() {
return (
<main className="py-12">
<h1 className="mb-8 text-3xl font-bold">霧抉茶｜Tea Shop</h1>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{products.map(p => (
<article key={p.id} className="rounded-2xl border p-4">
<Image src={p.image} alt={p.name} width={640} height={480} className="h-48 w-full rounded-xl object-cover" />
<h2 className="mt-3 font-semibold">{p.name}</h2>
<p className="mt-1 text-sm opacity-80">{p.description}</p>
<div className="mt-3 flex items-center justify-between">
<span className="font-semibold">NT$ {(p.price/100).toLocaleString()}</span>
<Link href={`/product/${p.slug}`} className="rounded-xl border px-3 py-1 text-sm hover:bg-neutral-100">查看</Link>
</div>
</article>
))}
</div>
</main>
);
}