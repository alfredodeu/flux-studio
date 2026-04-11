const COMFYUI_URL = process.env.COMFYUI_URL ?? "http://127.0.0.1:8188";

export async function queuePrompt(
  workflow: Record<string, unknown>,
  clientId: string
): Promise<{ prompt_id: string; number: number }> {
  const res = await fetch(`${COMFYUI_URL}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: workflow, client_id: clientId }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ComfyUI Error: ${err}`);
  }
  return res.json();
}

export async function getHistory(promptId: string) {
  const res = await fetch(`${COMFYUI_URL}/history/${promptId}`);
  if (!res.ok) throw new Error("ComfyUI history fetch failed");
  return res.json();
}

export function getImageUrl(
  filename: string,
  subfolder = "",
  type = "output"
): string {
  const params = new URLSearchParams({ filename, subfolder, type });
  return `${COMFYUI_URL}/view?${params}`;
}

export async function fetchImageAsBuffer(
  filename: string,
  subfolder: string,
  type: string
): Promise<Buffer> {
  const url = getImageUrl(filename, subfolder, type);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Bild-Download von ComfyUI fehlgeschlagen");
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

export async function getCheckpointList(): Promise<string[]> {
  const res = await fetch(`${COMFYUI_URL}/object_info/CheckpointLoaderSimple`);
  if (!res.ok) return [];
  const data = await res.json();
  return (
    data?.CheckpointLoaderSimple?.input?.required?.ckpt_name?.[0] ?? []
  );
}

/** Bild zu ComfyUI hochladen (für img2img). Gibt den Dateinamen zurück. */
export async function uploadImageToComfyUI(
  base64: string,
  filename = "input.png"
): Promise<string> {
  // Base64 → Buffer → Blob
  const cleanB64 = base64.replace(/^data:image\/\w+;base64,/, "");
  const binary = Buffer.from(cleanB64, "base64");
  const blob = new Blob([binary], { type: "image/png" });

  const form = new FormData();
  form.append("image", blob, filename);
  form.append("overwrite", "true");

  const res = await fetch(`${COMFYUI_URL}/upload/image`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Bild-Upload zu ComfyUI fehlgeschlagen");
  const data = await res.json();
  return data.name as string;
}
