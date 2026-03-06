import { gateway } from "ai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { items } = await request.json();

  const pizzaDescriptions = items
    .map(
      (item: { name: string; toppings: string[]; quantity: number }) =>
        `${item.quantity}x ${item.name} pizza (${item.toppings.join(", ")})`
    )
    .join(", ");

  const prompt = `Generate an image: A beautiful overhead photograph of a rustic Italian dinner table with ${pizzaDescriptions}. The pizzas are freshly baked with golden crusts, melted cheese, and vibrant toppings. Warm candlelight, a checkered tablecloth, glasses of red wine, and fresh basil leaves scattered around. Professional food photography, appetizing and inviting.`;

  try {
    const result = await generateText({
      model: gateway("google/gemini-2.5-flash-image"),
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
