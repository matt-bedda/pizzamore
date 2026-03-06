import { gateway } from "ai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { items } = await request.json();

  const pizzaList = items
    .flatMap((item: { name: string; toppings: string[]; quantity: number }) =>
      Array.from({ length: item.quantity }, () => `${item.name} (${item.toppings.join(", ")})`)
    );

  const totalPizzas = items.reduce(
    (sum: number, item: { quantity: number }) => sum + item.quantity,
    0
  );

  const numberedList = pizzaList
    .map((name: string, i: number) => `${i + 1}. ${name}`)
    .join("\n");

  const prompt = `Generate an image: A beautiful overhead photograph of a rustic Italian dinner table with exactly ${totalPizzas} whole pizzas. Each pizza is numbered below — include exactly this many, no more, no less:
${numberedList}

The pizzas are freshly baked with golden crusts, melted cheese, and vibrant toppings. Warm candlelight, a checkered tablecloth, glasses of red wine, and fresh basil leaves scattered around. Professional food photography, appetizing and inviting. Every pizza must be fully visible and not cut off at the edges.`;

  try {
    const result = await generateText({
      model: gateway("google/gemini-3.1-flash-image-preview"),
      prompt,
      providerOptions: {
        google: { responseModalities: ["IMAGE", "TEXT"] },
      },
    });

    const image = result.files?.[0];
    if (!image) {
      return NextResponse.json(
        { error: "No image was generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      image: `data:${image.mediaType};base64,${image.base64}`,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
