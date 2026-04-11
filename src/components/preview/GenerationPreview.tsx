"use client";

import ProgressBar from "@/components/ui/ProgressBar";
import Spinner from "@/components/ui/Spinner";

export type GenerationState =
  | { status: "idle" }
  | { status: "queued" }
  | { status: "running"; step: number; totalSteps: number; nodeLabel?: string }
  | { status: "done"; imageId: string }
  | { status: "error"; message: string };

interface Props {
  state: GenerationState;
}

export default function GenerationPreview({ state }: Props) {
  if (state.status === "idle") {
    return (
      <div className="aspect-square w-full bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Noch kein Bild generiert</p>
      </div>
    );
  }

  if (state.status === "queued") {
    return (
      <div className="aspect-square w-full bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-3">
        <Spinner size={8} />
        <p className="text-gray-400 text-sm">In der Warteschlange...</p>
      </div>
    );
  }

  if (state.status === "running") {
    return (
      <div className="aspect-square w-full bg-gray-800/50 rounded-xl border border-gray-700 flex flex-col items-center justify-center gap-4 p-6">
        <Spinner size={10} />
        <div className="w-full space-y-2">
          <ProgressBar
            value={state.step}
            max={state.totalSteps}
            label={state.nodeLabel ?? "Generiere..."}
          />
        </div>
        <p className="text-gray-500 text-xs">
          Schritt {state.step} / {state.totalSteps}
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="aspect-square w-full bg-red-900/20 rounded-xl border border-red-700 flex items-center justify-center p-4">
        <p className="text-red-400 text-sm text-center">{state.message}</p>
      </div>
    );
  }

  // done
  return (
    <div className="relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/api/gallery/image/${state.imageId}.png`}
        alt="Generiertes Bild"
        className="w-full rounded-xl border border-gray-700 object-contain"
      />
      <a
        href={`/api/gallery/image/${state.imageId}.png`}
        download={`flux-studio-${state.imageId}.png`}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-violet-600"
      >
        ⬇ Download
      </a>
    </div>
  );
}
