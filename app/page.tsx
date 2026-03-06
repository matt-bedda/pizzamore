import PizzaCard from "@/components/pizza-card";
import { Pizza } from "./data";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/pizzas");
  const pizzas: Pizza[] = await response.json();

  return (
    <>
      <h2 className="text-2xl font-bold">Menu</h2>
      <p className="text-sm text-gray-500">
        Here you can find all the pizzas we offer.
      </p>
      <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <PizzaCard pizzas={pizzas} />
      </div>
    </>
  );
}
