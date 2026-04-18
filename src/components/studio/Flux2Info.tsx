"use client";

import { useState } from "react";

interface Tip {
  icon: string;
  title: string;
  description: string;
}

const FLUX2_TIPS: Tip[] = [
  {
    icon: "💬",
    title: "Natürliche Prompts",
    description: "FLUX.2 versteht 1-3 natürliche Sätze besser als Keyword-Spam. Schreibe fließend!",
  },
  {
    icon: "⚙️",
    title: "Sweet Spot: CFG 3–4",
    description: "CFG 3–4 ist optimal für FLUX.2. Höher = Übersteuerung, tiefer = weniger Prompttreue.",
  },
  {
    icon: "📊",
    title: "Steps: 28–50",
    description: "Für beste Qualität: 28–50 Steps. 30–40 ist der Sweet Spot bei guten GPUs.",
  },
  {
    icon: "🎯",
    title: "Sampler: euler oder ipndm_v",
    description: "Euler ist schnell und stabil. ipndm_v mit discrete/flux2-scheduler für höchste Qualität.",
  },
  {
    icon: "🚫",
    title: "Kurze Negativ-Prompts",
    description: "Nur 5–10 gezielt negative Begriffe. Lange Listen helfen nicht bei FLUX.2!",
  },
  {
    icon: "🎨",
    title: "Konkrete Details",
    description: "Beschreibe konkret: Material, Lichtsituation, Stimmung. Statt '4k' → 'feine Hautporen'.",
  },
];

export default function Flux2Info() {
  const [visibleTips, setVisibleTips] = useState<Set<number>>(new Set([0]));

  function toggleTip(index: number) {
    const newSet = new Set(visibleTips);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setVisibleTips(newSet);
  }

  return (
    <div className="bg-gradient-to-br from-violet-900/20 to-purple-900/10 border border-violet-700/30 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-violet-300 flex items-center gap-2">
          ✨ FLUX.2 Quick Tips
        </h3>
      </div>

      {/* Tips List */}
      <div className="space-y-2">
        {FLUX2_TIPS.map((tip, idx) => (
          <button
            key={idx}
            onClick={() => toggleTip(idx)}
            className={`w-full text-left p-2 rounded-lg border transition-all ${
              visibleTips.has(idx)
                ? "bg-violet-700/30 border-violet-600 text-white"
                : "bg-gray-800/40 border-gray-700/40 text-gray-400 hover:border-violet-600/50"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">{tip.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold">{tip.title}</p>
                {visibleTips.has(idx) && (
                  <p className="text-xs mt-1 text-gray-200">{tip.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-violet-700/20">
        <p className="text-xs text-gray-400">
          📖 Vollständige Dokumentation: siehe <code className="bg-gray-900 px-1 rounded text-violet-300">FLUX2-GUIDELINES.md</code>
        </p>
      </div>
    </div>
  );
}
