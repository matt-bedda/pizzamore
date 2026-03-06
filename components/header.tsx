"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/CartContext";

export default function Header() {
  const { items } = useCart();

  return (
    <header className="flex w-full flex-row items-center justify-between px-4 py-2 flex-shrink-0">
      <Link href="/" className="text-2xl font-bold">🍕 Pizzamore</Link>
      <Link
        href="/cart"
        className="relative flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ShoppingCart size={20} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </Link>
    </header>
  );
}
