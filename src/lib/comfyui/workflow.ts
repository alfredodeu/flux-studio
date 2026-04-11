export interface WorkflowParams {
  positivePrompt: string;
  negativePrompt: string;
  checkpointName: string;
  width: number;
  height: number;
  steps: number;
  cfg: number;
  sampler: string;
  scheduler: string;
  seed: number;
}

export interface Img2ImgParams extends WorkflowParams {
  inputImageFilename: string; // Dateiname nach ComfyUI-Upload
  denoise: number;            // 0.0 – 1.0
}

/** txt2img: Leeres Latent-Bild generieren */
export function buildWorkflow(params: WorkflowParams): Record<string, unknown> {
  return {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: params.checkpointName },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: { clip: ["1", 1], text: params.positivePrompt },
    },
    "3": {
      class_type: "CLIPTextEncode",
      inputs: { clip: ["1", 1], text: params.negativePrompt },
    },
    "4": {
      class_type: "EmptyLatentImage",
      inputs: { width: params.width, height: params.height, batch_size: 1 },
    },
    "5": {
      class_type: "KSampler",
      inputs: {
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["4", 0],
        seed: params.seed,
        steps: params.steps,
        cfg: params.cfg,
        sampler_name: params.sampler,
        scheduler: params.scheduler,
        denoise: 1.0,
      },
    },
    "6": {
      class_type: "VAEDecode",
      inputs: { samples: ["5", 0], vae: ["1", 2] },
    },
    "7": {
      class_type: "SaveImage",
      inputs: { filename_prefix: "flux-studio", images: ["6", 0] },
    },
  };
}

/** img2img: Vorhandenes Bild als Ausgangspunkt nutzen */
export function buildImg2ImgWorkflow(params: Img2ImgParams): Record<string, unknown> {
  return {
    "1": {
      class_type: "CheckpointLoaderSimple",
      inputs: { ckpt_name: params.checkpointName },
    },
    "2": {
      class_type: "CLIPTextEncode",
      inputs: { clip: ["1", 1], text: params.positivePrompt },
    },
    "3": {
      class_type: "CLIPTextEncode",
      inputs: { clip: ["1", 1], text: params.negativePrompt },
    },
    // Eingabebild laden
    "4": {
      class_type: "LoadImage",
      inputs: { image: params.inputImageFilename, upload: "image" },
    },
    // Bild in Latent-Space enkodieren
    "5": {
      class_type: "VAEEncode",
      inputs: { pixels: ["4", 0], vae: ["1", 2] },
    },
    // KSampler mit denoise < 1.0 für Variation
    "6": {
      class_type: "KSampler",
      inputs: {
        model: ["1", 0],
        positive: ["2", 0],
        negative: ["3", 0],
        latent_image: ["5", 0],
        seed: params.seed,
        steps: params.steps,
        cfg: params.cfg,
        sampler_name: params.sampler,
        scheduler: params.scheduler,
        denoise: params.denoise,
      },
    },
    "7": {
      class_type: "VAEDecode",
      inputs: { samples: ["6", 0], vae: ["1", 2] },
    },
    "8": {
      class_type: "SaveImage",
      inputs: { filename_prefix: "flux-studio-i2i", images: ["7", 0] },
    },
  };
}
