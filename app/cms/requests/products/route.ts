// app/cms/requests/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "../actions";

/* ✅  Public read: guests + staff can fetch products  */
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import { getProducts } from "../actions";

// export async function GET() {
//   try {
//     const products = await getProducts();
//     return NextResponse.json(products);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Unable to fetch products" }, { status: 500 });
//   }
// }