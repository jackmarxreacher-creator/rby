// app/cms/customers/[id]/EditCustomerClient.tsx
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