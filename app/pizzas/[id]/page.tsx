import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pizza } from "@/app/data";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PizzaDetail({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/pizzas/${id}`);

  if (!res.ok) {
    return <p className="text-destructive">Pizza not found</p>;
  }

  const pizza: Pizza = await res.json();

  return (
    <>
      <Button variant="link" asChild className="mb-4 p-0 cursor-pointer">
        <Link href="/">← Back to Menu</Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-2xl">{pizza.name}</CardTitle>
            <p className="text-2xl font-bold">
              ${(pizza.price / 100).toFixed(2)}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {pizza.toppings.map((topping) => (
              <Badge key={topping} variant="secondary">
                {topping}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
