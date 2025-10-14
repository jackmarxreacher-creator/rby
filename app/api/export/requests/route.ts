import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildExcelBuffer } from "@/lib/export/excel";
import { buildPdfBuffer } from "@/lib/export/pdf";
import { timestamp } from "@/lib/export/filename";
import { format as formatDate } from "date-fns";

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { format, filters } = await req.json();
  const where: any = {};
  // selectedIds support (order ids) takes precedence
  if (filters?.selectedIds && Array.isArray(filters.selectedIds) && filters.selectedIds.length > 0) {
    where.id = { in: filters.selectedIds };
  } else {
    if (filters.customerId) where.customerId = filters.customerId;
    if (filters.productId) where.orderItems = { some: { productId: filters.productId } };
    if (filters.customerName) where.customer = { is: { name: { contains: filters.customerName, mode: "insensitive" } } };
    if (filters.productName) where.orderItems = { some: { product: { is: { name: { contains: filters.productName, mode: "insensitive" } } } } };
  }

  const detailMode = !!filters?.detail;

  const rows = await prisma.order.findMany({
    where,
    include: { customer: true, orderItems: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  const cols = [
    { header: "Order #", key: "id" },
    { header: "Customer", key: "customerName" },
    { header: "Total", key: "totalAmount" },
    { header: "Status", key: "status" },
    { header: "Created", key: "createdAt" },
  ];

  const data = rows.map((r) => ({
    id: r.id.slice(-6),
    orderId: r.id,
    customerName: r.customer.name,
    totalAmount: r.totalAmount,
    status: r.status,
  createdAt: formatDate(new Date(r.createdAt), "yyyy-MM-dd HH:mm:ss"),
  }));

  let buffer: Buffer;
  let contentType: string;
  let ext: string;

  if (!detailMode) {
    if (format === "excel") {
      buffer = await buildExcelBuffer(cols, data);
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      ext = "xlsx";
    } else {
      const style = `
        @page { size: A4; margin: 20mm; @bottom-right { content: counter(page) " / " counter(pages); } }
        body{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#222; margin:0 }
        header{ display:flex; align-items:center; gap:12px; padding:12px 0 }
        header img{ height:36px }
        h2{ color:#1c1c1c; margin:4px 0 12px }
        .export-meta{ margin-bottom:8px; font-size:12px; color:#555 }
        table{ width:100%; border-collapse:collapse; font-size:12px }
        th, td{ border:1px solid #ddd; padding:8px; text-align:left }
        th{ background:#f3f2ef; color:#333 }
        tr:nth-child(even){ background:#faf9f8 }
        footer{ position:fixed; bottom:8px; left:0; right:0; text-align:center; font-size:11px; color:#777 }
      `;

      const html = `
    <html><head><meta charset="utf-8"><style>${style}</style></head><body>
      <header>
        <img src="/images/logos/rby_color_logo.webp" alt="logo" />
        <div>
          <h2>Order Requests – Export</h2>
          <div class="export-meta">Exported: ${formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")}</div>
        </div>
      </header>
      <main>
      <table>
        <thead><tr>${cols.map((c) => `<th>${c.header}</th>`).join("")}</tr></thead>
        <tbody>
          ${data
            .map(
              (r) =>
                `<tr>${cols
                  .map((c) => {
                    const v = r[c.key as keyof typeof r];
                    return `<td>${v ?? ""}</td>`;
                  })
                  .join("")}</tr>`
            )
            .join("")}
        </tbody>
      </table>
      </main>
      <footer>Page <span class="pageNumber"></span></footer>
    </body></html>`;
      buffer = await buildPdfBuffer(html);
      contentType = "application/pdf";
      ext = "pdf";
    }
    const filename = `requests_${timestamp()}.${ext}`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  // Detail mode: compile per-order detail sections
  if (detailMode) {
    // For Excel: create one sheet-like table combining orders and their items
    if (format === "excel") {
      const detailCols = [
        { header: "Order #", key: "order" },
        { header: "Customer", key: "customer" },
        { header: "Product", key: "product" },
        { header: "Qty", key: "qty" },
        { header: "Price", key: "price" },
        { header: "Amount", key: "amount" },
      ];
      const detailData = rows.flatMap((r) =>
        r.orderItems.map((i) => ({ order: r.id.slice(-6), customer: r.customer.name, product: i.product.name, qty: i.quantity, price: i.price, amount: i.amount }))
      );
      buffer = await buildExcelBuffer(detailCols, detailData as any);
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      ext = "xlsx";
    } else {
      const style = `
        @page { size: A4; margin: 20mm; @bottom-right { content: counter(page) " / " counter(pages); } }
        body{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#222; margin:0 }
        header{ display:flex; align-items:center; gap:12px; padding:12px 0 }
        header img{ height:36px }
        h2{ color:#1c1c1c; margin:4px 0 12px }
        h3{ margin:6px 0 }
        .export-meta{ margin-bottom:8px; font-size:12px; color:#555 }
        table{ width:100%; border-collapse:collapse; font-size:12px }
        th, td{ border:1px solid #ddd; padding:8px; text-align:left }
        th{ background:#f3f2ef; color:#333 }
        tr:nth-child(even){ background:#faf9f8 }
        section{ margin-bottom:20px }
        footer{ position:fixed; bottom:8px; left:0; right:0; text-align:center; font-size:11px; color:#777 }
      `;

      const html = `
      <html><head><meta charset="utf-8"><style>${style}</style></head><body>
        <header>
          <img src="/images/logos/rby_color_logo.webp" alt="logo" />
          <div>
            <h2>Order Details Export</h2>
            <div class="export-meta">Exported: ${formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")}</div>
          </div>
        </header>
        <main>
        ${rows
          .map(
            (r) => `
          <section>
            <h3>Order #${r.id.slice(-6)}</h3>
            <p>Customer: <strong>${r.customer.name}</strong></p>
            <p>Total: <strong>${r.totalAmount}</strong></p>
            <table>
              <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Amount</th></tr></thead>
              <tbody>
                ${r.orderItems.map((i) => `<tr><td>${i.product.name}</td><td>${i.quantity}</td><td>${i.price}</td><td>${i.amount}</td></tr>`).join("")}
              </tbody>
            </table>
          </section>`
          )
          .join("")}
        </main>
        <footer>Page <span class="pageNumber"></span></footer>
      </body></html>`;
      buffer = await buildPdfBuffer(html);
      contentType = "application/pdf";
      ext = "pdf";
    }
    const filename = `requests_details_${timestamp()}.${ext}`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }
  // If no branch returned, send no content
  return new NextResponse(null, { status: 204 });
}