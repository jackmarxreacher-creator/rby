import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildExcelBuffer } from "@/lib/export/excel";
import { buildPdfBuffer } from "@/lib/export/pdf";
import { timestamp, sanitizeFilename } from "@/lib/export/filename";
import { format as formatDate } from "date-fns";

export async function POST(req: NextRequest) {
  const session = await getAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { format, filters } = await req.json();
  const where: any = {};
  // support selectedIds array (selected customers) or filters
  if (filters?.selectedIds && Array.isArray(filters.selectedIds) && filters.selectedIds.length > 0) {
    where.id = { in: filters.selectedIds };
  } else {
    if (filters.customerId) where.id = filters.customerId;
    if (filters.businessType) where.businessType = filters.businessType === "Retail" ? "RETAIL" : "WHOLESALE";
  }

  const rows = await prisma.customer.findMany({
    where,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      businessName: true,
      businessType: true,
      location: true,
      address: true,
      createdAt: true,
    },
  });

  const mapBusiness = (b: any) => (b === "RETAIL" ? "Retail" : b === "WHOLESALE" ? "Wholesale" : b);

  // if detail mode, produce detailed output per customer
  const detailMode = !!filters?.detail;

  const cols = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Business Name", key: "businessName" },
    { header: "Business Type", key: "businessType" },
    { header: "Location", key: "location" },
    { header: "Address", key: "address" },
  ];

  let buffer: Buffer;
  let contentType: string;
  let ext: string;

  if (!detailMode) {
    const data = rows.map((r) => ({ ...r, businessType: mapBusiness(r.businessType) }));
    if (format === "excel") {
      buffer = await buildExcelBuffer(cols, data);
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      ext = "xlsx";
    } else {
      const html = `
    <html><body>
      <h2>Customers – Export</h2>
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
    const filename = `customers_${sanitizeFilename(filters?.businessType || "all")}_${timestamp()}.${ext}`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }

  // Detail mode: produce per-customer detailed sections
  if (detailMode) {
    const detailedRows = rows.map((r) => ({ ...r, businessType: mapBusiness(r.businessType) }));
    if (format === "excel") {
      // Excel detail: one row per customer with createdAt included
      const detailCols = [...cols, { header: "Created", key: "createdAt" }];
  const data = detailedRows.map((r) => ({ ...r, createdAt: r.createdAt ? formatDate(new Date(r.createdAt), "yyyy-MM-dd HH:mm:ss") : undefined }));
      buffer = await buildExcelBuffer(detailCols, data as any);
      contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      ext = "xlsx";
    } else {
      const html = `
      <html><body>
        <h2>Customer Details Export</h2>
        ${detailedRows
          .map(
            (r) => `
          <section style="margin-bottom:24px;">
            <h3>${r.name}</h3>
            <table border="1" cellpadding="6" cellspacing="0">
              <tbody>
                <tr><th>Name</th><td>${r.name}</td></tr>
                <tr><th>Email</th><td>${r.email ?? ""}</td></tr>
                <tr><th>Phone</th><td>${r.phone ?? ""}</td></tr>
                <tr><th>Business Name</th><td>${r.businessName ?? ""}</td></tr>
                <tr><th>Business Type</th><td>${r.businessType ?? ""}</td></tr>
                <tr><th>Location</th><td>${r.location ?? ""}</td></tr>
                <tr><th>Address</th><td>${r.address ?? ""}</td></tr>
                <tr><th>Created</th><td>${r.createdAt ? formatDate(new Date(r.createdAt as any), "yyyy-MM-dd HH:mm:ss") : ""}</td></tr>
              </tbody>
            </table>
          </section>`
          )
          .join("")}
      </body></html>`;
      buffer = await buildPdfBuffer(html);
      contentType = "application/pdf";
      ext = "pdf";
    }

    const filename = `customers_details_${timestamp()}.${ext}`;
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  }
  // All branches return above (list export or detail export). If we reach here, return empty 204.
  return new NextResponse(null, { status: 204 });
}