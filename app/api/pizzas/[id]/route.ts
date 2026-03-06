import { NextRequest, NextResponse } from "next/server";
import { pizzas } from "../../../data";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const pizza = pizzas.find((p) => p.id === parseInt(id));

  if (!pizza) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(pizza);
}
