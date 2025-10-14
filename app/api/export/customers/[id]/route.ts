import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildExcelBuffer } from "@/lib/export/excel";
import { buildPdfBuffer } from "@/lib/export/pdf";
import { timestamp } from "@/lib/export/filename";
import { format as formatDate } from "date-fns";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "pdf";

  // fetch full record to ensure new fields are present
  const customer = await prisma.customer.findUnique({ where: { id } });
  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = [{ ...customer, businessType: customer.businessType === "RETAIL" ? "Retail" : "Wholesale" }];
  const cols = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "UOM", key: "uom" },
    { header: "Case Pack", key: "casePack" },
    { header: "Business Name", key: "businessName" },
    { header: "Business Type", key: "businessType" },
    { header: "Location", key: "location" },
    { header: "Address", key: "address" },
    { header: "Created", key: "createdAt" },
  ];

  let buffer: Buffer;
  let contentType: string;
  let ext: string;
  if (format === "excel") {
    buffer = await buildExcelBuffer(cols, data);
    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    ext = "xlsx";
  } else {
    const style = `
      body{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#222; margin:0 }
      header{ display:flex; align-items:center; gap:12px; padding:12px 0 }
      header img{ height:36px }
      h2{ color:#1c1c1c; margin:4px 0 12px }
      .export-meta{ margin-bottom:8px; font-size:12px; color:#555 }
      table{ width:100%; border-collapse:collapse; font-size:12px }
      th, td{ border:1px solid #ddd; padding:8px; text-align:left }
      th{ background:#f3f2ef; color:#333 }
      footer{ position:fixed; bottom:8px; left:0; right:0; text-align:center; font-size:11px; color:#777 }
    `;

    const html = `
    <html><head><meta charset="utf-8"><style>${style}</style></head><body>
      <header>
        <img src="/images/logos/rby_color_logo.webp" alt="logo" />
        <div>
          <h2>Customer Details</h2>
          <div class="export-meta">Exported: ${formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")}</div>
        </div>
      </header>
      <main>
      <table border="1" cellpadding="6" cellspacing="0">
        <thead><tr>${cols.map((c) => `<th>${c.header}</th>`).join("")}</tr></thead>
        <tbody>
          ${data.map((r) => `<tr>${cols.map((c) => {
            const v = r[c.key as keyof typeof r];
            if (c.key === 'createdAt') return `<td>${(r as any).createdAt ? formatDate(new Date((r as any).createdAt as any), "yyyy-MM-dd HH:mm:ss") : ''}</td>`;
            return `<td>${v ?? ""}</td>`;
          }).join("")}</tr>`).join("")}
        </tbody>
      </table>
      </main>
      <footer>Page <span class="pageNumber"></span></footer>
    </body></html>`;
    buffer = await buildPdfBuffer(html);
    contentType = "application/pdf";
    ext = "pdf";
  }

  const filename = `customer_${customer.name.replace(/\W/g, "_")}_${timestamp()}.${ext}`;
  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}