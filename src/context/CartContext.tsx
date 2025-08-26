"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";


type Item = Product & { qty: number };


type CartCtx = {
items: Item[];
add: (p: Product, qty?: number) => void;
remove: (id: string) => void;
clear: () => void;
total: number; // cents
};


const Ctx = createContext<CartCtx | null>(null);


export function CartProvider({ children }: { children: React.ReactNode }) {
const [items, setItems] = useState<Item[]>([]);
const add = (p: Product, qty = 1) => {
setItems(prev => {
const i = prev.findIndex(x => x.id === p.id);
if (i >= 0) { const cp = [...prev]; cp[i] = { ...cp[i], qty: cp[i].qty + qty }; return cp; }
return [...prev, { ...p, qty }];
});
};
const remove = (id: string) => setItems(prev => prev.filter(x => x.id !== id));
const clear = () => setItems([]);
const total = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);
return <Ctx.Provider value={{ items, add, remove, clear, total }}>{children}</Ctx.Provider>;
}


export const useCart = () => {
const ctx = useContext(Ctx);
if (!ctx) throw new Error("useCart must be used within CartProvider");
return ctx;
};