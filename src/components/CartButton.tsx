"use client";

type Props = {
  onClick?: () => void;
};

export default function CartButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-border px-3 py-2 text-sm"
      aria-label="Open cart"
    >
      Cart
    </button>
  );
}






