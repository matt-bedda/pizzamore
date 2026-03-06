"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/app/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } =
    useCart();

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
          <CardHeader>
            <CardTitle>Cart ({itemCount} items)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 p-0">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.pizza.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-medium">{item.pizza.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${(item.pizza.price / 100).toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() =>
                        updateQuantity(item.pizza.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 cursor-pointer"
                      onClick={() =>
                        updateQuantity(item.pizza.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive cursor-pointer"
                      onClick={() => removeFromCart(item.pizza.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-border pt-6">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-lg">
                ${(total / 100).toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex gap-2 w-full">
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button className="flex-grow cursor-pointer" size="lg">
                Checkout
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
