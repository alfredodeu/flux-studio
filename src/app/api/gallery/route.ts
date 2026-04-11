import { NextRequest, NextResponse } from "next/server";
import { readGallery, deleteFromGallery, updateGalleryItem } from "@/lib/gallery/store";

export async function GET() {
  const items = await readGallery();
  return NextResponse.json({ items });
}

export async function PATCH(req: NextRequest) {
  const { id, ...patch } = await req.json();
  if (!id) return NextResponse.json({ error: "id fehlt" }, { status: 400 });
  await updateGalleryItem(id, patch);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id fehlt" }, { status: 400 });
  await deleteFromGallery(id);
  return NextResponse.json({ ok: true });
}
