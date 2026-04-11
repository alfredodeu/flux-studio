const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";

export async function generateText(
  model: string,
  prompt: string,
  systemPrompt: string
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, system: systemPrompt, stream: false }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Ollama Error: ${res.status}`);
    const data = await res.json();
    return data.response as string;
  } finally {
    clearTimeout(timeout);
  }
}

export async function analyzeImage(
  model: string,
  imageBase64: string,
  prompt: string
): Promise<string> {
  // Ollama erwartet Base64 OHNE data:-Prefix
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120_000);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        images: [cleanBase64],
        stream: false,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Ollama Vision Error: ${res.status}`);
    const data = await res.json();
    return data.response as string;
  } finally {
    clearTimeout(timeout);
  }
}
