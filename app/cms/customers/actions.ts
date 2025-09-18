"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BusinessType } from "@prisma/client";
import { uploadCustomerImage } from "@/app/cms/customers/_components/uploadCustomerImage"; // ← NEW

/* ----------  helper: current user ID  ---------- */
async function currentUserId() {
  const session = await auth.api.getSession({ headers: await import("next/headers").then((m) => m.headers()) });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

/* ----------  helper: decide image path  ---------- */
async function getImagePath(data: FormData, customerId?: string): Promise<string> {
  const file = data.get("image") as File;
  if (!file || file.size === 0) {
    // keep existing or fall back to default
    if (customerId) {
      const cust = await prisma.customer.findUnique({ where: { id: customerId }, select: { image: true } });
      return cust?.image ?? "/images/user.jpg";
    }
    return "/images/user.jpg";
  }
  // real upload
  return await uploadCustomerImage(file);
}

/* ----------  CRUD  ---------- */
export async function createCustomer(data: FormData) {
  const userId = await currentUserId();
  const imagePath = await getImagePath(data);

  await prisma.customer.create({
    data: {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: (data.get("businessType") as BusinessType) || "RETAIL",
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
      image: imagePath, // ← uses uploaded file or default
      createdById: userId,
    },
  });
  revalidatePath("/cms/customers");
}

export async function updateCustomer(id: string, data: FormData) {
  const userId = await currentUserId();
  const imagePath = await getImagePath(data, id);

  await prisma.customer.update({
    where: { id },
    data: {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: (data.get("businessType") as BusinessType) || "RETAIL",
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
      image: imagePath, // ← uses uploaded file or keeps existing
      updatedById: userId,
    },
  });
  revalidatePath("/cms/customers");
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/cms/customers");
}

export async function getCustomers() {
  return await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      businessName: true,
      businessType: true,
      location: true,
      address: true,
      image: true,
      createdById: true,
      updatedById: true,
      createdAt: true,
    },
  });
}

export async function getCustomer(id: string) {
  return await prisma.customer.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      businessName: true,
      businessType: true,
      location: true,
      address: true,
      image: true,
      createdById: true,
      updatedById: true,
    },
  });
}




// "use server";

// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { BusinessType } from "@prisma/client";

// /* ----------  helper: current user ID  ---------- */
// async function currentUserId() {
//   const session = await auth.api.getSession({ headers: await import("next/headers").then((m) => m.headers()) });
//   if (!session?.user?.id) throw new Error("Unauthorized");
//   return session.user.id;
// }

// /* ----------  helper: decide image path  ---------- */
// async function getImagePath(data: FormData, customerId?: string): Promise<string> {
//   const file = data.get("image") as File;
//   // no file → keep existing or fall back to default
//   if (!file || file.size === 0) {
//     if (customerId) {
//       const cust = await prisma.customer.findUnique({ where: { id: customerId }, select: { image: true } });
//       return cust?.image ?? "/images/user.jpg";
//     }
//     return "/images/user.jpg";
//   }
//   // TODO: plug your upload helper here (S3, local disk, etc.)
//   // for demo we just return a fake path
//   return `/images/customers/${Date.now()}-${file.name}`;
// }

// /* ----------  CRUD  ---------- */
// export async function createCustomer(data: FormData) {
//   const userId = await currentUserId();
//   const imagePath = await getImagePath(data);

//   await prisma.customer.create({
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: (data.get("businessType") as BusinessType) || "RETAIL",
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//       image: imagePath, // ← uses uploaded file or default
//       createdById: userId,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function updateCustomer(id: string, data: FormData) {
//   const userId = await currentUserId();
//   const imagePath = await getImagePath(data, id);

//   await prisma.customer.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: (data.get("businessType") as BusinessType) || "RETAIL",
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//       image: imagePath, // ← uses uploaded file or keeps existing
//       updatedById: userId,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function deleteCustomer(id: string) {
//   await prisma.customer.delete({ where: { id } });
//   revalidatePath("/cms/customers");
// }

// export async function getCustomers() {
//   return await prisma.customer.findMany({
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//       businessName: true,
//       businessType: true,
//       location: true,
//       address: true,
//       image: true,
//       createdById: true,
//       updatedById: true,
//       createdAt: true,
//     },
//   });
// }

// export async function getCustomer(id: string) {
//   return await prisma.customer.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//       businessName: true,
//       businessType: true,
//       location: true,
//       address: true,
//       image: true,
//       createdById: true,
//       updatedById: true,
//     },
//   });
// }





// "use server";

// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { BusinessType } from "@prisma/client";

// /* ----------  helper  ---------- */
// async function currentUserId() {
//   const session = await auth.api.getSession({ headers: await import("next/headers").then((m) => m.headers()) });
//   if (!session?.user?.id) throw new Error("Unauthorized");
//   return session.user.id;
// }

// /* ----------  CRUD  ---------- */
// export async function createCustomer(data: FormData) {
//   const userId = await currentUserId();

//   await prisma.customer.create({
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: (data.get("businessType") as BusinessType) || "RETAIL",
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//       image: "/images/user.jpg", // default avatar
//       createdById: userId,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function updateCustomer(id: string, data: FormData) {
//   const userId = await currentUserId();

//   await prisma.customer.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: (data.get("businessType") as BusinessType) || "RETAIL",
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//       updatedById: userId,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function deleteCustomer(id: string) {
//   await prisma.customer.delete({ where: { id } });
//   revalidatePath("/cms/customers");
// }

// export async function getCustomers() {
//   return await prisma.customer.findMany({
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//       businessName: true,
//       businessType: true,
//       location: true,
//       address: true,
//       image: true, // ← added
//       createdById: true,
//       updatedById: true,
//       createdAt: true,
//     },
//   });
// }

// export async function getCustomer(id: string) {
//   return await prisma.customer.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       phone: true,
//       businessName: true,
//       businessType: true,
//       location: true,
//       address: true,
//       image: true, // ← added
//       createdById: true,
//       updatedById: true,
//     },
//   });
// }





// "use server";

// import fs from "fs/promises";
// import path from "path";
// import { prisma } from "@/lib/prisma";
// import { BusinessType } from "@prisma/client"; // Correct enum import
// import { revalidatePath } from "next/cache";

// const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "customers");

// export async function createCustomer(data: FormData) {
//   await prisma.customer.create({
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: BusinessType[(data.get("businessType") as string).toUpperCase() as keyof typeof BusinessType],
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function updateCustomer(id: string, data: FormData) {
//   await prisma.customer.update({
//     where: { id },
//     data: {
//       name: data.get("name") as string,
//       businessName: (data.get("businessName") as string) || null,
//       businessType: BusinessType[(data.get("businessType") as string).toUpperCase() as keyof typeof BusinessType],
//       email: data.get("email") as string,
//       phone: data.get("phone") as string,
//       location: (data.get("location") as string) || null,
//       address: (data.get("address") as string) || null,
//     },
//   });
//   revalidatePath("/cms/customers");
// }

// export async function deleteCustomer(id: string) {
//   await prisma.customer.delete({ where: { id } });
//   revalidatePath("/cms/customers");
// }

// export async function getCustomers() {
//   return await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
// }

// export async function getCustomer(id: string) {
//   return await prisma.customer.findUnique({ where: { id } });
// }
