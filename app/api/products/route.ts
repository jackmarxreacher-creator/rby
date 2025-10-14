import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeCategory(s: string | null) {
  if (!s) return undefined;
  return s;
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const productName = sp.get("productName") ?? undefined;
    const category = normalizeCategory(sp.get("category"));

    const where: any = {};
    if (productName) where.name = { contains: productName, mode: "insensitive" };
    if (category) where.category = category;

    const rows = await prisma.product.findMany({
      where,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        size: true,
        uom: true,
        casePack: true,
        wholesalePrice: true,
        retailPrice: true,
        category: true,
        image: true,
      },
    });

    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
