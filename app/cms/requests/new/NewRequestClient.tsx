"use client";

import { useState } from "react";
import OrderForm from "../_components/OrderForm";
import CustomerSelectDialog from "../_components/CustomerSelectDialog";
import { createRequest } from "../actions";

interface Props {
  products: any[];
}

export default function NewRequestClient({ products }: Props) {
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
    await createRequest(formData);
    window.location.href = "/cms/requests";
  }

  return (
    <>
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
    </>
  );
}