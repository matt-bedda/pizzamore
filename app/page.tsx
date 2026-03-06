"use client";

import { useState, useEffect, useCallback } from "react";
import { Pizza } from "./data";
import PizzaCard from "@/components/pizza-card";
import { AddPizzaDialog } from "@/components/add-pizza-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
] as const;

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sort, order] = sortKey.split("-");

  const fetchPizzas = useCallback(() => {
    const params = new URLSearchParams({
      search,
      sort,
      order,
      page: page.toString(),
      limit: "6",
    });

    fetch(`/api/pizzas?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data.data);
        setTotalPages(data.totalPages);
      });
  }, [search, sort, order, page]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
          <p className="text-sm text-muted-foreground">
            Here you can find all the pizzas we offer.
          </p>
        </div>
        <AddPizzaDialog onAdded={fetchPizzas} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Search pizzas..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-grow"
        />
        <Select value={sortKey} onValueChange={setSortKey}>
          <SelectTrigger className="w-full sm:w-48 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
