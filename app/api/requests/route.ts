import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
  const customerId = sp.get("customerId") ?? undefined;
  const productId = sp.get("productId") ?? undefined;
  const customerName = sp.get("customerName") ?? undefined;
  const status = sp.get("status") ?? undefined;
  const productName = sp.get("productName") ?? undefined;

  const where: any = {};
  if (customerId) where.customerId = customerId;
  if (productId) where.orderItems = { some: { productId } };
  if (customerName) where.customer = { is: { name: { contains: customerName, mode: "insensitive" } } };
  if (productName) where.orderItems = { some: { product: { is: { name: { contains: productName, mode: "insensitive" } } } } };
  // status filter: allow explicit status or 'pending' (not COMPLETED or CANCELED)
  if (status) {
    const s = status.toUpperCase();
    if (s === "PENDING") {
      where.NOT = [{ status: 'COMPLETED' }, { status: 'CANCELED' }];
    } else {
      where.status = s;
    }
  }

    const rows = await prisma.order.findMany({
      where,
      include: { customer: true, orderItems: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}