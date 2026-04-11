"use client";

import { GalleryItem } from "@/lib/gallery/store";
import { useEffect } from "react";

interface Props {
  item: GalleryItem;
  onClose: () => void;
  onUsePrompt: (p: string) => void;
}

export default function ImageDetailModal({ item, onClose, onUsePrompt }: Props) {
  // ESC schließt Modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const s = item.settings;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bild */}
        <div className="md:flex-1 bg-black flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/gallery/image/${item.imageFile}`}
            alt={item.prompt}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        {/* Infos */}
        <div className="w-full md:w-80 p-5 flex flex-col gap-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-lg">✕</button>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Prompt</p>
            <p className="text-sm text-gray-200 leading-relaxed">{item.prompt}</p>
          </div>

          {item.negativePrompt && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Negativer Prompt</p>
              <p className="text-xs text-gray-400">{item.negativePrompt}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              ["Modell", s.model?.split("_")[0]],
              ["Seed", String(s.seed)],
              ["Steps", String(s.steps)],
              ["CFG", String(s.cfg)],
              ["Größe", `${s.width}×${s.height}`],
              ["Sampler", s.sampler],
              ...(s.denoise ? [["Denoise", String(s.denoise)]] : []),
              ["Modus", item.mode ?? "txt2img"],
            ].map(([k, v]) => (
              <div key={k} className="bg-gray-800 rounded-lg px-2 py-1.5">
                <p className="text-gray-500">{k}</p>
                <p className="text-gray-200 truncate">{v}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            {new Date(item.createdAt).toLocaleString("de")}
          </p>

          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => { onUsePrompt(item.prompt); onClose(); }}
              className="flex-1 text-xs py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
            >
              Prompt verwenden
            </button>
            <a
              href={`/api/gallery/image/${item.imageFile}`}
              download
              className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs transition-colors"
            >
              ⬇
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
