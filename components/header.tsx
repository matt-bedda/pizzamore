"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="flex w-full items-center justify-between px-3 py-2 flex-shrink-0 border-b border-border">
      <Button
        asChild
        variant="ghost"
        size="lg"
        className="text-2xl font-bold px-2 py-1 cursor-pointer"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src="/pizzamore-logo.png" alt="Pizzamore logo" width={28} height={28} />
          Pizzamore
        </Link>
      </Button>
      <Link href="/cart" className="relative inline-flex items-center justify-center p-2 cursor-pointer">
        <ShoppingCart className="size-5" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 size-4 text-[10px] rounded-full p-0 flex items-center justify-center"
          >
            {itemCount}
          </Badge>
        )}
      </Link>
    </header>
  );
}
