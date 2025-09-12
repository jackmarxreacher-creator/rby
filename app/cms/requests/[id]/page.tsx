import { prisma } from "@/lib/prisma";
import OrderForm from "../_components/OrderForm"; // default export
import { updateRequest } from "../actions";
import { notFound } from "next/navigation";

export default async function EditRequestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // <-- await for Next 15

  const request = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, orderItems: { include: { product: true } } },
  });

  if (!request) notFound();

  // pre-bound server-action (serialisable)
  const boundUpdateRequest = updateRequest.bind(null, id);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Request</h1>
      <OrderForm
        initialRequest={request}
        action={boundUpdateRequest} // bound server-action only
      />
    </div>
  );
}
