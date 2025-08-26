import "@/app/globals.css";
import { CartProvider } from "@/context/CartContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="zh-Hant">
<body className="min-h-dvh bg-white text-neutral-900">
<CartProvider>
<div className="mx-auto max-w-6xl px-4">{children}</div>
</CartProvider>
</body>
</html>
);
}