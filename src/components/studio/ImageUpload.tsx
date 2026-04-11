"use client";

import { useRef, useState } from "react";
import Spinner from "@/components/ui/Spinner";

interface Props {
  onPromptGenerated: (prompt: string) => void;
  onImg2ImgImage: (base64: string | null) => void;
  img2imgBase64: string | null;
}

export default function ImageUpload({ onPromptGenerated, onImg2ImgImage, img2imgBase64 }: Props) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"prompt" | "img2img">("prompt");
  const inputRef = useRef<HTMLInputElement>(null);

  async function processFile(file: File) {
    if (!file.type.startsWith("image/")) { setError("Nur Bilddateien erlaubt"); return; }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setError("");

      if (mode === "img2img") {
        onImg2ImgImage(base64);
        return;
      }

      // Prompt-Analyse-Modus
      setLoading(true);
      try {
        const res = await fetch("/api/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        onPromptGenerated(data.prompt);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Analyse fehlgeschlagen");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  const preview = mode === "img2img" ? img2imgBase64 : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-300">Bild hochladen</label>
        {/* Modus-Toggle */}
        <div className="flex text-xs rounded-lg overflow-hidden border border-gray-600">
          <button
            onClick={() => setMode("prompt")}
            className={`px-2.5 py-1 transition-colors ${mode === "prompt" ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            → Prompt
          </button>
          <button
            onClick={() => setMode("img2img")}
            className={`px-2.5 py-1 transition-colors ${mode === "img2img" ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
          >
            img2img
          </button>
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragging ? "border-violet-400 bg-violet-900/20" : "border-gray-600 hover:border-gray-500"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
        />
        {preview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="img2img Vorlage" className="max-h-32 mx-auto rounded object-contain" />
            <button
              onClick={(e) => { e.stopPropagation(); onImg2ImgImage(null); }}
              className="absolute top-0 right-0 bg-red-800/80 text-white text-xs px-1.5 py-0.5 rounded"
            >✕</button>
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            {mode === "img2img"
              ? "Vorlage ablegen — wird als img2img Basis genutzt"
              : "Bild analysieren lassen → Prompt wird befüllt"}
          </p>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center gap-2 text-sm text-violet-300">
            <Spinner size={4} /> Analysiere Bild...
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
