import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ollama/client";
import { FLUX_PROMPT_OPTIMIZER_SYSTEM } from "@/lib/ollama/prompts";
import { freeComfyUIMemory } from "@/lib/comfyui/memory";

const MODEL = process.env.OLLAMA_TEXT_MODEL ?? process.env.OLLAMA_VISION_MODEL ?? "gemma4:26b";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Kein Prompt angegeben" }, { status: 400 });
    }

    // ComfyUI-Modell aus Speicher entladen damit Ollama genug RAM hat
    await freeComfyUIMemory();

    const enhanced = await generateText(MODEL, prompt, FLUX_PROMPT_OPTIMIZER_SYSTEM);
    return NextResponse.json({ enhanced: enhanced.trim() });
  } catch (err) {
    console.error("Optimize-prompt error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Ollama nicht erreichbar" },
      { status: 500 }
    );
  }
}
