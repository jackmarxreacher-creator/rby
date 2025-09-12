"use client";

import { useState } from "react";
import OrderForm from "./OrderForm";

interface RequestsClientProps {
  products: any[];
}

export default function RequestsClient({ products }: RequestsClientProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Put your submit logic here, or call server actions via fetch or Server Actions
    console.log("Submit request");
    setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? (
        <OrderForm onSubmit={handleSubmit} products={products} initialCustomer={null} />
      ) : (
        <p className="text-center text-green-600 font-semibold">Request submitted successfully!</p>
      )}
    </div>
  );
}
