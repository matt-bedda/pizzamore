"use client";

import { useCart } from "@/app/CartContext";
import { Pizza } from "@/app/data";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  const { addToCart } = useCart();

  return (
    <Card
      key={pizza.id}
      className="flex flex-col transition-shadow hover:shadow-md"
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{pizza.name}</CardTitle>
          <Badge variant="secondary" className="text-sm font-semibold shrink-0">
            ${(pizza.price / 100).toFixed(2)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Separator className="mb-3" />
        <p className="text-sm text-muted-foreground">
          {pizza.toppings.join(" · ")}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          variant="default"
          size="sm"
          onClick={() => addToCart(pizza)}
          className="w-full cursor-pointer"
        >
          <Plus className="size-4 mr-1" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
