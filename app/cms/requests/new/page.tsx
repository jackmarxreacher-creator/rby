import { getProducts } from "../actions";
import NewRequestClient from "./NewRequestClient";

export default async function NewRequestPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Request</h1>
      <NewRequestClient products={products} />
    </div>
  );
}





// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import OrderForm from "../_components/OrderForm";
// import CustomerSelectDialog from "../_components/CustomerSelectDialog";
// import { createRequest } from "../actions"; // <-- server action

// export default function NewRequestPage() {
//   const router = useRouter();
//   const [existingCustomerMode, setExistingCustomerMode] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleSelectCustomer = (customer: any) => {
//     setSelectedCustomer(customer);
//     setDialogOpen(false);
//     setExistingCustomerMode(true);
//   };

//   const handleNewCustomer = () => {
//     setSelectedCustomer(null);
//     setExistingCustomerMode(false);
//   };

//   /* ----  submit the form data ---- */
//   async function handleSubmit(formData: FormData) {
//     await createRequest(formData); // server action
//     router.push("/cms/requests");
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Create New Request</h1>

//       <div className="mb-6 space-x-4">
//         <Button
//           variant={existingCustomerMode ? "outline" : "default"}
//           onClick={() => setDialogOpen(true)}
//         >
//           Select Existing Customer
//         </Button>
//         <Button
//           variant={!existingCustomerMode ? "outline" : "default"}
//           onClick={handleNewCustomer}
//         >
//           New Customer
//         </Button>
//       </div>

//       {/* give the server-action to the form */}
//       <OrderForm
//         initialCustomer={selectedCustomer}
//         action={handleSubmit} // <-- form will call this with FormData
//       />

//       <CustomerSelectDialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onSelect={handleSelectCustomer}
//       />
//     </div>
//   );
// }
