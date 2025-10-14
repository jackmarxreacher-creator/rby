
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BusinessType } from "@prisma/client";
import { uploadCustomerImage } from "@/app/cms/customers/_components/uploadCustomerImage";
import { logUserActivity } from "@/lib/logging";
import { getAuth } from "@/lib/auth";

async function currentUserId() {
  const session = await getAuth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  return session.user.id;
}

async function getImagePath(data: FormData, customerId?: string): Promise<string> {
  const file = data.get("image") as File;
  if (!file || file.size === 0) {
    if (customerId) {
      const cust = await prisma.customer.findUnique({ where: { id: customerId }, select: { image: true } });
      return cust?.image ?? "/images/user.jpg";
    }
    return "/images/user.jpg";
  }
  return await uploadCustomerImage(file);
}

type Result = { ok: boolean; message: string };

export async function createCustomer(data: FormData): Promise<Result> {
  try {
    const userId = await currentUserId();
    const imagePath = await getImagePath(data);

    const payload: any = {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: (data.get("businessType") as BusinessType) || "RETAIL",
      uom: (data.get("uom") as string) || "BOTTLE",
      casePack: parseInt((data.get("casePack") as string) || "0", 10),
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
      image: imagePath,
      createdById: userId,
    };

  const created = await prisma.customer.create({ data: payload });
    await logUserActivity(userId, "create_customer", `Created customer ${created.id}`, { customerId: created.id });
    revalidatePath("/cms/customers");
    return { ok: true, message: "Customer created" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "An error occurred" };
  }
}

export async function updateCustomer(id: string, data: FormData): Promise<Result> {
  try {
    const userId = await currentUserId();
    const imagePath = await getImagePath(data, id);

    const payload: any = {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: (data.get("businessType") as BusinessType) || "RETAIL",
      uom: (data.get("uom") as string) || "BOTTLE",
      casePack: parseInt((data.get("casePack") as string) || "0", 10),
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
      image: imagePath,
      updatedById: userId,
    };

  await prisma.customer.update({ where: { id }, data: payload });
    await logUserActivity(userId, "update_customer", `Updated customer ${id}`, { customerId: id });
    revalidatePath("/cms/customers");
    return { ok: true, message: "Customer updated" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "An error occurred" };
  }
}

export async function deleteCustomer(id: string): Promise<Result> {
  try {
    const userId = await currentUserId();
  await prisma.customer.delete({ where: { id } });
    await logUserActivity(userId, "delete_customer", `Deleted customer ${id}`, { customerId: id });
    revalidatePath("/cms/customers");
    return { ok: true, message: "Customer deleted" };
  } catch (err: any) {
    return { ok: false, message: err?.message ?? "An error occurred" };
  }
}

export async function getCustomers() {
  // Return full customer records for now to avoid select-type mismatches
  return await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomer(id: string) {
  // Return full customer record to avoid select-type mismatches
  return await prisma.customer.findUnique({ where: { id } });
}




// // ----- Added logging to customer actions -----
// "use server";

// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { BusinessType } from "@prisma/client";
// import { uploadCustomerImage } from "@/app/cms/customers/_components/uploadCustomerImage";
// import { logUserActivity } from "@/lib/logging";  // Import logging
// import { getCurrentUser } from "@/lib/auth-server"; // Use unified auth helper

// /* ----------  helper: current user ID  ---------- */
// async function currentUserId() {
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");
//   return user.id;
// }

// /* ----------  helper: decide image path  ---------- */
// async function getImagePath(data: FormData, customerId?: string): Promise<string> {
//   const file = data.get("image") as File;
//   if (!file || file.size === 0) {
//     if (customerId) {
//       const cust = await prisma.customer.findUnique({ where: { id: customerId }, select: { image: true } });
//       return cust?.image ?? "/images/user.jpg";
//     }
//     return "/images/user.jpg";
//   }
//   return await uploadCustomerImage(file);
// }

//   return await uploadCustomerImage(file);
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
