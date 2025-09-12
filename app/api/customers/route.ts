import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const raw = await prisma.customer.findMany({
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
      },
    });

    /* convert lower-case enum -> sentence-case string */
    const customers = raw.map((c) => ({
      ...c,
      businessType: c.businessType === "RETAIL" ? "Retail" : "Wholesale",
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
