"use client";

import { useRouter } from "next/navigation";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  const router = useRouter();

  function handleUsePrompt(prompt: string) {
    // Prompt im localStorage speichern → Studio liest es beim Laden
    localStorage.setItem("flux-studio-prompt", prompt);
    router.push("/");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Galerie</h1>
      </div>
      <GalleryGrid onUsePrompt={handleUsePrompt} />
    </div>
  );
}
