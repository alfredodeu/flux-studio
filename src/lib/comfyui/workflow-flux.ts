/** Flux.1-dev und Flux.2-klein spezifische Workflows */

export interface FluxWorkflowParams {
  positivePrompt: string;
  negativePrompt: string;
  unetName: string;       // z.B. "flux1-dev.safetensors"
  clip1: string;          // "t5xxl_fp16.safetensors"
  clip2: string;          // "clip_l.safetensors"
  vaeName: string;        // "ae.safetensors"
  width: number;
  height: number;
  steps: number;
  cfg: number;
  sampler: string;
  scheduler: string;
  seed: number;
}

export interface FluxImg2ImgParams extends FluxWorkflowParams {
  inputImageFilename: string;
  denoise: number;
}

export interface Flux2WorkflowParams {
  positivePrompt: string;
  unetName: string;       // z.B. "flux-2-klein-9b.safetensors"
  clipName: string;       // "qwen_3_8b_fp8mixed.safetensors"
  vaeName: string;        // "ae.safetensors"
  width: number;
  height: number;
  steps: number;
  cfg: number;
  sampler: string;
  scheduler: string;
  seed: number;
}

export function buildFluxWorkflow(p: FluxWorkflowParams): Record<string, unknown> {
  return {
    "1": { class_type: "UNETLoader",       inputs: { unet_name: p.unetName, weight_dtype: "default" } },
    "2": { class_type: "DualCLIPLoader",   inputs: { clip_name1: p.clip1, clip_name2: p.clip2, type: "flux" } },
    "3": { class_type: "VAELoader",        inputs: { vae_name: p.vaeName } },
    "4": { class_type: "CLIPTextEncode",   inputs: { clip: ["2", 0], text: p.positivePrompt } },
    "5": { class_type: "FluxGuidance",     inputs: { conditioning: ["4", 0], guidance: p.cfg } },
    "6": { class_type: "EmptySD3LatentImage", inputs: { width: p.width, height: p.height, batch_size: 1 } },
    "7": {
      class_type: "KSampler",
      inputs: {
        model: ["1", 0],
        positive: ["5", 0],
        negative: ["5", 0], // Flux ignoriert Negative, gleiche Cond
        latent_image: ["6", 0],
        seed: p.seed,
        steps: p.steps,
        cfg: 1.0,
        sampler_name: p.sampler,
        scheduler: p.scheduler,
        denoise: 1.0,
      },
    },
    "8": { class_type: "VAEDecode",  inputs: { samples: ["7", 0], vae: ["3", 0] } },
    "9": { class_type: "SaveImage",  inputs: { filename_prefix: "flux-studio-flux", images: ["8", 0] } },
  };
}

export function buildFlux2Workflow(p: Flux2WorkflowParams): Record<string, unknown> {
  return {
    "1":  { class_type: "UNETLoader",            inputs: { unet_name: p.unetName, weight_dtype: "default" } },
    "2":  { class_type: "CLIPLoader",             inputs: { clip_name: p.clipName, type: "flux2" } },
    "3":  { class_type: "VAELoader",              inputs: { vae_name: p.vaeName } },
    "4":  { class_type: "CLIPTextEncode",         inputs: { clip: ["2", 0], text: p.positivePrompt } },
    "5":  { class_type: "EmptyFlux2LatentImage",  inputs: { width: p.width, height: p.height, batch_size: 1 } },
    "6":  { class_type: "RandomNoise",            inputs: { noise_seed: p.seed } },
    "7":  { class_type: "KSamplerSelect",         inputs: { sampler_name: p.sampler } },
    "8":  { class_type: "Flux2Scheduler",         inputs: { scheduler: p.scheduler, steps: p.steps, model: ["1", 0] } },
    "9":  { class_type: "CFGGuider",              inputs: { model: ["1", 0], positive: ["4", 0], negative: ["4", 0], cfg: 1.0 } },
    "10": { class_type: "SamplerCustomAdvanced",  inputs: { noise: ["6", 0], guider: ["9", 0], sampler: ["7", 0], sigmas: ["8", 0], latent_image: ["5", 0] } },
    "11": { class_type: "VAEDecode",              inputs: { samples: ["10", 0], vae: ["3", 0] } },
    "12": { class_type: "SaveImage",              inputs: { filename_prefix: "flux-studio-flux2", images: ["11", 0] } },
  };
}

export function buildFluxImg2ImgWorkflow(p: FluxImg2ImgParams): Record<string, unknown> {
  return {
    "1":  { class_type: "UNETLoader",       inputs: { unet_name: p.unetName, weight_dtype: "default" } },
    "2":  { class_type: "DualCLIPLoader",   inputs: { clip_name1: p.clip1, clip_name2: p.clip2, type: "flux" } },
    "3":  { class_type: "VAELoader",        inputs: { vae_name: p.vaeName } },
    "4":  { class_type: "CLIPTextEncode",   inputs: { clip: ["2", 0], text: p.positivePrompt } },
    "5":  { class_type: "FluxGuidance",     inputs: { conditioning: ["4", 0], guidance: p.cfg } },
    "6":  { class_type: "LoadImage",        inputs: { image: p.inputImageFilename, upload: "image" } },
    "7":  { class_type: "VAEEncode",        inputs: { pixels: ["6", 0], vae: ["3", 0] } },
    "8": {
      class_type: "KSampler",
      inputs: {
        model: ["1", 0],
        positive: ["5", 0],
        negative: ["5", 0],
        latent_image: ["7", 0],
        seed: p.seed,
        steps: p.steps,
        cfg: 1.0,
        sampler_name: p.sampler,
        scheduler: p.scheduler,
        denoise: p.denoise,
      },
    },
    "9":  { class_type: "VAEDecode",  inputs: { samples: ["8", 0], vae: ["3", 0] } },
    "10": { class_type: "SaveImage",  inputs: { filename_prefix: "flux-studio-flux-i2i", images: ["9", 0] } },
  };
}
