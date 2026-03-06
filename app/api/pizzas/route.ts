import { NextRequest, NextResponse } from "next/server";
import { pizzas } from "../../data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  let results = [...pizzas];

  const search = searchParams.get("search")?.toLowerCase();
  if (search) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.toppings.some((t) => t.toLowerCase().includes(search))
    );
  }

  const sort = searchParams.get("sort") || "name";
  const order = searchParams.get("order") || "asc";
  results.sort((a, b) => {
    const val =
      sort === "price"
        ? a.price - b.price
        : a.name.localeCompare(b.name);
    return order === "desc" ? -val : val;
  });

  return NextResponse.json(results);
}
