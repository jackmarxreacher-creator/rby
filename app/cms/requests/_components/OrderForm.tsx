"use client";

import { useState, useEffect } from "react";
import ProductDialog from "./ProductDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiShoppingCart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface InvoiceItem {
  productId?: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  amount: number;
}

interface Customer {
  name: string;
  businessName?: string;
  email: string;
  phone: string;
  location?: string;
  address?: string;
  businessType: "Wholesale" | "Retail" | "";
}

interface OrderFormProps {
  action: (formData: FormData) => Promise<void>;
  initialCustomer?: Customer | null;
  initialRequest?: any;
  products: any[];
}

export default function OrderForm({
  action,
  initialCustomer,
  initialRequest,
  products,
}: OrderFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState<"Wholesale" | "Retail" | "">("");

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(1);

  /* ----------  pre-fill when editing  ---------- */
  useEffect(() => {
    if (initialRequest) {
      const c = initialRequest.customer;
      setCustomerName(c?.name ?? "");
      setBusinessName(c?.businessName ?? "");
      setEmail(c?.email ?? "");
      setPhone(c?.phone ?? "");
      setLocation(c?.location ?? "");
      setAddress(c?.address ?? "");
      setBusinessType(c?.businessType ?? "");
      setInvoiceItems(
        initialRequest.orderItems.map((it: any) => ({
          productId: it.productId,
          name: it.product.name,
          size: it.product.size,
          quantity: it.quantity,
          price: it.price,
          amount: it.amount,
        }))
      );
    } else if (initialCustomer) {
      setCustomerName(initialCustomer.name ?? "");
      setBusinessName(initialCustomer.businessName ?? "");
      setEmail(initialCustomer.email ?? "");
      setPhone(initialCustomer.phone ?? "");
      setLocation(initialCustomer.location ?? "");
      setAddress(initialCustomer.address ?? "");
      setBusinessType(initialCustomer.businessType ?? "");
    }
  }, [initialRequest, initialCustomer]);

  const allRequiredFilled =
    customerName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    businessType !== "";

  const canSubmit = allRequiredFilled && invoiceItems.length > 0;

  const handleAddProduct = (product: any, quantity: number) => {
    const price =
      businessType === "Wholesale"
        ? product.wholesalePrice
        : product.retailPrice;

    const newItem: InvoiceItem = {
      productId: product.id,
      name: product.name,
      size: product.size,
      quantity,
      price,
      amount: price * quantity,
    };

    setInvoiceItems((prev) => [...prev, newItem]);
  };

  const handleDelete = (index: number) => {
    setInvoiceItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditQuantity(invoiceItems[index].quantity);
  };

  const handleSaveEdit = (index: number) => {
    setInvoiceItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: editQuantity,
              amount: item.price * editQuantity,
            }
          : item
      )
    );
    setEditingIndex(null);
  };

  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.amount, 0);

  /* ---- build FormData and call server-action ---- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      id: initialRequest?.id,
      customerName,
      businessName,
      email,
      phone,
      location,
      address,
      businessType,
      totalAmount,
      items: invoiceItems,
      status: initialRequest?.status ?? "RECEIVED",
    };

    const formData = new FormData();
    formData.set("payload", JSON.stringify(payload));

    await action(formData); // <-- caller decides what happens next
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 bg-white shadow-md rounded-lg p-8"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#be965b] mb-8 text-center">
        Order Request Form
      </h2>

      {/* Customer Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#be965b]">
          Customer Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Name (Optional)
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Type <span className="text-red-500">*</span>
            </label>
            <select
              value={businessType}
              onChange={(e) =>
                setBusinessType(e.target.value as "Wholesale" | "Retail" | "")
              }
              className="w-full border rounded px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
              required
            >
              <option value="" disabled>
                Select your business type
              </option>
              <option value="Wholesale">Wholesale</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Business Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
          />
        </div>
      </div>

      {/* Add Product */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#be965b]">Products</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setDialogOpen(true)}
                  disabled={!allRequiredFilled}
                >
                  Add Product
                </Button>
              </span>
            </TooltipTrigger>
            {!allRequiredFilled && (
              <TooltipContent side="top">
                <p>Please fill in all required customer details first</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <ProductDialog
          key={businessType}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAddProduct={handleAddProduct}
          businessType={businessType}
          products={products}
        />

        {/* Invoice Summary */}
        <AnimatePresence mode="wait">
          {invoiceItems.length > 0 ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-x-auto"
            >
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-[#f3ede5]">
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Product
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Size</th>
                    <th className="border border-gray-200 px-4 py-2">Quantity</th>
                    <th className="border border-gray-200 px-4 py-2">Price</th>
                    <th className="border border-gray-200 px-4 py-2">Amount</th>
                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.size}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {editingIndex === index ? (
                          <input
                            type="number"
                            min={1}
                            value={editQuantity}
                            onChange={(e) =>
                              setEditQuantity(Number(e.target.value))
                            }
                            className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#be965b]"
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        GHS {item.price}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center font-semibold">
                        GHS {item.amount}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
                        {editingIndex === index ? (
                          <Button
                            type="button"
                            size="sm"
                            variant="default"
                            onClick={() => handleSaveEdit(index)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEdit(index)}
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total */}
              <div className="flex justify-end mt-4">
                <p className="text-lg font-bold">
                  Total:{" "}
                  <span className="text-[#be965b]">GHS {totalAmount}</span>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-10 text-center text-gray-500"
            >
              <FiShoppingCart className="mx-auto mb-3 text-4xl text-gray-400" />
              <p>No products added yet. Click "Add Product" to get started.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <div className="text-center pt-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  type="submit"
                  variant="default"
                  className="px-8 py-3 text-lg"
                  disabled={!canSubmit}
                >
                  Send Request
                </Button>
              </span>
            </TooltipTrigger>
            {!canSubmit && (
              <TooltipContent side="top">
                <p>
                  Please fill all required fields and add at least one product
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </form>
  );
}




// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ProductDialog from "./ProductDialog";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { FiShoppingCart } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";

// interface InvoiceItem {
//   productId?: string;
//   name: string;
//   size: string;
//   quantity: number;
//   price: number;
//   amount: number;
// }

// interface Customer {
//   name: string;
//   businessName?: string;
//   email: string;
//   phone: string;
//   location?: string;
//   address?: string;
//   businessType: "Wholesale" | "Retail" | "";
// }

// interface OrderFormProps {
//   action: (formData: FormData) => Promise<void>;
//   initialCustomer?: Customer | null;
//   initialRequest?: any;
//   products: any[];
// }

// export default function OrderForm({
//   action,
//   initialCustomer,
//   initialRequest,
//   products,
// }: OrderFormProps) {
//   const router = useRouter();
//   const [customerName, setCustomerName] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [address, setAddress] = useState("");
//   const [businessType, setBusinessType] = useState<"Wholesale" | "Retail" | "">("");

//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [editQuantity, setEditQuantity] = useState<number>(1);

//   /* ----------  pre-fill when editing  ---------- */
//   useEffect(() => {
//     if (initialRequest) {
//       const c = initialRequest.customer;
//       setCustomerName(c?.name ?? "");
//       setBusinessName(c?.businessName ?? "");
//       setEmail(c?.email ?? "");
//       setPhone(c?.phone ?? "");
//       setLocation(c?.location ?? "");
//       setAddress(c?.address ?? "");
//       setBusinessType(c?.businessType ?? "");
//       setInvoiceItems(
//         initialRequest.orderItems.map((it: any) => ({
//           productId: it.productId,
//           name: it.product.name,
//           size: it.product.size,
//           quantity: it.quantity,
//           price: it.price,
//           amount: it.amount,
//         }))
//       );
//     } else if (initialCustomer) {
//       setCustomerName(initialCustomer.name ?? "");
//       setBusinessName(initialCustomer.businessName ?? "");
//       setEmail(initialCustomer.email ?? "");
//       setPhone(initialCustomer.phone ?? "");
//       setLocation(initialCustomer.location ?? "");
//       setAddress(initialCustomer.address ?? "");
//       setBusinessType(initialCustomer.businessType ?? "");
//     }
//   }, [initialRequest, initialCustomer]);

//   const allRequiredFilled =
//     customerName.trim() !== "" &&
//     email.trim() !== "" &&
//     phone.trim() !== "" &&
//     businessType !== "";

//   const canSubmit = allRequiredFilled && invoiceItems.length > 0;

//   const handleAddProduct = (product: any, quantity: number) => {
//     const price =
//       businessType === "Wholesale"
//         ? product.wholesalePrice
//         : product.retailPrice;

//     const newItem: InvoiceItem = {
//       productId: product.id,
//       name: product.name,
//       size: product.size,
//       quantity,
//       price,
//       amount: price * quantity,
//     };

//     setInvoiceItems((prev) => [...prev, newItem]);
//   };

//   const handleDelete = (index: number) => {
//     setInvoiceItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleStartEdit = (index: number) => {
//     setEditingIndex(index);
//     setEditQuantity(invoiceItems[index].quantity);
//   };

//   const handleSaveEdit = (index: number) => {
//     setInvoiceItems((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? {
//               ...item,
//               quantity: editQuantity,
//               amount: item.price * editQuantity,
//             }
//           : item
//       )
//     );
//     setEditingIndex(null);
//   };

//   const totalAmount = invoiceItems.reduce((sum, item) => sum + item.amount, 0);

//   /* ---- build FormData and call server-action ---- */
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!canSubmit) return;

//     const payload = {
//       id: initialRequest?.id, // <-- needed for update
//       customerName,
//       businessName,
//       email,
//       phone,
//       location,
//       address,
//       businessType,
//       totalAmount,
//       items: invoiceItems,
//       status: initialRequest?.status ?? "RECEIVED",
//     };

//     const formData = new FormData();
//     formData.set("payload", JSON.stringify(payload));

//     await action(formData);

//     /* 👉 redirect after success */
//     router.push("/cms/requests");
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-10 bg-white shadow-md rounded-lg p-8"
//     >
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-[#be965b] mb-8 text-center">
//         Order Request Form
//       </h2>

//       {/* Customer Details */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4 text-[#be965b]">
//           Customer Details
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Customer Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Business Name (Optional)
//             </label>
//             <input
//               type="text"
//               value={businessName}
//               onChange={(e) => setBusinessName(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Business Type <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={businessType}
//               onChange={(e) =>
//                 setBusinessType(e.target.value as "Wholesale" | "Retail" | "")
//               }
//               className="w-full border rounded px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//               required
//             >
//               <option value="" disabled>
//                 Select your business type
//               </option>
//               <option value="Wholesale">Wholesale</option>
//               <option value="Retail">Retail</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Phone <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Business Location
//             </label>
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Business Address
//           </label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//           />
//         </div>
//       </div>

//       {/* Add Product */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4 text-[#be965b]">Products</h3>
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <span>
//                 <Button
//                   type="button"
//                   variant="default"
//                   onClick={() => setDialogOpen(true)}
//                   disabled={!allRequiredFilled}
//                 >
//                   Add Product
//                 </Button>
//               </span>
//             </TooltipTrigger>
//             {!allRequiredFilled && (
//               <TooltipContent side="top">
//                 <p>Please fill in all required customer details first</p>
//               </TooltipContent>
//             )}
//           </Tooltip>
//         </TooltipProvider>

//         <ProductDialog
//           key={businessType}
//           open={dialogOpen}
//           onClose={() => setDialogOpen(false)}
//           onAddProduct={handleAddProduct}
//           businessType={businessType}
//           products={products}
//         />

//         {/* Invoice Summary */}
//         <AnimatePresence mode="wait">
//           {invoiceItems.length > 0 ? (
//             <motion.div
//               key="table"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.3 }}
//               className="mt-6 overflow-x-auto"
//             >
//               <table className="w-full border-collapse border border-gray-200 text-sm">
//                 <thead>
//                   <tr className="bg-[#f3ede5]">
//                     <th className="border border-gray-200 px-4 py-2 text-left">
//                       Product
//                     </th>
//                     <th className="border border-gray-200 px-4 py-2">Size</th>
//                     <th className="border border-gray-200 px-4 py-2">Quantity</th>
//                     <th className="border border-gray-200 px-4 py-2">Price</th>
//                     <th className="border border-gray-200 px-4 py-2">Amount</th>
//                     <th className="border border-gray-200 px-4 py-2">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoiceItems.map((item, index) => (
//                     <tr key={index}>
//                       <td className="border border-gray-200 px-4 py-2">
//                         {item.name}
//                       </td>
//                       <td className="border border-gray-200 px-4 py-2">
//                         {item.size}
//                       </td>
//                       <td className="border border-gray-200 px-4 py-2 text-center">
//                         {editingIndex === index ? (
//                           <input
//                             type="number"
//                             min={1}
//                             value={editQuantity}
//                             onChange={(e) =>
//                               setEditQuantity(Number(e.target.value))
//                             }
//                             className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#be965b]"
//                           />
//                         ) : (
//                           item.quantity
//                         )}
//                       </td>
//                       <td className="border border-gray-200 px-4 py-2 text-center">
//                         GHS {item.price}
//                       </td>
//                       <td className="border border-gray-200 px-4 py-2 text-center font-semibold">
//                         GHS {item.amount}
//                       </td>
//                       <td className="border border-gray-200 px-4 py-2 text-center space-x-2">
//                         {editingIndex === index ? (
//                           <Button
//                             type="button"
//                             size="sm"
//                             variant="default"
//                             onClick={() => handleSaveEdit(index)}
//                           >
//                             Save
//                           </Button>
//                         ) : (
//                           <Button
//                             type="button"
//                             size="sm"
//                             variant="outline"
//                             onClick={() => handleStartEdit(index)}
//                           >
//                             Edit
//                           </Button>
//                         )}
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(index)}
//                         >
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Total */}
//               <div className="flex justify-end mt-4">
//                 <p className="text-lg font-bold">
//                   Total:{" "}
//                   <span className="text-[#be965b]">GHS {totalAmount}</span>
//                 </p>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.3 }}
//               className="mt-10 text-center text-gray-500"
//             >
//               <FiShoppingCart className="mx-auto mb-3 text-4xl text-gray-400" />
//               <p>No products added yet. Click "Add Product" to get started.</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Submit */}
//       <div className="text-center pt-6">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <span>
//                 <Button
//                   type="submit"
//                   variant="default"
//                   className="px-8 py-3 text-lg"
//                   disabled={!canSubmit}
//                 >
//                   Send Request
//                 </Button>
//               </span>
//             </TooltipTrigger>
//             {!canSubmit && (
//               <TooltipContent side="top">
//                 <p>
//                   Please fill all required fields and add at least one product
//                 </p>
//               </TooltipContent>
//             )}
//           </Tooltip>
//         </TooltipProvider>
//       </div>
//     </form>
//   );
// }

