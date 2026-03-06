export type Pizza = {
  id: number;
  name: string;
  price: number;
  toppings: string[];
};

export const pizzas: Pizza[] = [
  {
    id: 1,
    name: "Margherita",
    price: 899,
    toppings: ["Marinara", "Mozzarella", "Basil"],
  },
  {
    id: 2,
    name: "Pepperoni",
    price: 999,
    toppings: ["Marinara", "Mozzarella", "Pepperoni"],
  },
  {
    id: 3,
    name: "BBQ Chicken",
    price: 1099,
    toppings: ["Marinara", "Mozzarella", "BBQ Chicken"],
  },
  {
    id: 4,
    name: "Hawaiian",
    price: 1199,
    toppings: ["Marinara", "Mozzarella", "Pineapple", "Ham"],
  },
  {
    id: 5,
    name: "Vegetarian",
    price: 1299,
    toppings: ["Marinara", "Mozzarella", "Mushrooms", "Onions", "Bell Peppers"],
  },
  {
    id: 6,
    name: "Meat Lover",
    price: 1399,
    toppings: ["Marinara", "Mozzarella", "Pepperoni", "Sausage", "Bacon"],
  },
  {
    id: 7,
    name: "Four Cheese",
    price: 1499,
    toppings: ["Marinara", "Mozzarella", "Parmesan", "Ricotta", "Romano"],
  },
];
