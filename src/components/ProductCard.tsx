import type { Product } from "@/types";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  return (
    <article className="rounded-lg border border-border p-4">
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground">NT$ {(product.price / 100).toFixed(0)}</p>
    </article>
  );
}


