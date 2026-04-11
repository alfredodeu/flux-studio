"use client";

import { useEffect, useState } from "react";
import { GalleryItem } from "@/lib/gallery/store";
import GalleryCard from "./GalleryCard";
import ImageDetailModal from "./ImageDetailModal";

interface Props {
  onUsePrompt?: (prompt: string) => void;
}

type SortMode = "newest" | "oldest" | "favorites";

export default function GalleryGrid({ onUsePrompt }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [filterFav, setFilterFav] = useState(false);
  const [detail, setDetail] = useState<GalleryItem | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (detail?.id === id) setDetail(null);
  }

  async function handleFavorite(id: string, value: boolean) {
    await fetch("/api/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, favorite: value }),
    });
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, favorite: value } : i));
  }

  // Filtern + Sortieren
  let visible = items.filter((i) => {
    if (filterFav && !i.favorite) return false;
    if (search && !i.prompt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sort === "oldest") visible = [...visible].reverse();
  if (sort === "favorites") visible = [...visible].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

  if (loading) return <div className="flex items-center justify-center h-40 text-gray-500">Lade Galerie...</div>;

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <input
          type="search"
          placeholder="Prompt durchsuchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-48 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        >
          <option value="newest">Neueste zuerst</option>
          <option value="oldest">Älteste zuerst</option>
          <option value="favorites">Favoriten zuerst</option>
        </select>
        <button
          onClick={() => setFilterFav(!filterFav)}
          className={`px-3 py-2 rounded-lg text-sm border transition-colors ${filterFav ? "bg-yellow-500/20 border-yellow-500 text-yellow-300" : "bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-400"}`}
        >
          ★ Nur Favoriten
        </button>
        <span className="text-xs text-gray-500">{visible.length} Bilder</span>
      </div>

      {visible.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500">
          {search || filterFav ? "Keine Bilder gefunden." : "Noch keine Bilder generiert."}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visible.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
              onUsePrompt={onUsePrompt ?? (() => {})}
              onOpenDetail={setDetail}
            />
          ))}
        </div>
      )}

      {/* Detail-Modal */}
      {detail && (
        <ImageDetailModal
          item={detail}
          onClose={() => setDetail(null)}
          onUsePrompt={onUsePrompt ?? (() => {})}
        />
      )}
    </>
  );
}
