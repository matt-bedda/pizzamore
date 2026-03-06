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

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const start = (page - 1) * limit;
  const paged = results.slice(start, start + limit);

  return NextResponse.json({
    data: paged,
    total: results.length,
    page,
    totalPages: Math.ceil(results.length / limit),
  });
}
