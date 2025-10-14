// app/cms/requests/[id]/page.tsx
import { notFound } from "next/navigation";
import OrderForm from "../_components/OrderForm";
import RequestEditFormWrapper from "../_components/RequestEditFormWrapper";
import { updateRequest, getProducts } from "../actions";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRequestPage({ params }: PageProps) {
  const { id } = await params;

  const [request, products, session] = await Promise.all([
    prisma.order.findUnique({
      where: { id },
      include: { customer: true, orderItems: { include: { product: true } } },
    }),
    getProducts(),
    getAuth(),
  ]);

  if (!request) notFound();
  if (!session) throw new Error("Unauthorized");

  /* hoist the userId so the closure is guaranteed to see it */
  const userId = session.user.id;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Request</h1>
      <RequestEditFormWrapper id={id} initialRequest={request} products={products} />
    </div>
  );
}



// // app/cms/requests/[id]/page.tsx
// import { notFound } from "next/navigation";
// import OrderForm from "../_components/OrderForm";
// import { updateRequest } from "../actions";
// import { getProducts } from "../actions";
// import { prisma } from "@/lib/prisma"; // ← 1. import prisma
// import { authClient } from "@/lib/auth-client"; // ← 2. grab userId

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function EditRequestPage({ params }: PageProps) {
//   const { id } = await params;

//   const [request, products] = await Promise.all([
//     prisma.order.findUnique({
//       where: { id },
//       include: { customer: true, orderItems: { include: { product: true } } },
//     }),
//     getProducts(),
//   ]);

//   if (!request) notFound();

//   // Server-action wrapper: (data: FormData) => Promise<void>
//   async function handleUpdate(data: FormData) {
//     "use server";
//     const session = await authClient.session; // or your preferred way
//     if (!session?.data?.user?.id) throw new Error("Unauthorized");
//     await updateRequest(id, data, session.data.user.id); // ← 3. pass userId
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Request</h1>
//       <OrderForm
//         initialRequest={request}
//         products={products}
//         action={handleUpdate}
//       />
//     </div>
//   );
// }










// import { notFound } from "next/navigation";
// import OrderForm from "../_components/OrderForm";
// import { updateRequest } from "../actions";
// import { getProducts } from "../actions";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function EditRequestPage({ params }: PageProps) {
//   const { id } = await params;

//   const [request, products] = await Promise.all([
//     prisma.order.findUnique({
//       where: { id },
//       include: { customer: true, orderItems: { include: { product: true } } },
//     }),
//     getProducts(),
//   ]);

//   if (!request) notFound();

//   // Server-action wrapper that matches (data: FormData) => Promise<void>
//   async function handleUpdate(data: FormData) {
//     "use server";
//     await updateRequest(id, data);
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Request</h1>
//       <OrderForm
//         initialRequest={request}
//         products={products}
//         action={handleUpdate}
//       />
//     </div>
//   );
// }










// import { prisma } from "@/lib/prisma";
// import OrderForm from "../_components/OrderForm"; // default export
// import { updateRequest } from "../actions";
// import { notFound } from "next/navigation";

// export default async function EditRequestPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params; // <-- await for Next 15

//   const request = await prisma.order.findUnique({
//     where: { id },
//     include: { customer: true, orderItems: { include: { product: true } } },
//   });

//   if (!request) notFound();

//   // pre-bound server-action (serialisable)
//   const boundUpdateRequest = updateRequest.bind(null, id);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Edit Request</h1>
//       <OrderForm
//         initialRequest={request}
//         action={boundUpdateRequest} // bound server-action only
//       />
//     </div>
//   );
// }
