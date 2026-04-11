import { NextResponse } from "next/server";
import { getCheckpointList } from "@/lib/comfyui/client";

const COMFYUI_URL = process.env.COMFYUI_URL ?? "http://127.0.0.1:8188";

async function getUnetList(): Promise<string[]> {
  try {
    const res = await fetch(`${COMFYUI_URL}/object_info/UNETLoader`);
    if (!res.ok) return [];
    const data = await res.json();
    return data?.UNETLoader?.input?.required?.unet_name?.[0] ?? [];
  } catch {
    return [];
  }
}

async function getKSamplerOptions(): Promise<{ samplers: string[]; schedulers: string[] }> {
  try {
    const res = await fetch(`${COMFYUI_URL}/object_info/KSampler`);
    if (!res.ok) return { samplers: [], schedulers: [] };
    const data = await res.json();
    return {
      samplers:   data?.KSampler?.input?.required?.sampler_name?.[0] ?? [],
      schedulers: data?.KSampler?.input?.required?.scheduler?.[0] ?? [],
    };
  } catch {
    return { samplers: [], schedulers: [] };
  }
}

export async function GET() {
  try {
    const [checkpoints, unets, ksamplerOpts] = await Promise.all([
      getCheckpointList(),
      getUnetList(),
      getKSamplerOptions(),
    ]);

    return NextResponse.json({
      models:     [...checkpoints, ...unets],
      samplers:   ksamplerOpts.samplers,
      schedulers: ksamplerOpts.schedulers,
    });
  } catch {
    return NextResponse.json({ models: [], samplers: [], schedulers: [] });
  }
}
