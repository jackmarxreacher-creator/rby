// app/cms/customers/[id]/EditCustomerClient.tsx
"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "../_components/CustomerForm";
import { updateCustomer } from "../actions";
import { useServerAction } from "@/lib/use-server-action";

interface Props {
  customer: any;
}

export function EditCustomerClient({ customer }: Props) {
  const router = useRouter();

  const wrappedUpdate = useServerAction(updateCustomer);

  async function handleUpdate(data: FormData) {
    const res = await wrappedUpdate(customer.id, data);
    if (res?.ok) router.push("/cms/customers");
  }

  /* ✅ correct prop name expected by CustomerForm */
  return <CustomerForm initialCustomer={customer} onSave={handleUpdate} />;
}





// // app/cms/customers/[id]/EditCustomerClient.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import CustomerForm from "../_components/CustomerForm";
// import { updateCustomer } from "../actions";

// interface Props {
//   customer: any; // ← tighten this type when you can
// }

// export function EditCustomerClient({ customer }: Props) {
//   const router = useRouter();

//   async function handleUpdate(data: FormData) {
//     await updateCustomer(customer.id, data);
//     router.push("/cms/customers");
//   }

//   /* change prop name to whatever CustomerForm really expects */
//   return <CustomerForm initialCustomer={customer} onSubmit={handleUpdate} />;
// }




// "use client";

// import { useRouter } from "next/navigation";
// import CustomerForm from "../_components/CustomerForm";
// import { updateCustomer } from "../actions";

// interface Props {
//   customer: any;
// }

// export function EditCustomerClient({ customer }: Props) {
//   const router = useRouter();

//   async function handleUpdate(data: FormData) {
//     await updateCustomer(customer.id, data);
//     router.push("/cms/customers");
//   }

//   return <CustomerForm initialCustomer={customer} action={handleUpdate} />;
// }