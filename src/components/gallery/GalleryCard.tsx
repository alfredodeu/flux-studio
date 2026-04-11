"use client";

import { GalleryItem } from "@/lib/gallery/store";

interface Props {
  item: GalleryItem;
  onDelete: (id: string) => void;
  onUsePrompt: (prompt: string) => void;
  onFavorite: (id: string, value: boolean) => void;
  onOpenDetail: (item: GalleryItem) => void;
}

export default function GalleryCard({ item, onDelete, onUsePrompt, onFavorite, onOpenDetail }: Props) {
  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-violet-500 transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/api/gallery/image/${item.imageFile}`}
        alt={item.prompt.slice(0, 60)}
        className="w-full aspect-square object-cover cursor-pointer"
        loading="lazy"
        onClick={() => onOpenDetail(item)}
      />

      {/* Favorit-Badge (immer sichtbar wenn aktiv) */}
      {item.favorite && (
        <div className="absolute top-2 left-2 text-yellow-400 text-sm">★</div>
      )}

      {/* Modus-Badge */}
      {item.mode === "img2img" && (
        <div className="absolute top-2 right-2 bg-black/60 text-violet-300 text-xs px-1.5 py-0.5 rounded">i2i</div>
      )}

      {/* Hover-Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/75 transition-colors flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
        <p className="text-xs text-gray-200 line-clamp-2 mb-2">{item.prompt}</p>
        <div className="flex gap-1.5">
          <button
            onClick={() => onFavorite(item.id, !item.favorite)}
            className={`px-2 py-1 rounded text-xs transition-colors ${item.favorite ? "bg-yellow-500/30 text-yellow-300" : "bg-gray-700 text-gray-300 hover:text-yellow-300"}`}
            title="Favorit"
          >
            {item.favorite ? "★" : "☆"}
          </button>
          <button
            onClick={() => onOpenDetail(item)}
            className="flex-1 text-xs py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onUsePrompt(item.prompt)}
            className="flex-1 text-xs py-1 rounded bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            Prompt
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-2 py-1 rounded bg-red-900/50 hover:bg-red-800 text-red-300 text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
