"use server";

import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { BusinessType } from "@prisma/client"; // Correct enum import
import { revalidatePath } from "next/cache";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "customers");

export async function createCustomer(data: FormData) {
  await prisma.customer.create({
    data: {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: BusinessType[(data.get("businessType") as string).toUpperCase() as keyof typeof BusinessType],
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
    },
  });
  revalidatePath("/cms/customers");
}

export async function updateCustomer(id: string, data: FormData) {
  await prisma.customer.update({
    where: { id },
    data: {
      name: data.get("name") as string,
      businessName: (data.get("businessName") as string) || null,
      businessType: BusinessType[(data.get("businessType") as string).toUpperCase() as keyof typeof BusinessType],
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      location: (data.get("location") as string) || null,
      address: (data.get("address") as string) || null,
    },
  });
  revalidatePath("/cms/customers");
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/cms/customers");
}

export async function getCustomers() {
  return await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCustomer(id: string) {
  return await prisma.customer.findUnique({ where: { id } });
}
