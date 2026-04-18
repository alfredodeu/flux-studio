"use client";

import React, { useState } from "react";

interface Preset {
  label: string;
  emoji: string;
  suffix: string;
  category: "fotografie" | "illustration" | "animation" | "kunst" | "film";
}

const PRESETS: Preset[] = [
  // FOTOGRAFIE
  { label: "Fotorealistisch",    emoji: "📷", suffix: "photorealistic, 8k uhd, DSLR photo, sharp focus, high detail", category: "fotografie" },
  { label: "Studio Portrait",    emoji: "🪟", suffix: "studio portrait, professional lighting, shallow depth of field, bokeh background, sharp focus on eyes", category: "fotografie" },
  { label: "Landschaft",         emoji: "🏔️", suffix: "landscape photography, wide angle, golden hour lighting, cinematic depth of field, sharp focus, panoramic", category: "fotografie" },
  { label: "Schwarz-Weiß",       emoji: "⬜", suffix: "black and white photography, high contrast, monochrome, dramatic shadows, fine art", category: "fotografie" },
  { label: "Street Photography", emoji: "🏙️", suffix: "street photography, candid moment, natural light, documentary style, gritty urban aesthetic", category: "fotografie" },

  // ILLUSTRATION & DIGITAL ART
  { label: "Pixar",              emoji: "🎬", suffix: "Pixar animated style, 3D render, stylized Pixar-like character, smooth plastic material, expressive eyes, vibrant colors, studio lighting", category: "illustration" },
  { label: "Disney",             emoji: "👑", suffix: "Disney animation style, hand-drawn aesthetic, classic Disney character design, soft colors, magical atmosphere", category: "illustration" },
  { label: "Anime",              emoji: "🌸", suffix: "anime style, manga illustration, vibrant colors, cel shading, expressive eyes, detailed hair", category: "animation" },
  { label: "Studio Ghibli",      emoji: "🍃", suffix: "Studio Ghibli style, hand-drawn animation, watercolor aesthetic, dreamy atmosphere, whimsical characters, soft details", category: "animation" },
  { label: "Comic Art",          emoji: "💥", suffix: "comic book art style, bold outlines, vibrant colors, pop art, dynamic action pose, illustration", category: "illustration" },

  // KUNSTRICHTUNGEN
  { label: "Ölgemälde",          emoji: "🎨", suffix: "oil painting, impressionist brushstrokes, canvas texture, fine art, museum quality", category: "kunst" },
  { label: "Watercolor",         emoji: "💧", suffix: "watercolor painting, soft edges, pastel tones, delicate wash, artistic rendering", category: "kunst" },
  { label: "Digitale Kunst",     emoji: "🖼️", suffix: "digital art, ArtStation quality, concept art, detailed painting, professional illustration", category: "kunst" },
  { label: "Steampunk Art",      emoji: "⚙️", suffix: "steampunk art, Victorian industrial, brass gears, detailed mechanical elements, warm metallic tones", category: "kunst" },

  // FILM & CINEMATIC
  { label: "Cyberpunk",          emoji: "⚡", suffix: "cyberpunk, neon lights, futuristic city, rain reflections, blade runner style, neon glow", category: "film" },
  { label: "Fantasy",            emoji: "🐉", suffix: "fantasy art, epic scene, magical atmosphere, dramatic lighting, artstation, concept art", category: "film" },
  { label: "Film Noir",          emoji: "🎞️", suffix: "film noir style, high contrast black and white, dramatic shadows, 1940s aesthetic, mysterious mood", category: "film" },
  { label: "Horror",             emoji: "👻", suffix: "horror aesthetic, dark atmosphere, eerie mood, dramatic lighting, unsettling ambiance, cinematic", category: "film" },
  { label: "Sci-Fi",             emoji: "🚀", suffix: "science fiction aesthetic, futuristic technology, alien landscapes, cosmic atmosphere, advanced civilization", category: "film" },
];

interface Props {
  prompt: string;
  onApply: (newPrompt: string) => void;
}

type Category = "fotografie" | "illustration" | "animation" | "kunst" | "film";

const CATEGORY_LABELS: Record<Category, string> = {
  fotografie: "📷 Fotografie",
  illustration: "🎨 Illustration",
  animation: "🎬 Animation",
  kunst: "🖼️ Kunstrichtungen",
  film: "🎞️ Film & Cinematic",
};

export default function StylePresets({ prompt, onApply }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  function applyPreset(preset: Preset) {
    // Vorherige Stil-Suffixe entfernen und neuen anhängen
    const cleanPrompt = PRESETS.reduce((p, s) => p.replace(`, ${s.suffix}`, "").replace(s.suffix, "").trim(), prompt);
    onApply(cleanPrompt ? `${cleanPrompt}, ${preset.suffix}` : preset.suffix);
  }

  const filteredPresets = activeCategory === "all"
    ? PRESETS
    : PRESETS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-300 block">Stil-Presets</label>

      {/* Kategorien-Tabs */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs px-2 py-1 rounded-full border transition-colors ${
            activeCategory === "all"
              ? "bg-violet-600 border-violet-500 text-white"
              : "bg-gray-800 border-gray-600 text-gray-300 hover:border-violet-500"
          }`}
        >
          Alle
        </button>
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-2 py-1 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-violet-600 border-violet-500 text-white"
                : "bg-gray-800 border-gray-600 text-gray-300 hover:border-violet-500"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Stil-Buttons */}
      <div className="flex flex-wrap gap-2">
        {filteredPresets.map((p) => {
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
              title={p.suffix}
            >
              {p.emoji} {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
