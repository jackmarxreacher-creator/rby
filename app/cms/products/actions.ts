//-------- Added Logging in Created By and Updated By -------//
"use server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { logUserActivity } from "@/lib/logging";
import { getAuth } from "@/lib/auth"; // Better-Auth server helper

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

/* ----------  helper: current user ID  ---------- */
async function currentUserId() {
  const session = await getAuth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

export type Result = { ok: boolean; message: string };

export async function createProduct(data: FormData): Promise<Result> {
  try {
    const userId = await currentUserId();
    const imagePath = await uploadImage(data.get("image") as File);
    const created = await prisma.product.create({
      // cast to any because generated Prisma client types may not include new fields yet
      data: {
        name: data.get("name") as string,
        category: data.get("category") as Category,
        size: data.get("size") as string,
        // new fields
        uom: (data.get("uom") as string) || undefined,
        casePack: Number(data.get("casePack") || 0),
        wholesalePrice: Number(data.get("wholesalePrice")),
        retailPrice: Number(data.get("retailPrice")),
        description: (data.get("description") as string) || undefined,
        discount: Number(data.get("discount") || 0),
        image: imagePath,
        createdBy: { connect: { id: userId } },
      } as any,
    });

    await logUserActivity(
      userId,
      "create_product",
      `User created product with id=${created.id} and name="${created.name}"`,
      { productId: created.id }
    );

    revalidatePath("/cms/products");
    return { ok: true, message: "Product created" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "Unable to create product" };
  }
}

export async function updateProduct(id: string, data: FormData): Promise<Result> {
  try {
    const userId = await currentUserId();
    const imagePath = await uploadImage(data.get("image") as File);
    await prisma.product.update({
      where: { id },
      data: ({
        name: data.get("name") as string,
        category: data.get("category") as Category,
        size: data.get("size") as string,
        // new fields
        ...(data.get("uom") ? { uom: data.get("uom") as string } : {}),
        ...(data.get("casePack") ? { casePack: Number(data.get("casePack") || 0) } : {}),
        wholesalePrice: Number(data.get("wholesalePrice")),
        retailPrice: Number(data.get("retailPrice")),
        description: (data.get("description") as string) || undefined,
        discount: Number(data.get("discount") || 0),
        ...(imagePath && { image: imagePath }),
        updatedBy: { connect: { id: userId } },
      } as any),
    });

    await logUserActivity(
      userId,
      "update_product",
      `User updated product with id=${id}`,
      { productId: id }
    );

    revalidatePath("/cms/products");
    return { ok: true, message: "Product updated" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "Unable to update product" };
  }
}

export async function deleteProduct(id: string): Promise<Result> {
  try {
    const userId = await currentUserId();

    /* ----  BLOCK if product is used in orders  ---- */
    const usageCount = await prisma.orderItem.count({ where: { productId: id } });
    if (usageCount > 0) {
      return { ok: false, message: "Cannot delete – this product is used in orders." };
    }

    const product = await prisma.product.findUnique({ where: { id } });
    if (product?.image) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", product.image));
      } catch {
        // fail silently
      }
    }

    await prisma.product.delete({ where: { id } });

    await logUserActivity(
      userId,
      "delete_product",
      `User deleted product with id=${id}`,
      { productId: id }
    );

    revalidatePath("/cms/products");
    return { ok: true, message: "Product deleted" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "Unable to delete product" };
  }
}

export async function getProducts() {
  return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}







// //-------- Added Logging to Created By and Updated By -------//
// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { Category } from "@prisma/client";
// import { logUserActivity } from "@/lib/logging";
// import { getAuth } from "@/lib/auth"; // Better-Auth server helper

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

// /* ----------  helper: current user ID  ---------- */
// async function currentUserId() {
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");
//   return session.user.id;
// }

// export async function createProduct(data: FormData) {
//   const userId = await currentUserId();
//   const imagePath = await uploadImage(data.get("image") as File);
//   const created = await prisma.product.create({
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       image: imagePath,
//       createdBy: { connect: { id: userId } },
//     },
//   });

//   await logUserActivity(
//     userId,
//     "create_product",
//     `User created product with id=${created.id} and name="${created.name}"`,
//     { productId: created.id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function updateProduct(id: string, data: FormData) {
//   const userId = await currentUserId();
//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       ...(imagePath && { image: imagePath }),
//       updatedBy: { connect: { id: userId } },
//     },
//   });

