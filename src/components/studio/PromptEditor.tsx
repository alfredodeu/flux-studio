"use client";

import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

interface PromptEditorProps {
  value: string;
  onChange: (v: string) => void;
  negativeValue: string;
  onNegativeChange: (v: string) => void;
}

export default function PromptEditor({
  value,
  onChange,
  negativeValue,
  onNegativeChange,
}: PromptEditorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function optimizePrompt() {
    if (!value.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/optimize-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onChange(data.enhanced);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-300">Prompt</label>
          <button
            onClick={optimizePrompt}
            disabled={loading || !value.trim()}
            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Spinner size={3} /> : <span>✨</span>}
            Mit KI verbessern
          </button>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="Beschreibe dein Bild... z.B. 'Eine alte Mühle am Fluss bei Sonnenuntergang'"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 resize-none"
        />
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-300 block mb-1">
          Negativer Prompt
        </label>
        <textarea
          value={negativeValue}
          onChange={(e) => onNegativeChange(e.target.value)}
          rows={2}
          placeholder="blurry, low quality, watermark..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 resize-none"
        />
      </div>
    </div>
  );
}
