import { NextResponse } from "next/server";
import { getProducts } from "../actions";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unable to fetch products" }, { status: 500 });
  }
}