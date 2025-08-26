import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between">
      <Link href="/" className="font-semibold">TeaShop</Link>
      <div className="flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/admin/orders">Admin</Link>
      </div>
    </nav>
  );
}


