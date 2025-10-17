"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OrderForm from "@/app/cms/requests/_components/OrderForm";
import CustomerSelectDialog from "@/app/cms/requests/_components/CustomerSelectDialog";
import Appreciation from "./Appreciation";
import Countdown from "./Countdown";
import { submitRequest } from "../actions";
import { Product } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";

export default function RequestClient({ products }: { products: Product[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [existingMode, setExistingMode] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectCustomer = (c: any) => {
    setSelectedCustomer(c);
    setDialogOpen(false);
    setExistingMode(true);
  };

  const handleNewCustomer = () => {
    setSelectedCustomer(null);
    setExistingMode(false);
  };

  async function handleSubmit(formData: FormData) {
    const res = await submitRequest(formData);
    if (res?.ok && res?.downloadUrl) {
      try {
        // Fetch the PDF and download it directly (avoids opening a new tab)
        const r = await fetch(res.downloadUrl as string, {
          method: "GET",
          cache: "no-store",
          headers: { "Accept": "application/pdf" },
        });
        if (!r.ok) throw new Error("Download failed");

        const cd = r.headers.get("content-disposition") || "";
        const match = cd.match(/filename="?([^";]+)"?/i);
        const suggested = match?.[1] ?? "invoice.pdf";

        const blob = await r.blob();
        if (blob.type && !blob.type.includes("pdf")) {
          throw new Error("Server did not return a PDF");
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = suggested;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast({ title: "Invoice downloaded", description: "A copy of your invoice has been downloaded.", duration: 4500 });
      } catch (e: any) {
        toast({ title: "Download failed", description: e?.message ?? "Please try again.", duration: 5500 });
        return; // don't show appreciation screen on failure
      }
    } else if (res && !res.ok) {
      toast({ title: "Failed to submit request", description: res.message ?? "Please try again.", duration: 5500 });
      return; // don't show appreciation screen on failure
    } else {
      // Unknown shape – treat as success without download
      toast({ title: "Request submitted", description: "Thank you for your request.", duration: 4000 });
    }

    setSubmitted(true);
  }

  if (submitted)
    return (
      <>
        <Appreciation onReset={() => setSubmitted(false)} />
        <Countdown seconds={5} />
      </>
    );

  return (
    <>
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setDialogOpen(true)}
          className={`px-4 py-2 rounded border transition-colors ${
            existingMode
              ? "bg-[#be965b] text-white border-[#be965b]"
              : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
          }`}
        >
          Select Existing Customer
        </button>
        <button
          onClick={handleNewCustomer}
          className={`px-4 py-2 rounded border transition-colors ${
            !existingMode
              ? "bg-[#be965b] text-white border-[#be965b]"
              : "bg-white text-[#be965b] border-[#be965b] hover:bg-[#f3ede5]"
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



// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import OrderForm from "@/app/cms/requests/_components/OrderForm";
// import Appreciation from "./Appreciation";
// import Countdown from "./Countdown";
// import { submitRequest } from "../actions"; // ⬅️ NOT createRequestInCMS
// import { Product } from "@prisma/client";

// export default function RequestClient({ products }: { products: Product[] }) {
//   const [submitted, setSubmitted] = useState(false);

//   async function handleSubmit(formData: FormData) {
//     await submitRequest(formData); // ⬅️ plain action, no redirect
//     setSubmitted(true);
//   }

//   if (submitted)
//     return (
//       <>
//         <Appreciation onReset={() => setSubmitted(false)} />
//         <Countdown seconds={5} />
//       </>
//     );

//   return <OrderForm action={handleSubmit} products={products} />;
// }




//"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import OrderForm from "@/app/cms/requests/_components/OrderForm";
// import Appreciation from "./Appreciation";
// import Countdown from "./Countdown";
// import { submitRequest } from "../actions";
// import { Product } from "@prisma/client"; // or your own Product type

// export default function RequestClient({ products }: { products: Product[] }) {
//   const [submitted, setSubmitted] = useState(false);
//   const router = useRouter();

//   async function handleSubmit(formData: FormData) {
//     await submitRequest(formData);
//     setSubmitted(true);
//   }

//   if (submitted)
//     return (
//       <>
//         <Appreciation onReset={() => setSubmitted(false)} />
//         <Countdown seconds={5} />
//       </>
//     );

//   return <OrderForm action={handleSubmit} products={products} />;
// }