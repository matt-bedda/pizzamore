"use client";

import { useCart } from "@/app/CartContext";
import { Pizza } from "@/app/data";
import { Fragment } from "react/jsx-runtime";

export default function PizzaCard({ pizzas }: { pizzas: Pizza[] }) {
  const { items, addToCart } = useCart();
  console.log({ items });

  return (
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="flex">
          <button
            className="pr-4 cursor-pointer"
            onClick={() => addToCart(pizza)}
          >
            +
          </button>
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <div className="font-bold text-xl">{pizza.name}</div>
              <div>${(pizza.price / 100).toFixed(2)}</div>
            </div>
            <div>
              {pizza.toppings.map((topping, index) => (
                <Fragment key={topping}>
                  <span>{topping}</span>
                  <span
                    className={
                      pizza.toppings.length - 1 === index ? "hidden" : ""
                    }
                  >
                    ,{" "}
                  </span>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
