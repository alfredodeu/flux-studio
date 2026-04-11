const COMFYUI_URL = process.env.COMFYUI_URL ?? "http://127.0.0.1:8188";

/**
 * Gibt ComfyUI-Modelle aus dem VRAM/RAM frei damit Ollama genug Speicher hat.
 * ComfyUI lädt das Modell beim nächsten Generate-Aufruf automatisch neu.
 */
export async function freeComfyUIMemory(): Promise<void> {
  try {
    await fetch(`${COMFYUI_URL}/free`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unload_models: true, free_memory: true }),
    });
    // Kurz warten bis Speicher freigegeben ist
    await new Promise((r) => setTimeout(r, 1500));
  } catch {
    // Kein Fehler werfen — wenn ComfyUI nicht erreichbar ist, trotzdem weitermachen
  }
}
