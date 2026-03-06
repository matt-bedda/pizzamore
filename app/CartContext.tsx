"use client";

import { createContext, useContext, useState } from "react";
import type { Pizza } from "./data";

type CartContextType = {
  items: Pizza[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Pizza[]>([]);

  const addToCart = (pizza: Pizza) => setItems((prev) => [...prev, pizza]);

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        items,
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
