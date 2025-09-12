"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "../_components/CustomerForm";
import { updateCustomer } from "../actions";

interface Props {
  customer: any;
}

export function EditCustomerClient({ customer }: Props) {
  const router = useRouter();

  async function handleUpdate(data: FormData) {
    await updateCustomer(customer.id, data);
    router.push("/cms/customers");
  }

  return <CustomerForm initialCustomer={customer} action={handleUpdate} />;
}