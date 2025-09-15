"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/* 1.  Fetch all requests  -------------------------------------------------- */
export async function getRequests() {
  return await prisma.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
}

/* 2.  Fetch live products for dialog  -------------------------------------- */
export async function getProducts() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      size: true,
      image: true,
      wholesalePrice: true,
      retailPrice: true,
    },
    orderBy: { name: "asc" },
  });
}

/* 3.  Create request + items from single JSON blob  ------------------------
       NO REDIRECT HERE – callers decide where to go next
----------------------------------------------------------------------------- */
export async function createRequest(data: FormData) {
  const body = JSON.parse(data.get("payload") as string);

  const {
    customerName,
    businessName,
    email,
    phone,
    location,
    address,
    businessType,
    totalAmount,
    items,
  } = body;

  const prismaBusinessType: "RETAIL" | "WHOLESALE" =
    businessType === "Retail" ? "RETAIL" : "WHOLESALE";

  const order = await prisma.order.create({
    data: {
      customer: {
        connectOrCreate: {
          where: { email },
          create: {
            name: customerName,
            email,
            phone,
            businessType: prismaBusinessType,
            businessName: businessName || undefined,
            location: location || undefined,
            address: address || undefined,
          },
        },
      },
      status: "RECEIVED",
      totalAmount,
      orderItems: {
        create: items.map((it: any) => ({
          productId: it.productId,
          quantity: it.quantity,
          price: it.price,
          amount: it.amount,
        })),
      },
    },
  });

  revalidatePath("/cms/requests");
}

/* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
export async function updateRequest(
  id: string,
  data: FormData,
  editedById?: string
) {
  const body = JSON.parse(data.get("payload") as string);
  const { totalAmount, items, status } = body;

  await prisma.orderItem.deleteMany({ where: { orderId: id } });
  await prisma.orderItem.createMany({
    data: items.map((it: any) => ({
      orderId: id,
      productId: it.productId,
      quantity: it.quantity,
      price: it.price,
      amount: it.amount,
    })),
  });
  await prisma.order.update({
    where: { id }, // ✅ fixed typo
    data: { totalAmount, status: status || undefined, editedById },
  });

  revalidatePath("/cms/requests");
}

/* 5.  Delete request  ------------------------------------------------------ */
export async function deleteRequest(id: string) {
  await prisma.$transaction([
    prisma.orderItem.deleteMany({ where: { orderId: id } }),
    prisma.order.delete({ where: { id } }),
  ]);
  revalidatePath("/cms/requests");
}

/* 6.  Staff-only wrapper – redirects back to CMS --------------------------- */
export async function createRequestInCMS(data: FormData) {
  await createRequest(data);   // shared logic
  redirect("/cms/requests");   // staff stay in CMS
}










// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// /* 1.  Fetch all requests  -------------------------------------------------- */
// export async function getRequests() {
//   return await prisma.order.findMany({
//     include: { customer: true },
//     orderBy: { createdAt: "desc" },
//   });
// }

// /* 2.  Fetch live products for dialog  -------------------------------------- */
// export async function getProducts() {
//   return prisma.product.findMany({
//     select: {
//       id: true,
//       name: true,
//       size: true,
//       image: true,
//       wholesalePrice: true,
//       retailPrice: true,
//     },
//     orderBy: { name: "asc" },
//   });
// }

// /* 3.  Create request + items from single JSON blob  ------------------------
//        NO REDIRECT HERE – callers decide where to go next
// ----------------------------------------------------------------------------- */
// export async function createRequest(data: FormData) {
//   const body = JSON.parse(data.get("payload") as string);

//   const {
//     customerName,
//     businessName,
//     email,
//     phone,
//     location,
//     address,
//     businessType,
//     totalAmount,
//     items,
//   } = body;

//   const prismaBusinessType: "RETAIL" | "WHOLESALE" =
//     businessType === "Retail" ? "RETAIL" : "WHOLESALE";

