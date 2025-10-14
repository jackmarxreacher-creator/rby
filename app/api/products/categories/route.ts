import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Try to read enum variants from Postgres enum type first (works on Postgres)
    try {
      // This will return rows like [{ val: 'STOUT' }, { val: 'LAGERS' }, ...]
      // If DB is not Postgres or the enum doesn't exist this will throw.
      const rows: Array<{ val: string }> = await prisma.$queryRawUnsafe(
        `SELECT unnest(enum_range(NULL::"Category")) as val`
      );
      const categories = rows.map((r) => r.val);
      return NextResponse.json(categories);
    } catch (err) {
      // Fallback: return distinct categories present in products table
      const rows = await prisma.product.findMany({ select: { category: true } });
      const set = new Set(rows.map((r) => r.category).filter(Boolean));
      return NextResponse.json(Array.from(set));
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
