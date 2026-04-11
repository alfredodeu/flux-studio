import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/ollama/client";
import { freeComfyUIMemory } from "@/lib/comfyui/memory";

const MODEL = process.env.OLLAMA_VISION_MODEL ?? "gemma4:26b";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "Kein Bild angegeben" }, { status: 400 });
    }

    // ComfyUI-Modell entladen damit Ollama genug RAM hat
    await freeComfyUIMemory();

    const prompt = await analyzeImage(
      MODEL,
      imageBase64,
      "Analyze this image and create a detailed image generation prompt for it."
    );
    return NextResponse.json({ prompt: prompt.trim() });
  } catch (err) {
    console.error("Analyze-image error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Bildanalyse fehlgeschlagen" },
      { status: 500 }
    );
  }
}
