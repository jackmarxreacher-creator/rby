// app/products-services/actions.ts
"use server";
import { getProducts } from "@/app/cms/products/actions";

export { getProducts }; // re-export so public route can call it