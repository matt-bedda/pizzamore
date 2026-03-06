import PizzaCard from "@/components/pizza-card";
import { Pizza } from "./data";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/pizzas");
  const pizzas: Pizza[] = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
        <p className="text-muted-foreground">
          Here you can find all the pizzas we offer.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
