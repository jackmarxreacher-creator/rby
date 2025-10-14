"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "../_components/CustomerForm";
import { createCustomer } from "../actions";
import { useServerAction } from "@/lib/use-server-action";

export default function NewCustomerPage() {
  const router = useRouter();
  const wrappedCreate = useServerAction(createCustomer);

  const handleSave = async (data: FormData) => {
    const res = await wrappedCreate(data);
    if (res?.ok) router.push("/cms/customers");
  };

  return (
    <div className="p-8">
      <CustomerForm onSave={handleSave} />
    </div>
  );
}

