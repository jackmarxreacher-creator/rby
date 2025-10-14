import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BusinessType } from "@prisma/client";

function toBusinessType(s: string | null): BusinessType | undefined {
  if (!s) return undefined;
  return s === "Retail" ? "RETAIL" : "WHOLESALE";
}

export async function GET(request: NextRequest) {
  try {
    /* ---------- NEW: read filters ---------- */
    const { searchParams } = request.nextUrl;
  const customerId = searchParams.get("customerId") ?? undefined;
  const customerName = searchParams.get("customerName") ?? undefined;
    const businessType = toBusinessType(searchParams.get("businessType"));

    /* ---------- NEW: build where ---------- */
  const where: any = {};
  if (customerId) where.id = customerId;
  if (customerName) where.name = { contains: customerName, mode: "insensitive" };
  if (businessType) where.businessType = businessType;
    /* --------------------------------------- */

    // fetch full records (ensures new fields are included) and map required fields
    const raw = await prisma.customer.findMany({ where, orderBy: { name: "asc" } });

    /* convert enum -> sentence-case and expose new fields */
    const customers = raw.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      businessName: c.businessName,
      businessType: c.businessType === "RETAIL" ? "Retail" : "Wholesale",
      location: c.location,
      address: c.address,
      image: c.image ?? "/images/user.jpg",
      uom: (c as any).uom ?? null,
      casePack: (c as any).casePack ?? 0,
    }));

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers list" },
      { status: 500 }
    );
  }
}





// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(request: NextRequest) {
//   try {
//     const raw = await prisma.customer.findMany({
//       orderBy: { name: "asc" },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         businessName: true,
//         businessType: true,
//         location: true,
//         address: true,
//       },
//     });

//     /* convert lower-case enum -> sentence-case string */
//     const customers = raw.map((c) => ({
//       ...c,
//       businessType: c.businessType === "RETAIL" ? "Retail" : "Wholesale",
//     }));

//     return NextResponse.json(customers);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch customers list" },
//       { status: 500 }
//     );
//   }
// }




// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(request: NextRequest) {
//   try {
//     const customers = await prisma.customer.findMany({
//       orderBy: { name: "asc" },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         businessName: true,
//         businessType: true,
//         location: true,
//         address: true,
//       },
//     });

//     return NextResponse.json(customers);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch customers list" },
//       { status: 500 }
//     );
//   }
// }
