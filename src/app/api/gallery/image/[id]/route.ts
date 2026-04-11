import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { getImagePath } from "@/lib/gallery/store";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return new NextResponse("Not found", { status: 404 });

  try {
    const filePath = await getImagePath(id);
    const buffer = await fs.readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
