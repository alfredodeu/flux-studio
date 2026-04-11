"use client";

interface Preset {
  label: string;
  emoji: string;
  suffix: string;
}

const PRESETS: Preset[] = [
  { label: "Fotorealistisch",  emoji: "📷", suffix: "photorealistic, 8k uhd, DSLR photo, sharp focus, high detail" },
  { label: "Ölgemälde",        emoji: "🎨", suffix: "oil painting, impressionist brushstrokes, canvas texture, fine art" },
  { label: "Anime",            emoji: "🌸", suffix: "anime style, manga illustration, vibrant colors, cel shading" },
  { label: "Fantasy",          emoji: "🐉", suffix: "fantasy art, epic scene, magical atmosphere, dramatic lighting, artstation" },
  { label: "Watercolor",       emoji: "💧", suffix: "watercolor painting, soft edges, pastel tones, delicate wash" },
  { label: "Cyberpunk",        emoji: "⚡", suffix: "cyberpunk, neon lights, futuristic city, rain reflections, blade runner style" },
  { label: "Studio Portrait",  emoji: "🪟", suffix: "studio portrait, professional lighting, shallow depth of field, bokeh background" },
  { label: "Schwarz-Weiß",     emoji: "⬜", suffix: "black and white photography, high contrast, monochrome, dramatic shadows" },
];

interface Props {
  prompt: string;
  onApply: (newPrompt: string) => void;
}

export default function StylePresets({ prompt, onApply }: Props) {
  function applyPreset(preset: Preset) {
    // Vorherige Stil-Suffixe entfernen und neuen anhängen
    const cleanPrompt = PRESETS.reduce((p, s) => p.replace(`, ${s.suffix}`, "").replace(s.suffix, "").trim(), prompt);
    onApply(cleanPrompt ? `${cleanPrompt}, ${preset.suffix}` : preset.suffix);
  }

  return (
    <div>
      <label className="text-sm font-medium text-gray-300 block mb-2">Stil-Presets</label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => {
          const active = prompt.includes(p.suffix);
          return (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                active
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-gray-800 border-gray-600 text-gray-300 hover:border-violet-500 hover:text-white"
              }`}
            >
              {p.emoji} {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
