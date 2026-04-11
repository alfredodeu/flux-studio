import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { buildWorkflow, buildImg2ImgWorkflow } from "@/lib/comfyui/workflow";
import { buildFluxWorkflow, buildFluxImg2ImgWorkflow } from "@/lib/comfyui/workflow-flux";
import { queuePrompt, uploadImageToComfyUI } from "@/lib/comfyui/client";

function isFluxModel(model: string) {
  return model.toLowerCase().includes("flux");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      negativePrompt = "blurry, low quality, watermark, text",
      model = process.env.DEFAULT_CHECKPOINT ?? "DreamShaperXL_Turbo_v2_1.safetensors",
      steps = 8,
      cfg = 2,
      width = 1024,
      height = 1024,
      sampler = "dpm_2",
      scheduler = "karras",
      seed = Math.floor(Math.random() * 2 ** 32),
      // img2img
      img2imgBase64,
      denoise = 0.75,
    } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Kein Prompt angegeben" }, { status: 400 });
    }

    const clientId = uuidv4();
    const flux = isFluxModel(model);

    let workflow: Record<string, unknown>;

    if (img2imgBase64) {
      // Bild zuerst zu ComfyUI hochladen
      const uploadedFilename = await uploadImageToComfyUI(
        img2imgBase64,
        `input_${Date.now()}.png`
      );
      workflow = flux
        ? buildFluxImg2ImgWorkflow({
            positivePrompt: prompt,
            negativePrompt,
            unetName: model,
            clip1: "t5xxl_fp16.safetensors",
            clip2: "clip_l.safetensors",
            vaeName: "ae.safetensors",
            width, height, steps, cfg, sampler, scheduler, seed,
            inputImageFilename: uploadedFilename,
            denoise,
          })
        : buildImg2ImgWorkflow({
            positivePrompt: prompt,
            negativePrompt,
            checkpointName: model,
            width, height, steps, cfg, sampler, scheduler, seed,
            inputImageFilename: uploadedFilename,
            denoise,
          });
    } else {
      workflow = flux
        ? buildFluxWorkflow({
            positivePrompt: prompt,
            negativePrompt,
            unetName: model,
            clip1: "t5xxl_fp16.safetensors",
            clip2: "clip_l.safetensors",
            vaeName: "ae.safetensors",
            width, height, steps, cfg, sampler, scheduler, seed,
          })
        : buildWorkflow({
            positivePrompt: prompt,
            negativePrompt,
            checkpointName: model,
            width, height, steps, cfg, sampler, scheduler, seed,
          });
    }

    const { prompt_id } = await queuePrompt(workflow, clientId);
    return NextResponse.json({ promptId: prompt_id, clientId, seed });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler" },
      { status: 500 }
    );
  }
}
