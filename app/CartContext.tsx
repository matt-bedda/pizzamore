"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Pizza } from "./data";

type CartContextType = {
  items: Pizza[];
  total: number;
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => setItems((prev) => [...prev, pizza]);

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
