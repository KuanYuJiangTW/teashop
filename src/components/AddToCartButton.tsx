"use client";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function AddToCartButton({ product }: { product: typeof products[number] }) {
  const { add } = useCart();
  
  return (
    <button 
      onClick={() => add(product)} 
      className="rounded-xl bg-black px-4 py-2 text-white"
    >
      加入購物車
    </button>
  );
}

