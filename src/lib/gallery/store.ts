import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");
const IMAGES_DIR = path.join(DATA_DIR, "images");

export interface GalleryItem {
  id: string;
  prompt: string;
  negativePrompt: string;
  imageFile: string;
  favorite?: boolean;
  mode?: "txt2img" | "img2img";
  settings: {
    width: number;
    height: number;
    steps: number;
    cfg: number;
    sampler: string;
    model: string;
    seed: number;
    denoise?: number;
  };
  createdAt: string;
}

export async function readGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(GALLERY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendToGallery(item: GalleryItem): Promise<void> {
  const items = await readGallery();
  items.unshift(item);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2));
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryItem>
): Promise<void> {
  const items = await readGallery();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;
  items[idx] = { ...items[idx], ...patch };
  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2));
}

export async function deleteFromGallery(id: string): Promise<void> {
  const items = await readGallery();
  const item = items.find((i) => i.id === id);
  const filtered = items.filter((i) => i.id !== id);
  await fs.writeFile(GALLERY_FILE, JSON.stringify(filtered, null, 2));
  if (item) {
    try {
      await fs.unlink(path.join(IMAGES_DIR, item.imageFile));
    } catch {
      // Datei bereits gelöscht
    }
  }
}

export async function saveImage(id: string, buffer: Buffer): Promise<string> {
  await fs.mkdir(IMAGES_DIR, { recursive: true });
  const filename = `${id}.png`;
  await fs.writeFile(path.join(IMAGES_DIR, filename), buffer);
  return filename;
}

export async function getImagePath(filename: string): Promise<string> {
  return path.join(IMAGES_DIR, filename);
}