//   const order = await prisma.order.create({
//     data: {
//       customer: {
//         connectOrCreate: {
//           where: { email },
//           create: {
//             name: customerName,
//             email,
//             phone,
//             businessType: prismaBusinessType,
//             businessName: businessName || undefined,
//             location: location || undefined,
//             address: address || undefined,
//           },
//         },
//       },
//       status: "RECEIVED",
//       totalAmount,
//       // createdById removed – must be undefined, not string | undefined
//       orderItems: {
//         create: items.map((it: any) => ({
//           productId: it.productId,
//           quantity: it.quantity,
//           price: it.price,
//           amount: it.amount,
//         })),
//       },
//     },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
// export async function updateRequest(
//   id: string,
//   data: FormData,
//   editedById?: string
// ) {
//   const body = JSON.parse(data.get("payload") as string);
//   const { totalAmount, items, status } = body;

//   await prisma.orderItem.deleteMany({ where: { orderId: id } });
//   await prisma.orderItem.createMany({
//     data: items.map((it: any) => ({
//       orderId: id,
//       productId: it.productId,
//       quantity: it.quantity,
//       price: it.price,
//       amount: it.amount,
//     })),
//   });
//   await prisma.order.update({
//     awhere: { id },
//     data: { totalAmount, status: status || undefined, editedById },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 5.  Delete request  ------------------------------------------------------ */
// export async function deleteRequest(id: string) {
//   await prisma.$transaction([
//     prisma.orderItem.deleteMany({ where: { orderId: id } }),
//     prisma.order.delete({ where: { id } }),
//   ]);
//   revalidatePath("/cms/requests");
// }

// /* 6.  Staff-only wrapper – redirects back to CMS --------------------------- */
// export async function createRequestInCMS(data: FormData) {
//   await createRequest(data);   // shared logic
//   redirect("/cms/requests");   // staff stay in CMS
// }





// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// /* 1.  Fetch all requests  -------------------------------------------------- */
// export async function getRequests() {
//   return await prisma.order.findMany({
//     include: { customer: true },
//     orderBy: { createdAt: "desc" },
//   });
// }

// /* 2.  Fetch live products for dialog  -------------------------------------- */
// export async function getProducts() {
//   return prisma.product.findMany({
//     select: {
//       id: true,
//       name: true,
//       size: true,
//       image: true,
//       wholesalePrice: true,
//       retailPrice: true,
//     },
//     orderBy: { name: "asc" },
//   });
// }

// /* 3.  Create request + items from single JSON blob  ------------------------
//        NO REDIRECT HERE – callers decide where to go next
// ----------------------------------------------------------------------------- */
// export async function createRequest(data: FormData, createdById?: string) {
//   const body = JSON.parse(data.get("payload") as string);

//   const {
//     customerName,
//     businessName,
//     email,
//     phone,
//     location,
//     address,
//     businessType,
//     totalAmount,
//     items,
//   } = body;

//   const prismaBusinessType: "RETAIL" | "WHOLESALE" =
//     businessType === "Retail" ? "RETAIL" : "WHOLESALE";

//   const order = await prisma.order.create({
//     data: {
//       customer: {
//         connectOrCreate: {
//           where: { email },
//           create: {
//             name: customerName,
//             email,
//             phone,
//             businessType: prismaBusinessType,
//             businessName: businessName || undefined,
//             location: location || undefined,
//             address: address || undefined,
//           },
//         },
//       },
//       status: "RECEIVED",
//       totalAmount,
//       createdById,
//       orderItems: {
//         create: items.map((it: any) => ({
//           productId: it.productId,
//           quantity: it.quantity,
//           price: it.price,
//           amount: it.amount,
//         })),
//       },
//     },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
// export async function updateRequest(
//   id: string,
//   data: FormData,
//   editedById?: string
// ) {
//   const body = JSON.parse(data.get("payload") as string);
//   const { totalAmount, items, status } = body;

