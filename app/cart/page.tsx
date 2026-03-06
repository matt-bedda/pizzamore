"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, total, removeFromCart } = useCart();

  return (
    <div className="max-w-2xl mx-auto w-full space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="shrink-0 cursor-pointer">
          <Link href="/">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
      </div>
      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <ShoppingCart className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button asChild variant="outline" size="sm" className="cursor-pointer">
              <Link href="/">Browse the menu</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="sr-only">Cart items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            <ul className="divide-y divide-border">
              {items.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.toppings.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      ${(item.price / 100).toFixed(2)}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer"
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-lg">${(total / 100).toFixed(2)}</span>
            </div>
            <Separator />
            <Button className="w-full cursor-pointer" size="lg">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
