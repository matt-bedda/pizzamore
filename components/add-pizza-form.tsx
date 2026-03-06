"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddPizzaDialog({ onAdded }: { onAdded?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/pizzas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        price: Math.round(parseFloat(formData.get("price") as string) * 100),
        toppings: (formData.get("toppings") as string)
          .split(",")
          .map((t) => t.trim()),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setOpen(false);
      onAdded?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="cursor-pointer">
          <PlusCircle className="size-4 mr-1" />
          Add Pizza
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Pizza</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input name="name" placeholder="Pizza name" required />
          <Input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            required
          />
          <Input
            name="toppings"
            placeholder="Toppings (comma separated)"
          />
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Adding..." : "Add Pizza"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
