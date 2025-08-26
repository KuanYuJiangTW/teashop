"use client";
import { useCart } from "@/context/CartContext";


export default function CartPage() {
const { items, remove, clear, total } = useCart();


const checkout = async () => {
const res = await fetch("/api/checkout", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ items: items.map(({ id, qty }) => ({ id, qty })) }),
});
const data = await res.json();
if (data.url) window.location.href = data.url;
};


return (
<main className="py-12">
<h1 className="mb-6 text-2xl font-bold">購物車</h1>
{items.length === 0 ? <p>目前沒有商品。</p> : (
<div className="space-y-4">
{items.map(it => (
<div key={it.id} className="flex items-center justify-between rounded-xl border p-3">
<div>
<div className="font-medium">{it.name}</div>
<div className="text-sm opacity-70">x{it.qty}</div>
</div>
<div className="flex items-center gap-4">
<span>NT$ {((it.price*it.qty)/100).toLocaleString()}</span>
<button onClick={() => remove(it.id)} className="rounded-lg border px-3 py-1 text-sm">移除</button>
</div>
</div>
))}
<div className="flex items-center justify-between">
<span className="text-xl font-semibold">總計：NT$ {(total/100).toLocaleString()}</span>
<div className="flex gap-3">
<button onClick={clear} className="rounded-lg border px-4 py-2">清空</button>
<button onClick={checkout} className="rounded-lg bg-black px-4 py-2 text-white">前往結帳</button>
</div>
</div>
</div>
)}
</main>
);
}