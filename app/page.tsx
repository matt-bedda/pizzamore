"use client";

import { useState, useEffect } from "react";
import { Pizza } from "./data";
import PizzaCard from "@/components/pizza-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    const params = new URLSearchParams({ search, sort, order });

    fetch(`/api/pizzas?${params}`)
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, [search, sort, order]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
        <p className="text-muted-foreground">
          Here you can find all the pizzas we offer.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Search pizzas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))}
        >
          {order === "asc" ? "↑" : "↓"} {sort}
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setSort((s) => (s === "name" ? "price" : "name"))}
        >
          Sort by {sort === "name" ? "price" : "name"}
        </Button>
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
