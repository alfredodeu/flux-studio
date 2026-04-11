"use client";

import { useState } from "react";
import PromptEditor from "@/components/studio/PromptEditor";
import GenerationSettings, {
  DEFAULT_SETTINGS,
  Settings,
} from "@/components/studio/GenerationSettings";
import ImageUpload from "@/components/studio/ImageUpload";
import StylePresets from "@/components/studio/StylePresets";
import GenerationPreview from "@/components/preview/GenerationPreview";
import { useGeneration } from "@/hooks/useGeneration";

export default function StudioPage() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(
    "blurry, low quality, watermark, text, nsfw"
  );
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [img2imgBase64, setImg2imgBase64] = useState<string | null>(null);
  const { state, generate } = useGeneration();

  const isGenerating = state.status === "queued" || state.status === "running";

  function handleGenerate() {
    if (!prompt.trim() || isGenerating) return;
    generate({ prompt, negativePrompt, settings, img2imgBase64 });
  }

  return (
    <div className="flex h-[calc(100vh-53px)]">
      {/* Linke Spalte */}
      <aside className="w-96 flex-shrink-0 border-r border-gray-800 overflow-y-auto p-5 space-y-5">
        <PromptEditor
          value={prompt}
          onChange={setPrompt}
          negativeValue={negativePrompt}
          onNegativeChange={setNegativePrompt}
        />

        <StylePresets prompt={prompt} onApply={setPrompt} />

        <ImageUpload
          onPromptGenerated={setPrompt}
          onImg2ImgImage={setImg2imgBase64}
          img2imgBase64={img2imgBase64}
        />

        {/* Denoise-Slider nur bei img2img */}
        {img2imgBase64 && (
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Variation (Denoise){" "}
              <span className="text-violet-400">{settings.denoise ?? 0.75}</span>
              {" "}<span className="text-gray-500">— 0.3 = wenig Änderung · 1.0 = komplett neu</span>
            </label>
            <input
              type="range" min={0.1} max={1.0} step={0.05}
              value={settings.denoise ?? 0.75}
              onChange={(e) => setSettings({ ...settings, denoise: Number(e.target.value) })}
              className="w-full accent-violet-500"
            />
          </div>
        )}

        <GenerationSettings value={settings} onChange={setSettings} />

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating
            ? "Generiere..."
            : img2imgBase64
            ? "img2img generieren"
            : "Bild generieren"}
        </button>
      </aside>

      {/* Rechte Spalte: Vorschau */}
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <GenerationPreview state={state} />
          {state.status === "done" && (
            <p className="text-center text-xs text-gray-500 mt-3">
              Bild automatisch in der Galerie gespeichert ✓
            </p>
          )}
          {state.status === "error" && (
            <p className="text-center text-xs text-gray-500 mt-3">
              Stelle sicher, dass ComfyUI auf localhost:8188 läuft.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