//   await prisma.orderItem.deleteMany({ where: { orderId: id } });
//   await prisma.orderItem.createMany({
//     data: items.map((it: any) => ({
//       orderId: id,
//       productId: it.productId,
//       quantity: it.quantity,
//       price: it.price,
//       amount: it.amount,
//     })),
//   });
//   await prisma.order.update({
//     where: { id },
//     data: { totalAmount, status: status || undefined, editedById },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 5.  Delete request  ------------------------------------------------------ */
// export async function deleteRequest(id: string) {
//   await prisma.$transaction([
//     prisma.orderItem.deleteMany({ where: { orderId: id } }),
//     prisma.order.delete({ where: { id } }),
//   ]);
//   revalidatePath("/cms/requests");
// }

// /* 6.  Staff-only wrapper – redirects back to CMS --------------------------- */
// export async function createRequestInCMS(data: FormData) {
//   await createRequest(data);   // shared logic
//   redirect("/cms/requests");   // staff stay in CMS
// }

// /* 7.  Needed import for the wrapper */
// import { redirect } from "next/navigation";









// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";

// /* 1.  Fetch all requests  -------------------------------------------------- */
// export async function getRequests() {
//   return await prisma.order.findMany({
//     include: { customer: true },
//     orderBy: { createdAt: "desc" },
//   });
// }

// /* 2.  Fetch live products for dialog  -------------------------------------- */
// export async function getProducts() {
//   return prisma.product.findMany({
//     select: {
//       id: true,
//       name: true,
//       size: true,
//       image: true,
//       wholesalePrice: true,
//       retailPrice: true,
//     },
//     orderBy: { name: "asc" },
//   });
// }

// /* 3.  Create request + items from single JSON blob  ------------------------ */
// export async function createRequest(data: FormData, createdById?: string) {
//   const body = JSON.parse(data.get("payload") as string);

//   const {
//     customerName,
//     businessName,
//     email,
//     phone,
//     location,
//     address,
//     businessType,
//     totalAmount,
//     items,
//   } = body;

//   const prismaBusinessType: "RETAIL" | "WHOLESALE" =
//     businessType === "Retail" ? "RETAIL" : "WHOLESALE";

//   const order = await prisma.order.create({
//     data: {
//       customer: {
//         connectOrCreate: {
//           where: { email },
//           create: {
//             name: customerName,
//             email,
//             phone,
//             businessType: prismaBusinessType,
//             businessName: businessName || undefined,
//             location: location || undefined,
//             address: address || undefined,
//           },
//         },
//       },
//       status: "RECEIVED",
//       totalAmount,
//       createdById,
//       orderItems: {
//         create: items.map((it: any) => ({
//           productId: it.productId,
//           quantity: it.quantity,
//           price: it.price,
//           amount: it.amount,
//         })),
//       },
//     },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
// export async function updateRequest(
//   id: string,
//   data: FormData,
//   editedById?: string
// ) {
//   const body = JSON.parse(data.get("payload") as string);

//   const { totalAmount, items, status } = body;

//   /* 1️⃣  delete existing items */
//   await prisma.orderItem.deleteMany({ where: { orderId: id } });

//   /* 2️⃣  insert new lines */
//   await prisma.orderItem.createMany({
//     data: items.map((it: any) => ({
//       orderId: id,
//       productId: it.productId,
//       quantity: it.quantity,
//       price: it.price,
//       amount: it.amount,
//     })),
//   });

//   /* 3️⃣  update order header */
//   await prisma.order.update({
//     where: { id },
//     data: { totalAmount, status: status || undefined, editedById },
//   });

//   revalidatePath("/cms/requests");
// }

// /* 5.  Delete request  ------------------------------------------------------ */
// export async function deleteRequest(id: string) {
//   await prisma.$transaction([
//     prisma.orderItem.deleteMany({ where: { orderId: id } }),
//     prisma.order.delete({ where: { id } }),
//   ]);
//   revalidatePath("/cms/requests");
// }

