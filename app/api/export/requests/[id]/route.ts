import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildExcelBuffer } from "@/lib/export/excel";
import { buildPdfBuffer } from "@/lib/export/pdf";
import { timestamp } from "@/lib/export/filename";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "pdf";

  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, orderItems: { include: { product: true } } },
  });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cols = [
    { header: "Product", key: "product" },
    { header: "Qty", key: "qty" },
    { header: "Price", key: "price" },
    { header: "Amount", key: "amount" },
  ];
  const data = order.orderItems.map((i) => ({
    product: i.product.name,
    qty: i.quantity,
    price: i.price,
    amount: i.amount,
  }));

  let buffer: Buffer;
  let contentType: string;
  let ext: string;
  if (format === "excel") {
    buffer = await buildExcelBuffer(cols, data);
    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    ext = "xlsx";
  } else {
    const html = `
    <html><body>
      <h2>Order #${order.id.slice(-6)}</h2>
      <p>Customer: <strong>${order.customer.name}</strong></p>
      <p>Total: <strong>${order.totalAmount}</strong></p>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr>${cols.map((c) => `<th>${c.header}</th>`).join("")}</tr></thead>
        <tbody>
          ${data.map((r) => `<tr>${cols.map((c) => `<td>${r[c.key as keyof typeof r] ?? ""}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </body></html>`;
    buffer = await buildPdfBuffer(html);
    contentType = "application/pdf";
    ext = "pdf";
  }

  const filename = `request_${order.id.slice(-6)}_${timestamp()}.${ext}`;
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}