"use client";

import { useCart } from "@/app/CartContext";

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((item, index) => (
              <li key={`${item.id}-${index}`} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.toppings.join(", ")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span>${(item.price / 100).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center border-t pt-4 mt-4 font-bold">
            <span>Total</span>
            <span>${(total / 100).toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}
