"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "../_components/CustomerForm";
import { createCustomer } from "../actions";

export default function NewCustomerPage() {
  const router = useRouter();

  const handleSave = async (data: FormData) => {
    await createCustomer(data);
    router.push("/cms/customers");
  };

  return (
    <div className="p-8">
      <CustomerForm onSave={handleSave} />
    </div>
  );
}

