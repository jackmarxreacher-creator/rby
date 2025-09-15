"use client";

import { useState } from "react";
import OrderForm from "./OrderForm";
import CustomerSelectDialog from "./CustomerSelectDialog";

interface RequestsClientProps {
  products: any[];
  onSave: (formData: FormData) => Promise<void>; // ✅ server-action
}

export default function RequestsClient({ products, onSave }: RequestsClientProps) {
  const [existingCustomerMode, setExistingCustomerMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setDialogOpen(false);
    setExistingCustomerMode(true);
  };

  const handleNewCustomer = () => {
    setSelectedCustomer(null);
    setExistingCustomerMode(false);
  };

  /* ----  submit the form data ---- */
  async function handleSubmit(formData: FormData) {
    await onSave(formData);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Request</h1>

      <div className="mb-6 space-x-4">
        <button
          onClick={() => setDialogOpen(true)}
          className={`px-4 py-2 rounded border transition-colors ${
            existingCustomerMode ? "bg-[#be965b] text-white" : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
          }`}
        >
          Select Existing Customer
        </button>
        <button
          onClick={handleNewCustomer}
          className={`px-4 py-2 rounded border transition-colors ${
            !existingCustomerMode ? "bg-[#be965b] text-white" : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
          }`}
        >
          New Customer
        </button>
      </div>

      {/* Pass products + server-action to the form */}
      <OrderForm
        initialCustomer={selectedCustomer}
        products={products}
        action={handleSubmit}
      />

      <CustomerSelectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleSelectCustomer}
      />
    </div>
  );
}




// "use client";

// import { useState } from "react";
// import OrderForm from "./OrderForm";
// import CustomerSelectDialog from "./CustomerSelectDialog";

// interface RequestsClientProps {
//   products: any[];
// }

// export default function RequestsClient({ products }: RequestsClientProps) {
//   const [existingCustomerMode, setExistingCustomerMode] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
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
//     // Call the server-action passed in via props
//     await onSave(formData);
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Create New Request</h1>

//       <div className="mb-6 space-x-4">
//         <button
//           onClick={() => setDialogOpen(true)}
//           className={`px-4 py-2 rounded border transition-colors ${
//             existingCustomerMode ? "bg-[#be965b] text-white" : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
//           }`}
//         >
//           Select Existing Customer
//         </button>
//         <button
//           onClick={handleNewCustomer}
//           className={`px-4 py-2 rounded border transition-colors ${
//             !existingCustomerMode ? "bg-[#be965b] text-white" : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
//           }`}
//         >
//           New Customer
//         </button>
//       </div>

//       {/* Pass products + server-action to the form */}
//       <OrderForm
//         initialCustomer={selectedCustomer}
//         products={products}
//         action={handleSubmit}
//       />

//       <CustomerSelectDialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onSelect={handleSelectCustomer}
//       />
//     </div>
//   );
// }






// "use client";

// import { useState } from "react";
// import OrderForm from "./OrderForm";

// interface RequestsClientProps {
//   products: any[];
// }

// export default function RequestsClient({ products }: RequestsClientProps) {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     // Put your submit logic here, or call server actions via fetch or Server Actions
//     console.log("Submit request");
//     setSubmitted(true);
//   };

//   return (
//     <div>
//       {!submitted ? (
//         <OrderForm onSubmit={handleSubmit} products={products} initialCustomer={null} />
//       ) : (
//         <p className="text-center text-green-600 font-semibold">Request submitted successfully!</p>
//       )}
//     </div>
//   );
// }
