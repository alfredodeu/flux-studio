import { NextRequest, NextResponse } from "next/server";
import { getHistory, fetchImageAsBuffer } from "@/lib/comfyui/client";
import { saveImage, appendToGallery } from "@/lib/gallery/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { promptId, prompt, negativePrompt, settings, mode } = body;

    if (!promptId) {
      return NextResponse.json({ error: "promptId fehlt" }, { status: 400 });
    }

    const history = await getHistory(promptId);
    const entry = history[promptId];

    if (!entry) {
      return NextResponse.json({ error: "Generierung nicht gefunden" }, { status: 404 });
    }

    // Erstes Ausgabe-Bild finden
    const outputs = entry.outputs ?? {};
    let imageInfo: { filename: string; subfolder: string; type: string } | null = null;

    for (const nodeOutput of Object.values(outputs) as Record<string, unknown>[]) {
      const imgs = nodeOutput.images as { filename: string; subfolder: string; type: string }[] | undefined;
      if (imgs && imgs.length > 0) {
        imageInfo = imgs[0];
        break;
      }
    }

    if (!imageInfo) {
      return NextResponse.json({ error: "Kein Bild in der Ausgabe gefunden" }, { status: 404 });
    }

    // Bild von ComfyUI herunterladen und lokal speichern
    const buffer = await fetchImageAsBuffer(
      imageInfo.filename,
      imageInfo.subfolder,
      imageInfo.type
    );

    const { v4: uuidv4 } = await import("uuid");
    const id = uuidv4();
    const imageFile = await saveImage(id, buffer);

    const galleryItem = {
      id,
      prompt: prompt ?? "",
      negativePrompt: negativePrompt ?? "",
      imageFile,
      mode: mode ?? "txt2img",
      settings: settings ?? {},
      createdAt: new Date().toISOString(),
    };

    await appendToGallery(galleryItem);

    return NextResponse.json({ id, imageFile, item: galleryItem });
  } catch (err) {
    console.error("Result error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
