"use client";

import { useState, useCallback, useRef } from "react";
import { useSSE } from "./useSSE";
import { GenerationState } from "@/components/preview/GenerationPreview";
import { Settings } from "@/components/studio/GenerationSettings";

export function useGeneration() {
  const [state, setState] = useState<GenerationState>({ status: "idle" });
  const [sseUrl, setSseUrl] = useState<string | null>(null);

  const pendingResult = useRef<{
    promptId: string;
    prompt: string;
    negativePrompt: string;
    settings: Settings & { seed: number };
    mode: "txt2img" | "img2img";
  } | null>(null);

  async function fetchResult() {
    const data = pendingResult.current;
    if (!data) return;
    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptId: data.promptId,
          prompt: data.prompt,
          negativePrompt: data.negativePrompt,
          settings: data.settings,
          mode: data.mode,
        }),
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setState({ status: "done", imageId: json.id });
    } catch (e) {
      setState({
        status: "error",
        message: e instanceof Error ? e.message : "Fehler beim Laden des Bildes",
      });
    }
  }

  useSSE(
    sseUrl,
    (msg) => {
      const m = msg as { type: string; data?: Record<string, unknown> };
      if (m.type === "progress") {
        const value = Number(m.data?.value ?? 0);
        const max = Number(m.data?.max ?? 1);
        setState({ status: "running", step: value, totalSteps: max });
      } else if (m.type === "executing") {
        if (m.data?.node === null) {
          setSseUrl(null);
          fetchResult();
        } else {
          setState((prev) =>
            prev.status === "running"
              ? { ...prev, nodeLabel: String(m.data?.node ?? "") }
              : { status: "running", step: 0, totalSteps: 1 }
          );
        }
      } else if (m.type === "execution_success") {
        setSseUrl(null);
        fetchResult();
      } else if (m.type === "execution_error") {
        setState({
          status: "error",
          message: String(m.data?.exception_message ?? "ComfyUI Fehler"),
        });
        setSseUrl(null);
      }
    },
    () => {
      setState((prev) => {
        if (prev.status === "running" || prev.status === "queued") {
          return { status: "error", message: "Verbindung unterbrochen" };
        }
        return prev;
      });
    }
  );

  const generate = useCallback(
    async (params: {
      prompt: string;
      negativePrompt: string;
      settings: Settings;
      img2imgBase64?: string | null;
    }) => {
      setState({ status: "queued" });
      setSseUrl(null);

      const mode: "txt2img" | "img2img" = params.img2imgBase64 ? "img2img" : "txt2img";

      try {
        const seed =
          params.settings.seed === -1
            ? Math.floor(Math.random() * 2 ** 32)
            : params.settings.seed;

        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: params.prompt,
            negativePrompt: params.negativePrompt,
            ...params.settings,
            seed,
            img2imgBase64: params.img2imgBase64 ?? undefined,
            denoise: params.settings.denoise ?? 0.75,
          }),
        });
        const json = await res.json();
        if (json.error) throw new Error(json.error);

        pendingResult.current = {
          promptId: json.promptId,
          prompt: params.prompt,
          negativePrompt: params.negativePrompt,
          settings: { ...params.settings, seed: json.seed ?? seed },
          mode,
        };

        setState({ status: "running", step: 0, totalSteps: params.settings.steps });
        setSseUrl(`/api/progress?promptId=${json.promptId}&clientId=${json.clientId}`);
      } catch (e) {
        setState({
          status: "error",
          message: e instanceof Error ? e.message : "Generierung fehlgeschlagen",
        });
      }
    },
    []
  );

  return { state, generate };
}
