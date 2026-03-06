"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Pizza } from "./data";

export type CartItem = {
  pizza: Pizza;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: number) => void;
  updateQuantity: (pizzaId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (pizza: Pizza) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.pizza.id === pizza.id);
      if (existing) {
        return prev.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (pizzaId: number) => {
    setItems((prev) => prev.filter((item) => item.pizza.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(pizzaId);
    setItems((prev) =>
      prev.map((item) =>
        item.pizza.id === pizzaId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.pizza.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