//   await logUserActivity(
//     userId,
//     "update_product",
//     `User updated product with id=${id}`,
//     { productId: id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function deleteProduct(id: string) {
//   const userId = await currentUserId();
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (product?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", product.image));
//     } catch {
//       // fail silently
//     }
//   }

//   await prisma.product.delete({ where: { id } });

//   await logUserActivity(
//     userId,
//     "delete_product",
//     `User deleted product with id=${id}`,
//     { productId: id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function getProducts() {
//   return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({ where: { id } });
// }




// //-------- Added Logging to Created By and Updated By -------//
// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { Category } from "@prisma/client";

// import { logUserActivity } from "@/lib/logging";

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

// export async function createProduct(data: FormData, userId: string) {
//   if (!userId) throw new Error("Unauthorized: userId is required");

//   const imagePath = await uploadImage(data.get("image") as File);
//   const created = await prisma.product.create({
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       image: imagePath,
//       createdBy: { connect: { id: userId } },
//     },
//   });

//   await logUserActivity(
//     userId,
//     "create_product",
//     `User created product with id=${created.id} and name="${created.name}"`,
//     { productId: created.id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function updateProduct(id: string, data: FormData, userId: string) {
//   if (!userId) throw new Error("Unauthorized: userId is required");

//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       ...(imagePath && { image: imagePath }),
//       updatedBy: { connect: { id: userId } },
//     },
//   });

//   await logUserActivity(
//     userId,
//     "update_product",
//     `User updated product with id=${id}`,
//     { productId: id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function deleteProduct(id: string, userId: string) {
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (product?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", product.image));
//     } catch {
//       // fail silently
//     }
//   }

//   await prisma.product.delete({ where: { id } });

//   await logUserActivity(
//     userId,
//     "delete_product",
//     `User deleted product with id=${id}`,
//     { productId: id }
//   );

//   revalidatePath("/cms/products");
// }

// export async function getProducts() {
//   return await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getProduct(id: string) {
//   return await prisma.product.findUnique({ where: { id } });
// }






// // // ---------- Added Created By and Updated By --------
// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { Category } from "@prisma/client";

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

// export async function createProduct(data: FormData, userId: string) {
//   if (!userId) throw new Error("Unauthorized: userId is required");

//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.create({
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       image: imagePath,
//       createdBy: { connect: { id: userId } },
//     },
//   });
//   revalidatePath("/cms/products");
// }

// export async function updateProduct(id: string, data: FormData, userId: string) {
//   if (!userId) throw new Error("Unauthorized: userId is required");

//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       ...(imagePath && { image: imagePath }),
//       updatedBy: { connect: { id: userId } },
//     },
//   });
//   revalidatePath("/cms/products");
// }

// export async function deleteProduct(id: string) {
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (product?.image) {
//     try {
//       await fs.unlink(path.join(process.cwd(), "public", product.image));
//     } catch {
//       // fail silently
//     }
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







// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { Category } from "@prisma/client";

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

// export async function createProduct(data: FormData, userId: string) {
//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.create({
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       image: imagePath,
//       createdBy: {
//         connect: { id: userId },
//       },
//     },
//   });
//   revalidatePath("/cms/products");
// }

// export async function updateProduct(id: string, data: FormData, userId: string) {
//   const imagePath = await uploadImage(data.get("image") as File);
//   await prisma.product.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       category: data.get("category") as Category,
//       size: data.get("size") as string,
//       wholesalePrice: Number(data.get("wholesalePrice")),
//       retailPrice: Number(data.get("retailPrice")),
//       description: (data.get("description") as string) || undefined,
//       discount: Number(data.get("discount") || 0),
//       ...(imagePath && { image: imagePath }),
//       updatedBy: {
//         connect: { id: userId },
//       },
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







// COMMENTED OUT ORIGINAL CODE WITH TYPESCRIPT ERRORS
// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";

// FIXED VERSION WITH PROPER ENUM HANDLING
// "use server";
// import fs from "fs/promises";
// import path from "path";
// import { randomUUID } from "crypto";
// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { Category } from "@prisma/client";

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
//       category: data.get("category") as Category,
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
//       category: data.get("category") as Category,
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

