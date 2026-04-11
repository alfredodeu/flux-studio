"use client";

import { useEffect, useState } from "react";

export interface Settings {
  model: string;
  steps: number;
  cfg: number;
  width: number;
  height: number;
  sampler: string;
  scheduler: string;
  seed: number;
  denoise?: number;
}

const DEFAULT_SETTINGS: Settings = {
  model: "DreamShaperXL_Turbo_v2_1.safetensors",
  steps: 8,
  cfg: 2,
  width: 1024,
  height: 1024,
  sampler: "dpm_2",
  scheduler: "karras",
  seed: -1,
};

/** Optimale Einstellungen je nach Modell-Typ */
function getPresetForModel(model: string): Partial<Settings> {
  const m = model.toLowerCase();
  if (m.includes("flux")) {
    return { steps: 20, cfg: 3.5, sampler: "euler", scheduler: "beta" };
  } else if (m.includes("turbo")) {
    return { steps: 8, cfg: 2, sampler: "dpm_2", scheduler: "karras" };
  } else if (m.includes("lightning") || m.includes("lcm")) {
    return { steps: 6, cfg: 1.5, sampler: "euler_ancestral", scheduler: "sgm_uniform" };
  } else {
    return { steps: 22, cfg: 6.5, sampler: "dpmpp_2m", scheduler: "karras" };
  }
}

function isFlux(model: string) {
  return model.toLowerCase().includes("flux");
}

const FALLBACK_SAMPLERS = ["euler", "euler_ancestral", "dpm_2", "dpm_2_ancestral", "dpmpp_2m", "dpmpp_sde"];
const FALLBACK_SCHEDULERS = ["beta", "karras", "normal", "exponential", "sgm_uniform", "simple", "ddim_uniform"];
const SIZES = [512, 768, 1024, 1280];

interface Props {
  value: Settings;
  onChange: (s: Settings) => void;
}

export { DEFAULT_SETTINGS };

export default function GenerationSettings({ value, onChange }: Props) {
  const [models, setModels] = useState<string[]>([]);
  const [samplers, setSamplers] = useState<string[]>(FALLBACK_SAMPLERS);
  const [schedulers, setSchedulers] = useState<string[]>(FALLBACK_SCHEDULERS);
  const [autoApplied, setAutoApplied] = useState(false);

  useEffect(() => {
    fetch("/api/models")
      .then((r) => r.json())
      .then((d) => {
        if (d.models?.length)    setModels(d.models);
        if (d.samplers?.length)  setSamplers(d.samplers);
        if (d.schedulers?.length) setSchedulers(d.schedulers);
      })
      .catch(() => {});
  }, []);

  function handleModelChange(model: string) {
    const preset = getPresetForModel(model);
    onChange({ ...value, model, ...preset });
    setAutoApplied(true);
    setTimeout(() => setAutoApplied(false), 3000);
  }

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    onChange({ ...value, [key]: val });
  }

  const flux = isFlux(value.model);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Einstellungen</h3>

      {/* Modell */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">Modell</label>
        <select
          value={value.model}
          onChange={(e) => handleModelChange(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        >
          {models.length > 0 ? (
            models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))
          ) : (
            <option value={value.model}>{value.model}</option>
          )}
        </select>

        {/* Hinweis-Badge nach Auto-Anpassung */}
        {autoApplied && (
          <p className="text-xs text-violet-400 mt-1 animate-pulse">
            ✨ Einstellungen automatisch für {flux ? "Flux.1-dev" : "dieses Modell"} optimiert
          </p>
        )}

        {/* Flux-Info-Badge */}
        {flux && (
          <div className="mt-2 text-xs bg-violet-900/30 border border-violet-700 rounded-lg px-3 py-2 text-violet-300">
            <span className="font-semibold">Flux.1-dev</span> — Dualer CLIP + FluxGuidance Workflow wird verwendet
          </div>
        )}
      </div>

      {/* Größe */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Breite</label>
          <select
            value={value.width}
            onChange={(e) => set("width", Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            {SIZES.map((s) => <option key={s} value={s}>{s}px</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Höhe</label>
          <select
            value={value.height}
            onChange={(e) => set("height", Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            {SIZES.map((s) => <option key={s} value={s}>{s}px</option>)}
          </select>
        </div>
      </div>

      {/* Steps & CFG */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Steps <span className="text-violet-400">{value.steps}</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={value.steps}
            onChange={(e) => set("steps", Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">
            {flux ? "Guidance" : "CFG"} <span className="text-violet-400">{value.cfg}</span>
          </label>
          <input
            type="range"
            min={flux ? 1 : 1}
            max={flux ? 10 : 15}
            step={0.5}
            value={value.cfg}
            onChange={(e) => set("cfg", Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>
      </div>

      {/* Sampler & Scheduler */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-400 block mb-1">Sampler</label>
          <select
            value={value.sampler}
            onChange={(e) => set("sampler", e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            {samplers.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 block mb-1">Scheduler</label>
          <select
            value={value.scheduler}
            onChange={(e) => set("scheduler", e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
          >
            {schedulers.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Seed */}
      <div>
        <label className="text-xs text-gray-400 block mb-1">
          Seed <span className="text-gray-500">(-1 = zufällig)</span>
        </label>
        <input
          type="number"
          value={value.seed}
          onChange={(e) => set("seed", Number(e.target.value))}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        />
      </div>
    </div>
  );
}
