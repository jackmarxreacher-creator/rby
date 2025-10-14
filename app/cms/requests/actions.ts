//------- Added Logging to Created By and Updated By -------//
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth"; // Better-Auth server helper
import { logUserActivity } from "@/lib/logging";

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

/* 3.  Create request + items from single JSON blob  ------------------------  */
export async function createRequest(data: FormData, isGuest = false) {
  try {
    // auth check only for staff
    let userId: string | null = null;
    if (!isGuest) {
      const session = await getAuth();
      if (!session?.user?.id) throw new Error("Unauthorized");
      userId = session.user.id;
    }

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

    /* ----------  1.  create order (relational only)  ---------- */
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

    /* ----------  2.  staff: patch createdById  ---------- */
    if (userId) {
      await prisma.order.update({
        where: { id: order.id },
        data: { createdById: userId },
      });
      await logUserActivity(
        userId,
        "create_request",
        `User created request with id=${order.id} for customer "${customerName}"`,
        { orderId: order.id }
      );
    }

    revalidatePath("/cms/requests");

    return { ok: true, message: `Created request for ${customerName}` };
  } catch (err: any) {
    console.error("createRequest error", err);
    return { ok: false, message: err?.message || "Failed to create request" };
  }
}

/* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
export async function updateRequest(
  id: string,
  data: FormData,
  editedById?: string
) {
  try {
    const session = await getAuth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const body = JSON.parse(data.get("payload") as string);
    const { totalAmount, items, status, customerName } = body;

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
      where: { id },
      data: { totalAmount, status: status || undefined, editedById },
    });

    await logUserActivity(
      session.user.id,
      "update_request",
      `User updated request with id=${id}`,
      { orderId: id }
    );

    revalidatePath("/cms/requests");

    return { ok: true, message: `Updated request ${id} for ${customerName ?? "customer"}` };
  } catch (err: any) {
    console.error("updateRequest error", err);
    return { ok: false, message: err?.message || "Failed to update request" };
  }
}

/* 5.  Delete request  ------------------------------------------------------ */
export async function deleteRequest(id: string) {
  try {
    const session = await getAuth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    // fetch customer name for message
    const order = await prisma.order.findUnique({ where: { id }, include: { customer: true } });
    const customerName = order?.customer?.name;

    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: id } }),
      prisma.order.delete({ where: { id } }),
    ]);

    await logUserActivity(
      session.user.id,
      "delete_request",
      `User deleted request with id=${id}`,
      { orderId: id }
    );

    revalidatePath("/cms/requests");

    return { ok: true, message: `Deleted request for ${customerName ?? id}` };
  } catch (err: any) {
    console.error("deleteRequest error", err);
    return { ok: false, message: err?.message || "Failed to delete request" };
  }
}

/* 7. Update only the request status (small server-action) --------------- */
export async function updateRequestStatus(id: string, status: string) {
  try {
    const session = await getAuth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    // Role-based authorization: allow only ADMIN, MANAGER, STAFF
    const role = (session.user as any)?.role;
    const allowedRoles = ["ADMIN", "MANAGER", "STAFF"];
    if (!role || !allowedRoles.includes(role)) {
      throw new Error("Forbidden: insufficient permissions to update request status");
    }

    // validate status against Prisma enum values
    const allowed = ["RECEIVED", "CANCELED", "PROCESSING", "SHIPPED", "COMPLETED"];
    if (!allowed.includes(status)) throw new Error("Invalid status");

  await prisma.order.update({ where: { id }, data: { status: status as any } });

    await logUserActivity(
      session.user.id,
      "update_request_status",
      `User updated request status for id=${id} to ${status}`,
      { orderId: id, status }
    );

    revalidatePath(`/cms/requests/${id}`);
    revalidatePath(`/cms/requests`);

    return { ok: true, message: `Updated status to ${status}` };
  } catch (err: any) {
    console.error("updateRequestStatus error", err);
    return { ok: false, message: err?.message || "Failed to update status" };
  }
}

/* 6.  Staff-only wrapper – redirects back to CMS --------------------------- */
export async function createRequestInCMS(data: FormData) {
  const res = await createRequest(data, false); // staff → auth enforced
  if (!res.ok) throw new Error(res.message);
  redirect("/cms/requests");
}




// //------- Added Logging to Created By and Updated By -------//
// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { getAuth } from "@/lib/auth"; // Better-Auth server helper
// import { logUserActivity } from "@/lib/logging";

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

// /* 3.  Create request + items from single JSON blob  ------------------------  */
// export async function createRequest(data: FormData) {
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");

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

//   await logUserActivity(
//     session.user.id,
//     "create_request",
//     `User created request with id=${order.id} for customer "${customerName}"`,
//     { orderId: order.id }
//   );

//   revalidatePath("/cms/requests");
// }

// /* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
// export async function updateRequest(
//   id: string,
//   data: FormData,
//   editedById?: string
// ) {
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");

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

//   await logUserActivity(
//     session.user.id,
//     "update_request",
//     `User updated request with id=${id}`,
//     { orderId: id }
//   );

//   revalidatePath("/cms/requests");
// }

// /* 5.  Delete request  ------------------------------------------------------ */
// export async function deleteRequest(id: string) {
//   const session = await getAuth();
//   if (!session?.user?.id) throw new Error("Unauthorized");

//   await prisma.$transaction([
//     prisma.orderItem.deleteMany({ where: { orderId: id } }),
//     prisma.order.delete({ where: { id } }),
//   ]);

//   await logUserActivity(
//     session.user.id,
//     "delete_request",
//     `User deleted request with id=${id}`,
//     { orderId: id }
//   );

//   revalidatePath("/cms/requests");
// }

// /* 6.  Staff-only wrapper – redirects back to CMS --------------------------- */
// export async function createRequestInCMS(data: FormData) {
//   await createRequest(data); // shared logic
//   redirect("/cms/requests"); // staff stay in CMS
// }





// //------- Added Logging to Created By and Updated By -------//
// "use server";
// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { getCurrentUser } from "@/lib/auth-server";
// import { logUserActivity } from "@/lib/logging";

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

// /* 3.  Create request + items from single JSON blob  ------------------------  */
// export async function createRequest(data: FormData) {
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

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

//   await logUserActivity(
//     user.id,
//     "create_request",
//     `User created request with id=${order.id} for customer "${customerName}"`,
//     { orderId: order.id }
//   );

//   revalidatePath("/cms/requests");
// }

// /* 4.  Update request – FULL RE-WRITE of items  ----------------------------- */
// export async function updateRequest(
//   id: string,
//   data: FormData,
//   editedById?: string
// ) {
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

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

//   await logUserActivity(
//     user.id,
//     "update_request",
//     `User updated request with id=${id}`,
//     { orderId: id }
//   );

//   revalidatePath("/cms/requests");
// }

// /* 5.  Delete request  ------------------------------------------------------ */
// export async function deleteRequest(id: string) {
//   const user = await getCurrentUser();
//   if (!user?.id) throw new Error("Unauthorized");

//   await prisma.$transaction([
//     prisma.orderItem.deleteMany({ where: { orderId: id } }),
//     prisma.order.delete({ where: { id } }),
//   ]);

//   await logUserActivity(
//     user.id,
//     "delete_request",
//     `User deleted request with id=${id}`,
//     { orderId: id }
//   );

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
//     where: { id }, // ✅ fixed typo
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

