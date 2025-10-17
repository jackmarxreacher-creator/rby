import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignedToken } from "@/lib/signed-token";
import { buildPdfBuffer } from "@/lib/export/pdf";
import { timestamp, sanitizeFilename } from "@/lib/export/filename";

export const runtime = "nodejs"; // html-pdf-node requires Node runtime
export const dynamic = "force-dynamic"; // ensure fresh data

function renderInvoiceHtml(order: any) {
  const items = order.orderItems.map((i: any) => ({
    name: i.product?.name ?? "",
    size: i.product?.size ?? "",
    qty: i.quantity,
    price: i.price,
    amount: i.amount,
  }));

  const rows = items
    .map(
      (r: { name: string; size: string; qty: number; price: number; amount: number }) => `
        <tr>
          <td>${r.name}</td>
          <td>${r.size}</td>
          <td class="num">${r.qty}</td>
          <td class="num">GHS ${r.price.toFixed(2)}</td>
          <td class="num">GHS ${r.amount.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const created = new Date(order.createdAt).toLocaleString();

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif; color:#111;}
        .wrap{max-width: 800px; margin: 0 auto;}
        header{display:flex; align-items:center; justify-content:space-between; padding:8px 0 16px}
        h1{font-size:20px; margin:0; color:#be965b}
        .brand{display:flex; align-items:center; gap:10px}
        .brand img{height:40px; width:auto}
        .meta{font-size:12px; color:#666}
        table{width:100%; border-collapse:collapse; margin-top:16px}
        th, td{border:1px solid #e5e7eb; padding:8px; font-size:13px}
        th{background:#f3ede5; text-align:left}
        .num{text-align:right}
        .totals{margin-top:12px; display:flex; justify-content:flex-end;}
        .totals .amount{font-size:16px; font-weight:700; color:#be965b}
        .section{margin-top:8px}
        .muted{color:#6b7280}
      </style>
    </head>
    <body>
      <div class="wrap">
        <header>
          <div class="brand">
            <img src="https://rby-assets.vercel.app/logo.png" alt="RBY" />
            <div>
              <h1>Order Invoice</h1>
              <div class="meta">Order #${order.id.slice(-6)} • ${created}</div>
            </div>
          </div>
          <div class="meta">
            Ricky Boakye Yiadom Ltd.<br/>
            rbyltd.com
          </div>
        </header>

        <div class="section">
          <strong>Customer</strong>
          <div class="muted">
            ${order.customer.name}${order.customer.businessName ? ` • ${order.customer.businessName}` : ""}<br/>
            ${order.customer.email} • ${order.customer.phone}<br/>
            ${order.customer.location ?? ""} ${order.customer.address ? `• ${order.customer.address}` : ""}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="totals">
          <div>Total:&nbsp;<span class="amount">GHS ${order.totalAmount.toFixed(2)}</span></div>
        </div>

        <p class="muted" style="margin-top:16px">Thank you for your request. Our team will contact you shortly.</p>
      </div>
    </body>
  </html>`;
}

export async function GET(_req: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params;
  const payload = verifySignedToken(token);
  if (!payload) return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });

  const order = await prisma.order.findUnique({
    where: { id: payload.orderId },
    include: { customer: true, orderItems: { include: { product: true } } },
  });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const html = renderInvoiceHtml(order);
  const buffer = await buildPdfBuffer(html);

  const customer = sanitizeFilename(order.customer.name || "customer");
  const filename = `invoice_${customer}_${order.id.slice(-6)}_${timestamp()}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
