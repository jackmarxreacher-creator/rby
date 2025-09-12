"use server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "new_products");

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function uploadImage(file: File) {
  if (!file || file.size === 0) return undefined;
  await ensureDir();
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/images/new_products/${filename}`;
}

export async function createProduct(data: FormData) {
  const imagePath = await uploadImage(data.get("image") as File);
  await prisma.product.create({
    data: {
      name: data.get("name") as string,
      category: data.get("category") as string,
      size: data.get("size") as string,
      wholesalePrice: Number(data.get("wholesalePrice")),
      retailPrice: Number(data.get("retailPrice")),
      description: (data.get("description") as string) || undefined,
      discount: Number(data.get("discount") || 0),
      image: imagePath,
    },
  });
  revalidatePath("/cms/products");
}

export async function updateProduct(id: string, data: FormData) {
  const imagePath = await uploadImage(data.get("image") as File);
  await prisma.product.update({
    where: { id },
    data: {
      name: data.get("name") as string,
      category: data.get("category") as string,
      size: data.get("size") as string,
      wholesalePrice: Number(data.get("wholesalePrice")),
      retailPrice: Number(data.get("retailPrice")),
      description: (data.get("description") as string) || undefined,
      discount: Number(data.get("discount") || 0),
      ...(imagePath && { image: imagePath }),
    },
  });
  revalidatePath("/cms/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (product?.image) {
    try {
      await fs.unlink(path.join(process.cwd(), "public", product.image));
    } catch {}
  }
  await prisma.product.delete({ where: { id } });
  revalidatePath("/cms/products");
}

export async function getProducts() {
  return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}





// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "new_products");

// async function ensureDir() {
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });
// }

// async function uploadImage(file: File) {
//   if (!file || file.size === 0) return undefined;
//   await ensureDir();
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = `${randomUUID()}-${file.name}`.replace(/\s/g, "_");
//   await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
//   return `/images/new_products/${filename}`;
// }

// export async function createProduct(data: FormData) {
//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.create({
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as string,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       image: imagePath,
//     },
//   });
//   revalidatePath("/cms/products");
// }

// export async function updateProduct(id: string, data: FormData) {
//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as string,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       ...(imagePath && { image: imagePath }),
//     },
//   });
//   revalidatePath("/cms/products");
// }

// export async function deleteProduct(id: string) {
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (product?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", product.image));
//     } catch {}
//   }
//   await prisma.product.delete({ where: { id } });
//   revalidatePath("/cms/products");
// }

// export async function getProducts() {
//   return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({ where: { id } });
// }

