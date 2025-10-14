"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useServerAction } from "@/lib/use-server-action";
import { updateRequest } from "../actions";
import OrderForm from "./OrderForm";

interface Props {
  id: string;
  initialRequest: any;
  products: any[];
}

export function RequestEditFormWrapper({ id, initialRequest, products }: Props) {
  const router = useRouter();
  const wrappedUpdate = useServerAction(updateRequest as any);

  const handleSave = async (formData: FormData) => {
    const res = await wrappedUpdate(id, formData);
    if (res.ok) router.push("/cms/requests");
  };

  return (
    <OrderForm initialRequest={initialRequest} products={products} action={handleSave} />
  );
}

export default RequestEditFormWrapper;
